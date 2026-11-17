<template>
  <q-card>
    <TablaGenerica
      :filas="filasTipadas"
      :columnas="columnas"
      :esta-cargando="cargando"
      modelo-busqueda=""
      :columnas-personalizadas="['opciones']"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
      <!-- OPCIONES -->
      <template #body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-btn dense round color="negative" icon="delete" size="sm" @click="emits('eliminar', Number(propsCell.row.id))">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ $t('common.actions.delete', 'Eliminar') }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';
import type { Postulante, CalificacionPostulante } from '../types/postulantes.types';
import { obtenerColumnasCalificaciones } from '../utils/calificaciones.columns';

const props = defineProps<{
  postulante: Postulante | null;
  listaCalificaciones: CalificacionPostulante[];
  cargando: boolean;
  maximoFiltro: number;
}>();

// La columna es reactiva: si cambia el maximoFiltro, el título cambia automáticamente
const columnas = computed(() => obtenerColumnasCalificaciones(props.maximoFiltro));

const filasTipadas = computed(() => props.listaCalificaciones as unknown as FilaBase[]);

const emits = defineEmits<{
  (e: 'eliminar', id: number): void;
}>();
</script>