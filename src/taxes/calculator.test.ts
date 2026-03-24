import { describe, it, expect } from 'vitest'
import {
  IGV_RATE,
  IVAP_RATE,
  ICBPER_RATE,
  calculateIgv,
  calculateIvap,
  calculateIcbper,
  addTax,
  removeTax,
  calculateBaseFromIgv,
  extractIgvFromPrice,
  calculateTax,
  calculateIgvTax,
  calculateExoneradoTax,
  calculateInafectoTax,
  calculateExportacionTax,
  validateTaxConsistency,
  distributeProportionally,
  getTaxRateByCode,
  calculateUnitPriceWithTax,
} from './calculator.js'

describe('Calculadoras de Impuestos', () => {
  describe('Constantes', () => {
    it('debe tener IGV_RATE en 18%', () => {
      expect(IGV_RATE).toBe(0.18)
    })

    it('debe tener IVAP_RATE en 4%', () => {
      expect(IVAP_RATE).toBe(0.04)
    })

    it('debe tener ICBPER_RATE en S/ 0.50', () => {
      expect(ICBPER_RATE).toBe(0.50)
    })
  })

  describe('calculateIgv', () => {
    it('debe calcular IGV correctamente', () => {
      expect(calculateIgv(100)).toBe(18)
      expect(calculateIgv(1000)).toBe(180)
      expect(calculateIgv(50)).toBe(9)
    })

    it('debe manejar decimales', () => {
      expect(calculateIgv(99.99)).toBe(18) // 99.99 * 0.18 = 17.9982 ≈ 18.00
    })

    it('debe retornar 0 para base 0', () => {
      expect(calculateIgv(0)).toBe(0)
    })
  })

  describe('calculateIvap', () => {
    it('debe calcular IVAP correctamente (4%)', () => {
      expect(calculateIvap(100)).toBe(4)
      expect(calculateIvap(1000)).toBe(40)
    })
  })

  describe('calculateIcbper', () => {
    it('debe calcular ICBPER por cantidad de bolsas', () => {
      expect(calculateIcbper(10)).toBe(5) // 10 * 0.50
      expect(calculateIcbper(100)).toBe(50) // 100 * 0.50
    })

    it('debe aceptar tasa personalizada', () => {
      expect(calculateIcbper(10, 0.30)).toBe(3) // 10 * 0.30
    })
  })

  describe('addTax', () => {
    it('debe agregar impuesto al precio base', () => {
      expect(addTax(100, 0.18)).toBe(118)
      expect(addTax(1000, 0.18)).toBe(1180)
    })

    it('debe funcionar con diferentes tasas', () => {
      expect(addTax(100, 0.04)).toBe(104)
      expect(addTax(100, 0)).toBe(100)
    })
  })

  describe('removeTax', () => {
    it('debe remover impuesto del precio con impuesto', () => {
      expect(removeTax(118, 0.18)).toBe(100)
      expect(removeTax(104, 0.04)).toBe(100)
    })

    it('debe manejar precio sin impuesto', () => {
      expect(removeTax(100, 0)).toBe(100)
    })
  })

  describe('calculateBaseFromIgv', () => {
    it('debe calcular base imponible desde precio con IGV', () => {
      expect(calculateBaseFromIgv(118)).toBe(100)
      expect(calculateBaseFromIgv(1180)).toBe(1000)
    })
  })

  describe('extractIgvFromPrice', () => {
    it('debe extraer IGV del precio total', () => {
      expect(extractIgvFromPrice(118)).toBe(18)
      expect(extractIgvFromPrice(1180)).toBe(180)
    })
  })

  describe('calculateTax', () => {
    it('debe calcular impuesto gravado (código 10)', () => {
      const result = calculateTax(100, '10')
      expect(result.taxableAmount).toBe(100)
      expect(result.taxAmount).toBe(18)
      expect(result.total).toBe(118)
      expect(result.rate).toBe(0.18)
      expect(result.affectionCode).toBe('10')
      expect(result.taxCode).toBe('1000')
    })

    it('debe calcular impuesto exonerado (código 20)', () => {
      const result = calculateTax(100, '20')
      expect(result.taxableAmount).toBe(100)
      expect(result.taxAmount).toBe(0)
      expect(result.total).toBe(100)
      expect(result.rate).toBe(0)
    })

    it('debe calcular impuesto inafecto (código 30)', () => {
      const result = calculateTax(100, '30')
      expect(result.taxableAmount).toBe(100)
      expect(result.taxAmount).toBe(0)
      expect(result.total).toBe(100)
    })

    it('debe calcular exportación (código 40)', () => {
      const result = calculateTax(100, '40')
      expect(result.taxableAmount).toBe(100)
      expect(result.taxAmount).toBe(0)
      expect(result.total).toBe(100)
    })

    it('debe manejar precio con impuesto incluido', () => {
      const result = calculateTax(118, '10', { taxIncluded: true })
      expect(result.taxableAmount).toBe(100)
      expect(result.taxAmount).toBe(18)
      expect(result.total).toBe(118)
    })

    it('debe calcular IVAP (código 17)', () => {
      const result = calculateTax(100, '17')
      expect(result.taxAmount).toBe(4)
      expect(result.rate).toBe(0.04)
      expect(result.taxCode).toBe('1016')
    })
  })

  describe('calculateIgvTax', () => {
    it('debe ser equivalente a calculateTax con código 10', () => {
      const result = calculateIgvTax(100)
      expect(result.taxAmount).toBe(18)
      expect(result.affectionCode).toBe('10')
    })
  })

  describe('calculateExoneradoTax', () => {
    it('debe retornar impuesto 0', () => {
      const result = calculateExoneradoTax(100)
      expect(result.taxAmount).toBe(0)
    })
  })

  describe('calculateInafectoTax', () => {
    it('debe retornar impuesto 0', () => {
      const result = calculateInafectoTax(100)
      expect(result.taxAmount).toBe(0)
    })
  })

  describe('calculateExportacionTax', () => {
    it('debe retornar impuesto 0', () => {
      const result = calculateExportacionTax(100)
      expect(result.taxAmount).toBe(0)
    })
  })

  describe('validateTaxConsistency', () => {
    it('debe retornar true para cálculos consistentes', () => {
      expect(validateTaxConsistency(100, 18, '10')).toBe(true)
      expect(validateTaxConsistency(100, 4, '17')).toBe(true)
      expect(validateTaxConsistency(100, 0, '20')).toBe(true)
    })

    it('debe retornar false para cálculos inconsistentes', () => {
      expect(validateTaxConsistency(100, 10, '10')).toBe(false)
    })

    it('debe aceptar tolerancia personalizada', () => {
      expect(validateTaxConsistency(100, 17.9, '10', 0.2)).toBe(true)
    })
  })

  describe('distributeProportionally', () => {
    it('debe distribuir proporcionalmente', () => {
      const result = distributeProportionally(100, [1, 1, 1])
      expect(result[0]).toBe(33.33)
      expect(result[1]).toBe(33.33)
      expect(result[2]).toBe(33.34) // El último compensa
    })

    it('debe manejar proporciones diferentes', () => {
      const result = distributeProportionally(100, [1, 2, 3])
      expect(result[0]).toBe(16.67)
      expect(result[1]).toBe(33.33)
      expect(result[2]).toBe(50)
    })

    it('debe retornar ceros para proporciones cero', () => {
      const result = distributeProportionally(100, [0, 0, 0])
      expect(result).toEqual([0, 0, 0])
    })
  })

  describe('getTaxRateByCode', () => {
    it('debe retornar tasa correcta por código de tributo', () => {
      expect(getTaxRateByCode('1000')).toBe(0.18) // IGV
      expect(getTaxRateByCode('1016')).toBe(0.04) // IVAP
      expect(getTaxRateByCode('7152')).toBe(0.50) // ICBPER
      expect(getTaxRateByCode('9997')).toBe(0) // Exonerado
      expect(getTaxRateByCode('9998')).toBe(0) // Inafecto
    })
  })

  describe('calculateUnitPriceWithTax', () => {
    it('debe calcular precio unitario con IGV', () => {
      expect(calculateUnitPriceWithTax(100, '10')).toBe(118)
    })

    it('debe mantener precio para exonerado/inafecto', () => {
      expect(calculateUnitPriceWithTax(100, '20')).toBe(100)
      expect(calculateUnitPriceWithTax(100, '30')).toBe(100)
    })
  })
})
