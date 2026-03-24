/**
 * Validadores de documentos de identidad peruanos
 * RUC, DNI, Carnet de Extranjería, Pasaporte, etc.
 */

import type { DocumentValidationResult, IdentityDocument, IdentityDocumentCode } from '../types/index.js'

/** Información de tipos de documento de identidad */
export const IDENTITY_DOCUMENTS: Record<IdentityDocumentCode, IdentityDocument> = {
  '0': {
    code: '0',
    name: 'DOC.TRIB.NO.DOM.SIN.RUC',
    minLength: 1,
    maxLength: 15,
    requiresCheckDigit: false,
    pattern: null,
  },
  '1': {
    code: '1',
    name: 'DNI',
    minLength: 8,
    maxLength: 8,
    requiresCheckDigit: true,
    pattern: /^\d{8}$/,
  },
  '4': {
    code: '4',
    name: 'Carnet de Extranjería',
    minLength: 8,
    maxLength: 12,
    requiresCheckDigit: false,
    pattern: /^[A-Za-z0-9]{8,12}$/,
  },
  '6': {
    code: '6',
    name: 'RUC',
    minLength: 11,
    maxLength: 11,
    requiresCheckDigit: true,
    pattern: /^\d{11}$/,
  },
  '7': {
    code: '7',
    name: 'Pasaporte',
    minLength: 4,
    maxLength: 12,
    requiresCheckDigit: false,
    pattern: /^[A-Za-z0-9]{4,12}$/,
  },
  A: {
    code: 'A',
    name: 'Cédula Diplomática de Identidad',
    minLength: 8,
    maxLength: 12,
    requiresCheckDigit: false,
    pattern: /^[A-Za-z0-9]{8,12}$/,
  },
  B: {
    code: 'B',
    name: 'DOC.IDENT.PAIS.RES.NOR.UBL',
    minLength: 1,
    maxLength: 20,
    requiresCheckDigit: false,
    pattern: null,
  },
  C: {
    code: 'C',
    name: 'Tax Identification Number (TIN)',
    minLength: 1,
    maxLength: 30,
    requiresCheckDigit: false,
    pattern: null,
  },
  D: {
    code: 'D',
    name: 'Identification Document (ID)',
    minLength: 1,
    maxLength: 30,
    requiresCheckDigit: false,
    pattern: null,
  },
  E: {
    code: 'E',
    name: 'TAM',
    minLength: 8,
    maxLength: 12,
    requiresCheckDigit: false,
    pattern: /^[A-Za-z0-9]{8,12}$/,
  },
  F: {
    code: 'F',
    name: 'TAM',
    minLength: 8,
    maxLength: 12,
    requiresCheckDigit: false,
    pattern: /^[A-Za-z0-9]{8,12}$/,
  },
}

/** Códigos válidos de tipo de documento */
export const VALID_IDENTITY_CODES: readonly IdentityDocumentCode[] = [
  '0',
  '1',
  '4',
  '6',
  '7',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]

/**
 * Verifica si un código de tipo de documento es válido
 * @param code - Código del tipo de documento
 * @returns true si es válido
 */
export function isValidIdentityCode(code: string): code is IdentityDocumentCode {
  return VALID_IDENTITY_CODES.includes(code as IdentityDocumentCode)
}

/**
 * Obtiene la información de un tipo de documento
 * @param code - Código del tipo de documento
 * @returns Información del documento o undefined
 */
export function getIdentityDocument(code: string): IdentityDocument | undefined {
  return IDENTITY_DOCUMENTS[code as IdentityDocumentCode]
}

/**
 * Calcula el dígito verificador de un RUC
 * @param ruc - Número de RUC (11 dígitos)
 * @returns Dígito verificador calculado
 */
export function calculateRucCheckDigit(ruc: string): number {
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  const rucDigits = ruc.substring(0, 10)

  let sum = 0
  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(rucDigits[i] ?? '0', 10) * (weights[i] ?? 0)
  }

  const remainder = sum % 11
  const checkDigit = 11 - remainder

  if (checkDigit === 10) return 0
  if (checkDigit === 11) return 1
  return checkDigit
}

/**
 * Valida un número de RUC
 * @param ruc - Número de RUC
 * @returns Resultado de validación
 */
