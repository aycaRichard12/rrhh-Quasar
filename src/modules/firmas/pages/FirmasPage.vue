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
      <template v-if="!esVistaFirmaTipoPlanilla">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('firmas.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaFirma"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      </template>

      <template v-else>
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('Nueva Planilla')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaFirmaTipoPlanilla"
        />
        <q-btn outline
          color="negative"
          icon="arrow_back"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('forms.back')"
          :round="$q.screen.lt.sm"
          @click="alternarVista"
        />
      </template>
    </q-card-section>
    
    <div v-if="!esVistaFirmaTipoPlanilla">
			<FirmasTable
				v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-firmas="listaFirmas"
        :lista-usuarios="listaUsuarios"
				@editar="prepararEdicionFirma"
				@eliminar="eliminarFirma"
        @cambiar-estado-registro="cambiarEstadoRegistro"
        @gestionar-firmas="gestionarFirmas"
			/>
    </div>

    <div v-else>
      <FirmasTipoPlanillasTable
        :rows="listaTipoPlanillas"
        :loading="cargando"
        @eliminar="eliminarFirmaTipoPlanilla"
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

    <q-dialog v-model="esVisibleDialogoFirmaTipoPlanilla">
      <FirmasTipoPlanillaForm
        :firma="firmaTipoPlanillaActual"
        :lista-tipo-planillas="listaTipoPlanillas"
        :es-modo-edicion="esModoEdicion"
        :firma-nombre="listaFirmaSeleccionada?.nombre || ''"
        @guardar="guardarFirmaTipoPlanilla"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useFirmas } from '../composables/useFirmas';
import FirmasForm from '../components/FirmasForm.vue';
import FirmasTable from '../components/FirmasTable.vue';
import FirmasTipoPlanillaForm from '../components/FirmasTipoPlanillasForm.vue';
import FirmasTipoPlanillasTable from '../components/FirmasTipoPlanillasTable.vue';

const {
  listaFirmas, firmaActual, listaUsuarios,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaFirmaTipoPlanilla, listaFirmaSeleccionada,
    firmaTipoPlanillaActual, esVisibleDialogoFirmaTipoPlanilla,
    listaTipoPlanillas,
    cargarFirmas, prepararNuevaFirma, cargarUsuarios,
    prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
    cambiarEstadoRegistro,
    alternarVista,
    gestionarFirmas, cargarTipoPlanillas,
    prepararNuevaFirmaTipoPlanilla, guardarFirmaTipoPlanilla, eliminarFirmaTipoPlanilla,
} = useFirmas();

onMounted(() => {
  void cargarFirmas();
  void cargarUsuarios()
  void cargarTipoPlanillas();
});
</script>