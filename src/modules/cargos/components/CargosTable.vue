<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="datosFiltrados"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
      <!-- Columna: Area -->
      <template v-slot:header-cell-area="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['area']?.length || orden.campo === 'area' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['area']?.length || orden.campo === 'area'"
              :color="filtrosActivos['area']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'area' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['area'] ?? []"
              :modelo-filtro="filtrosActivos['area'] || []"
              :sentido-orden="orden.campo === 'area' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('area', val)"
              @ordenar="(sentido) => ordenarColumna('area', sentido)"
              @limpiar="() => limpiarFiltrosColumna('area')"
            />
          </q-btn>
        </q-th>
      </template>

      <!-- Columna: Salario -->
      <template v-slot:header-cell-salario="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['salario']?.length || orden.campo === 'salario' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['salario']?.length || orden.campo === 'salario'"
              :color="filtrosActivos['salario']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'salario' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[1]!"
              :valores-disponibles="valoresUnicosPorColumna['salario'] ?? []"
              :modelo-filtro="filtrosActivos['salario'] || []"
              :sentido-orden="orden.campo === 'salario' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('salario', val)"
              @ordenar="(sentido) => ordenarColumna('salario', sentido)"
              @limpiar="() => limpiarFiltrosColumna('salario')"
            />
          </q-btn>
        </q-th>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { obtenerColumnasCargos } from '../utils/cargos.columns'
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { Cargo } from '../types/cargos.types'

const { t } = useI18n()

const props = defineProps<{
  listaCargos: Cargo[]
  cargando: boolean;
  filtro: string
}>()

const emits = defineEmits<{
  (e: 'editar', id: number): void
  (e: 'eliminar', id: number): void
  (e: 'update:filtro', val: string): void;
}>()

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'area',
    titulo: t('areas.name'),
    tipoDato: 'texto'
  },
  {
    campo: 'salario',
    titulo: t('cargos.salary'),
    tipoDato: 'numero'
  }
];

const {
  filtrosActivos,
  valoresUnicosPorColumna,
  datosFiltrados,
  orden,
  establecerOrden,
  limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaCargos, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasCargos(t))

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>