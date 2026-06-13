<template>
  <q-table
    row-key="id"
    class="global-table-header"
    :title="titulo"
    :rows="filas"
    :columns="columnas"
    :loading="estaCargando"
    :filter="modeloBusqueda"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
    :pagination-label="(inicio, fin, total) => `${inicio}-${fin} ${$t('common.report.of')} ${total}`"
  >
     <!-- Reenvío de slots -->
    <template v-for="(_, nombreSlot) in $slots" #[nombreSlot]="slotProps">
      <slot :name="nombreSlot" v-bind="slotProps || {}" />
    </template>
  </q-table>
</template>
   
<script setup lang="ts" generic="T extends object">
  import type { QTableColumn } from 'quasar';
    
  defineProps<{
    titulo?: string;
    filas: T[];
    columnas: QTableColumn<T>[];
    estaCargando?: boolean;
    modeloBusqueda: string;
  }>();
</script>