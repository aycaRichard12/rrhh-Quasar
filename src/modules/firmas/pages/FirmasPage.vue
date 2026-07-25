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
      <FirmasTipoPlanillaTable
        :rows="listaFirmasTipoPlanilla"
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

    <q-dialog v-model="esVisibleDialogoPlanilla">
      <FirmasTipoPlanillaForm
        :firma="firmaTipoPlanillaActual"
        :lista-tipo-planillas="listaTipoPlanillas"
        :es-modo-edicion="esModoEdicion"
        :firma-nombre="firmaSeleccionada?.nombre || ''"
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
import FirmasTipoPlanillaForm from '../components/FirmasTipoPlanillaForm.vue';
import FirmasTipoPlanillaTable from '../components/FirmasTipoPlanillaTable.vue';
import { useTipoPlanilla } from '../composables/useTipoPlanilla';
import { useFirmaTipoPlanilla } from '../composables/useFirmaTipoPlanilla';
import { useUsuarios } from 'src/composables/useUsuario';

const prepararNuevaFirma = () => {
  nuevaFirma(Number(listaUsuarios.value[0]?.id ?? 0));
};

const prepararNuevaFirmaTipoPlanilla = () => {
  nuevaFirmaTipoPlanilla(Number(listaTipoPlanillas.value[0]?.id_tipoPlanilla ?? 0));
}
const {
  listaFirmas, firmaActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarFirmas, nuevaFirma,
    prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
    cambiarEstadoRegistro,
} = useFirmas();

const {
  listaFirmasTipoPlanilla, esVistaFirmaTipoPlanilla, firmaTipoPlanillaActual, firmaSeleccionada,
  alternarVista, gestionarFirmas,
  nuevaFirmaTipoPlanilla, guardarFirmaTipoPlanilla, eliminarFirmaTipoPlanilla, esVisibleDialogoPlanilla, 
} = useFirmaTipoPlanilla();

const {
  listaTipoPlanillas,
  cargarTipoPlanillas
} = useTipoPlanilla();

const {
  listaUsuarios,
  cargarUsuarios
} = useUsuarios();

onMounted(() => {
  void cargarFirmas();
  void cargarUsuarios();
  void cargarTipoPlanillas();
});
</script>