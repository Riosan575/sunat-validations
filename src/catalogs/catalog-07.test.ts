import { describe, it, expect } from 'vitest'
import {
  isValidAffectionCode,
  getAffectionByCode,
  getTaxCodeByAffection,
  getRateByAffection,
  getAffectionCategory,
  isGravado,
  isExonerado,
  isInafecto,
  isExportacion,
  isGratuita,
  isOnerosa,
  validateAffectionTaxMatch,
  validateAffectionCode,
  CATALOG_07,
} from './catalog-07.js'

describe('Catálogo 07 - Afectación IGV', () => {
  describe('isValidAffectionCode', () => {
    it('debe retornar true para códigos válidos', () => {
      expect(isValidAffectionCode('10')).toBe(true)
      expect(isValidAffectionCode('11')).toBe(true)
      expect(isValidAffectionCode('17')).toBe(true)
      expect(isValidAffectionCode('20')).toBe(true)
      expect(isValidAffectionCode('30')).toBe(true)
      expect(isValidAffectionCode('40')).toBe(true)
    })

    it('debe retornar false para códigos inválidos', () => {
      expect(isValidAffectionCode('00')).toBe(false)
      expect(isValidAffectionCode('')).toBe(false)
      expect(isValidAffectionCode('50')).toBe(false)
      expect(isValidAffectionCode('AB')).toBe(false)
    })
  })

  describe('getAffectionByCode', () => {
    it('debe retornar información de operación gravada onerosa', () => {
      const affection = getAffectionByCode('10')
      expect(affection).toBeDefined()
      expect(affection?.description).toBe('Gravado - Operación Onerosa')
      expect(affection?.category).toBe('GRAVADO')
      expect(affection?.isFree).toBe(false)
      expect(affection?.isOnerous).toBe(true)
    })

    it('debe retornar información de exportación', () => {
      const affection = getAffectionByCode('40')
      expect(affection).toBeDefined()
      expect(affection?.description).toBe('Exportación de Bienes')
      expect(affection?.category).toBe('EXPORTACION')
    })

    it('debe retornar undefined para códigos inválidos', () => {
      expect(getAffectionByCode('00')).toBeUndefined()
    })
  })

  describe('getTaxCodeByAffection', () => {
    it('debe retornar IGV para operaciones gravadas', () => {
      expect(getTaxCodeByAffection('10')).toBe('1000')
      expect(getTaxCodeByAffection('11')).toBe('1000')
      expect(getTaxCodeByAffection('15')).toBe('1000')
    })

    it('debe retornar IVAP para código 17', () => {
      expect(getTaxCodeByAffection('17')).toBe('1016')
    })

    it('debe retornar Exonerado para operaciones exoneradas', () => {
      expect(getTaxCodeByAffection('20')).toBe('9997')
      expect(getTaxCodeByAffection('21')).toBe('9997')
    })

    it('debe retornar Inafecto para operaciones inafectas', () => {
      expect(getTaxCodeByAffection('30')).toBe('9998')
      expect(getTaxCodeByAffection('31')).toBe('9998')
    })

    it('debe retornar Exportación para código 40', () => {
      expect(getTaxCodeByAffection('40')).toBe('9995')
    })
  })

  describe('getRateByAffection', () => {
    it('debe retornar 18% para operaciones gravadas con IGV', () => {
      expect(getRateByAffection('10')).toBe(0.18)
      expect(getRateByAffection('11')).toBe(0.18)
      expect(getRateByAffection('16')).toBe(0.18)
    })

    it('debe retornar 4% para IVAP', () => {
      expect(getRateByAffection('17')).toBe(0.04)
    })

    it('debe retornar 0% para exonerado, inafecto y exportación', () => {
      expect(getRateByAffection('20')).toBe(0)
      expect(getRateByAffection('30')).toBe(0)
      expect(getRateByAffection('40')).toBe(0)
    })
  })

  describe('getAffectionCategory', () => {
    it('debe retornar GRAVADO para códigos 10-17', () => {
      expect(getAffectionCategory('10')).toBe('GRAVADO')
      expect(getAffectionCategory('15')).toBe('GRAVADO')
    })

    it('debe retornar EXONERADO para códigos 20-21', () => {
      expect(getAffectionCategory('20')).toBe('EXONERADO')
      expect(getAffectionCategory('21')).toBe('EXONERADO')
    })

    it('debe retornar INAFECTO para códigos 30-37', () => {
      expect(getAffectionCategory('30')).toBe('INAFECTO')
      expect(getAffectionCategory('36')).toBe('INAFECTO')
    })

    it('debe retornar EXPORTACION para código 40', () => {
      expect(getAffectionCategory('40')).toBe('EXPORTACION')
    })
  })

  describe('isGravado', () => {
    it('debe retornar true para códigos gravados', () => {
      expect(isGravado('10')).toBe(true)
      expect(isGravado('17')).toBe(true)
    })

    it('debe retornar false para códigos no gravados', () => {
      expect(isGravado('20')).toBe(false)
      expect(isGravado('30')).toBe(false)
      expect(isGravado('40')).toBe(false)
    })
  })

  describe('isExonerado', () => {
    it('debe retornar true solo para códigos exonerados', () => {
      expect(isExonerado('20')).toBe(true)
      expect(isExonerado('21')).toBe(true)
      expect(isExonerado('10')).toBe(false)
    })
  })

  describe('isInafecto', () => {
    it('debe retornar true para códigos inafectos', () => {
      expect(isInafecto('30')).toBe(true)
      expect(isInafecto('37')).toBe(true)
    })

    it('debe retornar false para otros códigos', () => {
      expect(isInafecto('10')).toBe(false)
      expect(isInafecto('40')).toBe(false)
    })
  })

  describe('isExportacion', () => {
    it('debe retornar true solo para código 40', () => {
      expect(isExportacion('40')).toBe(true)
      expect(isExportacion('10')).toBe(false)
      expect(isExportacion('37')).toBe(false)
    })
  })

  describe('isGratuita', () => {
    it('debe retornar true para operaciones gratuitas', () => {
      expect(isGratuita('11')).toBe(true)
      expect(isGratuita('12')).toBe(true)
      expect(isGratuita('15')).toBe(true)
      expect(isGratuita('21')).toBe(true)
      expect(isGratuita('31')).toBe(true)
    })

    it('debe retornar false para operaciones onerosas', () => {
      expect(isGratuita('10')).toBe(false)
      expect(isGratuita('20')).toBe(false)
      expect(isGratuita('30')).toBe(false)
    })
  })

  describe('isOnerosa', () => {
    it('debe retornar true para operaciones onerosas', () => {
      expect(isOnerosa('10')).toBe(true)
      expect(isOnerosa('20')).toBe(true)
      expect(isOnerosa('30')).toBe(true)
      expect(isOnerosa('40')).toBe(true)
    })

    it('debe retornar false para operaciones gratuitas', () => {
      expect(isOnerosa('11')).toBe(false)
      expect(isOnerosa('21')).toBe(false)
      expect(isOnerosa('31')).toBe(false)
    })
  })

  describe('validateAffectionTaxMatch', () => {
    it('debe retornar true cuando coinciden', () => {
      expect(validateAffectionTaxMatch('10', '1000')).toBe(true)
      expect(validateAffectionTaxMatch('17', '1016')).toBe(true)
      expect(validateAffectionTaxMatch('20', '9997')).toBe(true)
      expect(validateAffectionTaxMatch('30', '9998')).toBe(true)
      expect(validateAffectionTaxMatch('40', '9995')).toBe(true)
    })

    it('debe retornar false cuando no coinciden', () => {
      expect(validateAffectionTaxMatch('10', '9997')).toBe(false)
      expect(validateAffectionTaxMatch('20', '1000')).toBe(false)
    })
  })

  describe('validateAffectionCode', () => {
    it('debe validar códigos válidos', () => {
      const result = validateAffectionCode('10')
      expect(result.isValid).toBe(true)
      expect(result.affection).toBeDefined()
    })

    it('debe fallar para códigos vacíos', () => {
      const result = validateAffectionCode('')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toContain('requerido')
    })

    it('debe fallar para códigos inválidos', () => {
      const result = validateAffectionCode('50')
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toContain('inválido')
    })
  })

  describe('CATALOG_07', () => {
    it('debe contener 19 afectaciones', () => {
      expect(CATALOG_07).toHaveLength(19)
    })
  })
})
