<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('bonosempresa.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('bonosempresa.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('bonosempresa.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoBonoEmpresa"
        />
        <div class="row q-gutter-sm">
          <q-btn outline
            color="secondary"
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarBonosEmpresaEstandar"
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
      <BonosEmpresaTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-bonos-empresa="listaBonosEmpresa"
        @import="alternarVistaEstandar"
        @editar="prepararEdicionBonoEmpresa"
        @eliminar="confirmarEliminarBonoEmpresa"
        @cambiar-estado-bono-empresa="cambiarEstadoBonoEmpresa"
      />
    </div>
    <div v-else>
      <BonosEmpresaStandar 
        :rows="listaBonosEmpresaEstandar"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <BonosEmpresaForm
        :bono-empresa="bonoEmpresaActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarBonoEmpresa"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useBonosEmpresa } from '../composables/useBonosEmpresa';
import BonosEmpresaForm from '../components/BonosEmpresaForm.vue';
import BonosEmpresaTable from '../components/BonosEmpresaTable.vue';
import BonosEmpresaStandar from '../components/BonosEmpresaStandar.vue';

const { 
  listaBonosEmpresa, bonoEmpresaActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaBonosEmpresaEstandar, 
    cargarBonosEmpresa, guardarBonoEmpresa,
    prepararNuevoBonoEmpresa, prepararEdicionBonoEmpresa, confirmarEliminarBonoEmpresa,
    alternarVistaEstandar, cargarBonosEmpresaEstandar, confirmarImportacion,
    cambiarEstadoBonoEmpresa
} = useBonosEmpresa();

onMounted(() => {
  void cargarBonosEmpresa();
});
</script>