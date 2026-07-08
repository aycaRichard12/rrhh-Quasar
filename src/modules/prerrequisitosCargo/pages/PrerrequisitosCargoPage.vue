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

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('prerrequisitos.new')" 
        :round="$q.screen.lt.sm"
        @click="prepararNuevoPrerrequisito"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <PrerrequisitosCargoTable
      v-model:filtro="filtroBusqueda"
      :cargando="cargando"
      :lista-prerrequisitos="listaPrerrequisitos"
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
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { usePrerrequisitosCargo } from '../composables/usePrerrequisitosCargo';
import PrerrequisitosCargoForm from '../components/PrerrequisitosCargoForm.vue';
import PrerrequisitosCargoTable from '../components/PrerrequisitosCargoTable.vue';
import { useCargos } from 'src/modules/cargos/composables/useCargos';

const prepararNuevoPrerrequisito = () => {
  nuevoPrerrequisito(Number(listaCargos.value[0]?.id ?? 0));
};

const {
  listaPrerrequisitos, cargando, filtroBusqueda,
  esVisibleDialogo, esModoEdicion, prerrequisitoActual, 
  cargarPrerrequisitos, nuevoPrerrequisito,
  prepararEdicionPrerrequisito, guardarPrerrequisito, confirmarEliminarPrerrequisito
} = usePrerrequisitosCargo();

const {
  listaCargos,
  cargarCargos
} = useCargos();

onMounted(() => {
  void cargarPrerrequisitos();
  void cargarCargos();
});
</script>