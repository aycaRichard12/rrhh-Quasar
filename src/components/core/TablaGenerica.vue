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
  <!-- <template 
    v-for="nombreSlot in slotsFiltrados" 
    :key="nombreSlot" 
    #[nombreSlot]="slotProps"
  >
    <slot :name="nombreSlot" v-bind="slotProps ?? {}" />
  </template> -->


    <template v-slot:no-data>
      <div 
        class="full-width column flex-center q-py-xl" 
        style="min-height: 250px;"
      >
        <q-inner-loading showing 
          style="z-index: 10;"
        >
          <div class="full-width column flex-center " style="min-height: 50px;">
            <img 
              src="favicon.ico" 
              alt="Buscando..." 
              class="magnifier-searching"
              style="height: 70px; width: 70px; object-fit: contain;"
            />
          
            <span class="text-h5 text-weight-medium q-mt-md">
              {{ $t('common.messages.loading') + '...' }}
            </span>
          </div>
        </q-inner-loading>
      </div>
    </template>

    <!-- <template v-slot:no-data v-if="!estaCargando">
      <div 
        class="full-width column flex-center text-grey-7 q-py-xl" 
        style="min-height: 150px;"
      >
        <q-icon 
          name="search_off" 
          size="3.5rem" 
          class="q-mb-md"
        />
        <span class="text-h6 text-weight-medium">
          {{ $t('common.messages.noData') }}
        </span>
      </div>
    </template> -->

     <!-- Reenvío de slots -->
    <template
            v-for="(_, nombreSlot) in $slots" #[nombreSlot]="slotProps">
      
          <slot :name="nombreSlot" v-bind="slotProps || {}" />
    </template>

    <!-- <template
  v-for="(_, nombreSlot) in $slots"
  :key="String(nombreSlot)"
>
  <template
    v-if="nombreSlot !== 'loading' && nombreSlot !== 'no-data'"
    #[nombreSlot]="slotProps"
  >
    <slot
      :name="nombreSlot"
      v-bind="slotProps || {}"
    />
  </template>
</template> -->
  </q-table>
</template>
   
<script setup lang="ts" generic="T extends object">
import type { QTableColumn } from 'quasar';


// import { useSlots, computed } from 'vue';
// // 1. Instanciamos los slots actuales que el componente padre está enviando
// const slotsNativos = useSlots();
// // 2. Filtramos los slots excluyendo explicitamente 'loading' y 'no-data'
// const slotsFiltrados = computed((): string[] => {
//   return Object.keys(slotsNativos).filter(
//     (nombreSlot: string) => nombreSlot !== 'loading' && nombreSlot !== 'no-data'
//   );
// });



  defineProps<{
    titulo?: string;
    filas: T[];
    columnas: QTableColumn<T>[];
    estaCargando?: boolean;
    modeloBusqueda: string;
  }>();
</script>

<style scoped>
.magnifier-searching {
  /* Mantenemos una transición fluida */
  will-change: transform;
  animation: searchOrbit 0.6s ease-in-out infinite;
}

@keyframes searchOrbit {
  0% {
    transform: translate(0, 0);
  }
  12% {
    transform: translate(-2px, 2px);
  }
  25% {
    /* Se mueve un poco a la derecha y abajo */
    transform: translate(-4px, 4px);
  }
  37% {
    transform: translate(-2px, 6px);
  }
  50% {
    /* Baja y va a la izquierda */
    transform: translate(0px, 8px);
  }
  62% {
    transform: translate(2px, 6px);
  }
  75% {
    /* Sube a la izquierda */
    transform: translate(4px, 4px);
  }
  87% {
    transform: translate(4px, 2px);
  }
  100% {
    /* Retorna perfectamente al punto inicial */
    transform: translate(0, 0);
  }
}
</style>