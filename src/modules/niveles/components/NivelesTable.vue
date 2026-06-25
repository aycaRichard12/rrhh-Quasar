<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :columnas-texto-largo="['nombre']"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    />
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import { obtenerColumnasNiveles } from '../utils/niveles.columns';
import type { NivelesDeGravedad } from '../types/niveles.types';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const { t } = useI18n();

const props = defineProps<{
  listaNiveles: NivelesDeGravedad[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

// Toda la lógica de negocio de la tabla se mantiene aquí intacta
const { datosFiltrados } = useFiltroExcel(() => props.listaNiveles, []);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasNiveles(t));
</script>