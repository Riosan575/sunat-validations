# SUNAT Validations

Librería robusta para validaciones de facturación electrónica SUNAT Perú. Soporta UBL 2.1, Catálogos 05 y 07, validación de documentos peruanos, y cálculo de impuestos.

## 🚀 Características

- ✅ **Catálogo 05 - Tributos**: IGV, IVAP, ISC, ICBPER, Exportación, Exonerado, Inafecto
- ✅ **Catálogo 07 - Afectación IGV**: Todos los códigos de afectación (10-40)
- ✅ **Validación de Documentos**: RUC, DNI, Pasaporte, Carnet de Extranjería
- ✅ **Cálculo de Impuestos**: IGV (18%), IVAP (4%), ISC, ICBPER
- ✅ **Redondeo Bancario**: Implementación correcta según especificaciones SUNAT
- ✅ **Códigos UN/ECE**: Soporte para códigos 5153 y 5305
- ✅ **TypeScript**: Tipos completos para mejor DX
- ✅ **Tree-shakeable**: Importa solo lo que necesitas
- ✅ **Zero Dependencies**: Sin dependencias externas

## 📦 Instalación

```bash
npm install sunat-validations
```

```bash
yarn add sunat-validations
```

```bash
pnpm add sunat-validations
```

## 📖 Uso

### Importación

```typescript
// Importar todo
import { validateRuc, calculateTax, isValidAffectionCode } from 'sunat-validations'

// Importar por módulo (tree-shaking)
import { validateRuc } from 'sunat-validations/documents'
import { calculateTax } from 'sunat-validations/taxes'
import { CATALOG_05 } from 'sunat-validations/catalogs'
```

### Validación de RUC

```typescript
import { validateRuc, formatRuc, isRucPersonaNatural } from 'sunat-validations'

// Validar RUC
const result = validateRuc('20123456789')
console.log(result.isValid) // true
console.log(result.documentType) // '6'

// Formatear RUC
console.log(formatRuc('20123456789')) // '20-12345678-9'

// Verificar tipo de contribuyente
console.log(isRucPersonaNatural('10123456789')) // true
```

### Validación de DNI

```typescript
import { validateDni, formatDni, getRucFromDni } from 'sunat-validations'

// Validar DNI
const result = validateDni('12345678')
console.log(result.isValid) // true

// Formatear DNI
console.log(formatDni('12345678')) // '12.345.678'

// Generar RUC a partir de DNI
const ruc = getRucFromDni('12345678', '10')
console.log(ruc) // '10123456780'
```

### Cálculo de Impuestos

```typescript
import {
  calculateTax,
  calculateIgv,
  calculateIcbper,
  addTax,
  removeTax
} from 'sunat-validations'

// Calcular impuesto completo
const tax = calculateTax(100, '10') // IGV 18%
console.log(tax)
// {
//   taxableAmount: 100,
//   taxAmount: 18,
//   total: 118,
//   rate: 0.18,
//   affectionCode: '10',
//   taxCode: '1000',
//   currencyId: 'PEN'
// }

// Calcular solo IGV
const igv = calculateIgv(100) // 18

// Calcular ICBPER (bolsas plásticas)
const icbper = calculateIcbper(10) // 5.00 (10 bolsas × S/ 0.50)

// Agregar IGV a un precio
const priceWithTax = addTax(100, 0.18) // 118

// Quitar IGV de un precio
const priceWithoutTax = removeTax(118, 0.18) // 100
```

### Catálogo 05 - Tributos

```typescript
import {
  isValidTaxCode,
  getTaxByCode,
  CATALOG_05,
  getTaxRate
} from 'sunat-validations'

// Verificar código de tributo
console.log(isValidTaxCode('1000')) // true (IGV)

// Obtener información del tributo
const igv = getTaxByCode('1000')
console.log(igv)
// {
//   code: '1000',
//   name: 'IGV',
//   uneceCode: 'VAT',
//   description: 'Impuesto General a las Ventas',
//   affection: 'Afecto',
//   rate: '18.00% (16% IGV + 2% IPM)',
//   whenApplies: 'Operaciones gravadas - venta local de bienes y servicios'
// }

// Obtener tasa
console.log(getTaxRate('1000')) // 0.18
console.log(getTaxRate('1016')) // 0.04 (IVAP)
```

### Catálogo 07 - Afectación IGV

