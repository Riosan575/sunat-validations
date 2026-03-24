import { describe, it, expect } from 'vitest'
import {
  validateTaxAmount,
  validateTaxAffectionConsistency,
  validateInvoiceTotal,
  validateIgvRate,
  validateIvapRate,
  validateFreeOperation,
  validateExportation,
  validateTaxPercent,
} from './validators.js'

describe('Validadores de Impuestos', () => {
  describe('validateTaxAmount', () => {
    it('debe validar montos de impuesto correctos', () => {
      const result = validateTaxAmount(100, 18, '10')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar códigos de afectación inválidos', () => {
      const result = validateTaxAmount(100, 18, '99' as '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('INVALID_AFFECTION_CODE')
    })

    it('debe rechazar base imponible negativa', () => {
      const result = validateTaxAmount(-100, 18, '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('NEGATIVE_TAXABLE_AMOUNT')
    })

    it('debe rechazar monto de impuesto negativo', () => {
      const result = validateTaxAmount(100, -18, '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('NEGATIVE_TAX_AMOUNT')
    })

    it('debe rechazar monto de impuesto incorrecto', () => {
      const result = validateTaxAmount(100, 10, '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('TAX_AMOUNT_MISMATCH')
    })

    it('debe validar exonerado con impuesto 0', () => {
      const result = validateTaxAmount(100, 0, '20')
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateTaxAffectionConsistency', () => {
    it('debe validar consistencia correcta', () => {
      expect(validateTaxAffectionConsistency('1000', '10').isValid).toBe(true)
      expect(validateTaxAffectionConsistency('9997', '20').isValid).toBe(true)
      expect(validateTaxAffectionConsistency('9998', '30').isValid).toBe(true)
      expect(validateTaxAffectionConsistency('9995', '40').isValid).toBe(true)
    })

    it('debe rechazar combinaciones inconsistentes', () => {
      const result = validateTaxAffectionConsistency('1000', '20')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('TAX_AFFECTION_MISMATCH')
    })

    it('debe rechazar código de tributo inválido', () => {
      const result = validateTaxAffectionConsistency('999' as '1000', '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('INVALID_TAX_CODE')
    })
  })

  describe('validateInvoiceTotal', () => {
    it('debe validar totales correctos', () => {
      const result = validateInvoiceTotal(100, 18, 118)
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar totales incorrectos', () => {
      const result = validateInvoiceTotal(100, 18, 120)
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('TOTAL_MISMATCH')
    })

    it('debe aceptar tolerancia personalizada', () => {
      const result = validateInvoiceTotal(100, 18, 118.5, 1)
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateIgvRate', () => {
    it('debe validar tasa de IGV correcta', () => {
      expect(validateIgvRate(0.18).isValid).toBe(true)
    })

    it('debe rechazar tasa de IGV incorrecta', () => {
      const result = validateIgvRate(0.16)
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('INVALID_IGV_RATE')
    })
  })

  describe('validateIvapRate', () => {
    it('debe validar tasa de IVAP correcta', () => {
      expect(validateIvapRate(0.04).isValid).toBe(true)
    })

    it('debe rechazar tasa de IVAP incorrecta', () => {
      const result = validateIvapRate(0.05)
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('INVALID_IVAP_RATE')
    })
  })

  describe('validateFreeOperation', () => {
    it('debe validar operación gratuita gravada', () => {
      const result = validateFreeOperation(100, 18, '11')
      expect(result.isValid).toBe(true)
    })

    it('debe validar operación gratuita exonerada', () => {
      const result = validateFreeOperation(100, 0, '21')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar código no gratuito', () => {
      const result = validateFreeOperation(100, 18, '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('NOT_FREE_OPERATION')
    })

    it('debe rechazar valor de referencia cero', () => {
      const result = validateFreeOperation(0, 0, '11')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('INVALID_REFERENCE_VALUE')
    })
  })

  describe('validateExportation', () => {
    it('debe validar exportación de bienes (código 40)', () => {
      const result = validateExportation(100, 0, '40')
      expect(result.isValid).toBe(true)
    })

    it('debe validar exportación de servicios (código 37)', () => {
      const result = validateExportation(100, 0, '37')
      expect(result.isValid).toBe(true)
    })

    it('debe rechazar código no de exportación', () => {
      const result = validateExportation(100, 0, '10')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('NOT_EXPORTATION')
    })

    it('debe rechazar impuesto diferente de 0', () => {
      const result = validateExportation(100, 18, '40')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('EXPORTATION_TAX_NOT_ZERO')
    })
  })

  describe('validateTaxPercent', () => {
    it('debe validar porcentaje de IGV', () => {
      expect(validateTaxPercent(0.18, '1000').isValid).toBe(true)
    })

    it('debe validar porcentaje de IVAP', () => {
      expect(validateTaxPercent(0.04, '1016').isValid).toBe(true)
    })

    it('debe aceptar cualquier porcentaje positivo para ISC', () => {
      expect(validateTaxPercent(0.30, '2000').isValid).toBe(true)
      expect(validateTaxPercent(0.50, '2000').isValid).toBe(true)
    })

    it('debe aceptar cualquier porcentaje para ICBPER', () => {
      expect(validateTaxPercent(0.50, '7152').isValid).toBe(true)
    })

    it('debe rechazar porcentaje negativo para ISC', () => {
      const result = validateTaxPercent(-0.10, '2000')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('NEGATIVE_TAX_PERCENT')
    })

    it('debe rechazar porcentaje incorrecto para IGV', () => {
      const result = validateTaxPercent(0.16, '1000')
      expect(result.isValid).toBe(false)
      expect(result.errorCode).toBe('TAX_PERCENT_MISMATCH')
    })
  })
})
