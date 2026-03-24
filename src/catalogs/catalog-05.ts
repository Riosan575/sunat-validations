/**
 * SUNAT Catálogo 05 - Tipos de Tributos
 * Datos completos y validadores
 */

import type { Tax, TaxCode, UNECECode5153, UNECECode5305, TaxSchemeUBL } from '../types/index.js'

/** Datos del Catálogo 05 - Tributos */
export const CATALOG_05: readonly Tax[] = [
  {
    code: '1000',
    name: 'IGV',
    uneceCode: 'VAT',
    description: 'Impuesto General a las Ventas',
    affection: 'Afecto',
    rate: '18.00% (16% IGV + 2% IPM)',
    whenApplies: 'Operaciones gravadas - venta local de bienes y servicios',
  },
  {
    code: '1016',
    name: 'IVAP',
    uneceCode: 'VAT',
    description: 'Impuesto a las Ventas de Arroz Pilado',
    affection: 'Afecto',
    rate: '4.00%',
    whenApplies: 'Venta de arroz pilado en el mercado local',
  },
  {
    code: '2000',
    name: 'ISC',
    uneceCode: 'EXC',
    description: 'Impuesto Selectivo al Consumo',
    affection: null,
    rate: 'Variable según producto',
    whenApplies: 'Productos específicos (alcohol, tabaco, combustibles, vehículos)',
  },
  {
    code: '7152',
    name: 'ICBPER',
    uneceCode: 'OTH',
    description: 'Impuesto al Consumo de Bolsas de Plástico',
    affection: null,
    rate: 'S/ 0.50 por unidad (2024)',
    whenApplies: 'Consumo de bolsas de plástico - aplica por unidad',
  },
  {
    code: '9995',
    name: 'Exportación',
    uneceCode: 'FRE',
    description: 'Derechos de exportación',
    affection: 'Exonerado',
    rate: '0.00%',
    whenApplies: 'Exportación de bienes y servicios al extranjero',
  },
  {
    code: '9996',
    name: 'Gratuito',
    uneceCode: 'FRE',
    description: 'Transferencia gratuita',
    affection: 'Exonerado',
    rate: '0.00%',
    whenApplies: 'Transferencias gratuitas (premios, donaciones, bonificaciones, muestras)',
  },
  {
    code: '9997',
    name: 'Exonerado',
    uneceCode: 'VAT',
    description: 'Operación exonerada del IGV',
    affection: 'Exonerado',
    rate: '0.00%',
    whenApplies: 'Operaciones exoneradas por ley (libros, alimentos básicos, servicios médicos)',
  },
  {
    code: '9998',
    name: 'Inafecto',
    uneceCode: 'FRE',
    description: 'Operación inafecta del IGV',
    affection: 'Inafecto',
    rate: '0.00%',
    whenApplies: 'Operaciones inafectas (transporte público, servicios financieros, educación)',
  },
  {
    code: '9999',
    name: 'Otros',
    uneceCode: 'OTH',
    description: 'Otros conceptos de pago',
    affection: 'Variable',
    rate: 'Variable',
    whenApplies: 'Otros tributos o contribuciones no especificados',
  },
] as const

/** Mapeo de código de tributo a entidad */
export const TAX_BY_CODE: Partial<Record<TaxCode, Tax>> = {
  '1000': CATALOG_05[0],
  '1016': CATALOG_05[1],
  '2000': CATALOG_05[2],
  '7152': CATALOG_05[3],
  '9995': CATALOG_05[4],
  '9996': CATALOG_05[5],
  '9997': CATALOG_05[6],
  '9998': CATALOG_05[7],
  '9999': CATALOG_05[8],
}

/** Códigos de tributo válidos */
export const VALID_TAX_CODES: readonly TaxCode[] = ['1000', '1016', '2000', '7152', '9995', '9996', '9997', '9998', '9999']

/** Mapeo de código de tributo a código UN/ECE 5153 */
export const TAX_TO_UNECE_5153: Record<TaxCode, UNECECode5153> = {
  '1000': 'VAT',
  '1016': 'VAT',
  '2000': 'EXC',
  '7152': 'OTH',
  '9995': 'FRE',
  '9996': 'FRE',
  '9997': 'VAT',
  '9998': 'FRE',
  '9999': 'OTH',
}

/** Mapeo de código de tributo a nombre corto */
export const TAX_SHORT_NAMES: Record<TaxCode, string> = {
  '1000': 'IGV',
  '1016': 'IVAP',
  '2000': 'ISC',
  '7152': 'ICBPER',
  '9995': 'EXP',
  '9996': 'GRA',
  '9997': 'EXO',
  '9998': 'INA',
  '9999': 'OTH',
}

