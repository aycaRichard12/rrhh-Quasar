<template>
  <q-table
    ref="tablaRef"
    class="global-table-header"
    row-key="id"
    :columns="columnas"
    :filter="modeloBusqueda"
    :loading="estaCargando"
    :rows="estaCargando ? [] : filas"
    :title="titulo"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
    :pagination-label="(inicio, fin, total) => `${inicio}-${fin} ${$t('common.report.of')} ${total}`"
  >
    <template #header="props">
      <q-tr :props="props" class="global-table-header">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          :class="col.headerClasses"
        >
          <div class="row items-center justify-between no-wrap">
            <span>{{ col.label }}</span>
            
            <slot :name="`header-filtro-${col.name}`" :columna="col"></slot>
          </div>
        </q-th>
      </q-tr>
    </template>

    <!-- <template #loading>
    <div v-if="estaCargando" style="height: 200px;">
      <q-inner-loading showing style="z-index: 10;">
        <div class="full-width column flex-center q-py-xl" style="width: 100%;">
          <img :src="faviconSrc" alt="Buscando..." class="magnifier-searching" style="height: 70px; width: 70px" />
          <span class="text-h5 text-weight-medium q-mt-md">{{ $t('common.messages.loading') + '..wat.' }}</span>
        </div>
      </q-inner-loading>
    </div>
  </template> -->

    <template #loading>
      <div  style="height: 250px;">
        <q-inner-loading showing color="primary" style="z-index: 1000;">
          <div class="column items-center">
            <img :src="faviconSrc" alt="Buscando..." class="magnifier-searching" style="height: 70px; width: 70px"/>
            <span class="text-h5 text-weight-medium q-mt-md">{{ $t('common.messages.loading') }}</span>
          </div>
        </q-inner-loading>
      </div>
    </template>

    <template #no-data>
      <div v-if="!estaCargando" class="full-width column flex-center q-py-xl" style="height: 250px;">
        <q-icon name="folder_off" size="64px" color="grey-5" class="q-mb-sm" />
        <div class="text-h6 text-grey-7 text-center"> {{ modeloBusqueda ? 'No se encontraron coincidencias en la búsqueda' : 'No hay registros disponibles' }}</div>
      </div>
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

    <template #body-cell-numero="propsCell">
      <slot name="body-cell-numero" v-bind="propsCell">
        <q-td :props="propsCell">
          {{ propsCell.rowIndex + 1 }}
        </q-td>
      </slot>
    </template>

    <template #body-cell-opciones="propsCell">
      <q-td :props="propsCell">
        <div class="row justify-center q-gutter-sm">
          <slot name="botones-opciones-inicio" :fila="propsCell.row"></slot>
<!-- icon="sym_o_edit_square" -->
          <q-btn dense round v-if="mostrarEditar" class="global-btn-page" icon="edit" @click="emitirAccion('editar', propsCell.row)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round v-if="mostrarEliminar" color="negative" icon="delete_forever" @click="emitirAccion('eliminar', propsCell.row)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
          <slot name="botones-opciones-fin" :fila="propsCell.row"></slot>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import type { QTableColumn } from 'quasar';
import TextoExpandible from 'src/components/core/TextoExpandible.vue';

const $q = useQuasar();
// 1. Tipados Estrictos (Interfaces)
export interface FilaBase {
  id?: number;
  [key: string]: unknown;
}

export interface PropsTabla {
  filas: FilaBase[];
  columnas: QTableColumn[];
  estaCargando?: boolean;
  titulo?: string;
  modeloBusqueda?: string;
  columnasTextoLargo?: string[];
  mostrarEditar?: boolean;
  mostrarEliminar?: boolean;
}

withDefaults(defineProps<PropsTabla>(), {
  // const props = withDefaults(defineProps<{
  estaCargando: false,
  titulo: '',
  modeloBusqueda: '',
  mostrarEditar: true,
  mostrarEliminar: true,
  columnasTextoLargo: () => ['descripcion']
})
// 2. Emits Estrictos a Number
type AccionesBase = 'editar' | 'eliminar' | 'cambiarEstado';

const emit = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'cambiarEstado', id: number): void;
}>();

// 3. Manejo de Estado Interno
const tablaRef = ref();

// 4. Funciones Lógicas
const emitirAccion = (accion: AccionesBase, fila: FilaBase) => {
  // Garantizamos 100% que TypeScript y Vue manden un número
  const idNumerico = Number(fila.id);
    if (!isNaN(idNumerico) && idNumerico !== 0) {
      // Magia TypeScript: Al usar if/else, TS sabe exactamente qué firma usar en cada línea
      if (accion === 'editar') {
        emit('editar', idNumerico);
      } else if (accion === 'eliminar') {
        emit('eliminar', idNumerico);
      } else if (accion === 'cambiarEstado') {
        emit('cambiarEstado', idNumerico);
      }
    } else {
      console.error(`[TablaGenerica] Error: La fila no tiene un ID numérico válido para la acción ${accion}`, fila);
    }
};

const faviconSrc = computed(() => $q.dark.isActive ? 'favicondark.ico' : 'faviconlight.ico');
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