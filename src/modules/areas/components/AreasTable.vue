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

      <template v-slot:loading>
      <q-inner-loading showing color="primary">
        <q-spinner-orbit size="50px" color="primary" />
        <span class="q-mt-sm text-subtitle2 text-primary">
          {{ t('common.actions.loading') || 'Cargando datos...' }}
        </span>
      </q-inner-loading>
    </template>

    <template v-slot:no-data>
      <div class="full-width row flex-center text-grey-7 q-gutter-sm q-py-lg">
        <q-icon 
          :name="props.cargando ? 'autorenew' : 'search_off'" 
          :class="props.cargando ? 'rotate' : ''" 
          size="2rem" 
        />
        <span>
          {{ props.cargando ? 'Sincronizando información...' : t('common.report.noRecords') || 'No se encontraron registros' }}
        </span>
      </div>
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
  cargando: boolean;
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void
  (e: 'eliminar', id: number): void
}>()

  // const emitirEditar = (id: number) => 
  //   emits('editar', id)
  // const emitirEliminar = (id: number) => 
  //   emits('eliminar', id)

  const emitirEditar = (id?: number) => {
    if (id) emits('editar', id);
  };

  const emitirEliminar = (id?: number) => {
    if (id) emits('eliminar', id);
  };

const listaColumnas = computed(() => obtenerColumnasAreas(t))
</script>

<style scoped>
/* Animación de rotación por si la API tarda un instante extra y no quieres que parpadee feo */
.rotate {
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>