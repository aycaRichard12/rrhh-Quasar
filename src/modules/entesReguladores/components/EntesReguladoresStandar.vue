<template>
  <div>
    <div class="row justify-between items-center q-mb-md">
      <q-btn color="primary" icon="arrow_back" label="Volver" @click="emitirVolver" />
      
      <div class="q-gutter-sm">
        <q-btn color="primary" label="Reemplazar" @click="emitirProcesar(1)" />
        <q-btn color="secondary" label="Añadir" @click="emitirProcesar(2)" />
      </div>
    </div>

    <q-table
      :rows="props.listaEntesReguladoresEstandar"
      :columns="columnas"
      row-key="id"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QTableColumn } from 'quasar';
import type { EnteRegulador } from '../types/entesReguladores.types';

const { t } = useI18n();

const props = defineProps<{
  listaEntesReguladoresEstandar: EnteRegulador[];
}>();

const emits = defineEmits<{
  (e: 'volver'): void;
  (e: 'procesarImportacion', tipo: number): void;
}>();

const emitirVolver = () => emits('volver');
const emitirProcesar = (tipo: number) => emits('procesarImportacion', tipo);

const columnas = computed<QTableColumn<EnteRegulador>[]>(() => [
  { name: 'numero',     label: 'N°',                        align: 'center',field: () => null,     style: 'width: 50px' },
  { name: 'nombre',     label: t('entes.table.name'),       align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 180px' },
  { name: 'porcentaje', label: t('entes.table.percentage'), align: 'center',field: 'porcentaje', style: 'width: 80px' },
  { name: 'descripcion',label: t('entes.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entes.table.amount'),     align: 'right', field: 'monto',      style: 'width: 80px'},
  { name: 'orden',      label: t('entes.table.order'),      align: 'center',field: 'orden',      style: 'width: 80px'}
]);
</script>