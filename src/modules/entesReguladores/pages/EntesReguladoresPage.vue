<template>
  <q-page padding>

    <div class="row justify-center q-mb-md">
      <div class="text-h5 text-primary text-bold">
        {{ $t('Entes Reguladores (Título Provisional)') }}
      </div>
    </div>

    <div v-if="!esVistaTemplates">
      <EntesReguladoresTable
        :rows="listaEntes"
        :cargando="cargando"
        @create="abrirDialogoNuevo"
        @import="cargarTemplates"
        @edit="abrirDialogoEdicion"
        @delete="confirmarEliminacion"
        @change-status="cambiarEstado"
      />
    </div>

    <div v-else>
      <EntesReguladoresStandar
      :templates="listaTemplates"
      :cargando="cargando"
      @volver="esVistaTemplates = false"
      @procesar="procesarTemplates"
      />
    </div>

    <EntesReguladoresForm
      v-model="esVisibleDialogo"
      :es-modo-edicion="esModoEdicion"
      :datos-formulario="enteActual"
      :guardando="cargando"
      @save="guardarEnte"
    />
  </q-page>
</template>

<script setup lang="ts">
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresStandar from '../components/EntesReguladoresStandar.vue';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';
import { useEntesReguladores } from '../composables/useEntesReguladores';

// Instanciamos nuestro cerebro (Composable) y extraemos lo necesario
const {
  listaEntes, listaTemplates, esVisibleDialogo, esVistaTemplates, cargando, enteActual, esModoEdicion,
  cargarTemplates, abrirDialogoNuevo, abrirDialogoEdicion, guardarEnte, confirmarEliminacion, cambiarEstado, procesarTemplates
} = useEntesReguladores();
</script>