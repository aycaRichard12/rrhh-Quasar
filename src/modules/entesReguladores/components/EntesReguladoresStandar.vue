<template>
  <div class="row justify-between items-center q-mb-md">
   <q-btn 
    icon="arrow_back" 
    :label="$t('formBtn.back', 'Volver')" 
    color="negative" 
    outline
    @click="$emit('volver')" 
   />

   <div class="q-gutter-sm">
    <q-btn 
     icon="autorenew" 
     :label="$t('formBtn.replace', 'Reemplazar')" 
     color="warning" 
     :loading="cargando"
     :disable="cargando"
     @click="$emit('procesar', 1)" 
    />
    <q-btn 
     icon="add" 
     :label="$t('formBtn.add', 'Añadir')" 
     color="positive" 
     :loading="cargando"
     :disable="cargando"
     @click="$emit('procesar', 2)" 
    />
   </div>
  </div>

  <q-table
   :rows="rows"
   :columns="columnas"
   row-key="id"
   :loading="cargando"
   :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
   flat 
   bordered
  >
   <template v-slot:body-cell-numero="props">
    <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
   </template>

   <template v-slot:body-cell-porcentaje="props">
    <q-td :props="props" class="text-center">
     {{ props.row.porcentaje }} %
    </q-td>
   </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QTableColumn } from 'quasar';
import type { EnteReguladorEstandar } from '../types/entesReguladores.types';

const { t } = useI18n();

defineProps<{
  rows: EnteReguladorEstandar[];
  cargando: boolean;
}>();

defineEmits(['volver', 'procesar']);

const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                        align: 'center',field: 'numero',     style: 'width: 50px' },
  { name: 'nombre',     label: t('entes.table.name'),       align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 180px' },
  { name: 'porcentaje', label: t('entes.table.percentage'), align: 'center',field: 'porcentaje', style: 'width: 80px' },
  { name: 'descripcion',label: t('entes.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entes.table.amount'),     align: 'right', field: 'monto',      style: 'width: 80px'},
  { name: 'orden',      label: t('entes.table.order'),      align: 'center',field: 'orden',      style: 'width: 80px'}
]);
</script>