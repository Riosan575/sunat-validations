/**
 * SUNAT Catálogo 05 - Tipos de Tributos
 * @see https://cpe.sunat.gob.pe/
 */

import type { CurrencyCode } from './currency.types.js'

/** Códigos del Catálogo 05 - Tipos de Tributos */
export type TaxCode =
  | '1000' // IGV - Impuesto General a las Ventas
  | '1016' // IVAP - Impuesto a las Ventas de Arroz Pilado
  | '2000' // ISC - Impuesto Selectivo al Consumo
  | '7152' // ICBPER - Impuesto al Consumo de Bolsas de Plástico
  | '9995' // Exportación
  | '9996' // Gratuito
  | '9997' // Exonerado
  | '9998' // Inafecto
  | '9999' // Otros

/** Tipo de afectación al IGV */
export type TaxAffection = 'Afecto' | 'Exonerado' | 'Inafecto' | 'Variable'

/** Entidad del Catálogo 05 - Tributo */
export interface Tax {
  /** Código del tributo (Catálogo 05) */
  code: TaxCode
  /** Nombre del tributo */
  name: string
  /** Código UN/ECE 5153 */
  uneceCode: UNECECode5153
  /** Descripción del tributo */
  description: string
  /** Afectación al IGV */
  affection: TaxAffection | null
  /** Tasa aplicable */
  rate: string
  /** Cuándo aplica */
  whenApplies: string
}

/** Códigos UN/ECE 5153 - Tipos de impuestos */
export type UNECECode5153 =
  | 'VAT' // Value Added Tax (Impuesto al Valor Agregado)
  | 'EXC' // Excise Tax (Impuesto Selectivo)
  | 'FRE' // Free (Libre/Exento)
  | 'OTH' // Others (Otros)

/** Códigos UN/ECE 5305 - Categorías de impuestos */
export type UNECECode5305 =
  | 'S' // Standard rate (Tasa estándar)
  | 'Z' // Zero rate (Tasa cero)
  | 'E' // Exempt (Exento)
  | 'AE' // VAT Reverse Charge (Autoliquidación)
  | 'K' // VAT Exempt for EEA
  | 'L' // Canary Islands tax
  | 'M' // Ceuta/Melilla tax
  | 'G' // Export tax (Exportación)
  | 'O' // Services outside scope (Fuera del alcance)
  | 'B' // Transferred (VAT not charged)

/** Información completa del tributo para XML UBL 2.1 */
export interface TaxSchemeUBL {
  /** ID del esquema de impuestos */
  id: TaxCode
  /** Nombre del impuesto */
  name: string
  /** Código de tipo de impuesto (UN/ECE 5153) */
  typeCode: UNECECode5153
}

/** Subtotal de impuesto para XML UBL 2.1 */
export interface TaxSubtotalUBL {
  /** Base imponible */
  taxableAmount: number
  /** Monto del impuesto */
  taxAmount: number
  /** Categoría de impuesto (UN/ECE 5305) */
  categoryCode: UNECECode5305
  /** Porcentaje del impuesto */
  percent: number
  /** Código de razón de exención (Catálogo 07) */
  exemptionReasonCode?: string
  /** Esquema del tributo */
  taxScheme: TaxSchemeUBL
  /** Unidad base (para ICBPER) */
  baseUnitMeasure?: number
  /** Monto por unidad (para ICBPER) */
  perUnitAmount?: number
}

/** Total de impuestos para XML UBL 2.1 */
export interface TaxTotalUBL {
  /** Monto total de impuestos */
  taxAmount: number
  /** Moneda */
  currencyId: CurrencyCode
  /** Subtotales de impuestos */
  subtotals: TaxSubtotalUBL[]
}
