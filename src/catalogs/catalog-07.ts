/**
 * SUNAT Catálogo 07 - Tipos de Afectación del IGV
 * Datos completos y validadores
 */

import type { Affection, AffectionCode, AffectionCategory, TaxCode } from '../types/index.js'

/** Datos del Catálogo 07 - Afectación IGV */
export const CATALOG_07: readonly Affection[] = [
  // === GRAVADO ===
  {
    code: '10',
    description: 'Gravado - Operación Onerosa',
    operationType: 'Gravada',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'S',
  },
  {
    code: '11',
    description: 'Gravado - Retiro por premio',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '12',
    description: 'Gravado - Retiro por donación',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '13',
    description: 'Gravado - Retiro',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '14',
    description: 'Gravado - Retiro por publicidad',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '15',
    description: 'Gravado - Bonificaciones',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '16',
    description: 'Gravado - Retiro por entrega a trabajadores',
    operationType: 'Gravada/Gratuita',
    relatedTaxCode: '1000',
    rate: '18%',
    category: 'GRAVADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'S',
  },
  {
    code: '17',
    description: 'Gravado - IVAP',
    operationType: 'Gravada',
    relatedTaxCode: '1016',
    rate: '4%',
    category: 'GRAVADO',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'S',
  },
  // === EXONERADO ===
  {
    code: '20',
    description: 'Exonerado - Operación Onerosa',
    operationType: 'Exonerada',
    relatedTaxCode: '9997',
    rate: '0%',
    category: 'EXONERADO',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'E',
  },
  {
    code: '21',
    description: 'Exonerado - Transferencia Gratuita',
    operationType: 'Exonerada/Gratuita',
    relatedTaxCode: '9997',
    rate: '0%',
    category: 'EXONERADO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'E',
  },
  // === INAFECTO ===
  {
    code: '30',
    description: 'Inafecto - Operación Onerosa',
    operationType: 'Inafecta',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'Z',
  },
  {
    code: '31',
    description: 'Inafecto - Retiro por Bonificación',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '32',
    description: 'Inafecto - Retiro',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '33',
    description: 'Inafecto - Retiro por Muestras Médicas',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '34',
    description: 'Inafecto - Retiro por Convenio Colectivo',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '35',
    description: 'Inafecto - Retiro por funciones de representación',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '36',
    description: 'Inafecto - Retiro por entrega a trabajadores',
    operationType: 'Inafecta/Gratuita',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: true,
    isOnerous: false,
    uneceCategoryCode: 'Z',
  },
  {
    code: '37',
    description: 'Inafecto - Exportación de servicios',
    operationType: 'Inafecta/Exportacion',
    relatedTaxCode: '9998',
    rate: '0%',
    category: 'INAFECTO',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'Z',
  },
  // === EXPORTACIÓN ===
  {
    code: '40',
    description: 'Exportación de Bienes',
    operationType: 'Exportacion',
    relatedTaxCode: '9995',
    rate: '0%',
    category: 'EXPORTACION',
    isFree: false,
    isOnerous: true,
    uneceCategoryCode: 'G',
  },
] as const

/** Mapeo de código de afectación a entidad */
export const AFFECTION_BY_CODE: Record<AffectionCode, Affection> = Object.fromEntries(
  CATALOG_07.map((a) => [a.code, a])
) as Record<AffectionCode, Affection>

/** Códigos de afectación válidos */
export const VALID_AFFECTION_CODES: readonly AffectionCode[] = CATALOG_07.map((a) => a.code)

/** Códigos de afectación gravados */
export const GRAVADO_CODES: readonly AffectionCode[] = ['10', '11', '12', '13', '14', '15', '16', '17']

/** Códigos de afectación exonerados */
export const EXONERADO_CODES: readonly AffectionCode[] = ['20', '21']

/** Códigos de afectación inafectos */
export const INAFECTO_CODES: readonly AffectionCode[] = ['30', '31', '32', '33', '34', '35', '36', '37']

/** Códigos de afectación de exportación */
export const EXPORTACION_CODES: readonly AffectionCode[] = ['40']

/** Códigos de operaciones gratuitas */
export const GRATUITA_CODES: readonly AffectionCode[] = ['11', '12', '13', '14', '15', '16', '21', '31', '32', '33', '34', '35', '36']

/** Mapeo de código de afectación a código de tributo */
export const AFFECTION_TO_TAX_MAP: Record<AffectionCode, TaxCode> = {
  '10': '1000',
  '11': '1000',
  '12': '1000',
  '13': '1000',
  '14': '1000',
  '15': '1000',
  '16': '1000',
  '17': '1016',
  '20': '9997',
  '21': '9997',
  '30': '9998',
  '31': '9998',
  '32': '9998',
  '33': '9998',
  '34': '9998',
  '35': '9998',
  '36': '9998',
  '37': '9998',
  '40': '9995',
}

/** Mapeo de código de afectación a tasa */
export const AFFECTION_TO_RATE_MAP: Record<AffectionCode, number> = {
  '10': 0.18,
  '11': 0.18,
  '12': 0.18,
  '13': 0.18,
  '14': 0.18,
  '15': 0.18,
  '16': 0.18,
  '17': 0.04,
  '20': 0,
  '21': 0,
  '30': 0,
  '31': 0,
  '32': 0,
  '33': 0,
  '34': 0,
  '35': 0,
  '36': 0,
  '37': 0,
  '40': 0,
}

