<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5 text-primary text-bold">Areas</div>
      <q-btn color="primary" icon="add" :label="$t('formBtn.registration')" @click="nuevaArea" />
    </div>
    <!-- La Tabla -->
    <AreasTable :rows="listaAreas" @edit="editarArea" @delete="eliminarArea" />
    <!-- El Popup -->
    <AreaFormDialog
      v-model          ="esVisibleDialogo"
      :esModoEdicion   ="esModoEdicion"
      :datos-formulario="datosFormulario"
      :sucursales      ="listaSucursales"
      @save            ="guardarArea"
    />
  </div>
</template>

<script setup lang="ts">
import AreaFormDialog from '../components/AreaFormDialog.vue';
import AreasTable from '../components/AreasTable.vue';
import { useAreas } from '../composables/useAreas';
// Extraemos las funciones y variables que necesitamos para dibujar la pantalla
const {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, datosFormulario,
    nuevaArea, editarArea, guardarArea, eliminarArea
} = useAreas();
</script>
