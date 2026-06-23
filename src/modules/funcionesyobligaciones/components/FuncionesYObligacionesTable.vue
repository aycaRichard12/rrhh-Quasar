<template>
  <q-table bordered flat
    row-key="id"
    class="global-table-header"
    :rows="listaFuncionesYObligaciones"
    :columns="columnas"
    :filter="filtro"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('common.report.of')} ${totalRows}`"
  >
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn dense flat round
          class="global-btn-page"
          icon="sym_o_edit_square"
          @click="emit('editar', String(props.row.id))"
        >
          <q-tooltip>{{ t('common.editar') }}</q-tooltip>
        </q-btn>
        
        <q-btn dense round
          color="negative"
          icon="delete_forever"
          @click="emit('eliminar', String(props.row.id))"
        >
          <q-tooltip>{{ t('common.eliminar') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>

  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';
import { obtenerColumnasFuncionesYObligaciones } from '../utils/funcionesYObligaciones.columns';

defineProps<{
  listaFuncionesYObligaciones: FuncionYObligacion[];
  filtro: string;
}>();

const emit = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const { t } = useI18n();
const columnas = computed(() => obtenerColumnasFuncionesYObligaciones(t));
</script>