/**
 * Validadores de documentos SUNAT
 */

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
} from './identity.js'

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
} from './voucher.js'
