<template>
  <q-menu v-model="menuAbierto">
    <q-card style="min-width: 250px">
      <q-card-section class="q-pa-none">
        <!-- Opciones de Ordenamiento siempre presentes -->
        <q-list dense>
          <q-item clickable v-close-popup @click="ordenar('asc')">
            <q-item-section avatar><q-icon name="sort_by_alpha" /></q-item-section>
            <q-item-section>{{ $t('common.filter.sortAsc') }}</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="ordenar('desc')">
          <q-item-section avatar><q-icon name="sort_by_alpha" class="flip-vertical" /></q-item-section>
          <q-item-section>{{ $t('common.filter.sortDesc') }}</q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-tabs dense
          v-model="pestañaActual"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            name="ordenar"
            icon="settings"
            :label="$t('common.filter.options')"
          />
          <q-tab
            v-if="columna.esFiltrable !== false"
            name="valores"
            icon="checklist"
            :label="$t('common.filter.values')"
          />
        </q-tabs>

        <q-tab-panels v-model="pestañaActual" animated>
          <q-tab-panel name="ordenar">
            <div class="text-caption text-grey-7">
              {{ $t('common.filter.datatype') }}: {{ columna.tipoDato || 'texto' }}
            </div>
          </q-tab-panel>
          <q-tab-panel name="valores" v-if="columna.esFiltrable !== false">
            <q-input dense flat outlined square
              v-model="filtroValores"
              :placeholder="$t('common.actions.search')"
              class="q-mb-sm"
            />
            <q-scroll-area style="height: 200px">
              <q-list dense>
                <q-item v-for="valor in valoresFiltrados" :key="String(valor)" tag="label">
                  <q-item-section avatar>
                    <q-checkbox v-model="seleccionados" :val="valor" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ valor }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.actions.clear')" color="negative" @click="limpiarFiltro" />
        <q-btn flat :label="$t('common.actions.apply')" color="primary" v-close-popup @click="aplicar" />
        </q-card-actions>
      </q-card>
  </q-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';

/**
* TablaFiltroExcel.vue - Menú desplegable para filtros avanzados por columna.
*/

const props = defineProps<{
  columna: ConfiguracionColumnaExcel;
  valoresDisponibles: (string | number)[];
  modeloFiltro: string[];
}>();

const emits = defineEmits<{
  (e: 'actualizar:filtro', valores: string[]): void;
  (e: 'ordenar', sentido: 'asc' | 'desc'): void;
}>();

const menuAbierto = ref(false);
const pestañaActual = ref('ordenar');
const filtroValores = ref('');
const seleccionados = ref<string[]>([...props.modeloFiltro]);

const valoresFiltrados = computed(() => {
  if (!filtroValores.value) return props.valoresDisponibles;
    return props.valoresDisponibles.filter(v =>
      String(v).toLowerCase().includes(filtroValores.value.toLowerCase())
    );
});

const ordenar = (sentido: 'asc' | 'desc'): void => {
  emits('ordenar', sentido);
};

const aplicar = (): void => {
  emits('actualizar:filtro', seleccionados.value);
};

const limpiarFiltro = (): void => {
  seleccionados.value = [];
  emits('actualizar:filtro', []);
};
</script>