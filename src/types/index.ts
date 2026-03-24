/**
 * Exportación centralizada de tipos
 */

// Catálogos SUNAT
export type { TaxCode, TaxAffection, Tax, UNECECode5153, UNECECode5305, TaxSchemeUBL, TaxSubtotalUBL, TaxTotalUBL } from './tax.types.js'

// Afectación IGV
export type {
  AffectionCode,
  OperationType,
  AffectionCategory,
  Affection,
  AffectionToTaxMap,
  AffectionToRateMap,
} from './affection.types.js'

// Documentos
export type {
  VoucherTypeCode,
  IdentityDocumentCode,
  IdentityDocument,
  VoucherType,
  DocumentValidationResult,
  DocumentErrorCode,
} from './document.types.js'

// Monedas y unidades
export type {
  CurrencyCode,
  Currency,
  UnitCode,
  Unit,
  CountryCode,
  Country,
} from './currency.types.js'

// Factura UBL 2.1
export type {
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
} from './invoice.types.js'

// Comunes
export type {
  ValidationResult,
  RoundingOptions,
  TaxCalculationOptions,
  TaxCalculationResult,
  IcbperConfig,
  TaxRates,
  TaxCalculationType,
  TaxLimits,
} from './common.types.js'

export { SunatValidationError, DEFAULT_TAX_RATES, DEFAULT_TAX_LIMITS } from './common.types.js'
