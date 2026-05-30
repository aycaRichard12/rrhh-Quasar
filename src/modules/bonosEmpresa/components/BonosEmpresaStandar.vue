<template>
  <q-table bordered flat
    row-key="id"
    :rows="props.rows"
    :columns="listaColumnas"   
    :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-tipo="propsCell">
    <q-td :props="propsCell" class="text-center">
     <q-chip dense outline color="primary">
      {{ propsCell.row.tipo === '1' || propsCell.row.tipo === 1 ? 'Porcentaje' : propsCell.row.tipo === '2' || propsCell.row.tipo === 2 ? 'Fórmula' : 'Monto Específico' }}
     </q-chip>
    </q-td>
   </template>

   <template v-slot:body-cell-destino="propsCell">
    <q-td :props="propsCell" class="text-center">
     <q-chip dense outline color="primary">
      {{ propsCell.row.destino === '1' || propsCell.row.destino === 1 ? 'Bono' : 'Finiquito' }}
     </q-chip>
    </q-td>
   </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasBonosEmpresaEstandar } from '../utils/bonosEmpresa.columns';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const { t } = useI18n();

const props = defineProps<{ rows: BonoEmpresa[] }>();

const listaColumnas = computed (() => obtenerColumnasBonosEmpresaEstandar(t))
</script>