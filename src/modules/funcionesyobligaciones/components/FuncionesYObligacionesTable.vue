<template>
  <q-table
    flat
    bordered
    :rows="listaFuncionesYObligaciones"
    :columns="columnas"
    row-key="id"
    :filter="filtro"
    :rows-per-page-label="t('common.registrosPorPagina')"
  >
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn
          flat
          round
          dense
          color="info"
          icon="edit"
          @click="emit('editar', String(props.row.id))"
        >
          <q-tooltip>{{ t('common.editar') }}</q-tooltip>
        </q-btn>
        
        <q-btn
          flat
          round
          dense
          color="negative"
          icon="delete"
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