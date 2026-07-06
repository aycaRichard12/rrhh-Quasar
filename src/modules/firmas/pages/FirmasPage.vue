<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('firmas.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('firmas.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="add"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('firmas.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevaFirma"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>
    
    <div>
			<FirmasTable
				v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-firmas="listaFirmas"
        :lista-usuarios="listaUsuarios"
				@editar="prepararEdicionFirma"
				@eliminar="eliminarFirma"
        @cambiar-estado-registro="cambiarEstadoRegistro"
			/>
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <FirmasForm
        :firma="firmaActual"
        :lista-usuarios="listaUsuarios"
        :es-modo-edicion="esModoEdicion"
        @guardar="ejecutarAccionFirma"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useFirmas } from '../composables/useFirmas';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import FirmasForm from '../components/FirmasForm.vue';
import FirmasTable from '../components/FirmasTable.vue';

const {
  listaFirmas, firmaActual, listaUsuarios,
	cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  cargarFirmas, prepararNuevaFirma,
	prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
	cambiarEstadoRegistro, cargarUsuarios
} = useFirmas();

onMounted(() => {
  void cargarFirmas();
  void cargarUsuarios()
});
</script>