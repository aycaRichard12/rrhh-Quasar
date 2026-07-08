<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ esVistaRangos ? $t('metodosdeevaluacion.range.title') + listaMetodoSeleccionado?.nombre : $t('metodosdeevaluacion.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ esVistaRangos ? $t('metodosdevaluacion.range.subtitle') : $t('metodosdeevaluacion.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaRangos">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('metodosdeevaluacion.new')"
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
          :label="$q.screen.lt.sm ? '' : $t('metodosdeevaluacion.range.new')"
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
        :cargando="cargando"
        :lista-metodos="listaMetodos"
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
        :metodo-nombre="listaMetodoSeleccionado?.nombre || ''"
        :calificacion-max-metodo="listaMetodoSeleccionado?.calificacionMax || 0"
        @guardar="guardarRango"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useMetodosDeEvaluacion } from '../composables/useMetodosDeEvaluacion';
import MetodosDeEvaluacionForm from '../components/MetodosDeEvaluacionForm.vue';
import MetodosDeEvaluacionTable from '../components/MetodosDeEvaluacionTable.vue';
import RangosDeEvaluacionForm from '../components/RangosDeEvaluacionForm.vue';
import RangosDeEvaluacionTable from '../components/RangosDeEvaluacionTable.vue';

const {
  listaMetodos, metodoActual, 
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogoMetodo,
  esVistaRangos,
  listaRangos, rangoActual,
  listaMetodoSeleccionado, esVisibleDialogoRango,
  cargarMetodos,  guardarMetodo,
  prepararNuevoMetodo, prepararEdicionMetodo, confirmarEliminarMetodo,
  alternarVista,
  gestionarRangos, guardarRango,
  prepararNuevoRango, prepararEdicionRango, confirmarEliminarRango
} = useMetodosDeEvaluacion();

onMounted(() => {
  void cargarMetodos();
});
</script>
