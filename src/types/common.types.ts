/**
 * Tipos comunes y utilidades
 */

/** Resultado genérico de validación */
export interface ValidationResult {
  /** Es válido */
  isValid: boolean
  /** Mensaje de error (si aplica) */
  errorMessage?: string
  /** Código de error */
  errorCode?: string
  /** Datos adicionales */
  data?: Record<string, unknown>
}

/** Opciones de redondeo */
export interface RoundingOptions {
  /** Número de decimales (default: 2) */
  decimals?: number
  /** Método de redondeo */
  method?: 'bankers' | 'half-up' | 'half-down' | 'floor' | 'ceil' | 'trunc'
}

/** Configuración de cálculo de impuestos */
export interface TaxCalculationOptions {
  /** Incluir impuesto en el precio */
  taxIncluded?: boolean
  /** Número de decimales para redondeo */
  decimals?: number
  /** Método de redondeo */
  roundingMethod?: RoundingOptions['method']
}

/** Resultado de cálculo de impuestos */
export interface TaxCalculationResult {
  /** Base imponible */
  taxableAmount: number
  /** Monto del impuesto */
  taxAmount: number
  /** Total (base + impuesto) */
  total: number
  /** Tasa aplicada */
  rate: number
  /** Código de afectación */
  affectionCode: string
  /** Código de tributo */
  taxCode: string
  /** Moneda */
  currencyId: string
}

/** Configuración de ICBPER */
export interface IcbperConfig {
  /** Año de vigencia */
  year: number
  /** Tasa por unidad en PEN */
  ratePerUnit: number
}

/** Tasas de impuestos vigentes */
export interface TaxRates {
  /** IGV - 18% */
  igv: number
  /** IVAP - 4% */
  ivap: number
  /** ICBPER por bolsa */
  icbper: number
}

/** Error personalizado de SUNAT */
export class SunatValidationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly field?: string,
    public readonly value?: unknown
  ) {
    super(message)
    this.name = 'SunatValidationError'
  }
}

/** Tipo de cálculo de impuesto */
export type TaxCalculationType = 'IGV' | 'IVAP' | 'ISC' | 'ICBPER'

/** Configuración de límites */
export interface TaxLimits {
  /** Monto máximo para boleta */
  maxBoletaAmount: number
  /** Monto mínimo para factura */
  minFacturaAmount: number
}

/** Configuración por defecto de tasas */
export const DEFAULT_TAX_RATES: TaxRates = {
  igv: 0.18, // 18%
  ivap: 0.04, // 4%
  icbper: 0.50, // S/ 0.50 por bolsa (2024)
}

/** Configuración por defecto de límites */
export const DEFAULT_TAX_LIMITS: TaxLimits = {
  maxBoletaAmount: 700, // S/ 700
  minFacturaAmount: 0, // Sin mínimo
}
