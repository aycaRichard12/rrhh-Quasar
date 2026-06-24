<template>
  <q-table
    class="global-table-header"
    row-key="id"
    :columns="columnas"
    :filter="modeloBusqueda"
    :loading="estaCargando"
    :rows="filas"
    :title="titulo"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
    :pagination-label="(inicio, fin, total) => `${inicio}-${fin} ${$t('common.report.of')} ${total}`"
  >
    <template #no-data>
      <div class="full-width column flex-center q-py-xl" style="min-height: 250px;">
        <q-inner-loading showing style="z-index: 10;">
          <div class="full-width column flex-center" style="min-height: 50px;">
            <img :src="faviconSrc" alt="Buscando..." class="magnifier-searching" style="height: 70px; width: 70px; object-fit: contain;" />
            <span class="text-h5 text-weight-medium q-mt-md">
              {{ $t('common.messages.loading') + '...' }}
            </span>
          </div>
        </q-inner-loading>
      </div>
    </template>

    <template #body-cell-numero="propsCell">
      <slot name="body-cell-numero" v-bind="propsCell">
        <q-td :props="propsCell">
          {{ propsCell.rowIndex + 1 }}
        </q-td>
      </slot>
    </template>

    <template 
      v-for="nombreCol in columnasTextoLargo" 
      :key="nombreCol" 
      #[`body-cell-${nombreCol}`]="propsCell"
    >
      <slot :name="`body-cell-${nombreCol}`" v-bind="propsCell">
        <q-td :props="propsCell">
          <TextoExpandible :texto="String((propsCell.row as Record<string, unknown>)[nombreCol] || '')" />
        </q-td>
      </slot>
    </template>

    <template #body-cell-opciones="propsCell">
      <slot name="body-cell-opciones" v-bind="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn dense round class="global-btn-page" icon="sym_o_edit_square" @click="emitirAccion('editar', propsCell.row)">
            <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round color="negative" icon="delete_forever" @click="emitirAccion('eliminar', propsCell.row)">
            <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </slot>
    </template>

    <template v-for="nombreSlot in slotsDinamicos" :key="nombreSlot" #[nombreSlot]="slotProps">
      <slot :name="nombreSlot" v-bind="slotProps ?? {}" />
    </template>
  </q-table>
</template>

<script setup lang="ts" generic="T extends { id?: number | string }">
import { computed, useSlots } from 'vue';
import { useQuasar } from 'quasar';
import type { QTableColumn } from 'quasar';
import TextoExpandible from 'src/components/core/TextoExpandible.vue'; // <-- Importamos tu super componente

const $q = useQuasar();
const $slots = useSlots(); 

const props = withDefaults(defineProps<{
  titulo?: string;
  filas: T[];
  columnas: QTableColumn<T>[];
  estaCargando?: boolean;
  modeloBusqueda?: string;
  columnasTextoLargo?: string[]; 
}>(), {
  columnasTextoLargo: () => ['descripcion'] // Asume 'descripcion' si el padre no manda nada
}); 

// 🎯 Definición estricta de emits usando sintaxis de objeto para calmar a Vue-tsc
const emit = defineEmits<{
  editar: [id: string | number];
  eliminar: [id: string | number];
  cambiarEstado: [id: string | number];
}>();

const faviconSrc = computed(() => $q.dark.isActive ? 'favicondark.ico' : 'faviconlight.ico');

const slotsDinamicos = computed(() => {
  const slotsOcupados = [
    'no-data', 
    'body-cell-numero', 
    'body-cell-opciones',
    ...props.columnasTextoLargo.map(col => `body-cell-${col}`)
  ];
  return Object.keys($slots).filter(key => !slotsOcupados.includes(key));
});

// Tipamos estrictamente las acciones genéricas que la tabla base soporta
type AccionesBase = 'editar' | 'eliminar' | 'cambiarEstado';

const emitirAccion = (accion: AccionesBase, fila: T) => {
  if (fila.id !== undefined && fila.id !== null) {
    if (accion === 'editar') {
      emit('editar', fila.id);
    } else if (accion === 'eliminar') {
      emit('eliminar', fila.id);
    } else if (accion === 'cambiarEstado') {
      emit('cambiarEstado', fila.id);
    }
  }
};
</script>

<style scoped>
.magnifier-searching {
  /* Mantenemos una transición fluida */
  will-change: transform;
  animation: searchOrbit 0.6s ease-in-out infinite;
}

@keyframes searchOrbit {
  0% {
    transform: translate(0, 0);
  }
  12% {
    transform: translate(-2px, 2px);
  }
  25% {
    /* Se mueve un poco a la derecha y abajo */
    transform: translate(-4px, 4px);
  }
  37% {
    transform: translate(-2px, 6px);
  }
  50% {
    /* Baja y va a la izquierda */
    transform: translate(0px, 8px);
  }
  62% {
    transform: translate(2px, 6px);
  }
  75% {
    /* Sube a la izquierda */
    transform: translate(4px, 4px);
  }
  87% {
    transform: translate(4px, 2px);
  }
  100% {
    /* Retorna perfectamente al punto inicial */
    transform: translate(0, 0);
  }
}
</style>