/** Mapeo de código de afectación a código UN/ECE 5305 */
export const AFFECTION_TO_UNECE_5305: Record<AffectionCode, string> = {
  '10': 'S',
  '11': 'S',
  '12': 'S',
  '13': 'S',
  '14': 'S',
  '15': 'S',
  '16': 'S',
  '17': 'S',
  '20': 'E',
  '21': 'E',
  '30': 'Z',
  '31': 'Z',
  '32': 'Z',
  '33': 'Z',
  '34': 'Z',
  '35': 'Z',
  '36': 'Z',
  '37': 'Z',
  '40': 'G',
}

/**
 * Verifica si un código de afectación es válido
 * @param code - Código de afectación
 * @returns true si es válido
 */
export function isValidAffectionCode(code: string): code is AffectionCode {
  return VALID_AFFECTION_CODES.includes(code as AffectionCode)
}

/**
 * Obtiene la información de una afectación por su código
 * @param code - Código de afectación
 * @returns Información de la afectación o undefined
 */
export function getAffectionByCode(code: string): Affection | undefined {
  return AFFECTION_BY_CODE[code as AffectionCode]
}

/**
 * Obtiene el código de tributo asociado a una afectación
 * @param affectionCode - Código de afectación
 * @returns Código de tributo
 */
export function getTaxCodeByAffection(affectionCode: AffectionCode): TaxCode {
  return AFFECTION_TO_TAX_MAP[affectionCode]
}

/**
 * Obtiene la tasa asociada a una afectación
 * @param affectionCode - Código de afectación
 * @returns Tasa como decimal
 */
export function getRateByAffection(affectionCode: AffectionCode): number {
  return AFFECTION_TO_RATE_MAP[affectionCode]
}

/**
 * Obtiene el código UN/ECE 5305 asociado a una afectación
 * @param affectionCode - Código de afectación
 * @returns Código UN/ECE 5305
 */
export function getUnece5305ByAffection(affectionCode: AffectionCode): string {
  return AFFECTION_TO_UNECE_5305[affectionCode]
}

/**
 * Obtiene la categoría de una afectación
 * @param code - Código de afectación
 * @returns Categoría (GRAVADO, EXONERADO, INAFECTO, EXPORTACION)
 */
export function getAffectionCategory(code: AffectionCode): AffectionCategory {
  const affection = getAffectionByCode(code)
  return affection?.category ?? 'INAFECTO'
}

/**
 * Verifica si una afectación es de tipo gravado
 * @param code - Código de afectación
 * @returns true si es gravado
 */
export function isGravado(code: AffectionCode): boolean {
  return GRAVADO_CODES.includes(code)
}

/**
 * Verifica si una afectación es de tipo exonerado
 * @param code - Código de afectación
 * @returns true si es exonerado
 */
export function isExonerado(code: AffectionCode): boolean {
  return EXONERADO_CODES.includes(code)
}

/**
 * Verifica si una afectación es de tipo inafecto
 * @param code - Código de afectación
 * @returns true si es inafecto
 */
export function isInafecto(code: AffectionCode): boolean {
  return INAFECTO_CODES.includes(code)
}

/**
 * Verifica si una afectación es de tipo exportación
 * @param code - Código de afectación
 * @returns true si es exportación
 */
export function isExportacion(code: AffectionCode): boolean {
  return EXPORTACION_CODES.includes(code)
}

/**
 * Verifica si una afectación corresponde a una operación gratuita
 * @param code - Código de afectación
 * @returns true si es gratuita
 */
export function isGratuita(code: AffectionCode): boolean {
  return GRATUITA_CODES.includes(code)
}

/**
 * Verifica si una afectación corresponde a una operación onerosa
 * @param code - Código de afectación
 * @returns true si es onerosa
 */
export function isOnerosa(code: AffectionCode): boolean {
  const affection = getAffectionByCode(code)
  return affection?.isOnerous ?? false
}

/**
 * Valida que el código de afectación coincida con el código de tributo
 * @param affectionCode - Código de afectación
 * @param taxCode - Código de tributo
 * @returns true si coinciden
 */
export function validateAffectionTaxMatch(affectionCode: AffectionCode, taxCode: TaxCode): boolean {
  const expectedTaxCode = getTaxCodeByAffection(affectionCode)
  return expectedTaxCode === taxCode
}

/**
 * Obtiene las afectaciones por categoría
 * @param category - Categoría
 * @returns Array de códigos de afectación
 */
export function getAffectionsByCategory(category: AffectionCategory): AffectionCode[] {
  const maps: Record<AffectionCategory, readonly AffectionCode[]> = {
    GRAVADO: GRAVADO_CODES,
    EXONERADO: EXONERADO_CODES,
    INAFECTO: INAFECTO_CODES,
    EXPORTACION: EXPORTACION_CODES,
  }
  return [...maps[category]]
}

/**
 * Valida un código de afectación y retorna información detallada
 * @param code - Código de afectación
 * @returns Resultado de validación
 */
export function validateAffectionCode(code: string): {
  isValid: boolean
  affection?: Affection
  errorMessage?: string
} {
  if (!code) {
    return { isValid: false, errorMessage: 'El código de afectación es requerido' }
  }

  if (!isValidAffectionCode(code)) {
    return { isValid: false, errorMessage: `Código de afectación inválido: ${code}` }
  }

  const affection = getAffectionByCode(code)
  return { isValid: true, affection }
}
