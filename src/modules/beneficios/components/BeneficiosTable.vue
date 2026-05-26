<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      :rows="props.listaBeneficios"
      :columns="listaColumnas"
      :grid="$q.screen.lt.sm"
      table-header-class="bg-primary"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
    >

      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-tipo="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-chip dense outline color="primary">
            {{ propsCell.row.tipo === '1' || propsCell.row.tipo === 1 ? 'Porcentaje' : 'Monto Fijo' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-destino="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-chip dense outline color="primary">
            {{ propsCell.row.destino === '1' || propsCell.row.destino === 1 ? 'Planilla' : 'Finiquito' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-btn round dense
            :color="String(propsCell.row.estado) === '1' ? 'positive' : 'negative'"
            :icon ="String(propsCell.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
            @click="$emit('cambiarEstadoRegistro', propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.active') }}
            </q-tooltip>
          </q-btn>
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
            <q-tooltip>{{ $t('common.actions.delete', 'Eliminar') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { obtenerColumnasBeneficios } from '../utils/beneficios.columns'
import type { Beneficio } from '../types/beneficios.types';

const { t } = useI18n();
const $q = useQuasar();

const props = defineProps<{
  listaBeneficios: Beneficio[]
}>()

const emits = defineEmits<{
  (e: 'editar', id: string): void
  (e: 'eliminar', id: string): void
  (e: 'cambiarEstadoRegistro', beneficio: Beneficio): void
}>()

const emitirEditar = (id: string) => emits('editar', id)
const emitirEliminar = (id: string) => emits('eliminar', id)

const listaColumnas = computed(() => obtenerColumnasBeneficios(t))
</script>