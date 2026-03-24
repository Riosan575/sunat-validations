/**
 * SUNAT Validations - Librería de validaciones para facturación electrónica Perú
 *
 * @packageDocumentation
 *
 * Esta librería proporciona validaciones completas para:
 * - Catálogo 05: Tipos de Tributos (IGV, IVAP, ISC, ICBPER, etc.)
 * - Catálogo 07: Tipos de Afectación del IGV
 * - Documentos de identidad (RUC, DNI, Pasaporte, etc.)
 * - Tipos de comprobante (Factura, Boleta, Notas, etc.)
 * - Cálculo de impuestos (IGV, IVAP, ISC, ICBPER)
 * - Utilidades de redondeo bancario
 *
 * @example
 * ```typescript
 * import { validateRuc, calculateTax, isValidAffectionCode } from 'sunat-validations'
 *
 * // Validar RUC
 * const rucResult = validateRuc('20123456789')
 * console.log(rucResult.isValid) // true o false
 *
 * // Calcular impuestos
 * const tax = calculateTax(100, '10') // IGV 18%
 * console.log(tax.taxAmount) // 18.00
 *
 * // Validar código de afectación
 * console.log(isValidAffectionCode('10')) // true
 * ```
 */

// ============================================================
// CATÁLOGOS SUNAT
// ============================================================

// Catálogo 05 - Tributos
export {
  CATALOG_05,
  TAXES,
  TAX_BY_CODE,
  VALID_TAX_CODES,
  TAX_TO_UNECE_5153,
  TAX_SHORT_NAMES,
  isValidTaxCode,
  getTaxByCode,
  getUneceCode5153,
  getTaxShortName,
  createTaxSchemeUBL,
  getTaxRate,
  isPercentageTax,
  isUnitTax,
  getIgvApplicableTaxes,
  getUneceCode5305ByAffection,
  validateTaxCode,
} from './catalogs/catalog-05.js'

// Catálogo 07 - Afectación IGV
export {
  CATALOG_07,
  IGV_TYPES,
  AFFECTION_BY_CODE,
  VALID_AFFECTION_CODES,
  GRAVADO_CODES,
  EXONERADO_CODES,
  INAFECTO_CODES,
  EXPORTACION_CODES,
  GRATUITA_CODES,
  AFFECTION_TO_TAX_MAP,
  AFFECTION_TO_RATE_MAP,
  AFFECTION_TO_UNECE_5305,
  isValidAffectionCode,
  getAffectionByCode,
  getTaxCodeByAffection,
  getRateByAffection,
  getUnece5305ByAffection,
  getAffectionCategory,
  isGravado,
  isExonerado,
  isInafecto,
  isExportacion,
  isGratuita,
  isOnerosa,
  validateAffectionTaxMatch,
  getAffectionsByCategory,
  validateAffectionCode,
} from './catalogs/catalog-07.js'

// ============================================================
// DOCUMENTOS
// ============================================================

// Validadores de identidad
export {
  IDENTITY_DOCUMENTS,
  VALID_IDENTITY_CODES,
  isValidIdentityCode,
  getIdentityDocument,
  calculateRucCheckDigit,
  validateRuc,
  calculateDniCheckDigit,
  validateDni,
  validatePassport,
  validateCarnetExtranjeria,
  validateDocument,
  getRucFromDni,
  getDniFromRuc,
  isRucPersonaNatural,
  isRucEmpresa,
  getRucContribuyenteType,
  formatRuc,
  formatDni,
} from './documents/identity.js'

// Validadores de comprobantes
export {
  VOUCHER_TYPES,
  VALID_VOUCHER_CODES,
  isValidVoucherCode,
  getVoucherType,
  isValidSerie,
  isValidCorrelationNumber,
  validateInvoiceNumber,
  requiresRuc,
  getAppropriateVoucherType,
} from './documents/voucher.js'

// ============================================================
// IMPUESTOS
// ============================================================

// Calculadoras
export {
  IGV_RATE,
  IVAP_RATE,
  ICBPER_RATE,
  ISC_RATES,
  calculateIgv,
  calculateIvap,
  calculateIcbper,
  calculateIsc,
  addTax,
  removeTax,
  calculateBaseFromIgv,
  extractIgvFromPrice,
  calculateTax,
  calculateIgvTax,
  calculateIvapTax,
  calculateExoneradoTax,
  calculateInafectoTax,
  calculateExportacionTax,
  validateTaxConsistency,
  calculateFreeOperationTax,
  distributeProportionally,
  getTaxRateByCode,
  calculateUnitPriceWithTax,
} from './taxes/calculator.js'

// Validadores de impuestos
export {
  validateTaxAmount,
  validateTaxAffectionConsistency,
  validateInvoiceTotal,
  validateIgvRate,
  validateIvapRate,
  validateFreeOperation,
  validateExportation,
  validateTaxPercent,
} from './taxes/validators.js'

// ============================================================
// UTILIDADES
// ============================================================

// Redondeo y matemáticas
export {
  roundBankers,
  roundHalfUp,
  roundHalfDown,
  truncate,
  round,
  roundCurrency,
  roundPercent,
  sumPrecise,
  multiplyPrecise,
  dividePrecise,
  approximatelyEquals,
  isPositive,
  isNegative,
  isZero,
  abs,
  max,
  min,
  formatNumber,
  safeParseFloat,
  safeParseInt,
} from './utils/rounding.js'

// ============================================================
// TIPOS
// ============================================================

// Re-exportar todos los tipos
export type {
  // Tributos
  TaxCode,
  TaxAffection,
  Tax,
  UNECECode5153,
  UNECECode5305,
  TaxSchemeUBL,
  TaxSubtotalUBL,
  TaxTotalUBL,
  // Afectación
  AffectionCode,
  OperationType,
  AffectionCategory,
  Affection,
  AffectionToTaxMap,
  AffectionToRateMap,
  // Documentos
  VoucherTypeCode,
  IdentityDocumentCode,
  IdentityDocument,
  VoucherType,
  DocumentValidationResult,
  DocumentErrorCode,
  // Monedas y unidades
  CurrencyCode,
  Currency,
  UnitCode,
  Unit,
  CountryCode,
  Country,
  // Factura UBL 2.1
  InvoiceTypeCode,
  InvoiceLine,
  InvoiceTaxTotal,
  InvoiceTaxSubtotal,
  InvoicePricingAlternative,
  InvoiceTotals,
  InvoiceParty,
  InvoiceAddress,
  InvoiceHeader,
  InvoiceDocumentReference,
  Invoice,
  InvoiceValidationResult,
  InvoiceValidationError,
  InvoiceValidationWarning,
  // Comunes
  ValidationResult,
  RoundingOptions,
  TaxCalculationOptions,
  TaxCalculationResult,
  IcbperConfig,
  TaxRates,
  TaxCalculationType,
  TaxLimits,
} from './types/index.js'

// Clases y constantes
export { SunatValidationError, DEFAULT_TAX_RATES, DEFAULT_TAX_LIMITS } from './types/common.types.js'

// ============================================================
// VERSIÓN
// ============================================================

/** Versión de la librería */
export const VERSION = '1.0.0'
