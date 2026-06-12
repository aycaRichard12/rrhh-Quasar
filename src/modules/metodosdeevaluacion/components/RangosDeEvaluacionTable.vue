<template>
  <q-table
    flat bordered
    row-key="id"
    :rows="props.rows"
    :columns="listaColumnas"
    :loading="props.loading"
    class="global-table-header"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell" class="text-center q-gutter-xs">
        <q-btn flat round dense icon="edit" color="primary" @click="emits('editar', propsCell.row.id!)">
          <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="delete" color="negative" @click="emits('eliminar', propsCell.row.id!)">
          <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
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
