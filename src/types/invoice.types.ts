/**
 * Tipos de factura electrónica UBL 2.1
 * Basado en especificaciones SUNAT
 */

import type { CurrencyCode, UnitCode } from './currency.types.js'
import type { IdentityDocumentCode, VoucherTypeCode } from './document.types.js'
import type { AffectionCode, TaxCode } from './index.js'

/** Tipo de factura electrónica */
export type InvoiceTypeCode =
  | '01' // Factura
  | '03' // Boleta de Venta
  | '07' // Nota de Crédito
  | '08' // Nota de Débito
  | '09' // Guía de Remisión
  | '20' // Comprobante de Retención
  | '40' // Comprobante de Percepción - Venta Interna

/** Línea de factura */
export interface InvoiceLine {
  /** ID de la línea */
  id: string
  /** Cantidad */
  quantity: number
  /** Unidad de medida */
  unitCode: UnitCode
  /** Descripción del ítem */
  description: string
  /** Código del producto */
  itemCode?: string
  /** Precio unitario (sin impuesto) */
  unitPrice: number
  /** Precio unitario (con impuesto) */
  unitPriceWithTax?: number
  /** Valor de venta (sin impuesto) */
  lineExtensionAmount: number
  /** Código de afectación IGV */
  affectionCode: AffectionCode
  /** Impuestos de la línea */
  taxTotal: InvoiceTaxTotal
  /** Total de línea */
  pricingAlternative?: InvoicePricingAlternative
}

/** Total de impuestos en factura */
export interface InvoiceTaxTotal {
  /** Monto total de impuestos */
  taxAmount: number
  /** Moneda */
  currencyId: CurrencyCode
  /** Subtotales por tipo de impuesto */
  taxSubtotals: InvoiceTaxSubtotal[]
}

/** Subtotal de impuesto */
export interface InvoiceTaxSubtotal {
  /** Base imponible */
  taxableAmount: number
  /** Monto del impuesto */
  taxAmount: number
  /** Código de categoría UN/ECE 5305 */
  categoryCode: string
  /** Porcentaje */
  percent: number
  /** Código de razón de exención (Catálogo 07) */
  exemptionReasonCode: AffectionCode
  /** Código de tributo (Catálogo 05) */
  taxSchemeId: TaxCode
  /** Nombre del tributo */
  taxSchemeName: string
  /** Código de tipo de tributo UN/ECE 5153 */
  taxSchemeTypeCode: string
  /** Unidad base (para ICBPER) */
  baseUnitMeasure?: number
  /** Monto por unidad (para ICBPER) */
  perUnitAmount?: number
}

/** Alternativa de precio */
export interface InvoicePricingAlternative {
  /** Precio de referencia */
  priceAmount: number
  /** Moneda */
  currencyId: CurrencyCode
}

/** Totales de factura */
export interface InvoiceTotals {
  /** Total valor de venta (sin impuestos) */
  lineExtensionAmount: number
  /** Total operaciones gravadas */
  taxableOperations: number
  /** Total operaciones exoneradas */
  exemptOperations: number
  /** Total operaciones inafectas */
  unaffectedOperations: number
  /** Total operaciones gratuitas */
  freeOperations: number
  /** Total IGV */
  totalIgv: number
  /** Total ISC */
  totalIsc: number
  /** Total IVAP */
  totalIvap: number
  /** Total ICBPER */
  totalIcbper: number
  /** Total otros tributos */
  totalOtherTaxes: number
  /** Total impuestos */
  totalTaxAmount: number
  /** Importe total de la venta */
  payableAmount: number
  /** Moneda */
  currencyId: CurrencyCode
}

/** Parte relacionada (emisor/receptor) */
export interface InvoiceParty {
  /** Tipo de documento */
  documentType: IdentityDocumentCode
  /** Número de documento */
  documentNumber: string
  /** Razón social / Nombre */
  legalName: string
  /** Nombre comercial */
  tradingName?: string
  /** Dirección */
  address?: InvoiceAddress
  /** Correo electrónico */
  email?: string
  /** Teléfono */
  phone?: string
}

/** Dirección */
export interface InvoiceAddress {
  /** Ubigeo (código de ubicación) */
  ubigeo: string
  /** Dirección completa */
  streetName: string
  /** Urbanización */
  urbanization?: string
  /** Departamento */
  countrySubentity: string
  /** Provincia */
  city?: string
  /** Distrito */
  district?: string
  /** Código de país */
  countryCode: string
}

/** Encabezado de factura */
export interface InvoiceHeader {
  /** Tipo de comprobante */
  invoiceTypeCode: InvoiceTypeCode
  /** Serie */
  serie: string
  /** Correlativo */
  correlationNumber: number
  /** Número completo (serie-correlativo) */
  invoiceNumber: string
  /** Fecha de emisión */
  issueDate: string
  /** Fecha de vencimiento */
  dueDate?: string
  /** Hora de emisión */
  issueTime?: string
  /** Tipo de moneda */
  documentCurrencyCode: CurrencyCode
  /** Orden de compra */
  purchaseOrderReference?: string
  /** Documento relacionado (para notas) */
  additionalDocumentReference?: InvoiceDocumentReference
}

/** Referencia a documento */
export interface InvoiceDocumentReference {
  /** Tipo de documento */
  documentTypeCode: VoucherTypeCode
  /** Número de documento */
  documentNumber: string
  /** Serie del documento */
  serie: string
}

/** Factura completa */
export interface Invoice {
  /** Encabezado */
  header: InvoiceHeader
  /** Emisor */
  supplier: InvoiceParty
  /** Receptor */
  customer: InvoiceParty
  /** Líneas */
  lines: InvoiceLine[]
  /** Totales */
  totals: InvoiceTotals
  /** Impuestos totales */
  taxTotal: InvoiceTaxTotal
}

/** Resultado de validación de factura */
export interface InvoiceValidationResult {
  /** Es válida */
  isValid: boolean
  /** Errores encontrados */
  errors: InvoiceValidationError[]
  /** Advertencias */
  warnings: InvoiceValidationWarning[]
  /** Factura validada */
  invoice?: Invoice
}

/** Error de validación de factura */
export interface InvoiceValidationError {
  /** Código de error */
  code: string
  /** Mensaje */
  message: string
  /** Campo afectado */
  field: string
  /** Valor incorrecto */
  value?: unknown
  /** Línea afectada */
  lineId?: string
}

/** Advertencia de validación */
export interface InvoiceValidationWarning {
  /** Código */
  code: string
  /** Mensaje */
  message: string
  /** Campo */
  field: string
  /** Valor */
  value?: unknown
}
