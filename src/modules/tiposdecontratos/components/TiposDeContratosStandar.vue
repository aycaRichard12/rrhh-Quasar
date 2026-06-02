<template>
  <div>
    <div class="row q-mb-md justify-end">
      <div class="q-gutter-sm">
        <q-btn 
          color="warning" 
          icon="sync" 
          label="Reemplazar Todo" 
          @click="emits('importar', 1)" 
        />
        <q-btn 
          color="positive" 
          icon="add_circle" 
          label="Añadir Datos" 
          @click="emits('importar', 2)" 
        />
      </div>
    </div>

    <q-table
      flat
      bordered
      :rows="props.listaEstandar"
      :columns="columnas"
      row-key="id"
      :rows-per-page-options="[10, 20, 50, 0]"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">
          {{ propsCell.rowIndex + 1 }}
        </q-td>
      </template>

      <template v-slot:body-cell-observacion="propsCell">
        <q-td :props="propsCell">
          <div class="ellipsis" style="max-width: 300px" :title="propsCell.row.observacion">
            {{ propsCell.row.observacion }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QTableColumn } from 'quasar';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const props = defineProps<{
  listaEstandar: TipoDeContrato[];
}>();

const emits = defineEmits<{
  (e: 'importar', tipo: number): void;
}>();

// Columnas reducidas para la vista estándar
const columnas = computed<QTableColumn<TipoDeContrato>[]>(() => [
  { name: 'numero', label: 'N°', align: 'center', field: () => '', sortable: false },
  { name: 'nombre', label: 'Tipo de contrato', align: 'left', field: (row) => row.nombre, sortable: true },
  { name: 'observacion', label: 'Observación', align: 'left', field: (row) => row.observacion, sortable: true }
]);
</script>