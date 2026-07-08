<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('tiposdesanciones.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('tiposdesanciones.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('tiposdesanciones.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevoTipoDeSancion"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <div>
      <TiposDeSancionesTable
        v-model:filtro="filtroBusqueda"
        :lista-tipos-de-sanciones="listaTiposDeSanciones"
        :cargando="cargando"
        @editar="prepararEdicionTipoDeSancion"
        @eliminar="confirmarEliminarTipoDeSancion"
      />
    </div>

    <!-- Diálogos -->
    <q-dialog 
      v-model="esVisibleDialogo"
    >
      <TiposDeSancionesForm
        :tipo-de-sancion="tipoDeSancionActual"
        :lista-niveles="listaNiveles"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarTipoDeSancion"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useTiposDeSanciones } from '../composables/useTiposDeSanciones';
import TiposDeSancionesTable from '../components/TiposDeSancionesTable.vue';
import TiposDeSancionesForm from '../components/TiposDeSancionesForm.vue';

import { useNiveles } from 'src/modules/niveles/composables/useNiveles';

const prepararNuevoTipoDeSancion = () => {
  nuevoTipoDeSancion(Number(listaNiveles.value[0]?.id ?? 0))
}

const {
  listaTiposDeSanciones, cargando, filtroBusqueda,
  esVisibleDialogo, esModoEdicion, tipoDeSancionActual,
  cargarTiposDeSanciones, guardarTipoDeSancion, nuevoTipoDeSancion,
  prepararEdicionTipoDeSancion, confirmarEliminarTipoDeSancion
} = useTiposDeSanciones();

const {
  listaNiveles,
  cargarNiveles
} = useNiveles();

onMounted(() => {
  void cargarTiposDeSanciones();
  void cargarNiveles();
});
</script>