<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      class="global-table-header"
      :rows="props.listaAreas"
      :columns="listaColumnas"
      :filter="props.filtro"
      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>
      
      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emitirEditar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          
          <q-btn dense round
            color="negative"
            icon="delete_forever"
            @click="emitirEliminar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { obtenerColumnasAreas } from '../utils/areas.columns'
import type { Area } from '../types/areas.types'

const { t } = useI18n()

const props = defineProps<{
  listaAreas: Area[]
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: string): void
  (e: 'eliminar', id: string): void
}>()

const emitirEditar = (id: string) => emits('editar', id)
const emitirEliminar = (id: string) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasAreas(t))
</script>