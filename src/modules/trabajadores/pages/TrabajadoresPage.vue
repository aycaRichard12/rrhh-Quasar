<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold text-primary">
        {{ $t('workers.title') }}
      </div>
      <q-btn
        color="primary"
        icon="add"
        :label="$t('common.actions.new')"
        @click="prepararNuevoTrabajador"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </div>

    <TrabajadoresTable
      v-model:filtro="filtroBusqueda"
      :lista-trabajadores="listaTrabajadores"
      :cargando="cargando"
      @editar="prepararEdicionTrabajador"
      @eliminar="confirmarEliminarTrabajador"
      @historial="abrirHistorial"
    />

    <TrabajadoresForm
      v-model="esVisibleDialogo"
      :trabajador="trabajadorActual"
      :es-edicion="esModoEdicion"
      :cargos="listaCargos"
      @guardar="guardarTrabajador"
    />

    <TrabajadoresHistory
      v-model="esVisibleHistorial"
      :trabajador="trabajadorActual"
      :lista-historial="listaHistorial"
      @descargar-pdf="descargarHistorialPdf"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TrabajadoresTable from '../components/TrabajadoresTable.vue';
import TrabajadoresForm from '../components/TrabajadoresForm.vue';
import TrabajadoresHistory from '../components/TrabajadoresHistory.vue';
import { useTrabajadores } from '../composables/useTrabajadores';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

const {
  listaTrabajadores,
  listaCargos,
  trabajadorActual,
  cargando,
  filtroBusqueda,
  esModoEdicion,
  esVisibleDialogo,
  esVisibleHistorial,
  listaHistorial,
  cargarTrabajadores,
  cargarCargos,
  prepararNuevoTrabajador,
  prepararEdicionTrabajador,
  guardarTrabajador,
  confirmarEliminarTrabajador,
  abrirHistorial,
  descargarHistorialPdf
} = useTrabajadores();

onMounted(() => {
  void cargarCargos();
  void cargarTrabajadores();
});
</script>