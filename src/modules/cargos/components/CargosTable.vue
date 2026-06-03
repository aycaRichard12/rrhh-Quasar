<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      class="global-table-header"
      :rows="props.listaCargos"
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
          <q-btn dense round icon="sym_o_edit_square" class="global-btn-page" @click="emitirEditar(propsCell.row.id)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round icon="delete" color="negative" @click="emitirEliminar(propsCell.row.id)">
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
import { obtenerColumnasCargos } from '../utils/cargos.columns'
import type { Cargo } from '../types/cargos.types'

const { t } = useI18n()

const props = defineProps<{
  listaCargos: Cargo[]
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: string): void
  (e: 'eliminar', id: string): void
}>()

const emitirEditar = (id: string) => emits('editar', id)
const emitirEliminar = (id: string) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasCargos(t))
</script>