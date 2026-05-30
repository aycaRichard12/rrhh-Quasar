<template>
  <q-page padding>
    <div class="col q-mb-md">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('Cargos') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('cargos.subtitle', 'Gestión de cargos, salarios y vinculación con áreas de la empresa.') }}</p>
      </div>
    </div>

    <div class="row q-col-gutter-md items-center q-mb-md">
      
      <div class="col-12 col-md-4 text-left">
        <q-btn icon="add" text-color="white" class="prueba-boton2" :label="$t('cargos.form.new', 'Nuevo Registro')" @click="prepararNuevoCargo" />
      </div>

      <div class="col-6 col-md-4">
        <q-select
          dense
          outlined
          emit-value
          map-options
          v-model="idAreaSeleccionada"
          :options="opcionesAreasFiltro"
          option-value="id"
          option-label="nombre"
          :label="$t('cargos.filter.areaLabel', 'Filtrar por Área')"
        />
      </div>

      <div class="col-6 col-md-4">
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

    </div>

    <div>
      <CargosTable
        :lista-cargos="listaCargosFiltrados"
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
import { useI18n } from 'vue-i18n';
import { onMounted, computed } from 'vue';
import { useCargos } from '../composables/useCargos';
import CargosTable from '../components/CargosTable.vue';
import CargosForm from '../components/CargosForm.vue';

const { t } = useI18n();

const {
  listaCargosFiltrados, listaAreas, esVisibleDialogo, esModoEdicion, cargoActual, filtroBusqueda, idAreaSeleccionada,
  cargarCargosYAreas, prepararNuevoCargo, prepararEdicionCargo, guardarCargo, confirmarEliminarCargo
} = useCargos();

const opcionesAreasFiltro = computed(() => [
  { id: '_todos_', nombre: t('common.all', 'Todos') },
  ...listaAreas.value
]);

onMounted(() => {
  idAreaSeleccionada.value = '_todos_';
  void cargarCargosYAreas();
});
</script>

<style>
.prueba-boton2{
  background-color: #004d40 !important;
}
</style>