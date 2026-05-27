<template>
  <q-page padding>
    <div class="row justify-between items-center">

      <div class="q-gutter-sm q-mb-md">
        <q-btn icon="add" color="primary" label="Nueva Area" @click="prepararNuevaArea" />
      </div>
      <div class="col-6 col-sm-3 q-mb-sm-none q-mb-md">
        <q-input clearable dense outlined 
          v-model="filtroBusqueda" 
          :placeholder="$t('common.search', 'Buscar cualquier palabra...')"
        >
          <template v-slot:append> <q-icon name="search" /> </template>
        </q-input>
      </div>
    </div> 

    <AreasTable
      :lista-areas="listaAreas"
      :filtro="filtroBusqueda"
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
  listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, areaActual, filtroBusqueda,
  cargarAreasSucursales, prepararNuevaArea, prepararEdicionArea, guardarArea, confirmarEliminarArea
} = useAreas();

onMounted(() => { 
  void cargarAreasSucursales();
})
</script>