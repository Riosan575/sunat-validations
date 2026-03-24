/**
 * Validadores de tipos de comprobante
 * Catálogo 01 - Tipo de Comprobante
 */

import type { VoucherType, VoucherTypeCode } from '../types/index.js'

/** Información de tipos de comprobante */
export const VOUCHER_TYPES: Record<string, VoucherType> = {
  '01': {
    code: '01',
    name: 'Factura',
    description: 'Factura electrónica',
    requiresRuc: true,
    minAmount: 0,
    isElectronic: true,
  },
  '03': {
    code: '03',
    name: 'Boleta de Venta',
    description: 'Boleta de venta electrónica',
    requiresRuc: false,
    minAmount: 0,
    isElectronic: true,
  },
  '07': {
    code: '07',
    name: 'Nota de Crédito',
    description: 'Nota de crédito electrónica',
    requiresRuc: false,
    minAmount: 0,
    isElectronic: true,
  },
  '08': {
    code: '08',
    name: 'Nota de Débito',
    description: 'Nota de débito electrónica',
    requiresRuc: false,
    minAmount: 0,
    isElectronic: true,
  },
  '09': {
    code: '09',
    name: 'Guía de Remisión',
    description: 'Guía de remisión electrónica',
    requiresRuc: false,
    minAmount: 0,
    isElectronic: true,
  },
  '20': {
    code: '20',
    name: 'Comprobante de Retención',
    description: 'Comprobante de retención electrónica',
    requiresRuc: true,
    minAmount: 0,
    isElectronic: true,
  },
  '40': {
    code: '40',
    name: 'Comprobante de Percepción',
    description: 'Comprobante de percepción - Venta interna',
    requiresRuc: true,
    minAmount: 0,
    isElectronic: true,
  },
}

/** Códigos válidos de tipo de comprobante */
export const VALID_VOUCHER_CODES: readonly VoucherTypeCode[] = [
  '01',
  '03',
  '07',
  '08',
  '09',
  '20',
  '40',
]

/**
 * Verifica si un código de tipo de comprobante es válido
 * @param code - Código del tipo de comprobante
 * @returns true si es válido
 */
export function isValidVoucherCode(code: string): boolean {
  return code in VOUCHER_TYPES
}

/**
 * Obtiene la información de un tipo de comprobante
 * @param code - Código del tipo de comprobante
 * @returns Información del comprobante o undefined
 */
export function getVoucherType(code: string): VoucherType | undefined {
  return VOUCHER_TYPES[code]
}

/**
 * Valida el número de serie de un comprobante
 * @param serie - Número de serie
 * @param voucherType - Tipo de comprobante
 * @returns true si es válido
 */
export function isValidSerie(serie: string, voucherType: VoucherTypeCode): boolean {
  if (!serie || serie.length !== 4) {
    return false
  }

  // Verificar formato
  switch (voucherType) {
    case '01': // Factura
      return /^F\d{3}$/.test(serie)
    case '03': // Boleta
      return /^B\d{3}$/.test(serie)
    case '07': // Nota de Crédito
      return /^[FB]\d{3}$/.test(serie)
    case '08': // Nota de Débito
      return /^[FB]\d{3}$/.test(serie)
    case '09': // Guía de Remisión
      return /^T\d{3}$/.test(serie) || /^V\d{3}$/.test(serie)
    case '20': // Retención
      return /^R\d{3}$/.test(serie)
    case '40': // Percepción
      return /^P\d{3}$/.test(serie)
    default:
      return false
  }
}

/**
 * Valida el número correlativo de un comprobante
 * @param correlationNumber - Número correlativo
 * @returns true si es válido
 */
export function isValidCorrelationNumber(correlationNumber: string | number): boolean {
  const num = typeof correlationNumber === 'string' ? correlationNumber : correlationNumber.toString()
  return /^\d{1,8}$/.test(num) && parseInt(num, 10) > 0
}

/**
 * Valida el número completo de comprobante (serie-correlativo)
 * @param invoiceNumber - Número de comprobante
 * @param voucherType - Tipo de comprobante
 * @returns Resultado de validación
 */
export function validateInvoiceNumber(
  invoiceNumber: string,
  voucherType: VoucherTypeCode
): {
  isValid: boolean
  serie?: string
  correlationNumber?: string
  errorMessage?: string
} {
  if (!invoiceNumber) {
    return { isValid: false, errorMessage: 'El número de comprobante es requerido' }
  }

  const parts = invoiceNumber.split('-')
  if (parts.length !== 2) {
    return { isValid: false, errorMessage: 'El formato debe ser SERIE-CORRELATIVO' }
  }

  const [serie, correlationNumber] = parts

  if (!serie || !isValidSerie(serie, voucherType)) {
    return { isValid: false, errorMessage: `La serie ${serie} no es válida para el tipo de comprobante` }
  }

  if (!isValidCorrelationNumber(correlationNumber ?? '')) {
    return { isValid: false, errorMessage: 'El correlativo debe ser un número de hasta 8 dígitos' }
  }

  return {
    isValid: true,
    serie,
    correlationNumber,
  }
}

/**
 * Determina si se requiere RUC según el tipo de comprobante y monto
 * @param voucherType - Tipo de comprobante
 * @param amount - Monto de la operación
 * @returns true si se requiere RUC
 */
export function requiresRuc(voucherType: VoucherTypeCode, amount: number): boolean {
  // Factura siempre requiere RUC
  if (voucherType === '01') {
    return true
  }

  // Boleta requiere RUC si el monto es mayor a S/ 700
  if (voucherType === '03' && amount > 700) {
    return true
  }

  // Otros comprobantes
  const voucher = getVoucherType(voucherType)
  return voucher?.requiresRuc ?? false
}

/**
 * Obtiene el tipo de comprobante apropiado según el documento del cliente y monto
 * @param clientDocumentType - Tipo de documento del cliente
 * @param _amount - Monto de la operación
 * @returns Código de tipo de comprobante apropiado
 */
export function getAppropriateVoucherType(
  clientDocumentType: '1' | '4' | '6' | '7' | '0',
  _amount: number
): VoucherTypeCode {
  // RUC = Factura
  if (clientDocumentType === '6') {
    return '01'
  }

  // Otros documentos o monto <= 700 = Boleta
  return '03'
}
