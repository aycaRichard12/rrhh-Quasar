<template>
  <q-page padding>
    <div class="col q-mb-md">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('prerrequisitos.title', 'Prerrequisitos de Cargo') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('prerrequisitos.subtitle', 'Gestión de condiciones o requisitos indispensables por cargo.') }}</p>
      </div>
    </div>

    <div class="row q-col-gutter-md items-center q-mb-md">
      
      <div class="col-12 col-md-4 text-left">
        <q-btn icon="add" color="primary" :label="$t('prerrequisitos.form.new', 'Nuevo Registro')" @click="prepararNuevoPrerrequisito" />
      </div>

      <div class="col-12 col-md-4">
        <q-select
          dense
          outlined
          emit-value
          map-options
          v-model="idCargoSeleccionado"
          :options="opcionesCargosFiltro"
          option-value="id"
          option-label="cargo"
          :label="$t('prerrequisitos.filter.cargoLabel', 'Filtrar por Cargo')"
        />
      </div>

      <div class="col-12 col-md-4">
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
      <PrerrequisitosCargoTable
        :lista-prerrequisitos="listaPrerrequisitosFiltrados"
        :filtro="filtroBusqueda"
        @editar="prepararEdicionPrerrequisito"
        @eliminar="confirmarEliminarPrerrequisito"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <PrerrequisitosCargoForm
        :prerrequisito="prerrequisitoActual"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarPrerrequisito"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrerrequisitosCargo } from '../composables/usePrerrequisitosCargo';
import PrerrequisitosCargoTable from '../components/PrerrequisitosCargoTable.vue';
import PrerrequisitosCargoForm from '../components/PrerrequisitosCargoForm.vue';

const { t } = useI18n();

const {
  listaPrerrequisitosFiltrados, listaCargos, esVisibleDialogo, esModoEdicion, prerrequisitoActual, filtroBusqueda, idCargoSeleccionado,
  cargarDatos, prepararNuevoPrerrequisito, prepararEdicionPrerrequisito, guardarPrerrequisito, confirmarEliminarPrerrequisito
} = usePrerrequisitosCargo();

// Inyectamos dinámicamente "Todos" al select del filtro
const opcionesCargosFiltro = computed(() => [
  { id: '_todos_', cargo: t('common.all', 'Todos') },
  ...listaCargos.value
]);

onMounted(() => {
  idCargoSeleccionado.value = '_todos_';
  void cargarDatos();
});
</script>