/**
 * Verifica si un código de tributo es válido
 * @param code - Código del tributo
 * @returns true si es válido
 */
export function isValidTaxCode(code: string): code is TaxCode {
  return VALID_TAX_CODES.includes(code as TaxCode)
}

/**
 * Obtiene la información de un tributo por su código
 * @param code - Código del tributo
 * @returns Información del tributo o undefined
 */
export function getTaxByCode(code: string): Tax | undefined {
  return TAX_BY_CODE[code as TaxCode]
}

/**
 * Obtiene el código UN/ECE 5153 de un tributo
 * @param taxCode - Código del tributo
 * @returns Código UN/ECE 5153
 */
export function getUneceCode5153(taxCode: TaxCode): UNECECode5153 {
  return TAX_TO_UNECE_5153[taxCode]
}

/**
 * Obtiene el nombre corto de un tributo
 * @param taxCode - Código del tributo
 * @returns Nombre corto
 */
export function getTaxShortName(taxCode: TaxCode): string {
  return TAX_SHORT_NAMES[taxCode]
}

/**
 * Crea un esquema de tributo para XML UBL 2.1
 * @param taxCode - Código del tributo
 * @returns Esquema de tributo UBL
 */
export function createTaxSchemeUBL(taxCode: TaxCode): TaxSchemeUBL {
  const tax = getTaxByCode(taxCode)
  if (!tax) {
    throw new Error(`Invalid tax code: ${taxCode}`)
  }

  return {
    id: taxCode,
    name: getTaxShortName(taxCode),
    typeCode: tax.uneceCode,
  }
}

/**
 * Obtiene la tasa de un tributo como número
 * @param taxCode - Código del tributo
 * @returns Tasa como decimal (0.18 para 18%)
 */
export function getTaxRate(taxCode: TaxCode): number {
  const rates: Record<TaxCode, number> = {
    '1000': 0.18, // 18%
    '1016': 0.04, // 4%
    '2000': 0, // Variable
    '7152': 0.50, // S/ 0.50 por unidad
    '9995': 0, // 0%
    '9996': 0, // 0%
    '9997': 0, // 0%
    '9998': 0, // 0%
    '9999': 0, // Variable
  }
  return rates[taxCode]
}

/**
 * Verifica si un tributo requiere cálculo por porcentaje
 * @param taxCode - Código del tributo
 * @returns true si es por porcentaje
 */
export function isPercentageTax(taxCode: TaxCode): boolean {
  return taxCode === '1000' || taxCode === '1016'
}

/**
 * Verifica si un tributo es de tipo ICBPER (por unidad)
 * @param taxCode - Código del tributo
 * @returns true si es ICBPER
 */
export function isUnitTax(taxCode: TaxCode): boolean {
  return taxCode === '7152'
}

/**
 * Obtiene todos los tributos que aplican IGV
 * @returns Array de códigos de tributo
 */
export function getIgvApplicableTaxes(): TaxCode[] {
  return ['1000', '1016', '9997']
}

/**
 * Obtiene los códigos UN/ECE 5305 por código de afectación
 * @param affectionCode - Código de afectación (Catálogo 07)
 * @returns Código UN/ECE 5305
 */
export function getUneceCode5305ByAffection(affectionCode: string): UNECECode5305 {
  // Gravado
  if (['10', '11', '12', '13', '14', '15', '16', '17'].includes(affectionCode)) {
    return 'S' // Standard rate
  }
  // Exonerado
  if (['20', '21'].includes(affectionCode)) {
    return 'E' // Exempt
  }
  // Inafecto
  if (['30', '31', '32', '33', '34', '35', '36', '37'].includes(affectionCode)) {
    return 'Z' // Zero rate
  }
  // Exportación
  if (affectionCode === '40') {
    return 'G' // Export
  }
  // Default
  return 'O' // Others
}

/**
 * Valida un código de tributo y retorna información detallada
 * @param code - Código del tributo
 * @returns Resultado de validación
 */
export function validateTaxCode(code: string): {
  isValid: boolean
  tax?: Tax
  errorMessage?: string
} {
  if (!code) {
    return { isValid: false, errorMessage: 'El código de tributo es requerido' }
  }

  if (!isValidTaxCode(code)) {
    return { isValid: false, errorMessage: `Código de tributo inválido: ${code}` }
  }

  const tax = getTaxByCode(code)
  return { isValid: true, tax }
}
