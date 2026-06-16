<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      class="global-table-header"
      :rows="props.rows"
      :columns="listaColumnas"
      :loading="props.loading"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td
          class="text-center q-gutter-xs"
          :props="propsCell"
        >
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emits('editar', propsCell.row.id!)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round
            color="negative"
            icon="delete_forever"
            @click="emits('eliminar', propsCell.row.id!)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RangosDeEvaluacion } from '../types/metodosDeEvaluacion.types';
import { obtenerColumnasRangosDeEvaluacion } from '../utils/metodosDeEvaluacion.columns';

const { t } = useI18n();

const props = defineProps<{
  rows: RangosDeEvaluacion[];
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
}>();

const listaColumnas = computed(() => obtenerColumnasRangosDeEvaluacion(t));
</script>
