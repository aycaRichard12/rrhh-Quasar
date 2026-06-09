<template>
  <q-icon
    name="filter_alt"
    size="1.2em"
    class="q-ml-sm cursor-pointer transition-colors"
    :class="tieneFiltroActivo ? 'text-primary text-weight-bold' : 'text-grey-6 hover:text-grey-8'"
    @click.stop
  >
    <q-badge v-if="tieneFiltroActivo" color="primary" floating rounded size="xs" />

    <q-menu anchor="bottom right" self="top right" transition-show="scale" transition-hide="scale">
      <q-list style="min-width: 320px" class="filter-menu">

        <!-- Sección de Ordenamiento -->
        <div class="q-px-md q-pt-md q-pb-sm">
          <div class="text-caption text-weight-bold text-grey-7 q-mb-sm">ORDENAMIENTO</div>
          <div class="row q-gutter-sm">
            <q-btn
              flat
              dense
              size="sm"
              icon="arrow_upward"
              label="Menor a Mayor"
              v-close-popup
              @click="$emit('ordenar', 'asc')"
              class="col-grow"
              padding="xs sm"
            />
            <q-btn
              flat
              dense
              size="sm"
              icon="arrow_downward"
              label="Mayor a Menor"
              v-close-popup
              @click="$emit('ordenar', 'desc')"
              class="col-grow"
              padding="xs sm"
            />
          </div>
          <q-btn
            v-if="columnaOrdenada"
            flat
            dense
            size="sm"
            icon="sort"
            label="Quitar Orden"
            color="negative"
            v-close-popup
            @click="$emit('ordenar', 'none')"
            class="full-width q-mt-xs"
            padding="xs sm"
          />
        </div>

        <q-separator class="q-my-sm" />

        <!-- Sección de Filtrado -->
        <q-tabs
          v-model="tabActual"
          dense
          class="text-grey-7 q-px-md"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="valores" label="Valores" v-if="!props.ocultarValores" no-caps />
          <q-tab name="condiciones" label="Condiciones" no-caps />
        </q-tabs>

        <q-separator class="q-my-sm" />

        <!-- Contenido de Tabs -->
        <q-tab-panels v-model="tabActual" animated class="bg-white">

          <q-tab-panel name="valores" class="q-pa-md">
            <q-input
              dense
              outlined
              v-model="buscadorMenu"
              placeholder="Buscar valores..."
              class="q-mb-md"
              clearable
            >
              <template v-slot:prepend><q-icon name="search" size="sm" /></template>
            </q-input>

            <div class="q-mb-sm">
              <q-checkbox
                v-model="seleccionarTodo"
                label="Seleccionar Todo"
                size="sm"
                class="full-width text-weight-medium text-primary"
                @update:model-value="alternarTodo"
              />
            </div>

            <q-scroll-area style="height: 200px" class="border-subtle">
              <div class="q-pa-sm">
                <q-checkbox
                  v-for="item in valoresFiltrados"
                  :key="item.etiqueta"
                  v-model="valoresSeleccionados"
                  :val="item.valorOriginal"
                  :label="`${item.etiqueta} (${item.cantidad})`"
                  size="sm"
                  class="full-width q-mb-xs text-body2"
                />
                <div v-if="valoresFiltrados.length === 0" class="text-center text-caption text-grey-5 q-mt-md">
                  <q-icon name="search_off" size="sm" class="q-mr-xs" />
                  No hay resultados
                </div>
              </div>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="condiciones" class="q-pa-md">
            <div class="text-caption text-weight-bold text-grey-7 q-mb-sm">Mostrar filas donde:</div>

            <q-select
              dense
              outlined
              v-model="operadorCondicion"
              :options="opcionesOperador"
              label="Operador"
              class="q-mb-md text-body2"
              options-dense
              emit-value
              map-options
            />

            <q-input
              dense
              outlined
              v-model="textoCondicion"
              label="Valor"
              class="q-mb-md text-body2"
              clearable
            />

            <q-toggle
              v-model="activarCondicion"
              label="Activar esta condición"
              color="primary"
              size="sm"
              class="text-body2"
            />
          </q-tab-panel>

        </q-tab-panels>

        <q-separator class="q-my-sm" />

        <!-- Acciones -->
        <div class="q-px-md q-pb-md q-pt-sm flex gap-sm justify-end">
          <q-btn
            flat
            label="Limpiar"
            color="negative"
            size="sm"
            no-caps
            v-close-popup
            @click="limpiarFiltro"
            padding="xs md"
          />
          <q-btn
            flat
            label="Cancelar"
            color="grey-8"
            size="sm"
            no-caps
            v-close-popup
            padding="xs md"
          />
          <q-btn
            unelevated
            label="Aplicar"
            color="primary"
            size="sm"
            no-caps
            v-close-popup
            @click="aplicarFiltro"
            padding="xs md"
            class="text-weight-medium"
          />
        </div>

      </q-list>
    </q-menu>
  </q-icon>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { QTableColumn } from 'quasar';

