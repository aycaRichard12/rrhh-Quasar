<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      :rows="props.listaPrerrequisitos"
      :columns="listaColumnas"
      :filter="props.filtro"

      table-header-class="bg-primary"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-cargo="propsCell">
        <q-td :props="propsCell" class="text-center font-weight-bold text-primary">
          {{ propsCell.row.cargo }}
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
import { obtenerColumnasPrerrequisitos } from '../utils/prerrequisitosCargo.columns';
import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';

const { t } = useI18n();

const props = defineProps<{
  listaPrerrequisitos: PrerrequisitoCargo[];
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const emitirEditar = (id: string) => emits('editar', id);
const emitirEliminar = (id: string) => emits('eliminar', id);

const listaColumnas = computed(() => obtenerColumnasPrerrequisitos(t));
</script>