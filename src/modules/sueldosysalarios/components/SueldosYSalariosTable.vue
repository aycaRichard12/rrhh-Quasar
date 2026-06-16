<template>
  <q-table
    class="global-table-header"
    flat bordered
    :rows="props.rows"
    :columns="columns"
    row-key="id"
    :loading="props.loading"
  >
    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell" class="q-gutter-xs">
        <q-btn flat round dense icon="edit" color="primary" @click="emits('editar', propsCell.row.id!)" />
        <q-btn flat round dense icon="delete" color="negative" @click="emits('eliminar', propsCell.row.id!)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { obtenerColumnasSueldosYSalarios } from '../utils/sueldosYSalarios.columns';
import type { SueldosYSalarios } from '../types/sueldosYSalarios.types';

const props = defineProps<{
  rows: SueldosYSalarios[];
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const { t } = useI18n();
const columns = obtenerColumnasSueldosYSalarios(t);

</script>
