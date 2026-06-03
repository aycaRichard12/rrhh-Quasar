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

    <div class="row justify-between items-center">
      
      <div class="q-gutter-sm q-mb-md">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes" size="15px" :label="$q.screen.lt.sm ? '' : $t('cargos.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoCargo" />
      </div>

      <div class=" q-mb-md">
        <q-input clearable dense outlined 
          v-model="filtroBusqueda"
          :placeholder="$t('common.actions.search')"
        >
          <template v-slot:append>
            <q-icon name="manage_search" />
          </template>
        </q-input>
      </div>

    </div>

    <CargosTable
      :lista-cargos="listaCargosFiltrados"
      :filtro="filtroBusqueda"
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
import { useCargos } from '../composables/useCargos';
import CargosTable from '../components/CargosTable.vue';
import CargosForm from '../components/CargosForm.vue';

const {
  listaCargosFiltrados, listaAreas, esVisibleDialogo, esModoEdicion, cargoActual, filtroBusqueda,
  cargarCargosYAreas, prepararNuevoCargo, prepararEdicionCargo, guardarCargo, confirmarEliminarCargo
} = useCargos();

onMounted(() => {
  void cargarCargosYAreas();
});
</script>