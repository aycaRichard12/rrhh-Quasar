# Documentación de APIs - Módulo Reporte de Producción

## Resumen

Este documento detalla las pruebas realizadas a las APIs del módulo **Reporte de Producción**. Se probaron 8 endpoints en total: **6 funcionan correctamente** y **2 presentan problemas**.

---

## Configuración de Pruebas

| Parámetro | Valor |
|-----------|-------|
| **Base URL** | `https://vivasoft.link/app/prod/api` |
| **ID Empresa (MD5)** | `c0c7c76d30bd3dcaefc96f40275bdc0a` |
| **Método de carga** | Todas las APIs se ejecutan en paralelo (`Promise.all`) |
| **Archivo de pruebas** | `test_reporte_produccion.http` |

---

## APIs que Funcionan Correctamente ✅

### 1. Listar Rubros
```
GET {{baseUrl}}/listar_rubro/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de objetos con `id`, `rubro` y `detalle`
- **Datos de ejemplo:**
  ```json
  [
    {"id": 5, "rubro": "cafes", "detalle": "Producción de tipos de café."},
    {"id": 6, "rubro": "panes", "detalle": "Producción de panes, panetones..."},
    {"id": 25, "rubro": "Embutidos", "detalle": "Productos cárnicos procesados..."}
  ]
  ```

---

### 2. Listar Empleados
```
GET {{baseUrl}}/getempleado/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de empleados (estructura: `id`, `nombre`, `apellido`)

---

### 3. Listar Productos Comerciales
```
GET {{baseUrl}}/listar_productos_comercial/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de productos comerciales

---

### 4. Listar Unidades de Medida
```
GET {{baseUrl}}/listar_unidad_producto/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de unidades de medida

---

### 5. Listar Materiales
```
GET {{baseUrl}}/listar_material/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de materiales

---

### 6. Listar Etapas de Producción
```
GET {{baseUrl}}/listar_etapas_produccion/{{idEmpresaMD5}}
```
- **Status HTTP:** 200 ✅
- **Respuesta:** Array de etapas de producción

---

## APIs con Problemas ❌

### 7. Reporte de Producción - ERROR CRÍTICO

```
GET {{baseUrl}}/reporte_produccion/{{idEmpresaMD5}}
```

| Campo | Detalle |
|-------|---------|
| **Status HTTP** | 200 (falso positivo) |
| **Estado** | ❌ ERROR |
| **Tipo de error** | PHP Warning + respuesta de error |

#### Error Completo
```
Warning: Trying to access array offset on value of type null in 
/home/u335921272/domains/vivasoft.link/public_html/app/prod/api/reportes/reporte_produccion.php on line 140

["danger","la cantidad del producto '321' es cero","reprte_produccion"]
```

#### Análisis del Error

1. **Causa raíz:** Un producto con ID `321` tiene cantidad cero en los datos de producción
2. **Ubicación del bug:** 
   - **Archivo:** `reporte_produccion.php`
   - **Línea:** 140
   - **Servidor:** `/home/u335921272/domains/vivasoft.link/public_html/app/prod/api/reportes/`

3. **Problema de código:** Se intenta acceder a un índice de un array que es `null`, probablemente porque no se valida que el producto exista o tenga datos antes de acceder a sus propiedades

#### Impacto
- El módulo ReporteProduccion **no puede cargar la tabla principal**
- Todas las funciones dependientes del reporte fallan (PDF, detalle de lotes, etc.)
- El error se propaga como `["danger", mensaje, origen]` en lugar de un array vacío o datos válidos

#### Solución Recomendada
En el backend (`reporte_produccion.php` línea 140):
- Agregar validación `isset()` o `!empty()` antes de acceder al array del producto
- Manejar el caso donde `cantidad == 0` sin lanzar error
- Corregir el producto ID `321` en la base de datos o filtrarlo del reporte

---

### 8. Listar Uso de Máquina - SIN DATOS

```
GET {{baseUrl}}/listar_uso_maquina/{{idEmpresaMD5}}
```

| Campo | Detalle |
|-------|---------|
| **Status HTTP** | 200 |
| **Estado** | ⚠️ SIN DATOS |
| **Respuesta** | Vacía (string vacío) |

#### Análisis
- El endpoint responde correctamente (HTTP 200)
- **No devuelve datos** - respuesta vacía
- **Posibles causas:**
  1. No hay registros de uso de máquina para esta empresa en la BD
  2. El endpoint no está implementado correctamente
  3. La consulta SQL no retorna resultados

#### Impacto
- El módulo puede funcionar pero la sección de **uso de máquinas** en el detalle de producción estará vacía
- No afecta la carga principal del reporte (es un dato complementario)

#### Solución Recomendada
- Verificar si existen registros en la tabla de uso de máquina para esta empresa
- Si es comportamiento esperado (sin datos), el endpoint debería retornar `[]` (array vacío) en lugar de string vacío
- Revisar la consulta SQL en el backend

---

## Resumen de Estado

| # | Endpoint | Status | Estado |
|---|----------|--------|--------|
| 1 | `listar_rubro` | 200 | ✅ Funciona |
| 2 | `getempleado` | 200 | ✅ Funciona |
| 3 | `listar_productos_comercial` | 200 | ✅ Funciona |
| 4 | `listar_unidad_producto` | 200 | ✅ Funciona |
| 5 | `listar_material` | 200 | ✅ Funciona |
| 6 | `listar_etapas_produccion` | 200 | ✅ Funciona |
| 7 | `reporte_produccion` | 200 | ❌ Error PHP - Producto 321 con cantidad cero |
| 8 | `listar_uso_maquina` | 200 | ⚠️ Sin datos |

---

## Archivos Relacionados

| Archivo | Descripción |
|---------|-------------|
| `test_reporte_produccion.http` | Archivo de pruebas REST Client |
| `src/modules/ReporteProduccion/composables/useReporteProduccion.ts` | Composable que ejecuta las 8 APIs en paralelo |
| `src/modules/ReporteProduccion/services/ReporteProduccion.api.ts` | Servicio de llamadas a la API |
| `src/pages/ReporteProduccionPage.vue` | Página principal del módulo |

---

## Fecha de Prueba

**viernes, 10 de abril de 2026**
