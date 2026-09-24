<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('postulantes.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('postulantes.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('postulantes.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevoPostulante"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <PostulantesTable
      v-model:filtro="filtroBusqueda"
      :cargando="cargando"
      :lista-postulantes="postulantesActivos" 
      @editar="prepararEdicionPostulante"
      @eliminar="confirmarEliminarPostulante"
      @calificar="prepararCalificacion"
      @conclusion="prepararConclusion"
    />

    <q-dialog v-model="esVisibleDialogo">
      <PostulantesForm
        :postulante="postulanteActual"
        :lista-convocatorias="listaConvocatorias"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarPostulante"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { usePostulantes } from '../composables/usePostulantes';
import PostulantesForm from '../components/PostulantesForm.vue';
import PostulantesTable from '../components/PostulantesTable.vue';
import { useConvocatorias } from 'src/modules/convocatorias/composables/useConvocatorias';

const prepararNuevoPostulante = () => {
  nuevoPostulante(Number(listaConvocatorias.value[0]?.id ?? 0));
};

const postulantesActivos = computed(() => {
  return listaPostulantes.value.filter(postulante => {
    // Buscamos a qué convocatoria pertenece este postulante
    const conv = listaConvocatorias.value.find(c => Number(c.id) === Number(postulante.idconvocatoria));
    // Si la encontramos y su estado es 1 (Activa), lo mostramos en la tabla
    return conv && Number(conv.estado) === 1;
  });
});

// Funciones preparadas para cuando programes tus modales de Calificar y Conclusión
const prepararCalificacion = () => {
  console.log('Abriendo modal para calificar al postulante:');
  // Lógica futura...
};

const prepararConclusion = () => {
  console.log('Abriendo modal para la conclusión de:');
  // Lógica futura...
};

const {
  listaPostulantes, postulanteActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarPostulantes, guardarPostulante,
  prepararEdicionPostulante, nuevoPostulante, confirmarEliminarPostulante
} = usePostulantes();

const {
  listaConvocatorias,
  cargarConvocatorias
} = useConvocatorias();

onMounted(() => {
  void cargarConvocatorias();
  void cargarPostulantes();
});
</script>