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

    <q-card-section class="row justify-between items-center">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes" size="15px"
          :label="$q.screen.lt.sm ? '' : $t('areas.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaArea"
        />
        <q-input clearable dense outlined 
          v-model="filtroBusqueda" 
          :placeholder="$t('common.actions.search')"
        >
          <template v-slot:append>
            <q-icon name="manage_search"/>
          </template>
        </q-input>
    </q-card-section>

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