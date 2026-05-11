<template>
  <div class="q-pa-md">

    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5 text-primary text-bold">Áreas</div>
      <br />
      <q-btn color="primary" icon="add" label="Nuevo Registro" @click="abrirNuevo" />
    </div>
    <!-- La Tabla -->
    <AreasTable
      :rows="areasList"
      @edit="abrirEditar"
      @delete="eliminar"
    />
    <!-- El Popup -->
    <AreaFormDialog
      v-model="showDialog"
      :is-editing="isEditing"
      :form-data="formData"
      :sucursales="sucursalesList"
      @save="guardar"
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
  areasList,
  sucursalesList,
  showDialog,
  isEditing,
  formData,
  abrirNuevo,
  abrirEditar,
  guardar,
  eliminar
} = useAreas();
</script>
