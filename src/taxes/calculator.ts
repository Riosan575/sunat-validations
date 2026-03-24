/**
 * Calculadoras de impuestos SUNAT
 * IGV, IVAP, ISC, ICBPER
 */

import type { AffectionCode, TaxCalculationOptions, TaxCalculationResult, TaxCode } from '../types/index.js'
import { getRateByAffection, getTaxCodeByAffection } from '../catalogs/index.js'
import { roundBankers, roundCurrency, approximatelyEquals } from '../utils/rounding.js'

/** Tasa de IGV vigente (18%) */
export const IGV_RATE = 0.18

/** Tasa de IVAP vigente (4%) */
export const IVAP_RATE = 0.04

/** Tasa de ICBPER vigente por unidad (S/ 0.50 - 2024) */
export const ICBPER_RATE = 0.50

/** Tasas de ISC por tipo de producto */
export const ISC_RATES: Record<string, number> = {
  // Alcohol y bebidas alcohólicas
  alcohol: 0.30,
  beer: 0.30,
  wine: 0.25,
  spirits: 0.45,
  // Tabaco
  cigarettes: 0.55,
  tobacco: 0.50,
  // Combustibles
  gasoline: 0.35,
  diesel: 0.30,
  gas: 0.20,
  // Vehículos
  luxury_cars: 0.50,
  suv: 0.35,
  // Otros
  jewelry: 0.20,
  perfume: 0.15,
}

/**
 * Calcula el IGV a partir de la base imponible
 * @param taxableAmount - Base imponible
 * @param options - Opciones de cálculo
 * @returns Monto de IGV
 */
export function calculateIgv(taxableAmount: number, options: TaxCalculationOptions = {}): number {
  const { decimals = 2 } = options
  return roundBankers(taxableAmount * IGV_RATE, decimals)
}

/**
 * Calcula el IVAP a partir de la base imponible
 * @param taxableAmount - Base imponible
 * @param options - Opciones de cálculo
 * @returns Monto de IVAP
 */
export function calculateIvap(taxableAmount: number, options: TaxCalculationOptions = {}): number {
  const { decimals = 2 } = options
  return roundBankers(taxableAmount * IVAP_RATE, decimals)
}

/**
 * Calcula el ICBPER a partir de la cantidad de bolsas
 * @param quantity - Cantidad de bolsas
 * @param ratePerUnit - Tasa por unidad (default: 0.50)
 * @param options - Opciones de cálculo
 * @returns Monto de ICBPER
 */
export function calculateIcbper(
  quantity: number,
  ratePerUnit: number = ICBPER_RATE,
  options: TaxCalculationOptions = {}
): number {
  const { decimals = 2 } = options
  return roundBankers(quantity * ratePerUnit, decimals)
}

/**
 * Calcula el ISC a partir de la base imponible y tipo de producto
 * @param taxableAmount - Base imponible
 * @param productType - Tipo de producto
 * @param customRate - Tasa personalizada (opcional)
 * @param options - Opciones de cálculo
 * @returns Monto de ISC
 */
export function calculateIsc(
  taxableAmount: number,
  productType?: string,
  customRate?: number,
  options: TaxCalculationOptions = {}
): number {
  const { decimals = 2 } = options
  const rate = customRate ?? (productType ? (ISC_RATES[productType] ?? 0) : 0)
  return roundBankers(taxableAmount * rate, decimals)
}

/**
 * Calcula el precio con impuesto incluido
 * @param basePrice - Precio base (sin impuesto)
 * @param taxRate - Tasa de impuesto
 * @param options - Opciones de cálculo
 * @returns Precio con impuesto
 */
export function addTax(basePrice: number, taxRate: number, options: TaxCalculationOptions = {}): number {
  const { decimals = 2 } = options
  return roundBankers(basePrice * (1 + taxRate), decimals)
}

/**
 * Calcula el precio sin impuesto a partir del precio con impuesto
 * @param priceWithTax - Precio con impuesto
 * @param taxRate - Tasa de impuesto
 * @param options - Opciones de cálculo
 * @returns Precio sin impuesto
 */
export function removeTax(priceWithTax: number, taxRate: number, options: TaxCalculationOptions = {}): number {
  const { decimals = 2 } = options
  return roundBankers(priceWithTax / (1 + taxRate), decimals)
}

/**
 * Calcula la base imponible a partir del precio con IGV
 * @param priceWithIgv - Precio con IGV
 * @param options - Opciones de cálculo
 * @returns Base imponible
 */
export function calculateBaseFromIgv(priceWithIgv: number, options: TaxCalculationOptions = {}): number {
  return removeTax(priceWithIgv, IGV_RATE, options)
}

/**
 * Calcula el IGV a partir del precio total (con IGV incluido)
 * @param priceWithIgv - Precio con IGV
 * @param options - Opciones de cálculo
 * @returns Monto de IGV
 */
export function extractIgvFromPrice(priceWithIgv: number, options: TaxCalculationOptions = {}): number {
  const { decimals = 2 } = options
  const base = calculateBaseFromIgv(priceWithIgv, options)
  return roundBankers(priceWithIgv - base, decimals)
}

/**
 * Calcula los impuestos completos para una operación
 * @param amount - Monto de la operación
 * @param affectionCode - Código de afectación IGV
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo de impuestos
 */
