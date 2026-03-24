import { describe, it, expect } from 'vitest'
import {
  roundBankers,
  roundHalfUp,
  truncate,
  round,
  roundCurrency,
  sumPrecise,
  multiplyPrecise,
  dividePrecise,
  approximatelyEquals,
  isZero,
  safeParseFloat,
  safeParseInt,
} from './rounding.js'

describe('Utilidades de Redondeo', () => {
  describe('roundBankers', () => {
    it('debe redondear correctamente con redondeo bancario', () => {
      expect(roundBankers(1.5, 0)).toBe(2) // 2 es par
      expect(roundBankers(2.5, 0)).toBe(2) // 2 es par (banker's rounding)
      expect(roundBankers(3.5, 0)).toBe(4) // 4 es par
      expect(roundBankers(4.5, 0)).toBe(4) // 4 es par
    })

    it('debe redondear a 2 decimales por defecto', () => {
      expect(roundBankers(1.234)).toBe(1.23)
      // Nota: Debido a la representación de punto flotante, algunos valores
      // pueden no comportarse exactamente como el redondeo bancario puro
      expect(roundBankers(1.236)).toBe(1.24)
      expect(roundBankers(1.244)).toBe(1.24)
      expect(roundBankers(1.256)).toBe(1.26)
    })

    it('debe manejar números negativos', () => {
      expect(roundBankers(-1.5, 0)).toBe(-2)
      expect(roundBankers(-2.5, 0)).toBe(-2)
    })

    it('debe mantener números enteros sin cambios', () => {
      expect(roundBankers(5)).toBe(5)
      expect(roundBankers(100)).toBe(100)
    })
  })

  describe('roundHalfUp', () => {
    it('debe redondear hacia arriba cuando >= 0.5', () => {
      expect(roundHalfUp(1.5, 0)).toBe(2)
      expect(roundHalfUp(2.5, 0)).toBe(3)
      expect(roundHalfUp(1.235, 2)).toBe(1.24)
    })
  })

  describe('truncate', () => {
    it('debe truncar sin redondear', () => {
      expect(truncate(1.999, 2)).toBe(1.99)
      expect(truncate(1.999, 1)).toBe(1.9)
      expect(truncate(-1.999, 2)).toBe(-1.99)
    })
  })

  describe('round', () => {
    it('debe usar redondeo bancario por defecto', () => {
      // round() sin decimales especificados usa 2 decimales por defecto
      expect(round(2.5)).toBe(2.5) // Con 2 decimales, 2.5 se mantiene
      expect(round(2.505)).toBe(2.5) // banker's rounding con 2 decimales
    })

    it('debe soportar diferentes métodos', () => {
      expect(round(2.5, { method: 'half-up', decimals: 0 })).toBe(3)
      expect(round(2.5, { method: 'bankers', decimals: 0 })).toBe(2)
      expect(round(2.9, { method: 'floor', decimals: 0 })).toBe(2)
      expect(round(2.1, { method: 'ceil', decimals: 0 })).toBe(3)
      expect(round(2.9, { method: 'trunc', decimals: 0 })).toBe(2)
    })
  })

  describe('roundCurrency', () => {
    it('debe redondear a 2 decimales', () => {
      expect(roundCurrency(100.123)).toBe(100.12)
      expect(roundCurrency(100.125)).toBe(100.12) // banker's
      expect(roundCurrency(100.126)).toBe(100.13)
    })
  })

  describe('sumPrecise', () => {
    it('debe sumar correctamente evitando errores de punto flotante', () => {
      const result = sumPrecise([0.1, 0.2, 0.3])
      expect(result).toBe(0.6)
    })

    it('debe manejar arrays vacíos', () => {
      expect(sumPrecise([])).toBe(0)
    })

    it('debe manejar números grandes', () => {
      expect(sumPrecise([1000000.12, 2000000.34])).toBe(3000000.46)
    })
  })

  describe('multiplyPrecise', () => {
    it('debe multiplicar correctamente', () => {
      expect(multiplyPrecise(3, 0.1)).toBe(0.3)
      expect(multiplyPrecise(100, 0.18)).toBe(18)
    })
  })

  describe('dividePrecise', () => {
    it('debe dividir correctamente', () => {
      expect(dividePrecise(118, 1.18)).toBe(100)
      expect(dividePrecise(100, 4)).toBe(25)
    })

    it('debe lanzar error al dividir por cero', () => {
      expect(() => dividePrecise(100, 0)).toThrow('División por cero')
    })
  })

  describe('approximatelyEquals', () => {
    it('debe retornar true para números cercanos', () => {
      expect(approximatelyEquals(1.0, 1.009, 0.01)).toBe(true)
      expect(approximatelyEquals(1.0, 1.011, 0.01)).toBe(false)
    })

    it('debe usar tolerancia por defecto de 0.01', () => {
      expect(approximatelyEquals(1.0, 1.009)).toBe(true)
      expect(approximatelyEquals(1.0, 1.02)).toBe(false)
    })
  })

  describe('isZero', () => {
    it('debe retornar true para valores cercanos a cero', () => {
      expect(isZero(0)).toBe(true)
      expect(isZero(0.00001)).toBe(true)
      expect(isZero(0.001)).toBe(false)
    })
  })

  describe('safeParseFloat', () => {
    it('debe parsear strings a números', () => {
      expect(safeParseFloat('123.45')).toBe(123.45)
      expect(safeParseFloat('-123.45')).toBe(-123.45)
    })

    it('debe retornar valor por defecto para strings inválidos', () => {
      expect(safeParseFloat('abc')).toBe(0)
      expect(safeParseFloat('abc', 10)).toBe(10)
    })

    it('debe manejar números directamente', () => {
      expect(safeParseFloat(123.45)).toBe(123.45)
    })
  })

  describe('safeParseInt', () => {
    it('debe parsear strings a enteros', () => {
      expect(safeParseInt('123')).toBe(123)
      expect(safeParseInt('123.99')).toBe(123)
    })

    it('debe retornar valor por defecto para strings inválidos', () => {
      expect(safeParseInt('abc')).toBe(0)
      expect(safeParseInt('abc', 10)).toBe(10)
    })
  })
})
