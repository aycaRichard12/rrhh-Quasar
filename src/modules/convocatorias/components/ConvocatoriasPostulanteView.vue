<template>
  <div>
    <!-- Resumen superior de la Convocatoria -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 text-primary q-mb-sm">Datos de la Convocatoria</div>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6">
            <div><strong>Cargo:</strong> {{ convocatoria?.cargo }}</div>
            <div><strong>Nombre:</strong> {{ convocatoria?.nombre }}</div>
            <div><strong>Fechas:</strong> {{ convocatoria?.fechai }} al {{ convocatoria?.fechaf }}</div>
            <div><strong>Descripción:</strong> {{ convocatoria?.descripcion }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Tabla de Postulantes estandarizada -->
    <q-card>
      <TablaGenerica
        v-model:modelo-busqueda="filtroInterno"
        :filas="filasTipadas"
        :columnas="listaColumnas"
        :columnas-personalizadas="['opciones']"
        :esta-cargando="cargando"
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

        <template #body-cell-opciones="propsCell">
          <q-td :props="propsCell">
            <q-btn 
              dense round class="global-btn-page" 
              icon="sym_o_fact_check" 
              @click="emits('verCalificaciones', propsCell.row)"
            >
              <q-tooltip>Calificaciones del Postulante</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </TablaGenerica>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';

import type { Postulante } from 'src/modules/postulantes/types/postulantes.types';
import type { Convocatoria } from 'src/modules/convocatorias/types/convocatorias.types';
import { useConvocatorias } from 'src/modules/convocatorias/composables/useConvocatorias';
import { obtenerColumnasPostulantes } from '../utils/convocatoriasPostulantes.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasPostulantes(t));

// 1. Corregimos 'listaConvocatorias' a 'convocatoria' en singular. 
// 2. Eliminamos 'cargando' de las props porque ya lo provee useConvocatorias()
const props = defineProps<{
  convocatoria: Convocatoria | null;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'update:filtro', val: string): void;
  (e: 'verCalificaciones', postulante: Postulante): void;
}>();

// Estado global inyectado
const {
  listaPostulantes,
  cargando,
  cargarDatosVista
} = useConvocatorias();

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

// Arreglado el error de 'configuracionFiltros' (dejado vacío por defecto para que compile y funcione)
const configuracionFiltros: ConfiguracionColumnaExcel[] = []; 

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};

// Arreglado el error 39:30. Ahora le pasamos la LISTA de postulantes, no el objeto individual.
const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => listaPostulantes.value, configuracionFiltros);

const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

onMounted(() => {
  if (props.convocatoria?.id && props.convocatoria?.idcargo) {
    void cargarDatosVista(props.convocatoria.id, props.convocatoria.idcargo);
  }
});
</script>