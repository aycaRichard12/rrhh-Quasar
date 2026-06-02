<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-md items-center">
      
      <div class="col-12 col-sm-4">
        <q-btn
          color="primary"
          icon="add"
          :label="t('common.nuevoRegistro')"
          @click="prepararNuevaFuncionYObligacion"
        />
      </div>

      <div class="col-12 col-sm-4">
        <q-select
          v-model="cargoFiltro"
          :options="opcionesFiltroCargo"
          option-value="id"
          option-label="cargo"
          emit-value
          map-options
          dense
          outlined
          :label="t('funcionesYObligaciones.filtroCargo', 'Filtrar por Cargo')"
        />
      </div>

      <div class="col-12 col-sm-4">
        <q-input
          v-model="filtroBusqueda"
          dense
          outlined
          clearable
          :placeholder="t('common.buscar')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      
    </div>

    <FuncionesYObligacionesTable
      :lista-funciones-y-obligaciones="listaFuncionesYObligacionesFiltrada"
      :filtro="filtroBusqueda"
      @editar="prepararEdicionFuncionYObligacion"
      @eliminar="confirmarEliminarFuncionYObligacion"
    />

    <q-dialog v-model="esVisibleDialogo" persistent>
      <FuncionesYObligacionesForm
        :funcion-y-obligacion="funcionYObligacionActual"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarFuncionYObligacion"
        @cancelar="esVisibleDialogo = false"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import FuncionesYObligacionesTable from '../components/FuncionesYObligacionesTable.vue';
import FuncionesYObligacionesForm from '../components/FuncionesYObligacionesForm.vue';
import { useFuncionesYObligaciones } from '../composables/useFuncionesYObligaciones';

const { t } = useI18n();
const {
  listaFuncionesYObligacionesFiltrada,
  listaCargos,
  opcionesFiltroCargo,
  cargoFiltro,
  esModoEdicion,
  esVisibleDialogo,
  filtroBusqueda,
  funcionYObligacionActual,
  cargarCargos,
  cargarFuncionesYObligaciones,
  prepararNuevaFuncionYObligacion,
  prepararEdicionFuncionYObligacion,
  guardarFuncionYObligacion,
  confirmarEliminarFuncionYObligacion
} = useFuncionesYObligaciones();

onMounted(() => {
  void cargarCargos();
  void cargarFuncionesYObligaciones();
});
</script>