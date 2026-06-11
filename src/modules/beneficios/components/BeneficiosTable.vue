<template>
  <TablaGenerica
    :filas="listaBeneficios"
    :columnas="listaColumnas"
    :esta-cargando="cargando"
    v-model:modelo-busqueda="filtroInterno"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">
        {{ propsCell.rowIndex + 1 }}
      </q-td>
    </template>
   
    <template v-slot:body-cell-estado="propsCell">
      <q-td :props="propsCell" class="text-center">
        <q-btn
          round dense
          :color="propsCell.row.estado === 1 ? 'positive' : 'negative'"
          :icon="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
          @click="emitirCambioEstado(propsCell.row)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.active') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
  
    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell" class="text-center q-gutter-xs">
        <q-btn
          dense round
          class="global-btn-page"
          icon="sym_o_edit_square"
          @click="emitirEditar(propsCell.row.id)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          dense round
          icon="delete_forever"
          color="negative"
          @click="emitirEliminar(propsCell.row.id)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.delete') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </TablaGenerica>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Beneficio } from '../types/beneficios.types';
import { obtenerColumnasBeneficios } from '../utils/beneficios.columns';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
   
const { t } = useI18n();
   
const props = defineProps<{
  listaBeneficios: Beneficio[];
  cargando: boolean;
  filtro: string;
}>();
   
const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'cambiarEstadoRegistro', beneficio: Beneficio): void;
  (e: 'update:filtro', val: string): void;
}>();
   
const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});
   
const listaColumnas = computed(() => obtenerColumnasBeneficios(t));

const emitirEditar = (id?: number): void => {
       if (id) emits('editar', id);
     };
    
     const emitirEliminar = (id?: number): void => {
       if (id) emits('eliminar', id);
     };
   
    const emitirCambioEstado = (beneficio: Beneficio): void => {
      emits('cambiarEstadoRegistro', beneficio);
    };
</script>





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