export function validateRuc(ruc: string): DocumentValidationResult {
  // Verificar que no esté vacío
  if (!ruc) {
    return {
      isValid: false,
      documentType: '6',
      documentNumber: ruc,
      errorMessage: 'El RUC es requerido',
      errorCode: 'EMPTY_DOCUMENT',
    }
  }

  // Verificar longitud
  if (ruc.length !== 11) {
    return {
      isValid: false,
      documentType: '6',
      documentNumber: ruc,
      errorMessage: 'El RUC debe tener 11 dígitos',
      errorCode: 'INVALID_LENGTH',
    }
  }

  // Verificar que solo contenga números
  if (!/^\d+$/.test(ruc)) {
    return {
      isValid: false,
      documentType: '6',
      documentNumber: ruc,
      errorMessage: 'El RUC solo debe contener números',
      errorCode: 'INVALID_CHARACTERS',
    }
  }

  // Verificar que empiece con 10, 15, 17 o 20
  const validPrefixes = ['10', '15', '17', '20']
  const prefix = ruc.substring(0, 2)
  if (!validPrefixes.includes(prefix)) {
    return {
      isValid: false,
      documentType: '6',
      documentNumber: ruc,
      errorMessage: 'El RUC debe empezar con 10, 15, 17 o 20',
      errorCode: 'INVALID_FORMAT',
    }
  }

  // Verificar dígito verificador
  const providedCheckDigit = parseInt(ruc.substring(10, 11), 10)
  const calculatedCheckDigit = calculateRucCheckDigit(ruc)

  if (providedCheckDigit !== calculatedCheckDigit) {
    return {
      isValid: false,
      documentType: '6',
      documentNumber: ruc,
      errorMessage: 'El dígito verificador del RUC es incorrecto',
      errorCode: 'INVALID_CHECK_DIGIT',
    }
  }

  return {
    isValid: true,
    documentType: '6',
    documentNumber: ruc,
  }
}

/**
 * Calcula el dígito verificador de un DNI
 * @param _dni - Número de DNI (8 dígitos)
 * @returns Dígito verificador calculado (no usado oficialmente, solo para validación interna)
 */
export function calculateDniCheckDigit(_dni: string): number {
  // El DNI no tiene dígito verificador oficial,
  // pero podemos hacer validaciones básicas
  return 0
}

/**
 * Valida un número de DNI
 * @param dni - Número de DNI
 * @returns Resultado de validación
 */
export function validateDni(dni: string): DocumentValidationResult {
  // Verificar que no esté vacío
  if (!dni) {
    return {
      isValid: false,
      documentType: '1',
      documentNumber: dni,
      errorMessage: 'El DNI es requerido',
      errorCode: 'EMPTY_DOCUMENT',
    }
  }

  // Verificar longitud
  if (dni.length !== 8) {
    return {
      isValid: false,
      documentType: '1',
      documentNumber: dni,
      errorMessage: 'El DNI debe tener 8 dígitos',
      errorCode: 'INVALID_LENGTH',
    }
  }

  // Verificar que solo contenga números
  if (!/^\d+$/.test(dni)) {
    return {
      isValid: false,
      documentType: '1',
      documentNumber: dni,
      errorMessage: 'El DNI solo debe contener números',
      errorCode: 'INVALID_CHARACTERS',
    }
  }

  // Verificar que no empiece con 0
  if (dni.startsWith('0')) {
    return {
      isValid: false,
      documentType: '1',
      documentNumber: dni,
      errorMessage: 'El DNI no puede empezar con 0',
      errorCode: 'INVALID_FORMAT',
    }
  }

  return {
    isValid: true,
    documentType: '1',
    documentNumber: dni,
  }
}

/**
 * Valida un pasaporte
 * @param passport - Número de pasaporte
 * @returns Resultado de validación
 */
export function validatePassport(passport: string): DocumentValidationResult {
  if (!passport) {
    return {
      isValid: false,
      documentType: '7',
      documentNumber: passport,
      errorMessage: 'El pasaporte es requerido',
      errorCode: 'EMPTY_DOCUMENT',
    }
  }

  if (passport.length < 4 || passport.length > 12) {
    return {
      isValid: false,
      documentType: '7',
      documentNumber: passport,
      errorMessage: 'El pasaporte debe tener entre 4 y 12 caracteres',
      errorCode: 'INVALID_LENGTH',
    }
  }

  if (!/^[A-Za-z0-9]+$/.test(passport)) {
    return {
      isValid: false,
      documentType: '7',
      documentNumber: passport,
      errorMessage: 'El pasaporte solo debe contener letras y números',
      errorCode: 'INVALID_CHARACTERS',
    }
  }

  return {
    isValid: true,
    documentType: '7',
    documentNumber: passport,
  }
}

/**
 * Valida un carnet de extranjería
 * @param ce - Número de carnet de extranjería
 * @returns Resultado de validación
 */
export function validateCarnetExtranjeria(ce: string): DocumentValidationResult {
  if (!ce) {
    return {
      isValid: false,
      documentType: '4',
      documentNumber: ce,
      errorMessage: 'El carnet de extranjería es requerido',
      errorCode: 'EMPTY_DOCUMENT',
    }
  }

  if (ce.length < 8 || ce.length > 12) {
    return {
      isValid: false,
      documentType: '4',
      documentNumber: ce,
      errorMessage: 'El carnet de extranjería debe tener entre 8 y 12 caracteres',
      errorCode: 'INVALID_LENGTH',
    }
  }

  if (!/^[A-Za-z0-9]+$/.test(ce)) {
    return {
      isValid: false,
      documentType: '4',
      documentNumber: ce,
      errorMessage: 'El carnet de extranjería solo debe contener letras y números',
      errorCode: 'INVALID_CHARACTERS',
    }
  }

  return {
    isValid: true,
    documentType: '4',
    documentNumber: ce,
  }
}

/**
 * Valida un documento genérico según su tipo
 * @param documentNumber - Número de documento
 * @param documentType - Tipo de documento
 * @returns Resultado de validación
 */
