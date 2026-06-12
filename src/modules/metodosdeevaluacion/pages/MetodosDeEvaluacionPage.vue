<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ esVistaEstandar ? 'Rangos de: ' + metodoSeleccionado?.nombre : 'Métodos de Evaluación' }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ esVistaEstandar ? 'Gestiona los niveles de calificación' : 'Gestiona los métodos para calificar el desempeño' }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="add"
          size="15px"
          :label="$q.screen.lt.sm ? '' : 'Nuevo Método'"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoMetodo"
        />
        <BuscadorGlobal v-model="filtroBusqueda" />
      </template>

      <template v-else>
        <q-btn
          color="positive"
          icon="add"
          size="15px"
          label="Registrar Rango"
          @click="prepararNuevoRango"
        />
        <q-space />
        <q-btn
          outline
          color="negative"
          icon="arrow_back"
          size="15px"
          label="Volver"
          @click="alternarVista"
        />
      </template>
    </q-card-section>

    <div v-if="!esVistaEstandar" class="q-pa-md">
      <MetodosDeEvaluacionTable
        :lista-metodos="listaMetodos"
        :cargando="cargando"
        v-model:filtro="filtroBusqueda"
        @editar="prepararEdicionMetodo"
        @eliminar="confirmarEliminarMetodo"
        @gestionar-rangos="gestionarRangos"
      />
    </div>

    <div v-else class="q-pa-md">
      <RangosDeEvaluacionTable
        :rows="listaRangos"
        :loading="cargando"
        @editar="prepararEdicionRango"
        @eliminar="confirmarEliminarRango"
      />
    </div>

    <!-- Diálogos -->
    <q-dialog v-model="esVisibleDialogoMetodo">
      <MetodosDeEvaluacionForm
        :metodo="metodoActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarMetodo"
      />
    </q-dialog>

    <q-dialog v-model="esVisibleDialogoRango">
      <RangosDeEvaluacionForm
        :rango="rangoActual"
        :es-modo-edicion="esModoEdicion"
        :metodo-nombre="metodoSeleccionado?.nombre || ''"
        :calificacion-max-metodo="metodoSeleccionado?.calificacionMax || 0"
        @guardar="guardarRango"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMetodosDeEvaluacion } from '../composables/useMetodosDeEvaluacion';
import MetodosDeEvaluacionTable from '../components/MetodosDeEvaluacionTable.vue';
import RangosDeEvaluacionTable from '../components/RangosDeEvaluacionTable.vue';
import MetodosDeEvaluacionForm from '../components/MetodosDeEvaluacionForm.vue';
import RangosDeEvaluacionForm from '../components/RangosDeEvaluacionForm.vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

const {
  listaMetodos, listaRangos, cargando, esVistaEstandar, filtroBusqueda,
  esVisibleDialogoMetodo, esVisibleDialogoRango, esModoEdicion,
  metodoActual, rangoActual, metodoSeleccionado,
  cargarMetodos, prepararNuevoMetodo, prepararEdicionMetodo, guardarMetodo, confirmarEliminarMetodo,
  gestionarRangos, prepararNuevoRango, prepararEdicionRango, guardarRango, confirmarEliminarRango,
  alternarVista
} = useMetodosDeEvaluacion();

onMounted(() => {
  void cargarMetodos();
});
</script>
