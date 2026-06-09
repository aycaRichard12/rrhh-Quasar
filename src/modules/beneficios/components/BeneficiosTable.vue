<!-- <template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      class="global-table-header"
      :rows="props.listaBeneficios"
      :columns="listaColumnas"
      :filter="props.filtro"
      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
        <q-td :props="propsCell" class="q-gutter-xs">
          <q-btn round dense
            :color="propsCell.row.estado === 1 ? 'positive' : 'negative'"
            :icon ="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
            @click="$emit('cambiarEstadoRegistro', propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.active') }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="q-gutter-xs">
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emitirEditar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.edit') }}
            </q-tooltip>
          </q-btn>
          <q-btn dense round
            icon="delete_forever"
            color="negative"
            @click="emitirEliminar(propsCell.row.id)"
          >
            <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasBeneficios } from '../utils/beneficios.columns'
import type { Beneficio } from '../types/beneficios.types';

const { t } = useI18n();

const props = defineProps<{
  listaBeneficios: Beneficio[]
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void
  (e: 'eliminar', id: number): void
  (e: 'cambiarEstadoRegistro', beneficio: Beneficio): void
}>()

const emitirEditar = (id: number) => emits('editar', id)
const emitirEliminar = (id: number) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasBeneficios(t))
</script> -->

<!-- 
      <q-space />
      <q-toggle
        v-model="modoFiltrosAvanzados"
        checked-icon="filter_alt"
        color="negative"
        :label="modoFiltrosAvanzados ? 'Filtros Avanzados Activados' : 'Habilitar Filtros Avanzados'"
        keep-color
      />
   -->






<template>
  <q-card>
    <q-table 
      flat bordered
      row-key="id"
      class="global-table-header"
      :rows="listaFiltrada" 
      :columns="listaColumnas"
      :filter="props.filtro"
      :rows-per-page-label="$t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('common.report.of')} ${totalRows}`"
    >
      
      <template v-slot:header-cell="propsCell">
        <q-th :props="propsCell" class="relative-position text-center">
          
          <div class="row items-center justify-center inline-block cursor-pointer q-py-xs" style="width: 100%;">
            
            <span @click="propsCell.col.sortable ? propsCell.sort(propsCell.col) : null" class="text-weight-bold">
              {{ propsCell.col.label }}
              <q-icon 
                v-if="propsCell.col.sortable" 
                :name="propsCell.col.sortDirection === 'asc' ? 'arrow_upward' : (propsCell.col.sortDirection === 'desc' ? 'arrow_downward' : 'swap_vert')" 
                size="1.1em" 
                color="grey-6" 
              />
            </span>

            <TablaFiltroExcel
              v-if="propsCell.col.name !== 'numero' && propsCell.col.name !== 'opciones'"
              :col="propsCell.col"
              :datos-completos="datosCompletosExcel"
              :columna-ordenada="!!propsCell.col.sortDirection"
              :ocultar-valores="propsCell.col.name === 'descripcion'"  @ordenar="(dir) => manejarOrdenamientoExcel(dir, propsCell)"
              @aplicar="(config) => aplicarFiltroColumna(propsCell.col.name, config)"
            />
            
          </div>
        </q-th>
      </template>

      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
        <q-td :props="propsCell" class="q-gutter-xs">
          <q-btn round dense
            :color="propsCell.row.estado === 1 ? 'positive' : 'negative'"
            :icon ="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
            @click="$emit('cambiarEstadoRegistro', propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.active') }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="q-gutter-xs">
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emitirEditar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.edit') }}
            </q-tooltip>
          </q-btn>
          <q-btn dense round
            icon="delete_forever"
            color="negative"
            @click="emitirEliminar(propsCell.row.id)"
          >
            <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>

    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasBeneficios } from '../utils/beneficios.columns';
import type { Beneficio } from '../types/beneficios.types';

// Importamos la UI y el Cerebro del Filtro
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import { useFiltroExcel } from 'src/composables/core/useFiltroExcel';

const datosCompletosExcel = computed(() => props.listaBeneficios as unknown as Record<string, unknown>[]);
const { t } = useI18n();

const props = defineProps<{
  listaBeneficios: Beneficio[]
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void
  (e: 'eliminar', id: number): void
  (e: 'cambiarEstadoRegistro', beneficio: Beneficio): void
}>()

const emitirEditar = (id: number) => emits('editar', id)
const emitirEliminar = (id: number) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasBeneficios(t));

// --- LA MAGIA DE NUESTRO FILTRO EXCEL ---
const { listaBeneficios } = toRefs(props); // Convertimos el prop en Ref para el composable
const { listaFiltrada, aplicarFiltroColumna } = useFiltroExcel(listaBeneficios);

// Función para manejar las 3 primeras opciones del menú (Ordenar y Quitar Orden)
// any es evitado tipando dinámicamente o usando las props genéricas de la celda.
const manejarOrdenamientoExcel = (direccion: 'asc' | 'desc' | 'none', propsCell: Record<string, unknown>) => {
  const sortFn = propsCell.sort as () => void;
  // Quasar intercala asc -> desc -> none por cada click nativo.
  // Al darle click a nuestras opciones, invocamos la funcion nativa.
  sortFn(); 
};
</script>