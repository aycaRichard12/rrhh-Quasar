<!-- <template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('convocatorias.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('convocatorias.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
 
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('convocatorias.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaConvocatoria"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>


    </q-card-section>
    
    <div >
      <ConvocatoriasTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-convocatorias="listaConvocatorias"
        @editar="prepararEdicionConvocatoria"
        @eliminar="confirmarEliminarConvocatoria"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <ConvocatoriasForm
        :convocatoria="convocatoriaActual"
        :lista-areas="listaAreas"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarConvocatoria"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useConvocatorias } from '../composables/useConvocatorias';
import ConvocatoriasForm from '../components/ConvocatoriasForm.vue';
import ConvocatoriasTable from '../components/ConvocatoriasTable.vue';
import { useAreas } from 'src/modules/areas/composables/useAreas';
import { useCargos } from 'src/modules/cargos/composables/useCargos';

const prepararNuevaConvocatoria = () => {
  const primeraArea = listaAreas.value[0];

  if (!primeraArea) {
    nuevaConvocatoria(0, 0);
    return;
  }

  const idArea = Number(primeraArea.id);

  const primerCargo = listaCargos.value.find(
    cargo => Number(cargo.idarea) === idArea
  );

  const idCargo = primerCargo ? Number(primerCargo.id) : 0;

  nuevaConvocatoria(idArea, idCargo);
};

const {
  listaConvocatorias, convocatoriaActual,
  cargando, filtroBusqueda, esModoEdicion,  esVisibleDialogo,
  cargarConvocatorias, nuevaConvocatoria,
  guardarConvocatoria, prepararEdicionConvocatoria, confirmarEliminarConvocatoria,
  cambiarEstadoRegistro,
} = useConvocatorias();

const {
  listaAreas, cargarAreas
} = useAreas();

const {
  listaCargos, cargarCargos
} = useCargos();

onMounted(() => {
  void cargarConvocatorias();
  void cargarAreas();
  void cargarCargos();
});
</script> -->


















<template>
  <q-page>
    <!-- VISTA 1: Módulo Principal de Convocatorias -->
    <div v-if="vistaActual === 1">
      <div class="lt-sm">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <h4 class="q-my-none text-primary">{{ $t('convocatorias.title') }}</h4>
          <p class="text-grey-7">{{ $t('convocatorias.subtitle') }}</p>
        </div>
      </div>
      </div>

      <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('convocatorias.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaConvocatoria"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      </q-card-section>
      
      <ConvocatoriasTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando && !abriendoModal" 
        :lista-convocatorias="listaConvocatorias"
        @editar="prepararEdicionConvocatoria"
        @eliminar="confirmarEliminarConvocatoria"
        @cambiar-estado-registro="cambiarEstadoRegistro"
        @ver-postulantes="irAPostulantes"
        @ver-prerrequisitos="abrirModalPrerrequisitos"
      />
    </div>

    <!-- VISTA 2: Postulantes de la Convocatoria -->
    <div v-else-if="vistaActual === 2">
      <div class="row q-mb-md justify-between items-center">
        <q-btn outline color="primary" icon="arrow_back" :label="$q.screen.lt.sm ? '' : $t('Volver')" @click="vistaActual = 1" />
        <q-btn class="global-btn-page" icon="sym_o_tv_options_edit_channels" :label="$q.screen.lt.sm ? '' : $t('Ver Prerrequisitos')" @click="abrirModalPrerrequisitos(convocatoriaSeleccionada)" />
      </div>
      <!-- Aquí insertaremos el nuevo componente que crearemos -->
      <ConvocatoriasPostulanteView 
        :convocatoria="convocatoriaSeleccionada"
        :filtro="filtroBusqueda"
        @update:filtro="val => filtroBusqueda = val"
        @ver-calificaciones="irACalificaciones" 
      />
    </div>

    <!-- VISTA 3: Calificaciones del Postulante -->
    <div v-else-if="vistaActual === 3">
      <div class="row q-mb-md">
        <q-btn flat color="primary" icon="arrow_back" label="Volver a Postulantes" @click="vistaActual = 2" />
      </div>
      <!-- Aquí insertaremos el componente de calificaciones -->
      <CalificacionesView 
        :postulante="postulanteSeleccionado" 
        @ver-detalle="abrirDetalleCalificacion" 
      />
    </div>

    <!-- VISTA 4: Diálogo Modal de Detalle de Calificaciones -->
    <q-dialog v-model="esVisibleDialogoDetalle">
      <!-- Aquí insertaremos el componente del detalle (N°, Fecha hora, Actividad, etc.) -->
      <DetalleCalificacionesDialog :metodo="metodoSeleccionado" />
    </q-dialog>

    <!-- Diálogo del Formulario (Nivel 1) -->
    <q-dialog v-model="esVisibleDialogo">
      <ConvocatoriasForm
        :convocatoria="convocatoriaActual"
        :lista-areas="listaAreas"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarConvocatoria"
      />
    </q-dialog>

    <PrerrequisitosDialog 
      v-model="esVisibleDialogoPrerrequisitos"
      :convocatoria="convocatoriaSeleccionada"
      :lista-prerrequisitos="listaPrerrequisitos"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';
import { useConvocatorias } from '../composables/useConvocatorias';
import ConvocatoriasForm from '../components/ConvocatoriasForm.vue';
import ConvocatoriasTable from '../components/ConvocatoriasTable.vue';
import ConvocatoriasPostulanteView from '../components/ConvocatoriasPostulanteView.vue';
import CalificacionesView from '../components/CalificacionesView.vue';
import DetalleCalificacionesDialog from '../components/DetalleCalificacionesDialog.vue';
import PrerrequisitosDialog from '../components/PrerrequisitosDialog.vue';
import { useAreas } from 'src/modules/areas/composables/useAreas';
import { useCargos } from 'src/modules/cargos/composables/useCargos';
import type { Convocatoria } from '../types/convocatorias.types';
import type { Postulante } from 'src/modules/postulantes/types/postulantes.types';

// 1. CORRECCIÓN: Importar el tipo correcto que coincide con el JSON
import type { MetodoEvaluacionResumen } from '../types/convocatorias.types';
const vistaActual = ref<number>(1);
const convocatoriaSeleccionada = ref<Convocatoria | null>(null);
const postulanteSeleccionado = ref<Postulante | null>(null);

// 2. CORRECCIÓN: Usar el tipo correcto para la variable reactiva
const metodoSeleccionado = ref<MetodoEvaluacionResumen | null>(null);
const esVisibleDialogoDetalle = ref(false);
const esVisibleDialogoPrerrequisitos = ref(false);

const abriendoModal = ref(false);
// Crea la función para abrir el modal desde cualquier vista
const abrirModalPrerrequisitos = async (convocatoria: Convocatoria | null) => {
  if (!convocatoria?.id || !convocatoria?.idcargo) return;
  
  convocatoriaSeleccionada.value = convocatoria;
  abriendoModal.value = true; // Desactivamos el spinner de la tabla principal
  
  await cargarDatosVista(convocatoria.id, convocatoria.idcargo);
  
  esVisibleDialogoPrerrequisitos.value = true;
  abriendoModal.value = false; // Restauramos
};

const {
  listaConvocatorias, convocatoriaActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo, listaPrerrequisitos,
  cargarConvocatorias, nuevaConvocatoria,
  guardarConvocatoria, prepararEdicionConvocatoria, confirmarEliminarConvocatoria,
  cambiarEstadoRegistro, cargarDatosVista
} = useConvocatorias();

const { listaAreas, cargarAreas } = useAreas();
const { listaCargos, cargarCargos } = useCargos();

const prepararNuevaConvocatoria = () => {
  const primeraArea = listaAreas.value[0];
  if (!primeraArea) {
    nuevaConvocatoria(0, 0);
    return;
  }
  const idArea = Number(primeraArea.id);
  const primerCargo = listaCargos.value.find(
    cargo => Number(cargo.idarea) === idArea
  );
  const idCargo = primerCargo ? Number(primerCargo.id) : 0;
  nuevaConvocatoria(idArea, idCargo);
};

const irAPostulantes = (convocatoria: Convocatoria) => {
  convocatoriaSeleccionada.value = convocatoria;
  vistaActual.value = 2;
};

const irACalificaciones = (postulante: Postulante) => {
  postulanteSeleccionado.value = postulante;
  vistaActual.value = 3;
};

// 3. CORRECCIÓN: El parámetro ahora recibe el tipo correcto
const abrirDetalleCalificacion = (metodo: MetodoEvaluacionResumen) => {
  metodoSeleccionado.value = metodo;
  esVisibleDialogoDetalle.value = true;
};

onMounted(() => {
  void cargarConvocatorias();
  void cargarAreas();
  void cargarCargos();
});
</script>