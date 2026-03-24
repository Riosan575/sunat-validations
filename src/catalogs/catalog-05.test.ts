import { describe, it, expect } from 'vitest'
import {
  isValidTaxCode,
  getTaxByCode,
  getUneceCode5153,
  getTaxShortName,
  getTaxRate,
  isPercentageTax,
  isUnitTax,
  validateTaxCode,
  CATALOG_05,
} from './catalog-05.js'

describe('Catálogo 05 - Tributos', () => {
  describe('isValidTaxCode', () => {
    it('debe retornar true para códigos válidos', () => {
      expect(isValidTaxCode('1000')).toBe(true) // IGV
      expect(isValidTaxCode('1016')).toBe(true) // IVAP
      expect(isValidTaxCode('2000')).toBe(true) // ISC
      expect(isValidTaxCode('7152')).toBe(true) // ICBPER
      expect(isValidTaxCode('9995')).toBe(true) // Exportación
      expect(isValidTaxCode('9997')).toBe(true) // Exonerado
      expect(isValidTaxCode('9998')).toBe(true) // Inafecto
    })

    it('debe retornar false para códigos inválidos', () => {
      expect(isValidTaxCode('999')).toBe(false)
      expect(isValidTaxCode('')).toBe(false)
      expect(isValidTaxCode('ABC')).toBe(false)
      expect(isValidTaxCode('1001')).toBe(false)
    })
  })

  describe('getTaxByCode', () => {
    it('debe retornar la información del IGV', () => {
      const igv = getTaxByCode('1000')
      expect(igv).toBeDefined()
      expect(igv?.name).toBe('IGV')
      expect(igv?.uneceCode).toBe('VAT')
      expect(igv?.description).toBe('Impuesto General a las Ventas')
    })

    it('debe retornar la información del ICBPER', () => {
      const icbper = getTaxByCode('7152')
      expect(icbper).toBeDefined()
      expect(icbper?.name).toBe('ICBPER')
      expect(icbper?.uneceCode).toBe('OTH')
    })

    it('debe retornar undefined para códigos inválidos', () => {
      expect(getTaxByCode('999')).toBeUndefined()
      expect(getTaxByCode('')).toBeUndefined()
    })
  })

  describe('getUneceCode5153', () => {
    it('debe retornar VAT para IGV', () => {
      expect(getUneceCode5153('1000')).toBe('VAT')
    })

    it('debe retornar EXC para ISC', () => {
      expect(getUneceCode5153('2000')).toBe('EXC')
    })

    it('debe retornar FRE para Exportación', () => {
      expect(getUneceCode5153('9995')).toBe('FRE')
    })

    it('debe retornar OTH para ICBPER', () => {
      expect(getUneceCode5153('7152')).toBe('OTH')
    })
  })

  describe('getTaxShortName', () => {
    it('debe retornar nombres cortos correctos', () => {
      expect(getTaxShortName('1000')).toBe('IGV')
      expect(getTaxShortName('1016')).toBe('IVAP')
      expect(getTaxShortName('2000')).toBe('ISC')
      expect(getTaxShortName('7152')).toBe('ICBPER')
      expect(getTaxShortName('9995')).toBe('EXP')
      expect(getTaxShortName('9997')).toBe('EXO')
      expect(getTaxShortName('9998')).toBe('INA')
    })
  })

  describe('getTaxRate', () => {
    it('debe retornar 0.18 para IGV', () => {
      expect(getTaxRate('1000')).toBe(0.18)
    })

    it('debe retornar 0.04 para IVAP', () => {
      expect(getTaxRate('1016')).toBe(0.04)
    })

    it('debe retornar 0.50 para ICBPER', () => {
      expect(getTaxRate('7152')).toBe(0.50)
    })

    it('debe retornar 0 para Exonerado e Inafecto', () => {
      expect(getTaxRate('9997')).toBe(0)
      expect(getTaxRate('9998')).toBe(0)
      expect(getTaxRate('9995')).toBe(0)
    })
  })

  describe('isPercentageTax', () => {
    it('debe retornar true para IGV', () => {
      expect(isPercentageTax('1000')).toBe(true)
    })

    it('debe retornar true para IVAP', () => {
      expect(isPercentageTax('1016')).toBe(true)
    })

    it('debe retornar false para otros tributos', () => {
      expect(isPercentageTax('2000')).toBe(false)
      expect(isPercentageTax('7152')).toBe(false)
      expect(isPercentageTax('9995')).toBe(false)
    })
  })

  describe('isUnitTax', () => {
    it('debe retornar true solo para ICBPER', () => {
      expect(isUnitTax('7152')).toBe(true)
      expect(isUnitTax('1000')).toBe(false)
      expect(isUnitTax('1016')).toBe(false)
    })
  })

  describe('validateTaxCode', () => {
    it('debe validar correctamente códigos válidos', () => {
      const result = validateTaxCode('1000')
      expect(result.isValid).toBe(true)
      expect(result.tax).toBeDefined()
      expect(result.tax?.name).toBe('IGV')
    })

    it('debe fallar para códigos vacíos', () => {
      const result = validateTaxCode('')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toContain('requerido')
    })

    it('debe fallar para códigos inválidos', () => {
      const result = validateTaxCode('999')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toContain('inválido')
    })
  })

  describe('CATALOG_05', () => {
    it('debe contener 9 tributos', () => {
      expect(CATALOG_05).toHaveLength(9)
    })

    it('debe tener IGV como primer elemento', () => {
      expect(CATALOG_05[0]?.code).toBe('1000')
      expect(CATALOG_05[0]?.name).toBe('IGV')
    })
  })
})
