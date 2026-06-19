<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ esVistaRangos ? $t('evaluationMethods.range.title') + metodoSeleccionado?.nombre : $t('evaluationMethods.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ esVistaRangos ? $t('evaluationMethods.range.subtitle') : $t('evaluationMethods.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaRangos">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('evaluationMethods.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoMetodo"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      </template>

      <template v-else>
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('evaluationMethods.range.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoRango"
        />
        <q-btn outline
          color="negative"
          icon="arrow_back"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('forms.back')"
          :round="$q.screen.lt.sm"
          @click="alternarVista"
        />
      </template>
    </q-card-section>

    <div v-if="!esVistaRangos">
      <MetodosDeEvaluacionTable
        v-model:filtro="filtroBusqueda"
        :lista-metodos="listaMetodos"
        :cargando="cargando"
        @editar="prepararEdicionMetodo"
        @eliminar="confirmarEliminarMetodo"
        @gestionar-rangos="gestionarRangos"
      />
    </div>

    <div v-else>
      <RangosDeEvaluacionTable
        :rows="listaRangos"
        :loading="cargando"
        @editar="prepararEdicionRango"
        @eliminar="confirmarEliminarRango"
      />
    </div>

    <!-- Diálogos -->
    <q-dialog 
      v-model="esVisibleDialogoMetodo"
    >
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
  listaMetodos, listaRangos, cargando, esVistaRangos, filtroBusqueda,
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
