/**
 * Validadores de impuestos
 */

import type { AffectionCode, TaxCode, ValidationResult } from '../types/index.js'
import {
  isValidAffectionCode,
  isValidTaxCode,
  getTaxCodeByAffection,
  validateAffectionTaxMatch,
  getRateByAffection,
} from '../catalogs/index.js'
import { roundCurrency, approximatelyEquals } from '../utils/rounding.js'
import { IGV_RATE, IVAP_RATE, getTaxRateByCode } from './calculator.js'

/**
 * Valida un monto de impuesto
 * @param taxableAmount - Base imponible
 * @param taxAmount - Monto del impuesto
 * @param affectionCode - Código de afectación
 * @returns Resultado de validación
 */
export function validateTaxAmount(
  taxableAmount: number,
  taxAmount: number,
  affectionCode: AffectionCode
): ValidationResult {
  // Verificar que el código de afectación sea válido
  if (!isValidAffectionCode(affectionCode)) {
    return {
      isValid: false,
      errorMessage: `Código de afectación inválido: ${affectionCode}`,
      errorCode: 'INVALID_AFFECTION_CODE',
    }
  }

  // Verificar que los montos sean positivos
  if (taxableAmount < 0) {
    return {
      isValid: false,
      errorMessage: 'La base imponible no puede ser negativa',
      errorCode: 'NEGATIVE_TAXABLE_AMOUNT',
    }
  }

  if (taxAmount < 0) {
    return {
      isValid: false,
      errorMessage: 'El monto del impuesto no puede ser negativo',
      errorCode: 'NEGATIVE_TAX_AMOUNT',
    }
  }

  // Calcular el impuesto esperado
  const expectedRate = getRateByAffection(affectionCode)
  const expectedTax = roundCurrency(taxableAmount * expectedRate)

  // Verificar que el impuesto calculado coincida
  if (!approximatelyEquals(taxAmount, expectedTax, 0.01)) {
    return {
      isValid: false,
      errorMessage: `El monto del impuesto (${taxAmount}) no coincide con el esperado (${expectedTax})`,
      errorCode: 'TAX_AMOUNT_MISMATCH',
      data: { expectedTax, actualTax: taxAmount, rate: expectedRate },
    }
  }

  return { isValid: true }
}

/**
 * Valida que el código de tributo y afectación sean consistentes
 * @param taxCode - Código de tributo
 * @param affectionCode - Código de afectación
 * @returns Resultado de validación
 */
export function validateTaxAffectionConsistency(taxCode: TaxCode, affectionCode: AffectionCode): ValidationResult {
  if (!isValidTaxCode(taxCode)) {
    return {
      isValid: false,
      errorMessage: `Código de tributo inválido: ${taxCode}`,
      errorCode: 'INVALID_TAX_CODE',
    }
  }

  if (!isValidAffectionCode(affectionCode)) {
    return {
      isValid: false,
      errorMessage: `Código de afectación inválido: ${affectionCode}`,
      errorCode: 'INVALID_AFFECTION_CODE',
    }
  }

  if (!validateAffectionTaxMatch(affectionCode, taxCode)) {
    const expectedTaxCode = getTaxCodeByAffection(affectionCode)
    return {
      isValid: false,
      errorMessage: `El código de tributo ${taxCode} no corresponde al código de afectación ${affectionCode}. Se esperaba ${expectedTaxCode}`,
      errorCode: 'TAX_AFFECTION_MISMATCH',
      data: { expectedTaxCode, providedTaxCode: taxCode },
    }
  }

  return { isValid: true }
}

/**
 * Valida un total de factura
 * @param subtotal - Subtotal (valor de venta)
 * @param taxAmount - Monto total de impuestos
 * @param total - Total de la factura
 * @param tolerance - Tolerancia para la comparación
 * @returns Resultado de validación
 */
export function validateInvoiceTotal(
  subtotal: number,
  taxAmount: number,
  total: number,
  tolerance: number = 0.01
): ValidationResult {
  const expectedTotal = roundCurrency(subtotal + taxAmount)

  if (!approximatelyEquals(total, expectedTotal, tolerance)) {
    return {
      isValid: false,
      errorMessage: `El total (${total}) no coincide con la suma del subtotal (${subtotal}) más impuestos (${taxAmount})`,
      errorCode: 'TOTAL_MISMATCH',
      data: { expectedTotal, actualTotal: total },
    }
  }

  return { isValid: true }
}

/**
 * Valida que la tasa de IGV sea correcta
 * @param rate - Tasa a validar
 * @returns Resultado de validación
 */
