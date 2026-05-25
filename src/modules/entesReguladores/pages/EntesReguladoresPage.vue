<template>
  <q-page padding>
    
    <div class="col q-mb-md">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('entity.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('entity.subtitle') }}</p>
      </div>
    </div>

    <div class="row justify-between items-center q-mb-md">

      <template v-if="!esVistaEstandar">
        <q-btn color="secondary" label="Importar Standar" @click="cargarEntesReguladoresEstandar" icon="cloud_download" outline />
        <q-btn color="primary"   label="Nuevo Registro"   @click="prepararNuevoEnteRegulador" icon="add"/>
      </template> 

      <template v-else>
        <q-btn color="negative" :label="$t('formBtn.back', 'Volver')" @click="alternarVistaEstandar" icon="arrow_back" outline/>
        <div class="q-gutter-sm">
          <q-btn color="warning" :label="$t('formBtn.replace', 'Reemplazar')" @click="confirmarImportacion('reemplazar')" icon="autorenew"/>
          <q-btn color="positive" :label="$t('formBtn.add', 'Añadir')" @click="confirmarImportacion('agregar')" icon="add"/>
        </div>
      </Template>
    </div>

    <div v-if="!esVistaEstandar">
      <EntesReguladoresTable
        :lista-entes-reguladores="listaEntesReguladores"
        @import="alternarVistaEstandar"
        @editar="prepararEdicionEnteRegulador"
        @eliminar="confirmarEliminarEnteRegulador"
        @cambiar-estado-ente-regulador="cambiarEstadoEnteRegulador"
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
import { useEntesReguladores } from '../composables/useEntesReguladores';
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresStandar from '../components/EntesReguladoresStandar.vue';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';

const {
  listaEntesReguladores, listaEntesReguladoresEstandar, esVisibleDialogo, esModoEdicion, enteReguladorActual, esVistaEstandar,
  cargarEntesReguladores, cargarEntesReguladoresEstandar, prepararNuevoEnteRegulador, prepararEdicionEnteRegulador, guardarEnteRegulador, confirmarEliminarEnteRegulador, cambiarEstadoEnteRegulador, alternarVistaEstandar, confirmarImportacion
} = useEntesReguladores();

onMounted(() => { void cargarEntesReguladores() })
</script>