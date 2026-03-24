/**
 * Tipos de moneda y códigos internacionales
 * ISO 4217 Currency Codes
 * UN/ECE Recommendation No. 9
 */

/** Códigos de moneda ISO 4217 más usados en Perú */
export type CurrencyCode =
  | 'PEN' // Sol peruano
  | 'USD' // Dólar estadounidense
  | 'EUR' // Euro
  | 'GBP' // Libra esterlina
  | 'JPY' // Yen japonés
  | 'CAD' // Dólar canadiense
  | 'AUD' // Dólar australiano
  | 'CHF' // Franco suizo
  | 'CNY' // Yuan chino
  | 'MXN' // Peso mexicano
  | 'BRL' // Real brasileño
  | 'CLP' // Peso chileno
  | 'COP' // Peso colombiano
  | 'ARS' // Peso argentino

/** Información de moneda */
export interface Currency {
  /** Código ISO 4217 */
  code: CurrencyCode
  /** Nombre de la moneda */
  name: string
  /** Símbolo */
  symbol: string
  /** Decimales */
  decimals: number
  /** Es moneda nacional peruana */
  isNationalCurrency: boolean
}

/** Códigos de unidad de medida UN/ECE Recommendation 20 */
export type UnitCode =
  | 'NIU' // Unidad (Unit)
  | 'ZZ' // Acuerdo entre partes
  | 'BX' // Caja (Box)
  | 'PK' // Paquete (Package)
  | 'BG' // Bolsa (Bag)
  | 'BO' // Botella (Bottle)
  | 'DZ' // Docena (Dozen)
  | 'GRM' // Gramo (Gram)
  | 'KGM' // Kilogramo (Kilogram)
  | 'LTR' // Litro (Liter)
  | 'MTR' // Metro (Meter)
  | 'MTK' // Metro cuadrado (Square meter)
  | 'MTQ' // Metro cúbico (Cubic meter)
  | 'MMT' // Milímetro (Millimeter)
  | 'CMT' // Centímetro (Centimeter)
  | 'KMT' // Kilómetro (Kilometer)
  | 'HUR' // Hora (Hour)
  | 'DAY' // Día (Day)
  | 'MON' // Mes (Month)
  | 'ANN' // Año (Year)
  | 'SET' // Set (Set)
  | 'PR' // Par (Pair)
  | 'RL' // Rollo (Roll)
  | 'ST' // Hoja (Sheet)
  | 'TB' // Tableta (Tablet)
  | 'UM' // Millón de unidades
  | 'UNI' // Unidad
  | 'GLL' // Galón (Gallon)
  | 'INH' // Pulgada (Inch)
  | 'FOT' // Pie (Foot)
  | 'LBR' // Libra (Pound)
  | 'ONZ' // Onza (Ounce)
  | 'TN' // Tonelada (Ton)

/** Información de unidad de medida */
export interface Unit {
  /** Código UN/ECE 20 */
  code: UnitCode
  /** Nombre */
  name: string
  /** Descripción */
  description: string
  /** Es unidad base */
  isBaseUnit: boolean
}

/** Código de país ISO 3166-1 alpha-2 */
export type CountryCode =
  | 'PE' // Perú
  | 'US' // Estados Unidos
  | 'ES' // España
  | 'MX' // México
  | 'AR' // Argentina
  | 'BR' // Brasil
  | 'CL' // Chile
  | 'CO' // Colombia
  | 'EC' // Ecuador
  | 'VE' // Venezuela
  | 'BO' // Bolivia
  | 'PY' // Paraguay
  | 'UY' // Uruguay
  | 'CN' // China
  | 'JP' // Japón
  | 'KR' // Corea del Sur
  | 'DE' // Alemania
  | 'FR' // Francia
  | 'IT' // Italia
  | 'GB' // Reino Unido
  | 'CA' // Canadá
  | 'AU' // Australia
  | 'CH' // Suiza

/** Información de país */
export interface Country {
  /** Código ISO 3166-1 alpha-2 */
  code: CountryCode
  /** Nombre */
  name: string
  /** Código telefónico */
  phoneCode: string
  /** Es Perú */
  isPeru: boolean
}
