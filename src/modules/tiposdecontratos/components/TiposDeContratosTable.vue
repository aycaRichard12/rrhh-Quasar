<template>
  <q-card>
    <q-table bordered flat
      row-key="id"
      class="global-table-header"
      :rows="props.listaTiposDeContratos"
      :columns="listaColumnas"
      :filter="props.filtro"
      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell">
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
import { obtenerColumnasTiposDeContratos } from '../utils/tiposDeContratos.columns'
import type { TipoDeContrato } from '../types/tiposDeContratos.types'

const { t } = useI18n()

const props = defineProps<{
  listaTiposDeContratos: TipoDeContrato[]
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void
  (e: 'eliminar', id: number): void
}>()

const emitirEditar = (id: number) => emits('editar', id)
const emitirEliminar = (id: number) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasTiposDeContratos(t));
</script>