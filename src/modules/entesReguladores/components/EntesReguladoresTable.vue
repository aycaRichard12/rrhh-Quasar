<template>
  <q-card>
    <q-table flat bordered
      :rows="props.listaEntesReguladores"
      :columns="listaColumnas"
      row-key="id"

      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >

      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-btn round dense
            :color="String(propsCell.row.estado) === '1' ? 'positive' : 'negative'"
            :icon ="String(propsCell.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
            @click="$emit('cambiarEstadoEnteRegulador', propsCell.row)"
          >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{ $t('common.actions.active') }}
          </q-tooltip>
        </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center">
        <q-btn round dense
          icon="edit"
          color="info"
          @click="emitirEditar(propsCell.row.id)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{ $t('common.actions.edit') }}
          </q-tooltip>
        </q-btn>
              
        <q-btn dense round 
          icon="delete"
          color="negative"
          @click="emitirEliminar(propsCell.row.id)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{ $t('common.actions.delete') }}
          </q-tooltip>
        </q-btn>
        </q-td>
      </template>
  </q-table>
 </q-card>
</template>

<script setup lang="ts">
import { computed} from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasEntesReguladores } from '../utils/entesReguladores.columns';
import type { EnteRegulador } from '../types/entesReguladores.types';

const { t } = useI18n();

const props = defineProps<{ listaEntesReguladores: EnteRegulador[] }>();

const emits = defineEmits<{
  (e: 'editar', id: string): void
  (e: 'eliminar', id: string): void
  (e: 'cambiarEstadoEnteRegulador', enteRegulador: EnteRegulador): void
}>();

const emitirEditar = (id: string) => emits('editar', id);
const emitirEliminar = (id: string) => emits('eliminar', id);

const listaColumnas = computed(() => obtenerColumnasEntesReguladores(t))
</script>