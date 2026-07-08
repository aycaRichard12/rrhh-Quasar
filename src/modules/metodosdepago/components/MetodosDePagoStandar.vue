<template>
  <q-card>
    <q-table bordered flat
      row-key="id"
      class="global-table-header"
      :rows="props.rows"
      :columns="listaColumnas"
      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasMetodosDePagoEstandar } from '../utils/metodosDePago.columns';
import type { MetodoDePago } from '../types/metodosDePago.types';

const { t } = useI18n();

const props = defineProps<{
  rows: MetodoDePago[]
}>();

const listaColumnas = computed(() => obtenerColumnasMetodosDePagoEstandar(t));
</script>