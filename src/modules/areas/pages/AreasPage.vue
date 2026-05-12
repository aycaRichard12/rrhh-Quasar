<template>
  <div class="q-pa-md">

    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5 text-primary text-bold">Areas</div>
      <q-btn color="primary" icon="add" label="Nuevo Registro" @click="nuevaArea" />
    </div>
    <!-- La Tabla -->
    <AreasTable
      :rows="listaAreas"
      @edit="editarArea"
      @delete="eliminarArea"
    />
    <!-- El Popup -->
    <AreaFormDialog
      v-model="esVisibleDialogo"
      :es-edicion="esModoEdicion"
      :form-data="datosFormulario"
      :sucursales="listaSucursales"
      @save="guardarArea"
    />
  </div>
</template>

<script setup lang="ts">
// Importamos el "cerebro" y los componentes
import { useAreas } from '../composables/useAreas';
import AreasTable from '../components/AreasTable.vue';
import AreaFormDialog from '../components/AreaFormDialog.vue';

// Extraemos las funciones y variables que necesitamos para dibujar la pantalla
const {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, datosFormulario,
    nuevaArea, editarArea, guardarArea, eliminarArea
} = useAreas();
</script>
