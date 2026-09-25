<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('postulantes.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('postulantes.subtitle') }}</p>
      </div>
    </div>

    <div v-if="!esVistaCalificacion">
      <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('Nuevo Postulante')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoPostulante"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      </q-card-section>

      <PostulantesTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-postulantes="postulantesActivos" 
        @editar="prepararEdicionPostulante"
        @eliminar="confirmarEliminarPostulante"
        @calificar="iniciarProcesoCalificacion"
        @conclusion="prepararConclusion"
      />
    </div>

		<div v-else>
      <PostulantesCalificacionTable
        :postulante="postulanteActualCalificacion"
        :lista-calificaciones="listaCalificaciones"
        :cargando="cargandoTabla"
        @volver="alternarVistaCalificacion"
        @nuevo="prepararNuevaCalificacion"
        @eliminar="confirmarEliminarCalificacion"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <PostulantesForm
        :postulante="postulanteActual"
        :lista-convocatorias="listaConvocatorias"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarPostulante"
      />
    </q-dialog>

		<q-dialog v-model="esVisibleDialogoFormCalificacion" persistent>
      <PostulantesCalificacionForm
        v-model:id-metodo-seleccionado="idMetodoSeleccionado"
        v-model:calificacion-form="calificacionForm"
        :lista-metodos="listaMetodos"
        :actividades-disponibles="actividadesDisponibles"
        :calificacion-max-permitida="calificacionMaxPermitida"
        @guardar="guardarCalificacion"
      />
    </q-dialog>

    <q-dialog v-model="esVisibleDialogoConclusion">
      <PostulantesConclusionForm
        :conclusion="conclusionActual"
        @guardar="guardarConclusion"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { usePostulantes } from '../composables/usePostulantes';
import { useConvocatorias } from 'src/modules/convocatorias/composables/useConvocatorias';
import { useCalificacionPostulante } from '../composables/useCalificacionPostulante';

import PostulantesForm from '../components/PostulantesForm.vue';
import PostulantesTable from '../components/PostulantesTable.vue';
import PostulantesConclusionForm from '../components/PostulantesConclusionForm.vue';
import PostulantesCalificacionTable from '../components/PostulantesCalificacionTable.vue';
import PostulantesCalificacionForm from '../components/PostulantesCalificacionForm.vue';

const {
  listaConvocatorias,
  cargarConvocatorias
} = useConvocatorias();

const {
  listaPostulantes, postulanteActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  conclusionActual, esVisibleDialogoConclusion,
  cargarPostulantes, guardarPostulante,
  prepararEdicionPostulante, nuevoPostulante, confirmarEliminarPostulante,
  prepararConclusion, guardarConclusion
} = usePostulantes();

// Solo extraemos una vez el composable de calificaciones
const {
  esVistaCalificacion, // <-- MUY IMPORTANTE: Asegúrate de tener esto para el v-if del template
  postulanteActual: postulanteActualCalificacion, listaCalificaciones, cargandoTabla,
  esVisibleDialogoFormCalificacion, idMetodoSeleccionado, calificacionForm,
  listaMetodos, actividadesDisponibles, calificacionMaxPermitida,
  alternarVistaCalificacion, prepararNuevaCalificacion,
  guardarCalificacion, confirmarEliminarCalificacion,
  iniciarProcesoCalificacion // <-- Esta es la función que hace la magia de abrir todo
} = useCalificacionPostulante();

const prepararNuevoPostulante = () => {
  const primeraActiva = listaConvocatorias.value.find(c => Number(c.estado) === 1);
  nuevoPostulante(Number(primeraActiva?.id ?? 0));
};

const postulantesActivos = computed(() => {
  return listaPostulantes.value.filter(postulante => {
    const conv = listaConvocatorias.value.find(c => Number(c.id) === Number(postulante.idconvocatoria));
    return conv && Number(conv.estado) === 1;
  });
});

onMounted(() => {
  // Solo se carga lo estrictamente necesario para visualizar la tabla principal
  void cargarConvocatorias();
  void cargarPostulantes();
});
</script>