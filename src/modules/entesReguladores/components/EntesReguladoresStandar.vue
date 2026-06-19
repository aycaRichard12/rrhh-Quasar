<template>
  <q-table bordered flat 
    :rows="props.rows"
    :columns="listaColumnas"
    row-key="id"
    :rows-per-page-label="t('common.report.recordsPerPage')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell" class="text-right">
        {{ propsCell.rowIndex + 1 }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasEntesReguladoresEstandar } from '../utils/entesReguladores.columns';
import type { EnteRegulador } from '../types/entesReguladores.types';

const { t } = useI18n();

const props = defineProps<{ rows: EnteRegulador[] }>();

const listaColumnas = computed(() => obtenerColumnasEntesReguladoresEstandar(t));
</script>
