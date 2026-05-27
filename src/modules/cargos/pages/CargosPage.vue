<template>
  <q-page padding>
    <div class="col q-mb-md">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('cargos.title', 'Cargos') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('cargos.subtitle', 'Gestión de cargos, salarios y vinculación con áreas de la empresa.') }}</p>
      </div>
    </div>

    <div class="row justify-between items-center q-mb-md">
      
      <div class="col-12 col-sm-4 q-mb-sm-none q-mb-md">
        <q-input 
          v-model="filtroBusqueda" 
          dense 
          outlined 
          clearable 
          :placeholder="$t('common.search', 'Buscar cualquier palabra...')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="q-gutter-sm">
        <q-btn icon="add" color="primary" :label="$t('cargos.form.new', 'Nuevo Registro')" @click="prepararNuevoCargo" />
      </div>

    </div>

    <div>
      <CargosTable
        :lista-cargos="listaCargos"
        :filtro="filtroBusqueda"
        @editar="prepararEdicionCargo"
        @eliminar="confirmarEliminarCargo"
      />
    </div>

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
  listaCargos, listaAreas, esVisibleDialogo, esModoEdicion, cargoActual, filtroBusqueda,
  cargarCargosYAreas, prepararNuevoCargo, prepararEdicionCargo, guardarCargo, confirmarEliminarCargo
} = useCargos();

onMounted(() => {
  void cargarCargosYAreas();
});
</script>