export function validateIgvRate(rate: number): ValidationResult {
  if (!approximatelyEquals(rate, IGV_RATE, 0.0001)) {
    return {
      isValid: false,
      errorMessage: `La tasa de IGV debe ser ${IGV_RATE} (18%), se recibió ${rate}`,
      errorCode: 'INVALID_IGV_RATE',
      data: { expectedRate: IGV_RATE, actualRate: rate },
    }
  }

  return { isValid: true }
}

/**
 * Valida que la tasa de IVAP sea correcta
 * @param rate - Tasa a validar
 * @returns Resultado de validación
 */
export function validateIvapRate(rate: number): ValidationResult {
  if (!approximatelyEquals(rate, IVAP_RATE, 0.0001)) {
    return {
      isValid: false,
      errorMessage: `La tasa de IVAP debe ser ${IVAP_RATE} (4%), se recibió ${rate}`,
      errorCode: 'INVALID_IVAP_RATE',
      data: { expectedRate: IVAP_RATE, actualRate: rate },
    }
  }

  return { isValid: true }
}

/**
 * Valida una operación gratuita
 * @param referenceValue - Valor de referencia (precio de mercado)
 * @param taxAmount - Monto del impuesto
 * @param affectionCode - Código de afectación
 * @returns Resultado de validación
 */
export function validateFreeOperation(
  referenceValue: number,
  taxAmount: number,
  affectionCode: AffectionCode
): ValidationResult {
  // Verificar que sea un código de operación gratuita
  const freeCodes: AffectionCode[] = ['11', '12', '13', '14', '15', '16', '21', '31', '32', '33', '34', '35', '36']

  if (!freeCodes.includes(affectionCode)) {
    return {
      isValid: false,
      errorMessage: `El código ${affectionCode} no corresponde a una operación gratuita`,
      errorCode: 'NOT_FREE_OPERATION',
    }
  }

  // Verificar que el valor de referencia sea positivo
  if (referenceValue <= 0) {
    return {
      isValid: false,
      errorMessage: 'El valor de referencia debe ser mayor a cero',
      errorCode: 'INVALID_REFERENCE_VALUE',
    }
  }

  // Validar el monto del impuesto
  return validateTaxAmount(referenceValue, taxAmount, affectionCode)
}

/**
 * Valida una exportación
 * @param _taxableAmount - Base imponible
 * @param taxAmount - Monto del impuesto
 * @param affectionCode - Código de afectación
 * @returns Resultado de validación
 */
export function validateExportation(
  _taxableAmount: number,
  taxAmount: number,
  affectionCode: AffectionCode
): ValidationResult {
  // Verificar que sea código de exportación
  if (affectionCode !== '40' && affectionCode !== '37') {
    return {
      isValid: false,
      errorMessage: `El código ${affectionCode} no corresponde a una exportación`,
      errorCode: 'NOT_EXPORTATION',
    }
  }

  // El monto del impuesto debe ser 0
  if (taxAmount !== 0) {
    return {
      isValid: false,
      errorMessage: 'Las exportaciones no tienen impuesto, el monto debe ser 0',
      errorCode: 'EXPORTATION_TAX_NOT_ZERO',
    }
  }

  return { isValid: true }
}

/**
 * Valida el porcentaje de impuesto
 * @param percent - Porcentaje a validar
 * @param taxCode - Código de tributo
 * @returns Resultado de validación
 */
export function validateTaxPercent(percent: number, taxCode: TaxCode): ValidationResult {
  const expectedRate = getTaxRateByCode(taxCode)

  // Para tributos con tasa variable (ISC, Otros), solo verificar que sea positivo
  if (taxCode === '2000' || taxCode === '9999') {
    if (percent < 0) {
      return {
        isValid: false,
        errorMessage: 'El porcentaje de impuesto no puede ser negativo',
        errorCode: 'NEGATIVE_TAX_PERCENT',
      }
    }
    return { isValid: true }
  }

  // Para ICBPER, verificar que sea la tasa por unidad
  if (taxCode === '7152') {
    // ICBPER es por unidad, no porcentaje
    return { isValid: true }
  }

  // Para otros tributos, verificar que coincida con la tasa esperada
  if (!approximatelyEquals(percent, expectedRate, 0.0001)) {
    return {
      isValid: false,
      errorMessage: `El porcentaje (${percent}) no coincide con la tasa esperada (${expectedRate}) para el tributo ${taxCode}`,
      errorCode: 'TAX_PERCENT_MISMATCH',
      data: { expectedRate, actualRate: percent },
    }
  }

  return { isValid: true }
}
