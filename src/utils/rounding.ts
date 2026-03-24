/**
 * Utilidades de redondeo y operaciones matemáticas
 * Implementa redondeo bancario (round half even) según especificaciones SUNAT
 */

import type { RoundingOptions } from '../types/index.js'

/**
 * Redondeo bancario (round half even / banker's rounding)
 * Este es el método requerido por SUNAT para montos monetarios
 * @param value - Valor a redondear
 * @param decimals - Número de decimales (default: 2)
 * @returns Valor redondeado
 */
export function roundBankers(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals)
  const shifted = value * multiplier

  // Si el número es entero después del shift, no hay nada que redondear
  if (Number.isInteger(shifted)) {
    return value
  }

  const floor = Math.floor(shifted)
  const fractional = shifted - floor

  // Si la parte fraccionaria es exactamente 0.5
  if (Math.abs(fractional - 0.5) < Number.EPSILON) {
    // Si el número entero es par, redondear hacia abajo
    // Si es impar, redondear hacia arriba
    return floor % 2 === 0 ? floor / multiplier : (floor + 1) / multiplier
  }

  // Para otros casos, redondear normalmente
  return Math.round(shifted) / multiplier
}

/**
 * Redondeo hacia arriba (half up)
 * @param value - Valor a redondear
 * @param decimals - Número de decimales (default: 2)
 * @returns Valor redondeado
 */
export function roundHalfUp(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.round(value * multiplier) / multiplier
}

/**
 * Redondeo hacia abajo (half down)
 * @param value - Valor a redondear
 * @param decimals - Número de decimales (default: 2)
 * @returns Valor redondeado
 */
export function roundHalfDown(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals)
  const shifted = value * multiplier
  const floor = Math.floor(shifted)
  const fractional = shifted - floor

  // Si la parte fraccionaria es >= 0.5, redondear hacia arriba
  if (fractional >= 0.5) {
    return Math.floor(shifted) / multiplier
  }

  return floor / multiplier
}

/**
 * Truncar a decimales (sin redondeo)
 * @param value - Valor a truncar
 * @param decimals - Número de decimales (default: 2)
 * @returns Valor truncado
 */
export function truncate(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.trunc(value * multiplier) / multiplier
}

/**
 * Redondeo genérico con opciones
 * @param value - Valor a redondear
 * @param options - Opciones de redondeo
 * @returns Valor redondeado
 */
export function round(value: number, options: RoundingOptions = {}): number {
  const { decimals = 2, method = 'bankers' } = options

  switch (method) {
    case 'bankers':
      return roundBankers(value, decimals)
    case 'half-up':
      return roundHalfUp(value, decimals)
    case 'half-down':
      return roundHalfDown(value, decimals)
    case 'floor':
      return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    case 'ceil':
      return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    case 'trunc':
      return truncate(value, decimals)
    default:
      return roundBankers(value, decimals)
  }
}

/**
 * Redondea un monto monetario a 2 decimales usando redondeo bancario
 * @param amount - Monto a redondear
 * @returns Monto redondeado
 */
export function roundCurrency(amount: number): number {
  return roundBankers(amount, 2)
}

/**
 * Redondea un porcentaje a 2 decimales
 * @param percent - Porcentaje a redondear
 * @returns Porcentaje redondeado
 */
export function roundPercent(percent: number): number {
  return roundBankers(percent, 2)
}

/**
 * Suma un array de números con precisión decimal
 * Evita problemas de punto flotante de JavaScript
 * @param values - Array de valores a sumar
 * @param decimals - Número de decimales (default: 2)
 * @returns Suma redondeada
 */
export function sumPrecise(values: number[], decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals)
  const sum = values.reduce((acc, val) => acc + Math.round(val * multiplier), 0)
  return sum / multiplier
}

/**
 * Multiplica dos números con precisión decimal
 * @param a - Primer factor
 * @param b - Segundo factor
 * @param decimals - Número de decimales (default: 2)
 * @returns Producto redondeado
 */
export function multiplyPrecise(a: number, b: number, decimals: number = 2): number {
  return roundBankers(a * b, decimals)
}

/**
 * Divide dos números con precisión decimal
 * @param a - Dividendo
 * @param b - Divisor
 * @param decimals - Número de decimales (default: 2)
 * @returns Cociente redondeado
 */
export function dividePrecise(a: number, b: number, decimals: number = 2): number {
  if (b === 0) {
    throw new Error('División por cero')
  }
  return roundBankers(a / b, decimals)
}

/**
 * Verifica si dos números son aproximadamente iguales
 * @param a - Primer número
 * @param b - Segundo número
 * @param epsilon - Tolerancia (default: 0.01)
 * @returns true si son aproximadamente iguales
 */
export function approximatelyEquals(a: number, b: number, epsilon: number = 0.01): boolean {
  return Math.abs(a - b) < epsilon
}

/**
 * Verifica si un número es positivo
 * @param value - Valor a verificar
 * @returns true si es positivo
 */
export function isPositive(value: number): boolean {
  return value > 0
}

/**
 * Verifica si un número es negativo
 * @param value - Valor a verificar
 * @returns true si es negativo
 */
export function isNegative(value: number): boolean {
  return value < 0
}

/**
 * Verifica si un número es cero (o muy cercano a cero)
 * @param value - Valor a verificar
 * @param epsilon - Tolerancia (default: 0.0001)
 * @returns true si es cero
 */
export function isZero(value: number, epsilon: number = 0.0001): boolean {
  return Math.abs(value) < epsilon
}

/**
 * Obtiene el valor absoluto
 * @param value - Valor
 * @returns Valor absoluto
 */
export function abs(value: number): number {
  return Math.abs(value)
}

/**
 * Obtiene el máximo de un array de números
 * @param values - Array de valores
 * @returns Valor máximo
 */
export function max(values: number[]): number {
  return Math.max(...values)
}

/**
 * Obtiene el mínimo de un array de números
 * @param values - Array de valores
 * @returns Valor mínimo
 */
export function min(values: number[]): number {
  return Math.min(...values)
}

/**
 * Convierte un número a string con formato de moneda
 * @param value - Valor
 * @param decimals - Número de decimales (default: 2)
 * @returns String formateado
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * Parsea un string a número de forma segura
 * @param value - String a parsear
 * @param defaultValue - Valor por defecto si falla (default: 0)
 * @returns Número parseado
 */
export function safeParseFloat(value: string | number, defaultValue: number = 0): number {
  if (typeof value === 'number') {
    return value
  }

  const parsed = parseFloat(value)
  return Number.isNaN(parsed) ? defaultValue : parsed
}

/**
 * Parsea un string a entero de forma segura
 * @param value - String a parsear
 * @param defaultValue - Valor por defecto si falla (default: 0)
 * @returns Entero parseado
 */
export function safeParseInt(value: string | number, defaultValue: number = 0): number {
  if (typeof value === 'number') {
    return Math.trunc(value)
  }

  const parsed = parseInt(value, 10)
  return Number.isNaN(parsed) ? defaultValue : parsed
}
