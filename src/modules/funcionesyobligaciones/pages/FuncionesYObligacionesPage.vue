<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('funcionesyobligaciones.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('funcionesyobligaciones.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('funcionesyobligaciones.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevaFuncionYObligacion"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <FuncionesYObligacionesTable
      v-model:filtro="filtroBusqueda"
      :cargando="cargando"
      :lista-funciones-y-obligaciones="listaFuncionesYObligaciones"
      @editar="prepararEdicionFuncionYObligacion"
      @eliminar="confirmarEliminarFuncionYObligacion"
    />

    <q-dialog v-model="esVisibleDialogo">
      <FuncionesYObligacionesForm
        :funcion-y-obligacion="funcionYObligacionActual"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarFuncionYObligacion"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useFuncionesYObligaciones } from '../composables/useFuncionesYObligaciones';
import FuncionesYObligacionesTable from '../components/FuncionesYObligacionesTable.vue';
import FuncionesYObligacionesForm from '../components/FuncionesYObligacionesForm.vue';

const prepararNuevaFuncionYObligacion = () => {
  nuevaFuncionYObligacion(Number(listaCargos.value[0]?.id ?? 0))
}

const {
  listaFuncionesYObligaciones, listaCargos, funcionYObligacionActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarFuncionesYObligaciones, cargarCargos, guardarFuncionYObligacion,
  prepararEdicionFuncionYObligacion, nuevaFuncionYObligacion, confirmarEliminarFuncionYObligacion
} = useFuncionesYObligaciones();

onMounted(() => {
  void cargarCargos();
  void cargarFuncionesYObligaciones();
});
</script>