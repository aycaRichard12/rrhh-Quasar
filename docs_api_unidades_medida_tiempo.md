# Documentación de APIs (Producción Quasar)

Este documento detalla los endpoints utilizados recientemente para los módulos de **Unidad de Medida** y **Unidad de Tiempo**.

---

## 1. Módulo: Unidad de Medida

Ubicación lógica: `src/composables/useUnidadMedida.ts`
Ubicación guardado: `src/components/UnidadMedidaDialog.vue`

### 1.1 Listar Unidades de Medida
- **URL / Endpoint:** `listaUnidadMedidacoloc/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id: number,
      nombre: string,
      descripcion: string,
      estado: number // 1 (Activo) o 0 (Inactivo)
    }
    ```

### 1.2 Cambiar Estado de Unidad
- **URL / Endpoint:** `estadoUnidadMedidacoloc/${id}/${estado}` (Método GET *Nota: Se usa GET internamente para mutar estado en esta versión de la API*)
- **Qué envía:** 
  - `id` (de la unidad)
  - `estado` (nuevo estado al que se quiere cambiar)
- **Qué recibe:**
  - `[ "success", "Mensaje de éxito" ]`

### 1.3 Eliminar Unidad
- **URL / Endpoint:** `eliminarUnidadMedidacoloc/${id}` (Método GET *Nota: Muta datos usando GET*)
- **Qué envía:** 
  - `id` (de la unidad)
- **Qué recibe:**
  - `[ "success", "Mensaje de éxito" ]`

