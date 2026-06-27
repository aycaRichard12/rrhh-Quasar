<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('entesreguladores.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('entesreguladores.subtitle') }}</p>
      </div>
    </div>
    
    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('entesreguladores.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoEnteRegulador"
        />
        <div class="row q-gutter-sm">
          <q-btn outline
            color="secondary"
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarEntesReguladoresEstandar"
          />
        </div>
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      </template>
    
      <template v-else>
        <q-btn outline
          color="negative"
          icon="arrow_back"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('forms.back')"
          :round="$q.screen.lt.sm"
          @click="alternarVistaEstandar"
        />
        <div class="q-gutter-sm">
          <q-btn
            color="warning"
            icon="autorenew"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.replace')"
            :round="$q.screen.lt.sm"
            @click="confirmarImportacion('reemplazar')"
          />
          <q-btn
            color="positive"
            icon="add"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.add')"
            :round="$q.screen.lt.sm"
            @click="confirmarImportacion('agregar')"
          />
        </div>
      </template>
    </q-card-section>
    
    <div v-if="!esVistaEstandar">
      <EntesReguladoresTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-entes-reguladores="listaEntesReguladores"
        @editar="prepararEdicionEnteRegulador"
        @eliminar="confirmarEliminarEnteRegulador"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>
    
    <div v-else>
      <EntesReguladoresStandar
        :rows="listaEntesReguladoresEstandar"
      />
    </div>
    
    <q-dialog v-model="esVisibleDialogo">
      <EntesReguladoresForm
        :ente-regulador="enteReguladorActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarEnteRegulador"
      />
    </q-dialog>
  </q-page>
</template>
    
<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useEntesReguladores } from '../composables/useEntesReguladores';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresStandar from '../components/EntesReguladoresStandar.vue';

const {
  listaEntesReguladores, enteReguladorActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  esVistaEstandar, listaEntesReguladoresEstandar,
  cargarEntesReguladores, guardarEnteRegulador,
  prepararNuevoEnteRegulador, prepararEdicionEnteRegulador, confirmarEliminarEnteRegulador,
  cargarEntesReguladoresEstandar, alternarVistaEstandar, confirmarImportacion,
  cambiarEstadoRegistro,
} = useEntesReguladores();
    
onMounted(() => {
  void cargarEntesReguladores();
});
</script>
