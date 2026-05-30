<template>
  <q-table bordered flat 
    :rows="props.rows"
    :columns="listaColumnas"
    row-key="id"
    :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-porcentaje="propsCell">
      <q-td :props="propsCell" class="text-center">
        {{ propsCell.row.porcentaje }} %
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

const listaColumnas = computed(() => obtenerColumnasEntesReguladoresEstandar(t))
</script>