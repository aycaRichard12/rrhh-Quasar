<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas-texto-largo= "['naturaleza', 'observacion']"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    />
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';

import type { TipoDeContrato } from '../types/tiposDeContratos.types';
import { obtenerColumnasTiposDeContratos } from '../utils/tiposDeContratos.columns';

const { t } = useI18n();

// 1. Columnas reactivas con traducción
const listaColumnas = computed(() => obtenerColumnasTiposDeContratos(t));

const props = defineProps<{
  listaTiposDeContratos: TipoDeContrato[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

// 2. Mapeo directo y tipado seguro (Sin filtros intermedios)
const filasTipadas = computed(() => props.listaTiposDeContratos as unknown as FilaBase[]);

// 3. Control del buscador global (v-model)
const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});
</script>