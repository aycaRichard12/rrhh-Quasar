<template>
 <q-card>
  <q-table
   :rows="props.listaEntesReguladores"
   :columns="columnas"
   row-key="id"
   :rows-per-page-label="t('common.report.recordsPerPage')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
   flat
   bordered
  >

   <template v-slot:body-cell-numero="props">
    <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
   </template>

   <template v-slot:body-cell-estado="props">
    <q-td :props="props" class="text-center">
     <q-btn round dense
      :color="String(props.row.estado) === '1' ? 'positive' : 'negative'"
      :icon="String(props.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
      @click="emitirCambiarEstado(props.row.id, props.row.estado)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.active') }}
      </q-tooltip>
     </q-btn>
    </q-td>
   </template>

   <template v-slot:body-cell-opciones="props">
    <q-td :props="props" class="text-center">
     <q-btn round dense
      icon="edit"
      color="info"
      @click="emitirEditar(props.row.id)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.edit') }}
      </q-tooltip>
     </q-btn>
          
     <q-btn round dense
      icon="delete"
      color="negative"
      @click="emitirEliminar(props.row.id)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.delete') }}
      </q-tooltip>
     </q-btn>
    </q-td>
   </template>
  </q-table>
 </q-card>
</template>

<script setup lang="ts">
import { computed} from 'vue';
import { useI18n } from 'vue-i18n';
import type { QTableColumn } from 'quasar';
import type { EnteRegulador } from '../types/entesReguladores.types';

const { t } = useI18n();

const props = defineProps<{
  listaEntesReguladores: EnteRegulador[]
}>();

const emits = defineEmits<{
  (e: 'editar', id: string | number): void;
  (e: 'eliminar', id: string | number): void;
  (e: 'cambiarEstado', id: string | number, estado: string | number): void;
}>();

const emitirEditar = (id: string | number) => emits('editar', id);
const emitirEliminar = (id: string | number) => emits('eliminar', id);
const emitirCambiarEstado = (id: string | number, estado: string | number) => emits('cambiarEstado', id, estado);

const columnas = computed<QTableColumn<EnteRegulador>[]>(() => [
  { name: 'numero',     label: 'N°',                       align: 'center', field: () => null ,  style: 'width: 20px' },
  { name: 'nombre',     label: t('entity.form.name'),      align: 'left', field: 'nombre',       style: 'white-space: normal; width: 150px' },
  { name: 'porcentaje', label: t('entity.form.percentage'),align: 'center', field: 'porcentaje', style: 'width: 20px' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entity.form.amount'),    align: 'right',  field: 'monto',      style: 'width: 50px'},
  { name: 'orden',      label: t('entity.form.order'),     align: 'center', field: 'orden',      style: 'width: 30px'},
  { name: 'estado',     label: t('tables.status'),         align: 'center', field: 'estado' ,    style: 'width: 30px'},
  { name: 'opciones',   label: t('tables.options'),        align: 'center', field: () => null ,  style: 'width: 50px'}
]);
</script>