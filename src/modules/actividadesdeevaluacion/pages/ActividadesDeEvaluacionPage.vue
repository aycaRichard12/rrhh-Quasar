<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('actividadesdeevaluacion.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('actividadesdeevaluacion.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('actividadesdeevaluacion.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevaActividad"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <div>
      <ActividadesDeEvaluacionTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-actividades="listaActividades"
        @editar="prepararEdicionActividad"
        @eliminar="confirmarEliminarActividad"
      />
    </div>
    <!-- Diálogos -->
    <q-dialog v-model="esVisibleDialogo">
      <ActividadesDeEvaluacionForm
        :actividad="actividadActual"
        :lista-metodos="listaMetodos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarActividad"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useActividadesDeEvaluacion } from '../composables/useActividadesDeEvaluacion';
import ActividadesDeEvaluacionForm from '../components/ActividadesDeEvaluacionForm.vue';
import ActividadesDeEvaluacionTable from '../components/ActividadesDeEvaluacionTable.vue';

const {
  listaActividades, listaMetodos, actividadActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarActividades, cargarMetodos, guardarActividad,
  prepararNuevaActividad, prepararEdicionActividad, confirmarEliminarActividad
} = useActividadesDeEvaluacion();

onMounted(() => {
  void cargarActividades();
  void cargarMetodos();
});
</script>