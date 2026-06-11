<template>
  <q-table
    :title="titulo"
    :rows="filas"
    :columns="columnas"
    :loading="estaCargando"
    row-key="id"
    class="global-table-header"
    :filter="modeloBusqueda"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
    :pagination-label="(inicio, fin, total) => `${inicio}-${fin} ${$t('common.report.of')} ${total}`"
  >
    <template v-slot:top-right>
      <BuscadorGlobal
        :model-value="modeloBusqueda"
        @update:model-value="actualizarModeloBusqueda"
      />
    </template>
   
     <!-- Reenvío de slots -->
    <template v-for="(_, nombreSlot) in $slots" #[nombreSlot]="slotProps">
      <slot :name="nombreSlot" v-bind="slotProps || {}" />
    </template>
  </q-table>
</template>
   
<script setup lang="ts" generic="T extends object">
import type { QTableColumn } from 'quasar';
import BuscadorGlobal from './BuscadorGlobal.vue';
   
const props = defineProps<{
  titulo?: string;
  filas: T[];
  columnas: QTableColumn<T>[];
  estaCargando?: boolean;
  modeloBusqueda: string;
}>();
   
const emitir = defineEmits<{
  (e: 'update:modeloBusqueda', valor: string): void;
}>();
   
const actualizarModeloBusqueda = (valor: string): void => {
  void props.titulo; // Evita error de variable no usada
  emitir('update:modeloBusqueda', valor);
};
</script>