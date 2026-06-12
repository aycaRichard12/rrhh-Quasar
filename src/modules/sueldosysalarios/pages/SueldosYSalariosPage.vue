<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <h5 class="q-my-none">Sueldos y Salarios</h5>
      <q-space />
      <q-btn color="primary" label="Nuevo" icon="add" @click="prepararNuevo" />
    </div>

    <SueldosYSalariosTable
      :rows="listaItems"
      :loading="cargando"
      @editar="prepararEdicion"
      @eliminar="eliminar"
    />

    <q-dialog v-model="esVisibleDialogo">
      <SueldosYSalariosForm
        :item="itemActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardar"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSueldosYSalarios } from '../composables/useSueldosYSalarios';
import SueldosYSalariosTable from '../components/SueldosYSalariosTable.vue';
import SueldosYSalariosForm from '../components/SueldosYSalariosForm.vue';

const {
  listaItems, cargando, esVisibleDialogo, esModoEdicion, itemActual,
  cargarItems, prepararNuevo, prepararEdicion, guardar, eliminar
} = useSueldosYSalarios();

onMounted(() => {
  void cargarItems();
});
</script>
