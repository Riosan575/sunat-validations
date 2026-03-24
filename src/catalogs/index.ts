/**
 * Exportación de catálogos SUNAT
 */

// Catálogo 05 - Tributos
export {
  CATALOG_05,
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
} from './catalog-05.js'

// Catálogo 07 - Afectación IGV
export {
  CATALOG_07,
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
} from './catalog-07.js'
