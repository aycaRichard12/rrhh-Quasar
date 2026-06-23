<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-md items-center">
      
      <div class="col-12 col-sm-4">
        <q-btn
          class="global-btn-page"
          icon="add"
          :label="t('nuevo Registro')"
          @click="prepararNuevaFuncionYObligacion"
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

    <!-- <FuncionesYObligacionesTable
      :filtro="filtroBusqueda"
      @editar="prepararEdicionFuncionYObligacion"
      @eliminar="confirmarEliminarFuncionYObligacion"
    /> -->

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
// import FuncionesYObligacionesTable from '../components/FuncionesYObligacionesTable.vue';
import FuncionesYObligacionesForm from '../components/FuncionesYObligacionesForm.vue';
import { useFuncionesYObligaciones } from '../composables/useFuncionesYObligaciones';

const { t } = useI18n();
const {
  listaCargos,
  esModoEdicion,
  esVisibleDialogo,
  filtroBusqueda,
  funcionYObligacionActual,
  cargarCargos,
  cargarFuncionesYObligaciones,
  prepararNuevaFuncionYObligacion,
  // prepararEdicionFuncionYObligacion,
  guardarFuncionYObligacion,
  // confirmarEliminarFuncionYObligacion
} = useFuncionesYObligaciones();

onMounted(() => {
  void cargarCargos();
  void cargarFuncionesYObligaciones();
});
</script>