<template>
 <q-page padding>
    
  <div class="col q-mb-md">
   <div class="row justify-center">
    <h4 class="q-my-none text-primary">{{ $t('entity.title') }}</h4>
   </div>
   <div class="row justify-center">
    <p class="text-grey-7">{{ $t('entity.subtitle') }}</p>
   </div>
  </div>

  <div v-if="!esVistaEstandar">
   <div class="row justify-between items-center q-mb-md">
      <q-btn color="primary" label="Nuevo Registro" @click="prepararNuevoEnteRegulador" />
      <q-btn color="secondary" label="Importar Standar" @click="cargarEntesReguladoresEstandar" />
   </div> 

    <EntesReguladoresTable
      :lista-entes-reguladores="listaEntesReguladores"
      @editar="prepararEdicionEnteRegulador"
      @eliminar="confirmarEliminarEnteRegulador"
      @cambiar-estado="cambiarEstadoEnteRegulador"
    />

    <q-dialog v-model="esVisibleDialogo" persistent>
    <EntesReguladoresForm
      :ente-regulador="enteReguladorActual"
      :es-modo-edicion="esModoEdicion"
      @guardar="guardarEnteRegulador"
      @cerrar="esVisibleDialogo = false"
    />
    </q-dialog>
  </div>

  <div v-else>
    <EntesReguladoresStandar
      :lista-entes-reguladores-estandar="listaEntesReguladoresEstandar"
      @volver="esVistaEstandar = false"
      @procesar-importacion="procesarImportacion"
    />
  </div>
 </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEntesReguladores } from '../composables/useEntesReguladores';
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresStandar from '../components/EntesReguladoresStandar.vue';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';

const {
  listaEntesReguladores,
  listaEntesReguladoresEstandar,
  esVistaEstandar,
  esVisibleDialogo,
  esModoEdicion, 
  enteReguladorActual,
  cargarEntesReguladores,
  prepararNuevoEnteRegulador,
  prepararEdicionEnteRegulador,
  guardarEnteRegulador,
  confirmarEliminarEnteRegulador,
  cambiarEstadoEnteRegulador,
  cargarEntesReguladoresEstandar,
  procesarImportacion
} = useEntesReguladores();

onMounted(() => {
  void cargarEntesReguladores();
})
</script>