### 1.4 Crear / Actualizar Unidad (FormData)
- **URL / Endpoint:** `/` (Endpoint raíz del backend que rutea según el body `ver`) - (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registroUnidadMedidacoloc"`
    - `empresa`: `{id_empresa}`
    - `nombre`: `"nombre de unidad"`
    - `descripcion`: `"descripción"`
  - **Para editar:**
    - `ver`: `"editarUnidadMedidacoloc"`
    - `id`: `{id de la unidad}`
    - `empresa`: `{id_empresa}`
    - `nombre`: `"nombre de unidad"`
    - `descripcion`: `"descripción"`
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

---

## 2. Módulo: Unidad de Tiempo

Ubicación lógica: `src/composables/useUnidadTiempo.ts`
Ubicación guardado: `src/components/UnidadTiempoDialog.vue`

### 2.1 Listar Unidades de Tiempo
- **URL / Endpoint:** `listaUnidadTiempoControl/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      idcontrol_unidad_tiempo: number,
      unidad: string,
      detalle: string
    }
    ```

### 2.2 Eliminar Unidad
- **URL / Endpoint:** `eliminarUnidadTiempoControl/${id}` (Método GET)
- **Qué envía:** 
  - `id` (de la unidad, es decir `idcontrol_unidad_tiempo`)
- **Qué recibe:**
  - `[ "success", "Mensaje de éxito" ]`

### 2.3 Crear / Actualizar Unidad (FormData)
- **URL / Endpoint:** `/` (Endpoint raíz del backend) - (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registroUnidadTiempoControl"`
    - `empresa_idempresa`: `{id_empresa}`
    - `unidad`: `"nombre de unidad de tiempo"`
    - `detalle`: `"descripción / detalle"`
  - **Para editar:**
    - `ver`: `"editarUnidadTiempoControl"`
    - `idcontrol_unidad_tiempo`: `{id}`
    - `empresa_idempresa`: `{id_empresa}`
    - `unidad`: `"nombre de unidad de tiempo"`
    - `detalle`: `"descripción / detalle"`
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

---

## 3. Módulo: Rubro Productivo

Ubicación lógica: `src/composables/useRubroProductivo.ts`
Ubicación guardado: `src/components/RubroProductivoDialog.vue`

### 3.1 Listar Rubros Productivos
- **URL / Endpoint:** `listar_rubro/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id: number,
      rubro: string,
      detalle: string
    }
    ```

### 3.2 Eliminar Rubro
- **URL / Endpoint:** `eliminar_rubro/${id}/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id` (del rubro)
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - `[ "success", "Mensaje de éxito" ]`

### 3.3 Crear / Actualizar Rubro (FormData)
- **URL / Endpoint:** `/` (Endpoint raíz del backend) - (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registrar_rubro"`
    - `empresa`: `{id_empresa}`
    - `rubro`: `"nombre del rubro"`
    - `detalle`: `"descripción / detalle"`
  - **Para editar:**
    - `ver`: `"editar_rubro"`
    - `id`: `{id}`
    - `empresa`: `{id_empresa}`
    - `rubro`: `"nombre del rubro"`
    - `detalle`: `"descripción / detalle"`
- **Qué recibe:**
  - Éxito: `[ "success", "Mensaje de éxito", "registrar_rubro" | "editar_rubro" | "eliminar_rubro" ]`
  - Error: `[ "danger" | "Error", "Mensaje del error" ]`

---

## 4. Módulo: Categoría Comercial (Producto)

Ubicación lógica: `src/composables/useCategoriaProducto.ts`
Ubicación guardado: `src/components/CategoriaProductoDialog.vue`

### 4.1 Listar Categorías
- **URL / Endpoint:** `listar_categorias_comercial/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      idcategoria_comercial: number,
      nombre: string,
      descripcion: string,
      estado: string | number, // "1" o "0"
      rubro_idrubro: string | number
    }
    ```

### 4.2 Cambiar Estado
- **URL / Endpoint:** `/` (Método POST)
- **Qué envía (Payload FormData):**
  - `ver`: `"editar_estado_categoria"`
  - `id`: `{idcategoria_comercial}`
  - `empresa`: `{id_empresa}`
  - `estado`: `"1"` o `"0"`
- **Qué recibe:**
  - `[ "ok", "Mensaje de éxito", "editar_estado_categoria" ]`

### 4.3 Eliminar Categoría
- **URL / Endpoint:** `eliminar_categoriaComercial/${id}/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id` (de la categoría)
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - `[ "ok", "Mensaje de éxito", "eliminar_categoriaComercial" ]`

### 4.4 Crear / Actualizar Categoría (FormData)
- **URL / Endpoint:** `/` (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registro_categoria_comercial"`
    - `id_empresa`: `{id_empresa}`
    - `idp`: `"0"`
    - `nombre`: `"nombre de categoría"`
    - `estado`: `"1" | "0"`
    - `descripcion`: `"descripción"`
    - `rubro_idrubro`: `{id_rubro}`
  - **Para editar:**
    - `ver`: `"editar_categoria_comercial"`
    - `idcategoria_comercial`: `{id}`
    - `idp`: `{id}`
    - `id_empresa`: `{id_empresa}`
    - `nombre`: `"nombre"`
    - `estado`: `"1" | "0"`
    - `descripcion`: `"descripción"`
    - `rubro_idrubro`: `{id_rubro}`
- **Qué recibe:**
  - Éxito: `[ "ok", "Mensaje de éxito", "registrar_categoria" | "editar_categoria" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

---
*Nota de Arquitectura API*: Los métodos de creación y actualización para ambos módulos están diseñados usando un enrutamiento interno (`ver`) donde todo entra como una solicitud `POST` enviando un `FormData` en vez de JSON tradicional o llamadas REST puras. Además, algunos métodos destructivos o de cambio de estado se ejecutan llamando a una ruta `GET`.

---

## 5. Módulo: Característica de Producto

Ubicación lógica: `src/composables/useCaracteristicaProducto.ts`
Ubicación guardado: `src/components/CaracteristicaProductoDialog.vue`

### 5.1 Listar Características
- **URL / Endpoint:** `listar_caracteristica_comercial/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id_medida: number,
      nombre_medida: string,
      descripcion: string,
      estado: number, // 1 o 0
      rubro_idrubro: number
    }
    ```

### 5.2 Cambiar Estado
- **URL / Endpoint:** `/` (Método POST)
- **Qué envía (Payload FormData):**
  - `ver`: `"cambiar_estado_medida_producto"`
  - `id`: `{id_medida}`
  - `empresa`: `{id_empresa}`
  - `estado`: `"1"` o `"0"`
- **Qué recibe:**
  - `[ "ok", "Mensaje de éxito", "cambiar_estado_medida_producto" ]`

### 5.3 Eliminar Característica
- **URL / Endpoint:** `eliminar_medidaCaracteristica/${id_medida}` (Método GET)
- **Qué envía:** 
  - `id_medida` (en la URL)
- **Qué recibe:**
  - `[ "ok", "Mensaje de éxito", "eliminar_medidaCaracteristica" ]`

### 5.4 Crear / Actualizar Característica (FormData)
- **URL / Endpoint:** `/` (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registro_medida_comercial"`
    - `id_empresa`: `{id_empresa}`
    - `nombre_medida`: `"nombre de la característica"`
    - `estado`: `"1" | "0"`
    - `descripcion`: `"descripción"`
    - `rubro_idrubro`: `{id_rubro}`
  - **Para editar:**
    - `ver`: `"editar_caracteristica_comercial"`
    - `id_medida`: `{id_medida}`
    - `id_empresa`: `{id_empresa}`
    - `nombre_medida`: `"nombre de la característica"`
    - `estado`: `"1" | "0"`
    - `descripcion`: `"descripción"`
    - `rubro_idrubro`: `{id_rubro}`
- **Qué recibe:**
  - Éxito: `[ "ok" | "success", "Mensaje de éxito" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

---

## 6. Módulo: Sección de Trabajo

Ubicación lógica: `src/composables/useSeccionTrabajo.ts`
Ubicación guardado: `src/components/SeccionTrabajoDialog.vue`

### 6.1 Listar Secciones de Trabajo
- **URL / Endpoint:** `listarseccion/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id: number,
      nombre_seccion: string,
      codigo_seccion: string,
      ubicacion: string,
      rubro_idrubro: string | number
    }
    ```

### 6.2 Eliminar Sección de Trabajo
- **URL / Endpoint:** `eliminar_seccion/${id}/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id` (de la sección)
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - `[ "success", "Mensaje de éxito", "eliminar_seccion" ]`

### 6.3 Crear / Actualizar Sección de Trabajo (FormData)
- **URL / Endpoint:** `/` (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear:**
    - `ver`: `"registro_seccion"`
    - `empresa`: `{id_empresa}`
    - `nombre_seccion`: `"nombre"`
    - `codigo_seccion`: `"código"`
    - `ubicacion`: `"ubicación"`
    - `rubro_idrubro`: `{id_rubro}`
  - **Para editar:**
    - `ver`: `"editar_seccion"`
    - `id`: `{id_seccion}`
    - `empresa`: `{id_empresa}`
    - `nombre_seccion`: `"nombre"`
    - `codigo_seccion`: `"código"`
    - `ubicacion`: `"ubicación"`
    - `rubro_idrubro`: `{id_rubro}`
- **Qué recibe:**
  - Éxito: `[ "success", "Mensaje de éxito", "registro_seccion" | "editar_seccion" ]`
  - Error: `[ "danger" | "Error", "Mensaje del error" ]`

---

## 7. Módulo: Tipo de Máquina

Ubicación lógica sugerida: `src/composables/useTipoMaquinas.ts`
Ubicación UI sugerida: `src/pages/tipoMaquinasPage.vue`

### 7.1 Listar Tipos de Máquina
- **URL / Endpoint:** `listar_tipomaquina/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id: number,
      tipo: string,
      detalle: string
    }
    ```

### 7.2 Eliminar Tipo de Máquina
- **URL / Endpoint:** `eliminar_tipomaquina/${id}/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id` (del tipo de máquina)
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - `[ "ok", "Mensaje de éxito", "eliminar_tipomaquina" ]`

### 7.3 Crear / Actualizar Tipo de Máquina (FormData)
- **URL / Endpoint:** `/` (Endpoint raíz del backend) - (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear (`registrar_tipomaquina`):**
    - `ver`: `"registrar_tipomaquina"`
    - `empresa`: `{id_empresa}`
    - `tipo`: `"nombre del tipo"`
    - `detalle`: `"descripción / detalle"`
  - **Para editar (`editar_tipomaquina`):**
    - `ver`: `"editar_tipomaquina"`
    - `id`: `{id_tipo_maquina}`
    - `empresa`: `{id_empresa}`
    - `tipo`: `"nombre del tipo"`
    - `detalle`: `"descripción / detalle"`
- **Qué recibe:**
  - Éxito: `[ "ok", "Mensaje de éxito", "registrar_tipomaquina" | "editar_tipomaquina" ]`
  - Error: `[ "Error", "Mensaje del error", "editar_tipomaquina" (opcional) ]`


---

## 8. Módulo: Tipo de Material

Ubicación lógica sugerida: `src/modules/tipoMaterial/composables/useTipoMaterial.ts`
Ubicación UI sugerida: `src/pages/tipoMaterialPage.vue`

### 8.1 Listar Tipos de Material
- **URL / Endpoint:** `listar_tipo_material/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - Un array de objetos JSON con la estructura:
    ```typescript
    {
      id: number,
      nombre: string,
      detalle: string
    }
    ```

### 8.2 Eliminar Tipo de Material
- **URL / Endpoint:** `eliminar_tipo_material/${id}/${id_empresa}` (Método GET)
- **Qué envía:** 
  - `id` (del tipo de material)
  - `id_empresa` (en la URL)
- **Qué recibe:**
  - `[ "success" | "ok", "Mensaje de éxito", "eliminar_tipo_material" ]`

### 8.3 Crear / Actualizar Tipo de Material (FormData)
- **URL / Endpoint:** `/` (Endpoint raíz del backend) - (Método POST)
- **Qué envía (Payload FormData):**
  - **Para crear (`registrar_tipo_material`):**
    - `ver`: `"registrar_tipo_material"`
    - `empresa`: `{id_empresa}`
    - `nombre`: `"nombre del tipo"`
    - `detalle`: `"descripción / detalle"`
    - `fecha`: `"YYYY-MM-DD"` (Bolivia UTC-4)
    - `hora`: `"HH:MM:SS"` (Bolivia UTC-4)
  - **Para editar (`editar_tipo_material`):**
    - `ver`: `"editar_tipo_material"`
    - `id`: `{id_tipo_material}`
    - `empresa`: `{id_empresa}`
    - `nombre`: `"nombre del tipo"`
    - `detalle`: `"descripción / detalle"`
    - `fecha`: `"YYYY-MM-DD"` (Bolivia UTC-4)
    - `hora`: `"HH:MM:SS"` (Bolivia UTC-4)
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito", "registrar_tipo_material" | "editar_tipo_material" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

---

## 9. Módulo: Stock Materia Prima

Ubicación lógica: `src/modules/stockMateriaPrima/composables/useStock.ts`
Ubicación UI:     `src/pages/stockMateriaPrimaPage.vue`

### 9.1 Listar Datos de Stock (Carga Inicial)
- **URL / Endpoint:** Múltiples endpoints vía `Promise.all` (Método: GET)
- **Servicio Quasar:** `src/modules/stockMateriaPrima/services/stock.api.ts → fetchData(idEmpresa)`
- **Endpoints consumidos:**
  - `api/listadoAlmacenMaterial/${idEmpresa}`
  - `api/listar_material/${idEmpresa}`
  - `api/listar_unidad_producto/${idEmpresa}`
  - `api/listarProveedor/${idEmpresa}`
  - `api/listarseccion/${idEmpresa}`
  - `api/listar_compras/${idEmpresa}`
  - `api/listaenvases/${idEmpresa}`
- **Qué envía:**
  - `idEmpresa` (en la URL)
- **Qué recibe:**
  - Un objeto con los datos combinados de todas las listas.

### 9.2 Registrar Merma
- **URL / Endpoint:** `/` (Método POST - FormData)
- **Servicio Quasar:** `src/modules/stockMateriaPrima/services/stock.api.ts → registrarMerma(data)`
- **Qué envía (Payload FormData):**
  - `ver`: `"registrar_merma"`
  - `cantidad`: `number` (cantidad a mermar)
  - `justificacion`: `string` (motivo de la merma)
  - `almacen_material_idalmacen_material`: `number` (ID del item en stock)
  - `empresa_idempresa`: `{id_empresa}`
  - (Campos técnicos adicionales para trazabilidad: `cantidad_envase`, `peso_neto`, `tipo_envase_idtipo_envase`, `costo_unitario`, `costo_envase`, `material_idmaterial`, `proveedor_idproveedor`, `compra_idcompra`)
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito", "registrar_merma" ]`
  - Error:  `[ "Error", "Mensaje del error" ]`

---

## 10. Módulo: Stock por Material (Agregado)

Ubicación lógica: `src/modules/stockMateriaPrima/composables/useStockPorMaterial.ts`
Ubicación UI:     `src/pages/porMaterialPage.vue`
Servicio Quasar:  `src/modules/stockMateriaPrima/services/stockPorMaterial.api.ts`

### 10.1 Carga Inicial (Promise.all — 9 endpoints en paralelo)
- **URL / Endpoint:** Múltiples GET (Método: GET)
- **Qué envía:** `id_empresa` (en cada URL)
- **Endpoints consumidos:**
  - `listadoAlmacenMaterial/${idEmpresa}` → Stock en almacén
  - `listar_material/${idEmpresa}` → Lista de materiales
  - `listar_unidad_producto/${idEmpresa}` → Unidades de medida
  - `listarProveedor/${idEmpresa}` → Proveedores
  - `listarseccion/${idEmpresa}` → Secciones de trabajo
  - `listar_compras/${idEmpresa}` → Compras realizadas
  - `listaenvases/${idEmpresa}` → Tipos de envase
  - `listar_rubro/${idEmpresa}` → Rubros productivos
  - `listar_tipo_material/${idEmpresa}` → Tipos de material
- **Procesamiento:** Agrupa por `material_idmaterial` sumando `cantidad` y `cantidad_envases`
- **Qué recibe:** Array de `StockMaterialItem`

---

## 11. Módulo: Stock por Compra (Agrupado por compra)

Ubicación lógica: `src/modules/stockMateriaPrima/composables/useStockPorCompra.ts`
Ubicación UI:     `src/pages/porCompraPage.vue`
Servicio Quasar:  `src/modules/stockMateriaPrima/services/stockPorCompra.api.ts`

### 11.1 Carga Inicial (Promise.all — 7 endpoints en paralelo)
- **URL / Endpoint:** Múltiples GET (Método: GET)
- **Qué envía:** `id_empresa` (en cada URL)
- **Endpoints consumidos:**
  - `listadoAlmacenMaterial/${idEmpresa}` → Stock en almacén
  - `listar_material/${idEmpresa}` → Lista de materiales
  - `listar_unidad_producto/${idEmpresa}` → Unidades de medida
  - `listarProveedor/${idEmpresa}` → Proveedores
  - `listarseccion/${idEmpresa}` → Secciones de trabajo
  - `listar_compras/${idEmpresa}` → Compras realizadas
  - `listaenvases/${idEmpresa}` → Tipos de envase
- **Procesamiento:** Agrupa por `compra_idcompra` sumando `cantidad` y `cantidad_envases` cuando coinciden: `compra_idcompra`, `costo_unitario`, `peso_neto`, `costo_envase`, `tipo_envase_idtipo_envase`, `fecha_caducidad`, `material_idmaterial`, `codigo_mat`, `medida_idmedida`, `proveedor_idproveedor`
- **Qué recibe:** Array de `StockMaterialItem`
- **Filtros adicionales:** Por fecha de caducidad (desde/hasta) y búsqueda por texto

---

## 12. Módulo: Inventario Físico

Ubicación lógica: `src/modules/stockMateriaPrima/composables/useInventarioFisico.ts`
Ubicación UI:     `src/pages/inventarioFisicoPage.vue`
Servicio Quasar:  `src/modules/stockMateriaPrima/services/inventarioFisico.api.ts`

### 12.1 Carga Inicial (Promise.all — 9 endpoints en paralelo)
- **URL / Endpoint:** Múltiples GET (Método: GET)
- **Qué envía:** `id_empresa` (en cada URL)
- **Endpoints consumidos:**
  - `listar_almacen_fisico/${idEmpresa}` → Inventario físico
  - `listar_material/${idEmpresa}` → Lista de materiales
  - `listar_unidad_producto/${idEmpresa}` → Unidades de medida
  - `listarProveedor/${idEmpresa}` → Proveedores
  - `listarseccion/${idEmpresa}` → Secciones de trabajo
  - `listar_compras/${idEmpresa}` → Compras realizadas
  - `listaenvases/${idEmpresa}` → Tipos de envase
  - `listar_rubro/${idEmpresa}` → Rubros productivos
  - `listar_tipo_material/${idEmpresa}` → Tipos de material
- **Qué recibe:** Array de registros con `idalmacen_fisico`, `material_idmaterial`, `cantidad`, `medida_idmedida`

### 12.2 Registrar Inventario Físico (FormData)
- **URL / Endpoint:** `/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: `"registrar_almacen_fisico"`
  - `empresa_idempresa`: `{id_empresa}`
  - `material_idmaterial`: `{id_material}`
  - `cantidad`: `{cantidad}`
  - `tipo_envase_idtipo_envase`: `"0"`
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito", "registrar_almacen_fisico" ]`
  - Error: `[ "Error", "Mensaje del error" ]`

### 12.3 Editar Inventario Físico (FormData)
- **URL / Endpoint:** `/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: `"editar_almacen_fisico"`
  - `idalmacen_fisico`: `{id}`
  - `cantidad`: `{nueva_cantidad}`
- **Qué recibe:**
  - Éxito: `[ "success" | "ok", "Mensaje de éxito" ]`
  - Error: `[ "danger" | "Error", "Mensaje del error" ]`

### 12.4 Eliminar Inventario Físico
- **URL / Endpoint:** `eliminar_almacen_fisico/${id}` (Método GET)
  > ⚠️ Usa GET para operación destructiva (patrón del backend legacy)
- **Qué envía:**
  - `id` (en la URL)
- **Qué recibe:**
  - `[ "success" | "ok", "Mensaje de éxito", "eliminar_almacen_fisico" ]

---

## 13. Módulo: Pedidos de Material (Generar Lista de Compra)

Ubicación lógica: `src/composables/pedidosMaterial/usePedidosMaterial.ts`
Ubicación UI:     `src/pages/GenerarListaCompraPage.vue`
Componentes:      `src/modules/pedidoMaterial/components/`
Tipos:            `src/types/pedidoMaterial.ts`

### 13.1 Carga Inicial (Promise.all — 6 endpoints GET)
- **URL / Endpoint:** Múltiples GET
- **Qué envía:** `id_empresa` (en la URL)
- **Endpoints consumidos:**
  - `getempleado/${idEmpresa}` → Empleados
  - `Listar_pedidos_material/${idEmpresa}` → Pedidos de material
  - `listar_rubro/${idEmpresa}` → Rubros productivos
  - `listar_material/${idEmpresa}` → Materiales
  - `listar_unidad_producto/${idEmpresa}` → Unidades de medida
  - `listaenvases/${idEmpresa}` → Tipos de envase
- **Qué recibe:** Arrays de cada entidad

### 13.2 Anular / Activar Pedido (FormData)
- **URL / Endpoint:** `/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: `"anularPedido"`
  - `idpedido`: `{id_pedido}`
- **Qué recibe:**
  - Éxito: `[ "success", "Mensaje de éxito" ]`
  - Error: `[ "danger", "Mensaje de error" ]`

### 13.3 Eliminar Detalle de Pedido (FormData)
- **URL / Endpoint:** `/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: `"eliminar_detalle_pedido"`
  - `iddetalle_pedido`: `{id_detalle}`
- **Qué recibe:**
  - Éxito: `[ "success", "Mensaje de éxito" ]`
  - Error: `[ "danger", "Mensaje de error" ]`

### 13.4 Registrar Detalle de Pedido (FormData)
- **URL / Endpoint:** `/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: `"registrar_detalle_pedido"`
  - (Campos del detalle: `pedido_idpedido`, `material_idmaterial`, `cantidad_envases`, `tipo_envase_idtipo_envase`, `peso_neto`, `observaciones`)
- **Qué recibe:**
  - Éxito: `[ "success", "Mensaje de éxito" ]`
  - Error: `[ "danger", "Mensaje de error" ]`

### 13.5 Registrar Nuevo Pedido (FormData)
- **URL / Endpoint:** `api/` (Método POST — FormData)
- **Qué envía (FormData):**
  - `ver`: acción del pedido (definida en el payload del dialog)
  - Campos del pedido (rubro, fecha, hora, empleado, detalles)
- **Qué recibe:**
  - Éxito: `[ "success", "Pedido registrado satisfactoriamente" ]`
  - Error: `[ "danger", "Mensaje de error" ]
