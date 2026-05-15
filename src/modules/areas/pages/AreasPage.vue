   <!-- <div class="row justify-center q-mb-md">
      <div class="text-h5 text-primary text-bold">
        {{$t('Areas(TituloProvisional)')}}
      </div>
    </div> -->
<template>
  <q-page padding>
    
    <div class="row q-mb-md">
      <div class="col-12">
        <h4 class="q-my-none text-primary">{{ $t('areas.title', 'Módulo de Áreas') }}</h4>
        <p class="text-grey-7">{{ $t('areas.description', 'Gestión de áreas y sucursales de la empresa.') }}</p>
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

// Extraemos las funciones estandarizadas del Composable
const {
  listaAreas, listaSucursales, cargando, esVisibleDialogo, esModoEdicion, areaActual,
  abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion
} = useAreas();
</script>