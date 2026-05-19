<template>
 <div>
  <div class="row justify-between items-center q-mb-md">
   <q-btn
    color="secondary"
    icon="cloud_download"
    :label="$t('entity.form.buttonImport')"
    outline
    @click="$emit('import')"
   />
   <q-btn
    color="primary"
    icon="add"
    :label="$t('entity.form.formNew')"
    @click="$emit('create')"
   />
  </div>
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

   <template v-slot:body-cell-estado="props">
    <q-td :props="props" class="text-center">
     <q-btn
      v-if="props.row.estado === '1' || props.row.estado === 1"
      icon="thumb_up"
      color="primary"
      round
      dense
      size="sm"
      @click="$emit('change-status', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.active') }}
      </q-tooltip>
     </q-btn>

     <q-btn 
      v-else
      icon="thumb_down"
      color="negative"
      round
      dense
      size="sm"
      @click="$emit('change-status', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.inactive') }}
      </q-tooltip>
     </q-btn>
    </q-td>
   </template>

   <template v-slot:body-cell-opciones="props">
    <q-td :props="props" class="text-center">
     <q-btn
      icon="edit"
      color="info"
      round
      dense
      size="sm"
      @click="$emit('edit', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.edit') }}
      </q-tooltip>
     </q-btn>
          
     <q-btn
      icon="delete"
      color="negative"
      round
      dense
      size="sm"
      @click="$emit('delete', props.row.id)"
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

defineProps<{ rows: EnteRegulador[]; cargando: boolean }>();

defineEmits([ 'create', 'edit', 'delete', 'change-status', 'import' ]);

const columnas= computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                       align: 'center', field: 'numero',     style: 'width: 20px' },
  { name: 'nombre',     label: t('entity.form.name'),      align: 'left', field: 'nombre',       style: 'white-space: normal; width: 150px' },
  { name: 'porcentaje', label: t('entity.form.percentage'),align: 'center', field: 'porcentaje', style: 'width: 20px' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entity.form.amount'),    align: 'right',  field: 'monto',      style: 'width: 50px'},
  { name: 'orden',      label: t('entity.form.order'),     align: 'center', field: 'orden',      style: 'width: 30px'},
  { name: 'estado',     label: t('tables.status'),         align: 'center', field: 'estado' ,    style: 'width: 30px'},
  { name: 'opciones',   label: t('tables.options'),        align: 'center', field: 'opciones',   style: 'width: 50px'}
]);
</script>