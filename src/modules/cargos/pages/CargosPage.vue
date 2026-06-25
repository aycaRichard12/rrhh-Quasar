<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('cargos.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('cargos.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('cargos.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevoCargo"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <CargosTable
      v-model:filtro="filtroBusqueda"
      :cargando="cargando"
      :lista-cargos="listaCargos"
      @editar="prepararEdicionCargo"
      @eliminar="confirmarEliminarCargo"
    />

    <q-dialog v-model="esVisibleDialogo">
      <CargosForm
        :cargo="cargoActual"
        :lista-areas="listaAreas"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarCargo"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useCargos } from '../composables/useCargos';
import CargosForm from '../components/CargosForm.vue';
import CargosTable from '../components/CargosTable.vue';

const {
  listaCargos, listaAreas, cargando, filtroBusqueda,
  esVisibleDialogo, esModoEdicion, cargoActual,
  cargarCargos, prepararNuevoCargo,
  prepararEdicionCargo, guardarCargo, confirmarEliminarCargo
} = useCargos();

onMounted(() => {
  void cargarCargos();
});
</script>