<template>
  <q-page padding>

    <div class="row justify-center q-mb-md">
        <div class="text-h5 text-primary text-bold">
          {{$t('Areas(TituloProvisional)')}}
        </div>
      </div>
      <!-- La Tabla -->
      <AreasTable
        :rows="listaAreas"
        @create="nuevaArea"
        @edit="editarArea"
        @delete="eliminarArea"
      />
      <!-- El Popup -->
      <AreaFormDialog
        v-model          ="esVisibleDialogo"
        :es-modo-edicion ="esModoEdicion"
        :datos-formulario="datosFormulario"
        :sucursales      ="listaSucursales"
        @save            ="guardarArea"
      />
  </q-page>
</template>

<script setup lang="ts">
import AreaFormDialog from '../components/AreaFormDialog.vue';
import AreasTable from '../components/AreasTable.vue';
import { useAreas } from '../composables/useAreas';
// Extraemos las funciones y variables del cerebro(composable) que necesitamos para dibujar la pantalla
const {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, datosFormulario,
    nuevaArea, editarArea, guardarArea, eliminarArea
} = useAreas();
</script>