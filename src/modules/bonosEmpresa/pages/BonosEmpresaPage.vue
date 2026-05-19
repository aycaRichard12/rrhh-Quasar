<template>
  <q-page padding>

  <div class="col q-mb-md">
   <div class="row justify-center">
    <h4 class="q-my-none text-primary">{{ $t('Bonos.title') }}</h4>
   </div>
   <div class="row justify-center">
    <p class="text-grey-7">{{ $t('Bonos.subtitle') }}</p>
   </div>
  </div>

    <div v-if="!esVisibleEstandar">
      <div class="row justify-between items-center q-mb-md">
        <q-btn color="primary" label="Nuevo Registro" @click="prepararNuevoBonoEmpresa" />
        <q-btn color="secondary" label="Importar Standar" @click="cargarBonosEstandar" />
      </div>

      <BonosEmpresaTable
        :lista-bonos-empresa="listaBonosEmpresa"
        @editar="prepararEdicionBonoEmpresa"
        @eliminar="confirmarEliminarBonoEmpresa"
        @cambiar-estado="cambiarEstadoBonoEmpresa"
      />

      <q-dialog v-model="esVisibleDialogo" persistent>
        <BonosEmpresaForm
          :bono-empresa="bonoEmpresaActual"
          :es-modo-edicion="esModoEdicion"
          @guardar="guardarBonoEmpresa"
          @cerrar="esVisibleDialogo = false"
        />
      </q-dialog>
    </div>

    <div v-else>
      <BonosEmpresaStandar
        :lista-bonos-estandar="listaBonosEstandar"
        @volver="esVisibleEstandar = false"
        @procesar-importacion="procesarImportacion"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBonosEmpresa } from '../composables/useBonosEmpresa';
import BonosEmpresaTable from '../components/BonosEmpresaTable.vue';
import BonosEmpresaForm from '../components/BonosEmpresaForm.vue';
import BonosEmpresaStandar from '../components/BonosEmpresaStandar.vue';

const { 
  listaBonosEmpresa,
  listaBonosEstandar,
  esVisibleEstandar, 
  esVisibleDialogo, 
  esModoEdicion,
  bonoEmpresaActual,
  cargarBonosEmpresa, 
  prepararNuevoBonoEmpresa, 
  prepararEdicionBonoEmpresa,
  guardarBonoEmpresa,
  confirmarEliminarBonoEmpresa,
  cambiarEstadoBonoEmpresa,
  cargarBonosEstandar,
  procesarImportacion
} = useBonosEmpresa();

onMounted(() => {
  void cargarBonosEmpresa();
});
</script>