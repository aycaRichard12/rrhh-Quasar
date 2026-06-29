<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
      <template
        v-for="config in configuracionFiltros"
        :key="config.campo"
        #[`header-filtro-${config.campo}`]
      >
        <q-btn dense flat round icon="filter_alt" size="xs" :color="filtrosActivos[config.campo]?.length || orden.campo === config.campo ? 'primary' : 'grey-7'">
          <q-badge floating rounded v-if="filtrosActivos[config.campo]?.length || orden.campo === config.campo" :color="filtrosActivos[config.campo]?.length ? 'negative' : 'primary'">
            <q-icon v-if="orden.campo === config.campo && orden.sentido" size="10px" :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"/>
          </q-badge>
          <TablaFiltroExcel
            :columna="config"
            :valores-disponibles="valoresUnicosPorColumna[config.campo] ?? []"
            :modelo-filtro="filtrosActivos[config.campo] || []"
            :sentido-orden="orden.campo === config.campo ? orden.sentido : null"
            @actualizar:filtro="(val) => actualizarFiltro(config.campo, val)"
            @ordenar="(sentido) => ordenarColumna(config.campo, sentido)"
            @limpiar="() => limpiarFiltrosColumna(config.campo)"
          />
        </q-btn>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';

import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';
import { obtenerColumnasPrerrequisitosCargo } from '../utils/prerrequisitosCargo.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasPrerrequisitosCargo(t));
const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const props = defineProps<{
  listaPrerrequisitos: PrerrequisitoCargo[]
  cargando: boolean;
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'cargo',
    titulo: t('cargos.name'), 
    tipoDato: 'texto',
  }
];

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados, orden,
  establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaPrerrequisitos, configuracionFiltros);
</script>