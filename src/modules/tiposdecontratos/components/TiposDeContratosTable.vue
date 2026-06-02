<template>
  <q-table
    flat
    bordered
    :rows="props.listaTiposDeContratos"
    :columns="columnas"
    row-key="id"
    :filter="props.filtro"
    :rows-per-page-options="[10, 20, 50, 0]"
  >
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">
        {{ propsCell.rowIndex + 1 }}
      </q-td>
    </template>

    <template v-slot:body-cell-observacion="propsCell">
      <q-td :props="propsCell">
        <div class="ellipsis" style="max-width: 250px" :title="propsCell.row.observacion">
          {{ propsCell.row.observacion }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-naturaleza="propsCell">
      <q-td :props="propsCell">
        <div class="ellipsis" style="max-width: 250px" :title="propsCell.row.naturaleza">
          {{ propsCell.row.naturaleza }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell">
        <q-btn 
          dense 
          round 
          flat 
          color="info" 
          icon="edit" 
          @click="emits('editar', propsCell.row.id)"
        >
          <q-tooltip>Editar</q-tooltip>
        </q-btn>
        <q-btn 
          dense 
          round 
          flat 
          color="negative" 
          icon="delete" 
          @click="emits('eliminar', propsCell.row.id)"
        >
          <q-tooltip>Eliminar</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';
import { obtenerColumnasTiposDeContratos } from '../utils/tiposDeContratos.columns';

const props = defineProps<{
  listaTiposDeContratos: TipoDeContrato[];
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: string | number): void;
  (e: 'eliminar', id: string | number): void;
}>();

const { t } = useI18n();
const columnas = computed(() => obtenerColumnasTiposDeContratos(t));
</script>