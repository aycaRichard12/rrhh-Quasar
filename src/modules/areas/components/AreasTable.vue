<template>
 <q-card>
  <q-table flat bordered
   :rows="props.listaAreas"
   :columns="columnas"
   row-key="id"
   :rows-per-page-label="t('common.report.recordsPerPage')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
  >

   <template v-slot:body-cell-numero="props">
    <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
   </template>
      
   <template v-slot:body-cell-opciones="props">
    <q-td :props="props" class="text-center q-gutter-xs">
     <q-btn round dense
      icon="edit" 
      color="info"
      @click="emitirEditar(props.row.id)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ t('common.actions.edit') }}
      </q-tooltip>
     </q-btn>
     
     <q-btn round dense
      icon="delete"
      color="negative"
      @click="emitirEliminar(props.row.id)"
      >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ t('common.actions.delete') }}
      </q-tooltip>
     </q-btn>
    </q-td>
   </template>
  </q-table>
 </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { QTableColumn } from 'quasar'
import type { Area } from '../types/areas.types'

const { t } = useI18n()

const props = defineProps<{
  listaAreas: Area[]
}>();

const emits = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const emitirEditar = (id: string) => emits('editar', id);
const emitirEliminar = (id: string) => emits('eliminar', id);

const columnas = computed<QTableColumn<Area>[]>(() => [
  { name: 'numero',     label: 'N°',                   align: 'center',field: () => null },
  { name: 'nombre',     label: t('areas.form.name'),   align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 150px;'},
  { name: 'descripcion',label: t('tables.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'sucursal',   label: t('areas.form.branch'), align: 'center',
  field: (row: Area) => {
    if (row.sucursal) {
      return `${row.sucursal.nombre} - ${row.sucursal.region}`;
    }
    return t('areas.form.noBranch');
    }, style: 'white-space: normal; width: 150px;'
  },
  { name: 'opciones',   label: t('tables.options'),    align: 'center', field: () => null  }
]);
</script>