// Evitamos usar 'any' usando genéricos o Record estricto
const props = defineProps<{
  col: QTableColumn;
  datosCompletos: Record<string, unknown>[];
  columnaOrdenada: boolean;
  ocultarValores?: boolean; // <-- NUEVO: Para ocultar checks en descripciones
}>();

const emit = defineEmits<{
  (e: 'ordenar', direccion: 'asc' | 'desc' | 'none'): void;
  (e: 'aplicar', configuracion: ConfiguracionFiltro): void;
  (e: 'limpiar'): void;
}>();

export interface ConfiguracionFiltro {
  campo: string;
  modo: 'valores' | 'condiciones';
  valores?: unknown[];
  condicion?: {
    operador: string;
    texto: string;
  };
}

// Estados del menú
const tabActual = ref<'valores' | 'condiciones'>('valores');
const tieneFiltroActivo = ref(false);

// Estados de Valores
const buscadorMenu = ref('');
const seleccionarTodo = ref(true);
const valoresSeleccionados = ref<unknown[]>([]);

// Estados de Condiciones
const opcionesOperador = ['Contiene', 'Es igual a', 'Empieza con', 'Termina con'];
const operadorCondicion = ref('Contiene');
const textoCondicion = ref('');
const activarCondicion = ref(false);

// Extraer y contar valores únicos de la tabla para esta columna
const valoresUnicos = computed(() => {
  const mapa = new Map<string, { etiqueta: string; valorOriginal: unknown; cantidad: number }>();
  
  props.datosCompletos.forEach(fila => {
    // Extraer el valor de forma segura (sea string o función field)
    let valor = fila[props.col.field as string];
    if (typeof props.col.field === 'function') {
      valor = props.col.field(fila);
    }
    
    const etiquetaStr = valor !== null && valor !== undefined && valor !== '' 
    ? (typeof valor === 'object' ? JSON.stringify(valor) : String(valor as string | number | boolean)) 
    : '(Vacío)';

    if (!mapa.has(etiquetaStr)) {
      mapa.set(etiquetaStr, { etiqueta: etiquetaStr, valorOriginal: valor, cantidad: 0 });
    }
    mapa.get(etiquetaStr)!.cantidad++;
  });
  
  return Array.from(mapa.values()).sort((a, b) => a.etiqueta.localeCompare(b.etiqueta));
});

// Filtrar la lista de checkboxes con el buscador
const valoresFiltrados = computed(() => {
  if (!buscadorMenu.value) return valoresUnicos.value;
  const textoBuscado = buscadorMenu.value.toLowerCase();
  return valoresUnicos.value.filter(item => item.etiqueta.toLowerCase().includes(textoBuscado));
});

// Inicializar seleccionando todo por defecto
watch(() => valoresUnicos.value, (nuevosValores) => {
  if (!tieneFiltroActivo.value) {
    valoresSeleccionados.value = nuevosValores.map(v => v.valorOriginal);
  }
}, { immediate: true });

// Checkbox Seleccionar Todo
const alternarTodo = (valor: boolean) => {
  if (valor) {
    valoresSeleccionados.value = valoresFiltrados.value.map(v => v.valorOriginal);
  } else {
    valoresSeleccionados.value = [];
  }
};

const aplicarFiltro = () => {
  tieneFiltroActivo.value = true;
  const configuracion: ConfiguracionFiltro = {
    campo: (typeof props.col.field === 'string' ? props.col.field : props.col.name),
    modo: tabActual.value,
  };

  if (tabActual.value === 'valores') {
    configuracion.valores = valoresSeleccionados.value;
  } else {
    configuracion.condicion = {
      operador: operadorCondicion.value,
      texto: textoCondicion.value
    };
  }
  emit('aplicar', configuracion);
};

const limpiarFiltro = () => {
  tieneFiltroActivo.value = false;
  buscadorMenu.value = '';
  textoCondicion.value = '';
  activarCondicion.value = false;
  seleccionarTodo.value = true;
  valoresSeleccionados.value = valoresUnicos.value.map(v => v.valorOriginal);
  emit('limpiar');
};
</script>

<style scoped>
.transition-colors {
  transition: color 0.3s ease;
}

.filter-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.border-subtle {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.gap-sm {
  gap: 0.5rem;
}

:deep(.q-item__label--caption) {
  font-size: 0.75rem;
  font-weight: 500;
}
</style>