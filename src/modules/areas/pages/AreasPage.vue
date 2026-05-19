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

  <AreasTable
   :rows="listaAreas"
   :cargando="cargando"
   @create="abrirDialogoNuevo"
   @edit="abrirDialogoEditar"
   @delete="confirmarEliminacion"
  />

  <AreasForm
   v-model="esVisibleDialogo"
   :es-modo-edicion="esModoEdicion"
   :cargando="cargando"
   :datos-formulario="areaActual"
   :sucursales="listaSucursales"
   @save="procesarGuardado"
  />

 </q-page>
</template>

<script setup lang="ts">
import AreasForm from '../components/AreaForm.vue';
import AreasTable from '../components/AreasTable.vue';
import { useAreas } from '../composables/useAreas';

const {
  listaAreas, listaSucursales, cargando, esVisibleDialogo, esModoEdicion, areaActual,
  abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion
} = useAreas();
</script>