<template>
 <q-page padding>
    
  <div class="col q-mb-md">
   <div class="row justify-left">
    <h4 class="q-my-none text-primary">{{ $t('areas.title') }}</h4>
   </div>
   <div class="row justify-left">
    <p class="text-grey-7">{{ $t('areas.subtitle') }}</p>
   </div>
  </div>

  <div class="row justify-end items-center q-mb-md">
      <q-btn icon="add" color="primary" label="Nueva Area" @click="prepararNuevaArea" />
   </div> 

  <AreasTable
    :lista-areas="listaAreas"
    @editar="prepararEdicionArea"
    @eliminar="confirmarEliminarArea"
  />

  <q-dialog v-model="esVisibleDialogo" >
  <AreasForm
    :area="areaActual"
    :sucursales="listaSucursales"
    :es-modo-edicion="esModoEdicion"
    @guardar="guardarArea"
  />
  </q-dialog>
 </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAreas } from '../composables/useAreas';
import AreasForm from '../components/AreasForm.vue';
import AreasTable from '../components/AreasTable.vue';

const {
  listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, areaActual,
  cargarAreasSucursales, prepararNuevaArea, prepararEdicionArea, guardarArea, confirmarEliminarArea
} = useAreas();

onMounted(() => { 
  void cargarAreasSucursales();
})
</script>