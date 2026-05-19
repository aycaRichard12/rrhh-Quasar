<template>
 <div class="row justify-end q-mb-md">
  <q-btn
   color="primary"
   icon="add"
   :label="t('areas.form.formNew')"
   @click="$emit('create')"
  />
 </div>

 <q-card>
  <q-table
   :rows="rows"
   :columns="columnas"
   row-key="id"
   :loading="cargando"
   :rows-per-page-label="t('common.report.recordsPerPage')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
   flat
   bordered
  >

   <template v-slot:body-cell-numero="props">
    <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
   </template>
      
   <template v-slot:body-cell-opciones="props">
    <q-td :props="props" class="text-center q-gutter-xs">
     <q-btn
      icon="edit" 
      color="info"
      round
      dense
      size="sm"
      @click="$emit('edit', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ t('common.actions.edit') }}
      </q-tooltip>
     </q-btn>
     
     <q-btn
      icon="delete"
      color="negative"
      round
      dense
      size="sm"
      @click="$emit('delete', props.row.id)">
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

defineProps<{ rows: Area[] ; cargando: boolean }>();

defineEmits([ 'create', 'edit', 'delete' ]);

const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                   align: 'center',field: 'numero'},
  { name: 'nombre',     label: t('areas.form.name'),  align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 150px;'},
  { name: 'descripcion',label: t('tables.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'sucursal',   label: t('areas.form.branch'),align: 'center',
  field: (row: Area) => {
    if (row.sucursal) {
      return `${row.sucursal.nombre} - ${row.sucursal.region}`;
    }
    return t('areas.form.noBranch');
    }, style: 'white-space: normal; width: 150px;'
  },
  { name: 'opciones',   label: t('tables.options'),    align: 'center', field: 'opciones' }
]);
</script>