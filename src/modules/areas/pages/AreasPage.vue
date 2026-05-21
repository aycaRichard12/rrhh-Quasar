<template>
 <q-page padding>
    
  <div class="col q-mb-md">
   <div class="row justify-center">
    <h4 class="q-my-none text-primary">{{ $t('areas.title') }}</h4>
   </div>
   <div class="row justify-center">
    <p class="text-grey-7">{{ $t('areas.subtitle') }}</p>
   </div>
  </div>

  <div class="row justify-between items-center q-mb-md">
      <q-btn color="primary" label="Nuevo Registro" @click="prepararNuevaArea" />
   </div> 

  <AreasTable
    :lista-areas="listaAreas"
    @editar="prepararEdicionArea"
    @eliminar="confirmarEliminarArea"
  />

  <q-dialog v-model="esVisibleDialogo" >
  <AreaForm
    :area="areaActual"
    :sucursales="listaSucursales"
    :es-modo-edicion="esModoEdicion"
    @guardar="guardarArea"
    @cerrar="esVisibleDialogo = false"
  />
  </q-dialog>
 </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAreas } from '../composables/useAreas';
import AreaForm from '../components/AreaForm.vue';
import AreasTable from '../components/AreasTable.vue';

const {
  listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, areaActual,
  cargarAreasSucursales, prepararNuevaArea, prepararEdicionArea, guardarArea, confirmarEliminarArea
} = useAreas();

onMounted(() => { 
  void cargarAreasSucursales();
})
</script>