<template>
  <q-card>
    <TablaGenerica
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="props.loading"
      modelo-busqueda="" 
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    />
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TablaGenerica from 'src/components/core/TablaGenerica.vue'; // <-- Asegúrate de importarla
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';

import type { RangoDeEvaluacion } from '../types/metodosDeEvaluacion.types';
import { obtenerColumnasRangosDeEvaluacion } from '../utils/metodosDeEvaluacion.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasRangosDeEvaluacion(t));
const filasTipadas = computed(() => props.rows as unknown as FilaBase[]);

const props = defineProps<{
  rows: RangoDeEvaluacion[];
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
}>();

</script>