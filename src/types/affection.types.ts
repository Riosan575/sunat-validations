/**
 * SUNAT Catálogo 07 - Tipos de Afectación del IGV
 * @see https://cpe.sunat.gob.pe/
 */

/** Códigos del Catálogo 07 - Afectación del IGV */
export type AffectionCode =
  // Gravado
  | '10' // Gravado - Operación Onerosa
  | '11' // Gravado - Retiro por premio
  | '12' // Gravado - Retiro por donación
  | '13' // Gravado - Retiro
  | '14' // Gravado - Retiro por publicidad
  | '15' // Gravado - Bonificaciones
  | '16' // Gravado - Retiro por entrega a trabajadores
  | '17' // Gravado - IVAP
  // Exonerado
  | '20' // Exonerado - Operación Onerosa
  | '21' // Exonerado - Transferencia Gratuita
  // Inafecto
  | '30' // Inafecto - Operación Onerosa
  | '31' // Inafecto - Retiro por Bonificación
  | '32' // Inafecto - Retiro
  | '33' // Inafecto - Retiro por Muestras Médicas
  | '34' // Inafecto - Retiro por Convenio Colectivo
  | '35' // Inafecto - Retiro por funciones de representación
  | '36' // Inafecto - Retiro por entrega a trabajadores
  | '37' // Inafecto - Exportación de servicios
  // Exportación
  | '40' // Exportación de Bienes

/** Tipo de operación */
export type OperationType =
  | 'Gravada'
  | 'Gravada/Gratuita'
  | 'Exonerada'
  | 'Exonerada/Gratuita'
  | 'Inafecta'
  | 'Inafecta/Gratuita'
  | 'Inafecta/Exportacion'
  | 'Exportacion'

/** Categoría general de afectación */
export type AffectionCategory = 'GRAVADO' | 'EXONERADO' | 'INAFECTO' | 'EXPORTACION'

/** Entidad del Catálogo 07 - Afectación IGV */
export interface Affection {
  /** Código de afectación (Catálogo 07) */
  code: AffectionCode
  /** Descripción */
  description: string
  /** Tipo de operación */
  operationType: OperationType
  /** Tributo asociado (Catálogo 05) */
  relatedTaxCode: string
  /** Tasa aplicable */
  rate: string
  /** Categoría general */
  category: AffectionCategory
  /** Es operación gratuita */
  isFree: boolean
  /** Es operación onerosa */
  isOnerous: boolean
  /** Código UN/ECE 5305 asociado */
  uneceCategoryCode: string
}

/** Mapeo de códigos de afectación a códigos de tributo */
export type AffectionToTaxMap = {
  [K in AffectionCode]: string
}

/** Mapeo de códigos de afectación a tasas */
export type AffectionToRateMap = {
  [K in AffectionCode]: number
}