export function calculateTax(
  amount: number,
  affectionCode: AffectionCode,
  options: TaxCalculationOptions = {}
): TaxCalculationResult {
  const { taxIncluded = false, decimals = 2 } = options

  const taxCode = getTaxCodeByAffection(affectionCode)
  const rate = getRateByAffection(affectionCode)

  let taxableAmount: number
  let taxAmount: number
  let total: number

  if (taxIncluded) {
    // El precio ya incluye impuesto
    taxableAmount = removeTax(amount, rate, { decimals })
    taxAmount = roundBankers(amount - taxableAmount, decimals)
    total = amount
  } else {
    // El precio no incluye impuesto
    taxableAmount = roundBankers(amount, decimals)
    taxAmount = roundBankers(taxableAmount * rate, decimals)
    total = roundBankers(taxableAmount + taxAmount, decimals)
  }

  return {
    taxableAmount,
    taxAmount,
    total,
    rate,
    affectionCode,
    taxCode,
    currencyId: 'PEN',
  }
}

/**
 * Calcula los impuestos para una operación con IGV (18%)
 * @param amount - Monto de la operación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateIgvTax(amount: number, options: TaxCalculationOptions = {}): TaxCalculationResult {
  return calculateTax(amount, '10', options)
}

/**
 * Calcula los impuestos para una operación con IVAP (4%)
 * @param amount - Monto de la operación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateIvapTax(amount: number, options: TaxCalculationOptions = {}): TaxCalculationResult {
  return calculateTax(amount, '17', options)
}

/**
 * Calcula los impuestos para una operación exonerada
 * @param amount - Monto de la operación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateExoneradoTax(amount: number, options: TaxCalculationOptions = {}): TaxCalculationResult {
  return calculateTax(amount, '20', options)
}

/**
 * Calcula los impuestos para una operación inafecta
 * @param amount - Monto de la operación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateInafectoTax(amount: number, options: TaxCalculationOptions = {}): TaxCalculationResult {
  return calculateTax(amount, '30', options)
}

/**
 * Calcula los impuestos para una exportación
 * @param amount - Monto de la operación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateExportacionTax(amount: number, options: TaxCalculationOptions = {}): TaxCalculationResult {
  return calculateTax(amount, '40', options)
}

/**
 * Valida que el cálculo de impuestos sea consistente
 * @param taxableAmount - Base imponible
 * @param taxAmount - Monto del impuesto
 * @param affectionCode - Código de afectación
 * @param tolerance - Tolerancia para la comparación (default: 0.01)
 * @returns true si es consistente
 */
export function validateTaxConsistency(
  taxableAmount: number,
  taxAmount: number,
  affectionCode: AffectionCode,
  tolerance: number = 0.01
): boolean {
  const expectedRate = getRateByAffection(affectionCode)
  const expectedTax = roundCurrency(taxableAmount * expectedRate)
  return approximatelyEquals(taxAmount, expectedTax, tolerance)
}

/**
 * Calcula el valor de referencia para operaciones gratuitas
 * El valor de referencia es el precio de mercado del bien o servicio
 * @param marketPrice - Precio de mercado
 * @param affectionCode - Código de afectación
 * @param options - Opciones de cálculo
 * @returns Resultado del cálculo
 */
export function calculateFreeOperationTax(
  marketPrice: number,
  affectionCode: AffectionCode,
  options: TaxCalculationOptions = {}
): TaxCalculationResult {
  // Para operaciones gratuitas, el valor de referencia es el precio de mercado
  return calculateTax(marketPrice, affectionCode, { ...options, taxIncluded: false })
}

/**
 * Distribuye un monto proporcionalmente
 * @param totalAmount - Monto total a distribuir
 * @param ratios - Array de proporciones
 * @param options - Opciones de cálculo
 * @returns Array de montos distribuidos
 */
export function distributeProportionally(
  totalAmount: number,
  ratios: number[],
  options: TaxCalculationOptions = {}
): number[] {
  const { decimals = 2 } = options
  const totalRatio = ratios.reduce((sum, r) => sum + r, 0)

  if (totalRatio === 0) {
    return ratios.map(() => 0)
  }

  const results: number[] = []
  let distributedSum = 0

  for (let i = 0; i < ratios.length; i++) {
    const ratio = ratios[i] ?? 0
    const amount = roundBankers((totalAmount * ratio) / totalRatio, decimals)
    results.push(amount)
    distributedSum += amount
  }

  // Ajustar el último elemento para compensar diferencias de redondeo
  const difference = roundBankers(totalAmount - distributedSum, decimals)
  if (difference !== 0 && results.length > 0) {
    const lastIndex = results.length - 1
    results[lastIndex] = roundBankers((results[lastIndex] ?? 0) + difference, decimals)
  }

  return results
}

/**
 * Obtiene la tasa de impuesto según el código de tributo
 * @param taxCode - Código de tributo
 * @returns Tasa del impuesto
 */
export function getTaxRateByCode(taxCode: TaxCode): number {
  const rates: Record<TaxCode, number> = {
    '1000': IGV_RATE,
    '1016': IVAP_RATE,
    '2000': 0, // ISC - variable
    '7152': ICBPER_RATE,
    '9995': 0, // Exportación
    '9996': 0, // Gratuito
    '9997': 0, // Exonerado
    '9998': 0, // Inafecto
    '9999': 0, // Otros
  }
  return rates[taxCode]
}

/**
 * Calcula el precio unitario con impuesto
 * @param unitPrice - Precio unitario sin impuesto
 * @param affectionCode - Código de afectación
 * @param options - Opciones de cálculo
 * @returns Precio unitario con impuesto
 */
export function calculateUnitPriceWithTax(
  unitPrice: number,
  affectionCode: AffectionCode,
  options: TaxCalculationOptions = {}
): number {
  const { decimals = 2 } = options
  const rate = getRateByAffection(affectionCode)
  return roundBankers(unitPrice * (1 + rate), decimals)
}
