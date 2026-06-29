<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('niveles.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('niveles.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="add"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('niveles.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevoNivel"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <div>
      <NivelesTable
        :rows="listaNiveles"
        :loading="cargando"
        @editar="prepararEdicionNivel"
        @eliminar="confirmarEliminarNivel"
      />
    </div>

    <!-- Diálogos -->
    <q-dialog 
      v-model="esVisibleDialogo"
    >
      <NivelesForm
        :nivel="nivelActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarNivel"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNiveles } from '../composables/useNiveles';
import NivelesTable from '../components/NivelesTable.vue';
import NivelesForm from '../components/NivelesForm.vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

const {
  listaNiveles, nivelActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarNiveles, guardarNivel,
  prepararNuevoNivel, prepararEdicionNivel, confirmarEliminarNivel
} = useNiveles();

onMounted(() => {
  void cargarNiveles();
});
</script>