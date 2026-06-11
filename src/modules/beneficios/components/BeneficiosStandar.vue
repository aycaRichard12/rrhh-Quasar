<template>
  <q-card>
    <q-table bordered flat
      row-key="id"
      class="global-table-header"
      :rows="props.rows"
      :columns="listaColumnas"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
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
import { obtenerColumnasBeneficiosEstandar } from '../utils/beneficios.columns';
import type { Beneficio } from '../types/beneficios.types';

const { t } = useI18n();

const props = defineProps<{
  rows: Beneficio[]
}>();

const listaColumnas = computed(() => obtenerColumnasBeneficiosEstandar(t))
</script>