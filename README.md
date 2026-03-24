# SUNAT Validations

<div align="center">

[![npm version](https://img.shields.io/npm/v/sunat-validations.svg?style=flat-square)](https://www.npmjs.com/package/sunat-validations)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green?style=flat-square)](https://nodejs.org/)

**Librería robusta para validaciones de facturación electrónica SUNAT Perú**

Soporta UBL 2.1, Catálogos 05 y 07, validación de documentos peruanos, y cálculo de impuestos.

[Instalación](#-instalación) • [Uso](#-uso) • [API Reference](#-api-reference) • [Ejemplos](#-ejemplos-reales)

</div>

---

## 🚀 Características

- ✅ **Catálogo 05 - Tributos**: IGV, IVAP, ISC, ICBPER, Exportación, Exonerado, Inafecto
- ✅ **Catálogo 07 - Afectación IGV**: Todos los códigos de afectación (10-40)
- ✅ **Documentos de Identidad**: 11 tipos de documentos soportados
- ✅ **Cálculo de Impuestos**: IGV (18%), IVAP (4%), ISC, ICBPER (S/ 0.50)
- ✅ **Redondeo Bancario**: Implementación correcta según especificaciones SUNAT
- ✅ **Códigos UN/ECE**: Soporte para códigos 5153 y 5305
- ✅ **TypeScript**: Tipos completos para mejor DX
- ✅ **Tree-shakeable**: Importa solo lo que necesitas
- ✅ **Zero Dependencies**: Sin dependencias externas
- ✅ **UBL 2.1**: Generación de esquemas XML

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
// Importar funciones específicas
import { validateRuc, calculateTax, isValidAffectionCode } from 'sunat-validations'

// Importar catálogos con nombres cortos
import { TAXES, IGV_TYPES, IDENTITY_DOCUMENTS } from 'sunat-validations'

// Ejemplo: Acceder a los datos de tributos
const igv = TAXES.find(t => t.code === '1000')
console.log(igv.name) // 'IGV'

// Ejemplo: Acceder a los tipos de afectación IGV
const gravado = IGV_TYPES['10']
console.log(gravado.description) // 'Gravado - Operación Onerosa'
```

### Validación de RUC

```typescript
import { validateRuc, isRucEmpresa, isRucPersonaNatural } from 'sunat-validations'

// Validar RUC
const result = validateRuc('20123456789')
console.log(result.isValid) // true

// Verificar tipo de contribuyente
console.log(isRucEmpresa('20123456789')) // true (empieza con 20)
console.log(isRucPersonaNatural('10123456789')) // true (empieza con 10)

// Obtener RUC desde DNI
const ruc = getRucFromDni('12345678')
console.log(ruc) // '10123456781'
```

### Validación de DNI

```typescript
import { validateDni, calculateDniCheckDigit } from 'sunat-validations'

// Validar DNI
const result = validateDni('12345678')
console.log(result.isValid) // true

// Calcular dígito verificador
const dv = calculateDniCheckDigit('1234567')
console.log(dv) // 0
```

### Cálculo de Impuestos

```typescript
import { calculateTax, calculateIgv, calculateIvap, calculateIcbper } from 'sunat-validations'

// Calcular impuesto completo (retorna objeto con todos los datos)
const tax = calculateTax(100, '10') // IGV 18%
console.log(tax)
// {
//   taxableAmount: 100,    // Base imponible
//   taxAmount: 18,         // Monto del impuesto
//   total: 118,            // Total con impuesto
//   rate: 0.18,            // Tasa (18%)
//   affectionCode: '10',   // Código de afectación
//   taxCode: '1000',       // Código de tributo
//   currencyId: 'PEN'      // Moneda
// }

// Calcular solo IGV
const igv = calculateIgv(100) // 18

// Calcular IVAP (arroz pilado)
const ivap = calculateIvap(100) // 4

// Calcular ICBPER (bolsas plásticas)
const icbper = calculateIcbper(10) // 5.00 (10 bolsas × S/ 0.50)
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
  isGratuita,
  isOnerosa
} from 'sunat-validations'

// Verificar código de afectación
console.log(isValidAffectionCode('10')) // true

// Obtener información completa
const affection = getAffectionByCode('10')
console.log(affection)

// Verificar categoría
console.log(isGravado('10')) // true
console.log(isExonerado('20')) // true
console.log(isInafecto('30')) // true
console.log(isExportacion('40')) // true
console.log(isGratuita('11')) // true (operación gratuita)
console.log(isOnerosa('10')) // true (operación onerosa)
```

### Documentos de Identidad

```typescript
import { getIdentityDocument, isValidIdentityCode, IDENTITY_DOCUMENTS } from 'sunat-validations'

// Obtener información del documento
const dni = getIdentityDocument('1')
console.log(dni)
// {
//   code: '1',
//   name: 'DNI',
//   minLength: 8,
//   maxLength: 8,
//   requiresCheckDigit: true
// }

const ce = getIdentityDocument('4')
console.log(ce.name) // 'Carnet de Extranjería'

// Validar código de documento
console.log(isValidIdentityCode('1')) // true (DNI)
console.log(isValidIdentityCode('4')) // true (Carnet de Extranjería)
console.log(isValidIdentityCode('6')) // true (RUC)
```

### Códigos UN/ECE

```typescript
import { getUneceCode5153, getUneceCode5305ByAffection } from 'sunat-validations'

// Obtener código UN/ECE 5153 (tipo de tributo)
console.log(getUneceCode5153('1000')) // 'VAT' (IGV)
console.log(getUneceCode5153('2000')) // 'EXC' (ISC)
console.log(getUneceCode5153('7152')) // 'OTH' (ICBPER)
console.log(getUneceCode5153('9995')) // 'FRE' (Exportación)

// Obtener código UN/ECE 5305 por afectación
console.log(getUneceCode5305ByAffection('10')) // Código para gravado
```

### Generación UBL 2.1

```typescript
import { createTaxSchemeUBL } from 'sunat-validations'

// Crear esquema de impuesto para XML UBL 2.1
const scheme = createTaxSchemeUBL('1000')
console.log(scheme)
```

### Utilidades Matemáticas

```typescript
import {
  roundBankers,
  roundCurrency,
  multiplyPrecise,
  dividePrecise,
  approximatelyEquals
} from 'sunat-validations'

// Redondeo bancario (round half even) - Requerido por SUNAT
console.log(roundBankers(2.5, 0)) // 2 (redondea al par más cercano)
console.log(roundBankers(3.5, 0)) // 4

// Redondeo de moneda (2 decimales)
console.log(roundCurrency(100.125)) // 100.12

// Multiplicación precisa (evita errores de punto flotante)
console.log(multiplyPrecise(0.1, 0.2)) // 0.02 (no 0.020000000000000004)

// División precisa
console.log(dividePrecise(1, 3)) // 0.333...

// Comparación aproximada
console.log(approximatelyEquals(1.0, 1.009, 0.01)) // true
```

---

## 📚 API Reference

### Catálogo 05 - Tipos de Tributos

| Código | Nombre | Descripción | Tasa | UN/ECE 5153 |
|--------|--------|-------------|------|-------------|
| 1000 | IGV | Impuesto General a las Ventas | 18% (16% IGV + 2% IPM) | VAT |
| 1016 | IVAP | Impuesto a las Ventas de Arroz Pilado | 4% | VAT |
| 2000 | ISC | Impuesto Selectivo al Consumo | Variable | EXC |
| 7152 | ICBPER | Impuesto al Consumo de Bolsas Plásticas | S/ 0.50/unidad | OTH |
| 9995 | Exportación | Derechos de exportación | 0% | FRE |
| 9996 | Gratuito | Transferencia gratuita | 0% | FRE |
| 9997 | Exonerado | Operación exonerada del IGV | 0% | VAT |
| 9998 | Inafecto | Operación inafecta del IGV | 0% | FRE |
| 9999 | Otros | Otros conceptos de pago | Variable | OTH |

### Catálogo 07 - Tipos de Afectación del IGV

#### Gravados (Categoría: GRAVADO)

| Código | Descripción | Tipo de Operación | Tasa |
|--------|-------------|-------------------|------|
| **10** | Gravado - Operación Onerosa | Gravada | 18% |
| 11 | Gravado - Retiro por premio | Gravada/Gratuita | 18% |
| 12 | Gravado - Retiro por donación | Gravada/Gratuita | 18% |
| 13 | Gravado - Retiro | Gravada/Gratuita | 18% |
| 14 | Gravado - Retiro por publicidad | Gravada/Gratuita | 18% |
| 15 | Gravado - Bonificaciones | Gravada/Gratuita | 18% |
| 16 | Gravado - Retiro por entrega a trabajadores | Gravada/Gratuita | 18% |
| 17 | Gravado - IVAP | Gravada | 4% |

#### Exonerados (Categoría: EXONERADO)

| Código | Descripción | Tipo de Operación | Tasa |
|--------|-------------|-------------------|------|
| **20** | Exonerado - Operación Onerosa | Exonerada | 0% |
| 21 | Exonerado - Transferencia Gratuita | Exonerada/Gratuita | 0% |

#### Inafectos (Categoría: INAFECTO)

| Código | Descripción | Tipo de Operación | Tasa |
|--------|-------------|-------------------|------|
| **30** | Inafecto - Operación Onerosa | Inafecta | 0% |
| 31 | Inafecto - Retiro por Bonificación | Inafecta/Gratuita | 0% |
| 32 | Inafecto - Retiro | Inafecta/Gratuita | 0% |
| 33 | Inafecto - Retiro por Muestras Médicas | Inafecta/Gratuita | 0% |
| 34 | Inafecto - Retiro por Convenio Colectivo | Inafecta/Gratuita | 0% |
| 35 | Inafecto - Retiro por funciones de representación | Inafecta/Gratuita | 0% |
| 36 | Inafecto - Retiro por entrega a trabajadores | Inafecta/Gratuita | 0% |
| 37 | Inafecto - Exportación de servicios | Inafecta/Exportación | 0% |

#### Exportación (Categoría: EXPORTACION)

| Código | Descripción | Tipo de Operación | Tasa |
|--------|-------------|-------------------|------|
| **40** | Exportación de Bienes | Exportación | 0% |

### Documentos de Identidad

| Código | Documento | Longitud | Dígito Verificador | Formato |
|--------|-----------|----------|-------------------|---------|
| **0** | DOC.TRIB.NO.DOM.SIN.RUC | 1-15 | No | Alfanumérico |
| **1** | DNI | 8 | Sí | Numérico |
| **4** | Carnet de Extranjería | 8-12 | No | Alfanumérico |
| **6** | RUC | 11 | Sí | Numérico |
| **7** | Pasaporte | 4-12 | No | Alfanumérico |
| **A** | Cédula Diplomática de Identidad | 8-12 | No | Alfanumérico |
| **B** | DOC.IDENT.PAIS.RES.NOR.UBL | 1-20 | No | Alfanumérico |
| **C** | Tax Identification Number (TIN) | 1-30 | No | Alfanumérico |
| **D** | Identification Document (ID) | 1-30 | No | Alfanumérico |
| **E** | TAM | 8-12 | No | Alfanumérico |
| **F** | TAM | 8-12 | No | Alfanumérico |

### Tipos de Comprobantes

| Código | Descripción | Uso |
|--------|-------------|-----|
| **01** | Factura | Cliente con RUC |
| **03** | Boleta de Venta | Cliente con DNI/CE/Pasaporte |
| **07** | Nota de Crédito | Anulación/descuento |
| **08** | Nota de Débito | Ajuste de precio |

---

## 🧪 Ejemplos Reales

### Escenario 1: Venta Gravada Local

```typescript
import { calculateTax } from 'sunat-validations'

// Venta de productos en tienda local
const venta = calculateTax(1000, '10')
console.log(venta)
// {
//   taxableAmount: 1000,
//   taxAmount: 180,
//   total: 1180,
//   rate: 0.18,
//   affectionCode: '10',
//   taxCode: '1000',
//   currencyId: 'PEN'
// }
// Base: S/ 1,000 + IGV: S/ 180 = Total: S/ 1,180
```

### Escenario 2: Venta Exonerada

```typescript
// Venta de libros (exonerado)
const venta = calculateTax(500, '20')
console.log(venta)
// {
//   taxableAmount: 500,
//   taxAmount: 0,
//   total: 500,
//   rate: 0,
//   affectionCode: '20',
//   taxCode: '9997'
// }
// Base: S/ 500 + IGV: S/ 0 = Total: S/ 500
```

### Escenario 3: Exportación

```typescript
// Exportación de productos a USA
const exportacion = calculateTax(5000, '40')
console.log(exportacion)
// {
//   taxableAmount: 5000,
//   taxAmount: 0,
//   total: 5000,
//   rate: 0,
//   affectionCode: '40',
//   taxCode: '9995'
// }
// Exportación no tiene IGV
```

### Escenario 4: Venta de Arroz Pilado (IVAP)

```typescript
// Venta de arroz pilado con IVAP
const arroz = calculateTax(2000, '17')
console.log(arroz)
// {
//   taxableAmount: 2000,
//   taxAmount: 80,
//   total: 2080,
//   rate: 0.04,
//   affectionCode: '17',
//   taxCode: '1016'
// }
// Base: S/ 2,000 + IVAP: S/ 80 = Total: S/ 2,080
```

### Escenario 5: Factura con ICBPER

```typescript
import { calculateTax, calculateIcbper } from 'sunat-validations'

// Venta con bolsas plásticas
const productos = calculateTax(500, '10')  // S/ 500 + IGV S/ 90 = S/ 590
const bolsas = calculateIcbper(5)          // 5 bolsas × S/ 0.50 = S/ 2.50

const total = productos.total + bolsas
console.log(total) // S/ 592.50
```

### Escenario 6: Donación (Gratuita Gravada)

```typescript
// Donación con valor referencial de S/ 1,000
const donacion = calculateTax(1000, '12')
console.log(donacion)
// {
//   taxableAmount: 1000,
//   taxAmount: 180,
//   total: 1180,
//   rate: 0.18,
//   affectionCode: '12',
//   taxCode: '1000'
// }
// Aunque es gratuita, se debe declarar IGV sobre el valor referencial
```

---

## 🔧 Configuración

### TypeScript

La librería incluye tipos TypeScript completos. No requiere configuración adicional.

```typescript
import type {
  TaxCode,
  AffectionCode,
  TaxCalculationResult,
  DocumentValidationResult,
  IdentityDocument
} from 'sunat-validations'
```

### Tree-shaking

La librería soporta tree-shaking. Importa solo lo que necesitas y el bundler eliminará el código no utilizado:

```typescript
// ✅ Importa solo lo necesario - tree-shaking automático
import { validateRuc, calculateTax, TAXES } from 'sunat-validations'

// ❌ No recomendado - Importa todo con namespace
import * as sunat from 'sunat-validations'
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar cobertura
npm run test:coverage
```

---

## ❓ Preguntas Frecuentes

### ¿Cómo sé qué código de afectación usar?

| Tipo de Operación | Código |
|-------------------|--------|
| Venta normal con IGV | 10 |
| Venta sin IGV (libros, medicamentos) | 20 |
| Servicio de transporte público | 30 |
| Exportación de productos | 40 |
| Regalo a cliente | 11 |
| Donación | 12 |

### ¿Cuándo usar Factura vs Boleta?

| Documento Cliente | Comprobante |
|-------------------|-------------|
| RUC (11 dígitos) | Factura (01) |
| DNI (8 dígitos) | Boleta (03) |
| Carnet de Extranjería | Boleta (03) |
| Pasaporte | Boleta (03) |

### ¿Cómo calcular el IGV incluido en un precio?

```typescript
import { extractIgvFromPrice, removeTax } from 'sunat-validations'

const precioConIgv = 118
const igv = extractIgvFromPrice(precioConIgv) // 18
const baseSinIgv = removeTax(precioConIgv, 0.18) // 100
```

---

## 🔧 Troubleshooting (Problemas Comunes)

### Error: "Cannot find module 'sunat-validations'"

**Causa:** La librería no está instalada correctamente.

**Solución:**
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install sunat-validations
```

### Error: "validateRuc is not a function"

**Causa:** La función se llama diferente o no existe.

**Solución:**
```typescript
// ❌ Incorrecto
import { isValidRuc } from 'sunat-validations' // No existe

// ✅ Correcto
import { validateRuc, isRucEmpresa, isRucPersonaNatural } from 'sunat-validations'

// validateRuc retorna un objeto con isValid
const result = validateRuc('20123456789')
console.log(result.isValid) // true
```

### Error: "calculateTax retorna objeto en lugar de número"

**Causa:** La función `calculateTax` retorna un objeto completo, no solo el monto.

**Solución:**
```typescript
// ❌ Incorrecto
const igv = calculateTax(100, '10') // Retorna objeto

// ✅ Correcto - Obtener solo el monto del impuesto
const result = calculateTax(100, '10')
const igv = result.taxAmount // 18

// ✅ O usar calculateIgv para obtener solo el IGV
const igv = calculateIgv(100) // 18
```

### Error: "El RUC no valida correctamente"

**Causa:** El RUC no tiene el formato correcto o el dígito verificador es inválido.

**Solución:**
```typescript
import { validateRuc, calculateRucCheckDigit } from 'sunat-validations'

// Verificar longitud (debe ser 11 dígitos)
const ruc = '20123456789'

// Calcular dígito verificador esperado
const base = ruc.substring(0, 10)
const dv = calculateRucCheckDigit(base)
console.log(`Dígito verificador esperado: ${dv}`)

// Validar
const result = validateRuc(ruc)
if (!result.isValid) {
  console.log('RUC inválido:', result.error)
}
```

### Error: "Código de afectación no reconocido"

**Causa:** El código no existe en el Catálogo 07.

**Solución:**
```typescript
import { isValidAffectionCode, IGV_TYPES } from 'sunat-validations'

// Verificar si el código es válido
const codigo = '99'
if (!isValidAffectionCode(codigo)) {
  console.log('Código inválido. Códigos válidos:', Object.keys(IGV_TYPES))
}
// Códigos válidos: 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 30, 31, 32, 33, 34, 35, 36, 37, 40
```

### Error: "TypeError: Cannot read properties of undefined"

**Causa:** El código de documento no existe.

**Solución:**
```typescript
import { getIdentityDocument, isValidIdentityCode } from 'sunat-validations'

const codigo = '5'

// Verificar antes de usar
if (!isValidIdentityCode(codigo)) {
  console.log('Código de documento inválido')
}

// Códigos válidos: 0, 1, 4, 6, 7, A, B, C, D, E, F
```

### Problema: Diferencia de centavos en cálculos

**Causa:** Errores de punto flotante en JavaScript.

**Solución:**
```typescript
import { multiplyPrecise, roundCurrency, roundBankers } from 'sunat-validations'

// ❌ Incorrecto - Puede dar errores de precisión
const igv = 100 * 0.18 // 18.000000000000004

// ✅ Correcto - Usar funciones de precisión
const igv = multiplyPrecise(100, 0.18) // 18
const redondeado = roundCurrency(igv) // 18.00
```

### Problema: Redondeo incorrecto según SUNAT

**Causa:** SUNAT usa redondeo bancario (round half even), no redondeo estándar.

**Solución:**
```typescript
import { roundBankers } from 'sunat-validations'

// Redondeo estándar (❌ Incorrecto para SUNAT)
Math.round(2.5) // 3

// Redondeo bancario (✅ Correcto para SUNAT)
roundBankers(2.5, 0) // 2 (redondea al par)
roundBankers(3.5, 0) // 4 (redondea al par)
```

### Problema: Importar solo una función aumenta el bundle

**Causa:** No se está aplicando tree-shaking correctamente.

**Solución:**
```typescript
// ❌ Importa toda la librería con namespace
import * as sunat from 'sunat-validations'

// ✅ Importa solo lo necesario (tree-shaking automático)
import { validateRuc, calculateTax } from 'sunat-validations'
```

### Error: "Los decimales del DNI/RUC no coinciden"

**Causa:** El dígito verificador calculado es diferente al proporcionado.

**Solución:**
```typescript
import { calculateDniCheckDigit, calculateRucCheckDigit } from 'sunat-validations'

// DNI
const dniBase = '1234567'
const dniDv = calculateDniCheckDigit(dniBase)
console.log(`DNI completo: ${dniBase}${dniDv}`)

// RUC
const rucBase = '2012345678'
const rucDv = calculateRucCheckDigit(rucBase)
console.log(`RUC completo: ${rucBase}${rucDv}`)
```

### Problema: No sé qué tributo usar para cada operación

**Solución:** Consulta la tabla de mapeo:

| Operación | Código Afectación | Código Tributo |
|-----------|-------------------|----------------|
| Venta local gravada | 10 | 1000 (IGV) |
| Venta arroz pilado | 17 | 1016 (IVAP) |
| Venta alcohol/cigarrillos | 10 + ISC | 1000 + 2000 |
| Exportación | 40 | 9995 |
| Exonerado (libros) | 20 | 9997 |
| Inafecto (transporte) | 30 | 9998 |
| Regalo/Donación | 11-16 | 1000 |
| Bolsas plásticas | N/A | 7152 |

---

## 📄 Licencia

MIT © 2024

---

## 🤝 Contribuir

Las contribuciones son bienvenidas.

1. Fork el repositorio
2. Crea tu rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

---

## 📋 Referencias

- [SUNAT - Facturación Electrónica](https://cpe.sunat.gob.pe/)
- [Catálogo No. 05 - Tipos de Tributos](https://cpe.sunat.gob.pe/)
- [Catálogo No. 06 - Tipos de Documentos de Identidad](https://cpe.sunat.gob.pe/)
- [Catálogo No. 07 - Tipos de Afectación del IGV](https://cpe.sunat.gob.pe/)
- [UBL 2.1 Specification](http://UBL.xml.org/)
- [UN/ECE Code Lists](https://unece.org/trade/cefact/UNLOCODE-Download)

---

<div align="center">

**Hecho con ❤️ para la comunidad de desarrolladores peruanos**

[⬆ Volver arriba](#sunat-validations)

</div>
