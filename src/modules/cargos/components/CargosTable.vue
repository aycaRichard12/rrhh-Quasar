<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      :rows="props.listaCargos"
      :columns="listaColumnas"
      :filter="props.filtro"
      :grid="$q.screen.lt.sm"
      table-header-class="bg-primary"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-salario="propsCell">
        <q-td :props="propsCell" class="text-right font-weight-bold">
          <q-chip dense outline color="positive">
             Bs. {{ propsCell.row.salario }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn dense round icon="edit" color="info" @click="emitirEditar(propsCell.row.id)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.edit', 'Editar') }}
            </q-tooltip>
          </q-btn>
          <q-btn dense round icon="delete" color="negative" @click="emitirEliminar(propsCell.row.id)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.delete', 'Eliminar') }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasCargos } from '../utils/cargos.columns';
import type { Cargo } from '../types/cargos.types';

const { t } = useI18n();

const props = defineProps<{
  listaCargos: Cargo[];
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const emitirEditar = (id: string) => emits('editar', id);
const emitirEliminar = (id: string) => emits('eliminar', id);

const listaColumnas = computed(() => obtenerColumnasCargos(t));
</script>