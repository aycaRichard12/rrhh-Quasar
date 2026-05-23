<template>
  <q-table
   :rows="props.rows"
   :columns="listaColumnas"
   row-key="id"
   :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
   flat
   bordered
  >   
   <template v-slot:body-cell-numero="propsCell">
    <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
   </template>

   <template v-slot:body-cell-tipo="propsCell">
    <q-td :props="propsCell" class="text-center">
     <q-chip dense outline color="primary">
      {{ propsCell.row.tipo === '1' || propsCell.row.tipo === 1 || propsCell.row.tipo === 'Porcentaje' ? 'Porcentaje' : 'Monto Especifico' }}
     </q-chip>
    </q-td>
   </template>

   <template v-slot:body-cell-destino="propsCell">
    <q-td :props="propsCell" class="text-center">
     <q-chip dense outline color="primary">
      {{ propsCell.row.destino === '1' || propsCell.row.destino === 1 ? 'Finiquito' : 'Bono' }}
     </q-chip>
    </q-td>
   </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasBeneficiosEstandar } from '../utils/beneficios.columns';
import type { Beneficio } from '../types/beneficios.types';

const { t } = useI18n();

const props = defineProps<{ rows: Beneficio[] }>();

const listaColumnas = computed(() => obtenerColumnasBeneficiosEstandar(t));
</script>