export function validateDocument(documentNumber: string, documentType: IdentityDocumentCode): DocumentValidationResult {
  // Verificar tipo de documento válido
  if (!isValidIdentityCode(documentType)) {
    return {
      isValid: false,
      documentType: documentType,
      documentNumber: documentNumber,
      errorMessage: `Tipo de documento inválido: ${documentType}`,
      errorCode: 'INVALID_DOCUMENT_TYPE',
    }
  }

  // Validar según tipo
  switch (documentType) {
    case '1':
      return validateDni(documentNumber)
    case '6':
      return validateRuc(documentNumber)
    case '7':
      return validatePassport(documentNumber)
    case '4':
      return validateCarnetExtranjeria(documentNumber)
    default: {
      // Validación genérica para otros tipos
      const docInfo = getIdentityDocument(documentType)
      if (!docInfo) {
        return {
          isValid: false,
          documentType: documentType,
          documentNumber: documentNumber,
          errorMessage: 'Tipo de documento no soportado',
          errorCode: 'INVALID_DOCUMENT_TYPE',
        }
      }

      if (!documentNumber) {
        return {
          isValid: false,
          documentType: documentType,
          documentNumber: documentNumber,
          errorMessage: 'El número de documento es requerido',
          errorCode: 'EMPTY_DOCUMENT',
        }
      }

      if (documentNumber.length < docInfo.minLength || documentNumber.length > docInfo.maxLength) {
        return {
          isValid: false,
          documentType: documentType,
          documentNumber: documentNumber,
          errorMessage: `El documento debe tener entre ${docInfo.minLength} y ${docInfo.maxLength} caracteres`,
          errorCode: 'INVALID_LENGTH',
        }
      }

      if (docInfo.pattern && !docInfo.pattern.test(documentNumber)) {
        return {
          isValid: false,
          documentType: documentType,
          documentNumber: documentNumber,
          errorMessage: 'El formato del documento es inválido',
          errorCode: 'INVALID_FORMAT',
        }
      }

      return {
        isValid: true,
        documentType: documentType,
        documentNumber: documentNumber,
      }
    }
  }
}

/**
 * Obtiene el RUC a partir del DNI
 * @param dni - Número de DNI
 * @param prefix - Prefijo del RUC (10 = persona natural, 20 = empresa)
 * @returns RUC generado o null si el DNI es inválido
 */
export function getRucFromDni(dni: string, prefix: '10' | '15' | '17' | '20' = '10'): string | null {
  const dniValidation = validateDni(dni)
  if (!dniValidation.isValid) {
    return null
  }

  // El RUC se forma con el prefijo + DNI + dígito verificador
  const rucBase = prefix + dni
  const checkDigit = calculateRucCheckDigit(rucBase + '0')
  return rucBase + checkDigit.toString()
}

/**
 * Obtiene el DNI a partir del RUC (solo para RUC de persona natural)
 * @param ruc - Número de RUC
 * @returns DNI extraído o null si no es un RUC de persona natural
 */
export function getDniFromRuc(ruc: string): string | null {
  const rucValidation = validateRuc(ruc)
  if (!rucValidation.isValid) {
    return null
  }

  // Solo RUC que empiezan con 10 son de persona natural
  const prefix = ruc.substring(0, 2)
  if (prefix !== '10') {
    return null
  }

  return ruc.substring(2, 10)
}

/**
 * Verifica si un RUC es de persona natural
 * @param ruc - Número de RUC
 * @returns true si es persona natural
 */
export function isRucPersonaNatural(ruc: string): boolean {
  const prefix = ruc.substring(0, 2)
  return prefix === '10'
}

/**
 * Verifica si un RUC es de empresa
 * @param ruc - Número de RUC
 * @returns true si es empresa
 */
export function isRucEmpresa(ruc: string): boolean {
  const prefix = ruc.substring(0, 2)
  return ['15', '17', '20'].includes(prefix)
}

/**
 * Obtiene el tipo de contribuyente según el RUC
 * @param ruc - Número de RUC
 * @returns Tipo de contribuyente
 */
export function getRucContribuyenteType(ruc: string): 'PERSONA_NATURAL' | 'EMPRESA' | 'INVALIDO' {
  const validation = validateRuc(ruc)
  if (!validation.isValid) {
    return 'INVALIDO'
  }

  if (isRucPersonaNatural(ruc)) {
    return 'PERSONA_NATURAL'
  }

  return 'EMPRESA'
}

/**
 * Formatea un RUC con separadores
 * @param ruc - Número de RUC
 * @returns RUC formateado
 */
export function formatRuc(ruc: string): string {
  if (ruc.length !== 11) return ruc
  return `${ruc.substring(0, 2)}-${ruc.substring(2, 10)}-${ruc.substring(10, 11)}`
}

/**
 * Formatea un DNI con separadores
 * @param dni - Número de DNI
 * @returns DNI formateado
 */
export function formatDni(dni: string): string {
  if (dni.length !== 8) return dni
  return `${dni.substring(0, 2)}.${dni.substring(2, 5)}.${dni.substring(5, 8)}`
}
