<template>
 <q-page padding>
    
  <div class="col q-mb-md">
   <div class="row justify-center">
    <h4 class="q-my-none text-primary">{{ $t('entity.title') }}</h4>
   </div>
   <div class="row justify-center">
    <p class="text-grey-7">{{ $t('entity.subtitle') }}</p>
   </div>
  </div>

  <div v-if="!esVistaEstandar">
   <EntesReguladoresTable
    :rows="listaEntes"
    :cargando="cargando"
    @create="abrirDialogoNuevo"
    @import="alternarVistaEstandar"
    @edit="abrirDialogoEditar"
    @delete="confirmarEliminacion"
    @change-status="cambiarEstadoRegistro"
   />
  </div>

  <div v-else>
   <EntesReguladoresStandar
    :rows="listaEntesEstandar"
    :cargando="cargando"
    @volver="alternarVistaEstandar"
    @procesar="(tipoAccion) => confirmarImportacion(tipoAccion === 1 ? 'reemplazar' : 'anadir')"
   />
  </div>

  <EntesReguladoresForm
   v-model="esVisibleDialogo"
   :es-modo-edicion="esModoEdicion"
   :cargando="cargando"
   :datos-formulario="enteActual"
   @save="procesarGuardado"
  />

 </q-page>
</template>

<script setup lang="ts">
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresStandar from '../components/EntesReguladoresStandar.vue';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';
import { useEntesReguladores } from '../composables/useEntesReguladores';

const {
  listaEntes, listaEntesEstandar, cargando, esVisibleDialogo, esModoEdicion, enteActual, esVistaEstandar,
  abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion, cambiarEstadoRegistro, alternarVistaEstandar, confirmarImportacion
} = useEntesReguladores();
</script>