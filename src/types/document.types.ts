/**
 * Tipos de documentos peruanos
 * Catálogo 01 - Tipo de Comprobante
 * Catálogo 06 - Tipo de Documento de Identidad
 */

/** Códigos del Catálogo 01 - Tipo de Comprobante */
export type VoucherTypeCode =
  | '01' // Factura
  | '02' // Nota de Débito
  | '03' // Boleta de Venta
  | '04' // Liquidación de Compra
  | '05' // Nota de Crédito
  | '06' // Nota de Débito
  | '07' // Nota de Crédito
  | '08' // Nota de Débito
  | '09' // Guía de Remisión Remitente
  | '10' // Guía de Remisión Transportista
  | '11' // Comprobante de Retención
  | '12' // Comprobante de Percepción
  | '13' // Nota de Crédito Especial
  | '14' // Nota de Débito Especial
  | '15' // Nota de Crédito Especial
  | '16' // Nota de Débito Especial
  | '17' // Nota de Crédito Especial
  | '18' // Nota de Débito Especial
  | '19' // Nota de Crédito Especial
  | '20' // Comprobante de Retención Especial
  | '21' // Comprobante de Percepción Especial
  | '22' // Nota de Crédito Especial
  | '23' // Nota de Débito Especial
  | '24' // Nota de Crédito Especial
  | '25' // Nota de Débito Especial
  | '26' // Nota de Crédito Especial
  | '27' // Nota de Débito Especial
  | '28' // Nota de Crédito Especial
  | '29' // Nota de Débito Especial
  | '30' // Nota de Crédito Especial
  | '31' // Nota de Débito Especial
  | '32' // Nota de Crédito Especial
  | '33' // Nota de Débito Especial
  | '34' // Nota de Crédito Especial
  | '35' // Nota de Débito Especial
  | '36' // Nota de Crédito Especial
  | '37' // Nota de Débito Especial
  | '38' // Nota de Crédito Especial
  | '39' // Nota de Débito Especial
  | '40' // Comprobante de Percepción - Venta Interna
  | '41' // Comprobante de Percepción - Venta Interna
  | '42' // Comprobante de Retención - Venta Interna
  | '43' // Comprobante de Retención - Venta Interna
  | '44' // Comprobante de Percepción - Venta Interna
  | '45' // Comprobante de Percepción - Venta Interna
  | '46' // Comprobante de Retención - Venta Interna
  | '47' // Comprobante de Retención - Venta Interna
  | '48' // Comprobante de Percepción - Venta Interna
  | '49' // Comprobante de Percepción - Venta Interna
  | '50' // Guía de Remisión Remitente
  | '51' // Guía de Remisión Transportista
  | '52' // Nota de Crédito
  | '53' // Nota de Débito
  | '54' // Nota de Crédito
  | '55' // Nota de Débito
  | '56' // Documento emitido por bancos e instituciones financieras
  | '87' // Nota de Crédito
  | '88' // Nota de Débito
  | '91' // Comprobante de No Domiciliado
  | '97' // Nota de Crédito Especial
  | '98' // Nota de Débito Especial
  | '99' // Otros

/** Códigos del Catálogo 06 - Tipo de Documento de Identidad */
export type IdentityDocumentCode =
  | '0' // DOC.TRIB.NO.DOM.SIN.RUC
  | '1' // DNI
  | '4' // Carnet de Extranjería
  | '6' // RUC
  | '7' // Pasaporte
  | 'A' // Cédula Diplomática de Identidad
  | 'B' // DOC.IDENT.PAIS.RES.NOR.UBL
  | 'C' // Tax Identification Number (TIN)
  | 'D' // Identification Document (ID)
  | 'E' // TAM
  | 'F' // TAM

/** Entidad de documento de identidad */
export interface IdentityDocument {
  /** Código del documento (Catálogo 06) */
  code: IdentityDocumentCode
  /** Nombre del documento */
  name: string
  /** Longitud mínima */
  minLength: number
  /** Longitud máxima */
  maxLength: number
  /** Requiere dígito verificador */
  requiresCheckDigit: boolean
  /** Patrón de validación (regex) */
  pattern: RegExp | null
}

/** Entidad de comprobante */
export interface VoucherType {
  /** Código del comprobante (Catálogo 01) */
  code: VoucherTypeCode
  /** Nombre del comprobante */
  name: string
  /** Descripción */
  description: string
  /** Requiere RUC del receptor */
  requiresRuc: boolean
  /** Monto mínimo para emisión */
  minAmount: number
  /** Es electrónico */
  isElectronic: boolean
}

/** Resultado de validación de documento */
export interface DocumentValidationResult {
  /** Es válido */
  isValid: boolean
  /** Tipo de documento */
  documentType: IdentityDocumentCode
  /** Número de documento */
  documentNumber: string
  /** Mensaje de error (si aplica) */
  errorMessage?: string
  /** Código de error */
  errorCode?: DocumentErrorCode
}

/** Códigos de error de validación de documentos */
export type DocumentErrorCode =
  | 'INVALID_LENGTH'
  | 'INVALID_FORMAT'
  | 'INVALID_CHECK_DIGIT'
  | 'INVALID_DOCUMENT_TYPE'
  | 'EMPTY_DOCUMENT'
  | 'INVALID_CHARACTERS'
