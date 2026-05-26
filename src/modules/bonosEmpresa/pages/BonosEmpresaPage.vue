<template>
  <q-page padding>

    <div class="col q-mb-md">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('Bonos.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('Bonos.subtitle') }}</p>
      </div>
    </div>

    <div class="row justify-between items-center q-mb-md">
      
      <template v-if="!esVistaEstandar">
        <q-btn outline icon="cloud_download" color="secondary" label="Importar Standar" @click="cargarBonosEmpresaEstandar" />
        <q-btn icon="add" color="primary" label="Nuevo Registro" @click="prepararNuevoBonoEmpresa" />
      </template>

      <template v-else>
        <q-btn outine color="negative" icon="arrow_back" label="Volver" @click="alternarVistaEstandar" />
        <div class="q-gutter-sm">
          <q-btn icon="autorenew" color="warning" label="Reemplazar" @click="confirmarImportacion('reemplazar')"/>
          <q-btn icon="add" color="positive" label="Añadir" @click="confirmarImportacion('agregar')" />
        </div>
      </template>
    </div>

    <div v-if="!esVistaEstandar">
      <BonosEmpresaTable
        :lista-bonos-empresa="listaBonosEmpresa"
        @import="alternarVistaEstandar"
        @editar="prepararEdicionBonoEmpresa"
        @eliminar="confirmarEliminarBonoEmpresa"
        @cambiar-estado-bono-empresa="cambiarEstadoBonoEmpresa"
      />
    </div>
    <div v-else>
      <BonosEmpresaStandar 
        :rows="listaBonosEmpresaEstandar"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <BonosEmpresaForm
        :bono-empresa="bonoEmpresaActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarBonoEmpresa"
        />
      </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBonosEmpresa } from '../composables/useBonosEmpresa';
import BonosEmpresaTable from '../components/BonosEmpresaTable.vue';
import BonosEmpresaForm from '../components/BonosEmpresaForm.vue';
import BonosEmpresaStandar from '../components/BonosEmpresaStandar.vue';

const { 
  listaBonosEmpresa, listaBonosEmpresaEstandar, esVisibleDialogo, esModoEdicion, bonoEmpresaActual, esVistaEstandar,
  cargarBonosEmpresa, cargarBonosEmpresaEstandar, prepararNuevoBonoEmpresa, prepararEdicionBonoEmpresa, guardarBonoEmpresa, confirmarEliminarBonoEmpresa, cambiarEstadoBonoEmpresa,alternarVistaEstandar, confirmarImportacion
} = useBonosEmpresa();

onMounted(() => {
  void cargarBonosEmpresa();
});
</script>