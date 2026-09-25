<template>
  <q-card>
    <q-card-section class="row justify-between items-center q-pb-none">
      <q-btn 
        icon="arrow_back" 
        :label="$t('formBtn.back', 'Volver')" 
        color="negative" 
        outline 
        @click="emits('volver')" 
      />
      <div class="text-h6 text-primary text-center col-grow">
        Calificaciones de: {{ postulante?.nombre }} {{ postulante?.apellido }}
      </div>
      <q-btn 
        icon="add" 
        label="Nueva Calificación" 
        color="primary" 
        @click="emits('nuevo')" 
      />
    </q-card-section>

    <q-card-section>
      <q-table
        flat bordered
        row-key="id"
        class="global-table-header"
        :rows="listaCalificaciones"
        :columns="columnas"
        :loading="cargando"
        :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      >
        <template v-slot:body-cell-numero="propsCell">
          <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
        </template>
        <template v-slot:body-cell-opciones="propsCell">
          <q-td :props="propsCell" class="text-center">
            <q-btn dense round color="negative" icon="delete" size="sm" @click="emits('eliminar', Number(propsCell.row.id))">
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Postulante, CalificacionPostulante } from '../types/postulantes.types';
import { obtenerColumnasCalificaciones } from '../utils/calificaciones.columns';

const columnas = computed(() => obtenerColumnasCalificaciones());

defineProps<{
  postulante: Postulante | null;
  listaCalificaciones: CalificacionPostulante[];
  cargando: boolean;
}>();

const emits = defineEmits<{
  (e: 'volver'): void;
  (e: 'nuevo'): void;
  (e: 'eliminar', id: number): void;
}>();
</script>