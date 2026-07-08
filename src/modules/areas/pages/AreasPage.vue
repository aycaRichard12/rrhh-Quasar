<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('areas.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('areas.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('areas.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevaArea"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <AreasTable
      v-model:filtro="filtroBusqueda"
      :cargando="cargando"
      :lista-areas="listaAreas"
      :lista-sucursales="listaSucursales"
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
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useAreas } from '../composables/useAreas';
import AreasForm from '../components/AreasForm.vue';
import AreasTable from '../components/AreasTable.vue';

const {
  listaAreas, listaSucursales, areaActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarAreas, guardarArea, cargarSucursales,
  prepararNuevaArea, prepararEdicionArea, confirmarEliminarArea
} = useAreas();

onMounted(() => { 
  void cargarAreas();
  void cargarSucursales();
})
</script>