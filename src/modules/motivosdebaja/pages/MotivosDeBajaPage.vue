<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('reasonLeave.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('reasonLeave.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('reasonLeave.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevoMotivo"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <div>
      <MotivosDeBajaTable
        v-model:filtro="filtroBusqueda"
        :lista-motivos="listaMotivos"
        :cargando="cargando"
        @editar="prepararEdicionMotivo"
        @eliminar="confirmarEliminarMotivo"
      />
    </div>

    <!-- Diálogos -->
    <q-dialog v-model="esVisibleDialogo">
      <MotivosDeBajaForm
        :motivo="motivoActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarMotivo"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMotivosDeBaja } from '../composables/useMotivosDeBaja';
import MotivosDeBajaTable from '../components/MotivosDeBajaTable.vue';
import MotivosDeBajaForm from '../components/MotivosDeBajaForm.vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

const {
  listaMotivos, cargando, filtroBusqueda,
  esVisibleDialogo, esModoEdicion, motivoActual,
  cargarMotivosDeBaja, prepararNuevoMotivo, prepararEdicionMotivo, guardarMotivo, confirmarEliminarMotivo
} = useMotivosDeBaja();

onMounted(() => {
  void cargarMotivosDeBaja();
});
</script>
