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
    <!-- Slot de Carga Personalizado -->
    <template v-slot:loading>
      <q-inner-loading showing color="primary">
        <div class="relative-position">
          <q-spinner-orbit size="80px" color="primary" />
          <q-avatar 
            size="40px" 
            class="absolute-center"
            style="background: white;"
          >
            <q-img src="favicon.ico" />
          </q-avatar>
        </div>
        <span class="q-mt-md text-subtitle2 text-primary">
          {{ $t('common.actions.loading') }}
        </span>
      </q-inner-loading>
    </template>

    <!-- Slot Sin Datos -->
    <template v-slot:no-data>
      <div class="full-width row flex-center text-grey-7 q-gutter-sm q-py-xl">
        <q-icon 
          :name="estaCargando ? 'autorenew' : 'search_off'" 
          :class="estaCargando ? 'rotate' : ''" 
          size="2.5rem" 
        />
        <div class="column items-center">
          <span class="text-h6">
            {{ estaCargando ? $t('common.report.synchronizing') : $t('common.report.noRecords') }}
          </span>
          <span v-if="!estaCargando" class="text-caption">
            {{ $t('common.report.tryAdjustingFilters') }}
          </span>
        </div>
      </div>
    </template>

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