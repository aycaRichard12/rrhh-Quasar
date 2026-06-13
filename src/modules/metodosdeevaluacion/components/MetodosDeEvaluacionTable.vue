<template>
  <TablaGenerica
    :filas="datosFiltrados"
    :columnas="listaColumnas"
    :esta-cargando="cargando"
    v-model:modelo-busqueda="filtroInterno"
  >
    <!-- CUSTOMIZACIÓN DE CABECERAS (ICONOS DE FILTRO) -->
    
    <!-- Columna: Calificacion Max -->
    <template v-slot:header-cell-calificacionMax="propsCell">
      <q-th :props="propsCell">
        {{ propsCell.col.label }}
        <q-btn flat round dense icon="filter_alt" size="xs" :color="filtrosActivos['calificacionMax']?.length || orden.campo === 'calificacionMax' ? 'primary' : 'grey-7'">
          <q-badge v-if="filtrosActivos['calificacionMax']?.length || orden.campo === 'calificacionMax'" :color="filtrosActivos['calificacionMax']?.length ? 'negative' : 'primary'" floating rounded>
            <q-icon v-if="orden.campo === 'calificacionMax' && orden.sentido" :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'" size="10px" />
          </q-badge>
          <TablaFiltroExcel
            :columna="configuracionFiltros[0]!"
            :valores-disponibles="valoresUnicosPorColumna['calificacionMax'] ?? []"
            :modelo-filtro="filtrosActivos['calificacionMax'] || []"
            :sentido-orden="orden.campo === 'calificacionMax' ? orden.sentido : null"
            @actualizar:filtro="(val) => actualizarFiltro('calificacionMax', val)"
            @ordenar="(sentido) => ordenarColumna('calificacionMax', sentido)"
            @limpiar="() => limpiarFiltrosColumna('calificacionMax')"
          />
        </q-btn>
      </q-th>
    </template>

    <!-- Columna: Fecha -->
    <template v-slot:header-cell-fecha="propsCell">
      <q-th :props="propsCell">
        {{ propsCell.col.label }}
        <q-btn flat round dense icon="filter_alt" size="xs" :color="filtrosActivos['fecha']?.length || orden.campo === 'fecha' ? 'primary' : 'grey-7'">
          <q-badge v-if="filtrosActivos['fecha']?.length || orden.campo === 'fecha'" :color="filtrosActivos['fecha']?.length ? 'negative' : 'primary'" floating rounded>
            <q-icon v-if="orden.campo === 'fecha' && orden.sentido" :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'" size="10px" />
          </q-badge>
          <TablaFiltroExcel
            :columna="configuracionFiltros[1]!"
            :valores-disponibles="valoresUnicosPorColumna['fecha'] ?? []"
            :modelo-filtro="filtrosActivos['fecha'] || []"
            :sentido-orden="orden.campo === 'fecha' ? orden.sentido : null"
            @actualizar:filtro="(val) => actualizarFiltro('fecha', val)"
            @ordenar="(sentido) => ordenarColumna('fecha', sentido)"
            @limpiar="() => limpiarFiltrosColumna('fecha')"
          />
        </q-btn>
      </q-th>
    </template>

    <!-- CUSTOMIZACIÓN DE CELDAS (BODY) -->
    <template v-slot:body-cell-numero="propsCell">
      <q-td :props="propsCell">
        {{ propsCell.rowIndex + 1 }}
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell" class="text-center q-gutter-xs">
        <q-btn dense round class="global-btn-page" icon="sym_o_edit_square" @click="emits('editar', propsCell.row.id!)">
          <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
        </q-btn>
        <q-btn dense round icon="delete_forever" color="negative" @click="emits('eliminar', propsCell.row.id!)">
          <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
        </q-btn>
        <q-btn dense round icon="leaderboard" color="secondary" @click="emits('gestionarRangos', propsCell.row)">
          <q-tooltip>Crear rangos de evaluación</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </TablaGenerica>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MetodosDeEvaluacion } from '../types/metodosDeEvaluacion.types';
import { obtenerColumnasMetodosDeEvaluacion } from '../utils/metodosDeEvaluacion.columns';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';

const { t } = useI18n();

const props = defineProps<{
  listaMetodos: MetodosDeEvaluacion[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'gestionarRangos', metodo: MetodosDeEvaluacion): void;
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  { campo: 'calificacionMax', titulo: 'Calificacion Max', tipoDato: 'numero' },
  { campo: 'fecha', titulo: 'Fecha', tipoDato: 'texto' }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaMetodos, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasMetodosDeEvaluacion(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>
