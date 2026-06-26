<template>
  <q-card shadow-2 rounded>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
    >
      <!-- Columna: Metodo de Evaluacion -->
      <template v-slot:header-cell-metodoevaluacion="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['metodoevaluacion']?.length || orden.campo === 'metodoevaluacion' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['metodoevaluacion']?.length || orden.campo === 'metodoevaluacion'"
              :color="filtrosActivos['metodoevaluacion']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'metodoevaluacion' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['metodoevaluacion'] ?? []"
              :modelo-filtro="filtrosActivos['metodoevaluacion'] || []"
              :sentido-orden="orden.campo === 'metodoevaluacion' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('metodoevaluacion', val)"
              @ordenar="(sentido) => ordenarColumna('metodoevaluacion', sentido)"
              @limpiar="() => limpiarFiltrosColumna('metodoevaluacion')"
            />
          </q-btn>
        </q-th>
      </template>

      <!-- Columna: Fecha -->
      <template v-slot:header-cell-fecha="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['fecha']?.length || orden.campo === 'fecha' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['fecha']?.length || orden.campo === 'fecha'"
              :color="filtrosActivos['fecha']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'fecha' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
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
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emits('editar', propsCell.row.id!)"
          >
            <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round
            color="negative"
            icon="delete_forever"
            @click="emits('eliminar', propsCell.row.id!)"
          >
            <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasActividadesDeEvaluacion } from '../utils/actividadesDeEvaluacion.columns';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { ActividadesDeEvaluacion } from '../types/actividadesDeEvaluacion.types';
import { date } from 'quasar';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const { t } = useI18n();

const props = defineProps<{
  listaActividades: ActividadesDeEvaluacion[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'metodoevaluacion',
    titulo: t('evaluationMethods.name'),
    tipoDato: 'texto'
  },
  {
    campo: 'fecha',
    titulo: t('tables.date'),
    tipoDato: 'texto',
    format: (val: unknown) => val instanceof Date ? date.formatDate(val, 'DD/MM/YYYY') : String(val)
  }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaActividades, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasActividadesDeEvaluacion(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>
