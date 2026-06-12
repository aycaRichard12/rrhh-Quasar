<template>
  <q-menu v-model="menuAbierto" anchor="bottom right" self="top left" max-width="280px" max-height="375px">
    <!-- Opciones de Ordenamiento -->
    <q-list dense>
      <q-item 
        clickable 
        active-class="text-primary bg-blue-3"
        :active="sentidoOrden === 'asc'"
        @click="ordenar('asc')"
      >
        <q-item-section avatar><q-icon name="arrow_upward" /></q-item-section>
        <q-item-section>{{ $t('common.filter.sortAsc') }}</q-item-section>
      </q-item>
      <q-item 
        clickable
        active-class="text-primary bg-blue-1"
        :active="sentidoOrden === 'desc'"
        @click="ordenar('desc')"
      >
        <q-item-section avatar><q-icon name="arrow_downward" /></q-item-section>
        <q-item-section>{{ $t('common.filter.sortDesc') }}</q-item-section>
      </q-item>
    </q-list>

    <q-separator />
    <!-- Tabs para Valores y Condiciones -->
    <q-tabs dense
      v-model="pestañaActual"
      class="text-grey-7"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="valores" :label="$t('common.filter.values')" />
      <q-tab name="condiciones" :label="$t('common.filter.conditions')" />
    </q-tabs>

    <q-card style="min-width: 150px" flat>
      <!-- Panel de Valores -->
      <q-tab-panels v-model="pestañaActual" animated>
        <q-tab-panel name="valores" class="q-pa-sm">
          <!-- Buscador -->
          <q-input
            dense outlined square
            v-model="filtroValores"
            class="q-mb-md"
            :placeholder="$t('common.actions.search')"
          >
           <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- Checkbox Seleccionar Todo -->
          <q-checkbox dense
            v-model="todosSeleccionados"
            class="q-mb-md"
            :label="$t('common.filter.selectAll')"
            @update:model-value="seleccionarTodos"
          />
          <!-- Lista de Valores -->
          <q-scroll-area style="height: 110px" class="bordered">
            <q-list dense separator>
              <q-item clickable
                v-for="valor in valoresFiltrados"
                class="q-px-md"
                tag="label"
                :key="String(valor)"
              >
                <q-item-section avatar>
                  <q-checkbox
                    v-model="seleccionados"
                    :val="String(valor)"
                  />
                </q-item-section>
                <q-item-section>{{ formatearValor(valor) }}</q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-tab-panel>
        <!-- Panel de Condiciones -->
        <q-tab-panel name="condiciones" class="q-pa-sm">
          <div class="text-caption text-grey-7">
            {{ $t('common.filter.conditionsInfo') }}
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!-- Botones de Acción -->
    <q-card-actions align="right" class="q-gutter-sm q-pa-sm">
      <q-btn
        flat
        color="negative"
        :label="$t('common.actions.clear')"
        @click="limpiarFiltro"
      />
      <q-btn
        flat
        color="grey"
        :label="$t('common.actions.cancel')"
        @click="menuAbierto = false"
      />
      <q-btn
        unelevated
        color="primary"
        text-color="white"
        :label="$t('common.actions.apply')"
        @click="aplicar"
      />
    </q-card-actions>
  </q-menu>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';

  /**
  * TablaFiltroExcel.vue - Menú desplegable para filtros avanzados por columna.
  */

  const props = defineProps<{
    columna: ConfiguracionColumnaExcel;
    valoresDisponibles: (string | number)[];
    modeloFiltro: string[];
    sentidoOrden?: 'asc' | 'desc' | null;
  }>();

  const emits = defineEmits<{
    (e: 'actualizar:filtro', valores: string[]): void;
    (e: 'ordenar', sentido: 'asc' | 'desc' | null): void;
    (e: 'limpiar'): void;
  }>();

  const menuAbierto = ref(false);
  const pestañaActual = ref('valores');
  const filtroValores = ref('');
  const seleccionados = ref<string[]>([...props.modeloFiltro]);

  const valoresDisponiblesStr = computed(() =>
    props.valoresDisponibles.map(v => String(v))
  );

  const valoresFiltrados = computed(() => {
    const query = filtroValores.value.toLowerCase();
    if (!query) return valoresDisponiblesStr.value;
    
    return valoresDisponiblesStr.value.filter(v => {
      const label = formatearValor(v).toLowerCase();
      return label.includes(query) || v.toLowerCase().includes(query);
    });
  });

  const todosSeleccionados = computed({
    get: () => {
      return valoresDisponiblesStr.value.length > 0 && 
            seleccionados.value.length === valoresDisponiblesStr.value.length;
    },
    set: (val: boolean) => {
      if (val) {
        seleccionados.value = [...valoresDisponiblesStr.value];
      } else {
        seleccionados.value = [];
      }
    }
  });

  const seleccionarTodos = (valor: boolean): void => {
    todosSeleccionados.value = valor;
  };

  const formatearValor = (valor: string | number): string => {
    if (props.columna.opciones) {
      return props.columna.opciones[valor] || String(valor);
    }
    return String(valor);
  };

  const ordenar = (sentido: 'asc' | 'desc'): void => {
    emits('ordenar', sentido);
  };

  const aplicar = (): void => {
    emits('actualizar:filtro', seleccionados.value);
    menuAbierto.value = false;
  };

  const limpiarFiltro = (): void => {
    seleccionados.value = [];
    emits('limpiar');
    menuAbierto.value = false;
  };

  watch(() => props.modeloFiltro, (newVal) => {
    seleccionados.value = [...newVal];
  }, { deep: true });
</script>