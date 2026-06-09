<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('prerrequisitos.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('prerrequisitos.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row justify-between items-center">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes" size="15px" :label="$q.screen.lt.sm ? '' : $t('prerrequisitos.new')" 
        :round="$q.screen.lt.sm"
        @click="prepararNuevoPrerrequisito" />

      <q-input clearable dense outlined 
        v-model="filtroBusqueda" 
        :placeholder="$t('common.actions.search')"
      >
        <template v-slot:append>
          <q-icon name="manage_search" />
        </template>
      </q-input>
    </q-card-section>

    <PrerrequisitosCargoTable
      :lista-prerrequisitos="listaPrerrequisitosFiltrados"
      :filtro="filtroBusqueda"
      @editar="prepararEdicionPrerrequisito"
      @eliminar="confirmarEliminarPrerrequisito"
    />

    <q-dialog v-model="esVisibleDialogo">
      <PrerrequisitosCargoForm
        :prerrequisito="prerrequisitoActual"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarPrerrequisito"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePrerrequisitosCargo } from '../composables/usePrerrequisitosCargo';
import PrerrequisitosCargoTable from '../components/PrerrequisitosCargoTable.vue';
import PrerrequisitosCargoForm from '../components/PrerrequisitosCargoForm.vue';

const {
  listaPrerrequisitosFiltrados, listaCargos, esVisibleDialogo, esModoEdicion, prerrequisitoActual, filtroBusqueda,
  cargarDatos, prepararNuevoPrerrequisito, prepararEdicionPrerrequisito, guardarPrerrequisito, confirmarEliminarPrerrequisito
} = usePrerrequisitosCargo();

onMounted(() => {
  void cargarDatos();
});
</script>