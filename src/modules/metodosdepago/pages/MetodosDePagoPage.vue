<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('metodosdepago.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('metodosdepago.subtitle') }}</p>
      </div>
    </div>
    
    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('metodosdepago.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoMetodoDePago"
        />
        <div class="row q-gutter-sm">
          <q-btn outline
            color="secondary"
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarMetodosDePagoEstandar"
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
      <MetodosDePagoTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-metodos-de-pago="listaMetodosDePago"
        @editar="prepararEdicionMetodoDePago"
        @eliminar="confirmarEliminarMetodoDePago"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>
    
    <div v-else>
      <MetodosDePagoStandar
        :rows="listaMetodosDePagoEstandar"
      />
    </div>
    
    <q-dialog v-model="esVisibleDialogo">
      <MetodosDePagoForm
        :metodo-de-pago="metodoDePagoActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarMetodoDePago"
      />
    </q-dialog>
  </q-page>
</template>
    
<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useMetodosDePago } from '../composables/useMetodosDePago.js';
import MetodosDePagoForm from '../components/MetodosDePagoForm.vue';
import MetodosDePagoTable from '../components/MetodosDePagoTable.vue';
import MetodosDePagoStandar from '../components/MetodosDePagoStandar.vue';

const {
  listaMetodosDePago, metodoDePagoActual,
	cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
	esVistaEstandar, listaMetodosDePagoEstandar,
	cargarMetodosDePago, guardarMetodoDePago,
	prepararNuevoMetodoDePago, prepararEdicionMetodoDePago, confirmarEliminarMetodoDePago,
	alternarVistaEstandar, cargarMetodosDePagoEstandar, confirmarImportacion,
	cambiarEstadoRegistro
} = useMetodosDePago();
    
onMounted(() => {
  void cargarMetodosDePago();
});
</script>