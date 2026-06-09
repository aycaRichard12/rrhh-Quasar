<template>
  <q-icon
    name="filter_alt"
    size="1.2em"
    class="q-ml-sm cursor-pointer text-grey-5 transition-colors"
    :class="{ 'text-primary': tieneFiltroActivo }"
    @click.stop
  >
    <q-menu anchor="bottom right" self="top right" transition-show="scale" transition-hide="scale">
      <q-list style="min-width: 300px" class="q-pb-sm">
        
        <q-item clickable v-close-popup @click="$emit('ordenar', 'asc')">
          <q-item-section avatar><q-icon name="arrow_upward" size="sm" /></q-item-section>
          <q-item-section class="text-body2">Ordenar de Menor a Mayor</q-item-section>
        </q-item>
        
        <q-item clickable v-close-popup @click="$emit('ordenar', 'desc')">
          <q-item-section avatar><q-icon name="arrow_downward" size="sm" /></q-item-section>
          <q-item-section class="text-body2">Ordenar de Mayor a Menor</q-item-section>
        </q-item>

        <q-item v-if="columnaOrdenada" clickable v-close-popup @click="$emit('ordenar', 'none')">
          <q-item-section avatar><q-icon name="sort" size="sm" color="negative"/></q-item-section>
          <q-item-section class="text-body2 text-negative">Quitar Orden</q-item-section>
        </q-item>
        
        <q-separator class="q-my-xs" />

        <q-tabs
          v-model="tabActual"
          dense
          class="text-grey-7"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="valores" label="Valores" v-if="!props.ocultarValores" />
          <q-tab name="condiciones" label="Condiciones" no-caps />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabActual" animated>
          
          <q-tab-panel name="valores" class="q-pa-sm">
            <q-input dense outlined v-model="buscadorMenu" placeholder="Buscar en lista..." class="q-mb-sm">
              <template v-slot:append><q-icon name="search" size="xs" /></template>
            </q-input>
            
            <q-scroll-area style="height: 160px; border: 1px solid #eee; border-radius: 4px;" class="q-pa-xs">
               <q-checkbox 
                 v-model="seleccionarTodo" 
                 label="(Seleccionar Todo)" 
                 size="sm" 
                 class="full-width text-weight-bold" 
                 @update:model-value="alternarTodo"
               />
               <q-checkbox 
                 v-for="item in valoresFiltrados" 
                 :key="item.etiqueta"
                 v-model="valoresSeleccionados" 
                 :val="item.valorOriginal"
                 :label="`${item.etiqueta} (${item.cantidad})`" 
                 size="sm" 
                 class="full-width text-body2" 
               />
               <div v-if="valoresFiltrados.length === 0" class="text-center text-caption text-grey q-mt-sm">
                 No hay resultados
               </div>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="condiciones" class="q-pa-sm">
             <div class="text-caption q-mb-xs text-weight-medium">Mostrar filas donde:</div>
             <q-select 
               dense outlined 
               v-model="operadorCondicion" 
               :options="opcionesOperador" 
               label="Operador" 
               class="q-mb-sm text-body2"
               options-dense
             />
             <q-input dense outlined v-model="textoCondicion" label="Texto" class="q-mb-sm text-body2" />
             <q-checkbox v-model="activarCondicion" label="Activar Condición" size="sm" class="text-body2" />
          </q-tab-panel>

        </q-tab-panels>

        <q-separator />

        <q-card-actions align="right" class="q-pa-sm bg-grey-1 q-mt-xs">
          <q-btn flat label="Limpiar" color="negative" size="sm" no-caps v-close-popup @click="limpiarFiltro" />
          <q-btn flat label="Cancelar" color="grey-8" size="sm" no-caps v-close-popup />
          <q-btn label="Aplicar" color="primary" size="sm" no-caps v-close-popup @click="aplicarFiltro" />
        </q-card-actions>

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
.transition-colors { transition: color 0.3s ease; }
</style>