```typescript
import {
  isValidAffectionCode,
  getAffectionByCode,
  isGravado,
  isExonerado,
  isInafecto,
  isExportacion,
  isGratuita
} from 'sunat-validations'

// Verificar código de afectación
console.log(isValidAffectionCode('10')) // true

// Obtener información
const affection = getAffectionByCode('10')
console.log(affection)
// {
//   code: '10',
//   description: 'Gravado - Operación Onerosa',
//   operationType: 'Gravada',
//   relatedTaxCode: '1000',
//   rate: '18%',
//   category: 'GRAVADO',
//   isFree: false,
//   isOnerous: true,
//   uneceCategoryCode: 'S'
// }

// Verificar categoría
console.log(isGravado('10')) // true
console.log(isExonerado('20')) // true
console.log(isInafecto('30')) // true
console.log(isExportacion('40')) // true
console.log(isGratuita('11')) // true
```

### Redondeo Bancario

```typescript
import {
  roundBankers,
  roundCurrency,
  sumPrecise,
  approximatelyEquals
} from 'sunat-validations'

// Redondeo bancario (round half even)
console.log(roundBankers(2.5, 0)) // 2 (par)
console.log(roundBankers(3.5, 0)) // 4 (par)

// Redondeo de moneda
console.log(roundCurrency(100.125)) // 100.12

// Suma precisa (evita errores de punto flotante)
console.log(sumPrecise([0.1, 0.2, 0.3])) // 0.6

// Comparación aproximada
console.log(approximatelyEquals(1.0, 1.009, 0.01)) // true
```

### Validación de Impuestos

```typescript
import {
  validateTaxAmount,
  validateTaxAffectionConsistency,
  validateInvoiceTotal
} from 'sunat-validations'

// Validar monto de impuesto
const result1 = validateTaxAmount(100, 18, '10')
console.log(result1.isValid) // true

// Validar consistencia tributo-afectación
const result2 = validateTaxAffectionConsistency('1000', '10')
console.log(result2.isValid) // true

// Validar total de factura
const result3 = validateInvoiceTotal(100, 18, 118)
console.log(result3.isValid) // true
```

## 📚 API Reference

### Catálogo 05 - Tributos

| Código | Nombre | Tasa | UN/ECE 5153 |
|--------|--------|------|-------------|
| 1000 | IGV | 18% | VAT |
| 1016 | IVAP | 4% | VAT |
| 2000 | ISC | Variable | EXC |
| 7152 | ICBPER | S/ 0.50/unidad | OTH |
| 9995 | Exportación | 0% | FRE |
| 9996 | Gratuito | 0% | FRE |
| 9997 | Exonerado | 0% | VAT |
| 9998 | Inafecto | 0% | FRE |
| 9999 | Otros | Variable | OTH |

### Catálogo 07 - Afectación IGV

| Código | Descripción | Categoría | Tasa |
|--------|-------------|-----------|------|
| 10 | Gravado - Operación Onerosa | GRAVADO | 18% |
| 11-16 | Gravado - Gratuito | GRAVADO | 18% |
| 17 | Gravado - IVAP | GRAVADO | 4% |
| 20-21 | Exonerado | EXONERADO | 0% |
| 30-37 | Inafecto | INAFECTO | 0% |
| 40 | Exportación | EXPORTACION | 0% |

## 🔧 Configuración

### TypeScript

La librería incluye tipos TypeScript completos. No requiere configuración adicional.

```typescript
import type {
  TaxCode,
  AffectionCode,
  TaxCalculationResult,
  DocumentValidationResult
} from 'sunat-validations'
```

### Tree-shaking

La librería soporta tree-shaking. Importa solo lo que necesitas:

```typescript
// ✅ Bueno - Solo importa lo necesario
import { validateRuc } from 'sunat-validations'

// ✅ También bueno - Importar desde subpath
import { calculateTax } from 'sunat-validations/taxes'
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar cobertura
npm run test:coverage
```

## 📄 Licencia

MIT © 2024

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, lee las guías de contribución antes de enviar un PR.

1. Fork el repositorio
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📋 Referencias

- [SUNAT - Facturación Electrónica](https://cpe.sunat.gob.pe/)
- [Catálogo No. 05 - Tipos de Tributos](https://cpe.sunat.gob.pe/)
- [Catálogo No. 07 - Tipos de Afectación del IGV](https://cpe.sunat.gob.pe/)
- [UBL 2.1 Specification](http://UBL.xml.org/)
- [UN/ECE Code Lists](https://unece.org/trade/cefact/UNLOCODE-Download)
