<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-positive">{{ $t('tiposdecontratos.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('tiposdecontratos.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('tiposdecontratos.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoTipoDeContrato"
        />
      
        <div class="row q-gutter-sm">
          <q-btn outline
            color="secondary" 
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarTiposDeContratosEstandar"
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
          :label="$t('forms.back')"
          @click="alternarVistaEstandar"
        />

        <div class="row q-gutter-sm">
          <q-btn
              color="warning"
              icon="autorenew"
              :label="$t('forms.replace')"
              @click="confirmarImportacion('reemplazar')"
            />

            <q-btn
              color="positive"
              icon="add"
              :label="$t('forms.add')"
              @click="confirmarImportacion('agregar')"
            />
          </div>
      </template>
    </q-card-section>

    <div v-if="!esVistaEstandar">
      <TiposDeContratosTable 
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-tipos-de-contratos="listaTiposDeContratos"
        @editar="prepararEdicionTipoDeContrato"
        @eliminar="confirmarEliminarTipoDeContrato"
      />
    </div>

    <div v-else>
      <TiposDeContratosStandar 
        :rows="listaTiposDeContratosEstandar"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <TiposDeContratosForm 
        :tipo-de-contrato="tipoDeContratoActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarTipoDeContrato"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useTiposDeContratos } from '../composables/useTiposDeContratos';
import TiposDeContratosForm from '../components/TiposDeContratosForm.vue';
import TiposDeContratosTable from '../components/TiposDeContratosTable.vue';
import TiposDeContratosStandar from '../components/TiposDeContratosStandar.vue';

const {
  listaTiposDeContratos, tipoDeContratoActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
  esVistaEstandar, listaTiposDeContratosEstandar,
  cargarTiposDeContratos, guardarTipoDeContrato,
  prepararNuevoTipoDeContrato, prepararEdicionTipoDeContrato, confirmarEliminarTipoDeContrato,
  cargarTiposDeContratosEstandar, alternarVistaEstandar, confirmarImportacion
} = useTiposDeContratos();

onMounted(() => {
  void cargarTiposDeContratos();
});
</script>



































































<!-- <template>
  <q-page padding>
    <q-card flat bordered>

      <q-card-section class="row q-col-gutter-sm items-center">

				<template v-if="!esVistaEstandar">
        	<q-btn outline icon="cloud_download" color="secondary" label="Importar Standar" @click="cargarTiposDeContratosEstandar" />
        	<q-btn icon="add" color="primary" label="Nuevo Registro" @click="prepararNuevoTipoDeContrato" />
      	</template>

        <template v-else>
        <q-btn outline color="negative" icon="arrow_back" label="Volver" @click="alternarVistaEstandar" />
        <div class="q-gutter-sm">
          <q-btn outline icon="autorenew" color="warning" label="Reemplazar" @click="confirmarImportacion('reemplazar')"/>
          <q-btn outline icon="add" color="positive" label="Añadir" @click="confirmarImportacion('agregar')" />
        </div>
      	</template>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <TiposDeContratosStandar 
          v-if="esVistaEstandar"
          :listaEstandar="listaTiposDeContratosEstandar"
          @importar="confirmarImportacion"
        />
        <TiposDeContratosTable 
          v-else
          :listaTiposDeContratos="listaTiposDeContratos"
          @editar="prepararEdicionTipoDeContrato"
          @eliminar="confirmarEliminarTipoDeContrato"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="esVisibleDialogo" persistent>
      <TiposDeContratosForm 
        :tipoDeContrato="tipoDeContratoActual"
        :esEdicion="esModoEdicion"
        @guardar="guardarTipoDeContrato"
        @cancelar="esVisibleDialogo = false"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTiposDeContratos } from '../composables/useTiposDeContratos.js';
import TiposDeContratosTable from '../components/TiposDeContratosTable.vue';
import TiposDeContratosForm from '../components/TiposDeContratosForm.vue';
import TiposDeContratosStandar from '../components/TiposDeContratosStandar.vue';

const {
  listaTiposDeContratos,
  listaTiposDeContratosEstandar,
  esModoEdicion,
  esVisibleDialogo,
  esVistaEstandar,
  tipoDeContratoActual,
  cargarTiposDeContratos,
	cargarTiposDeContratosEstandar,
  prepararNuevoTipoDeContrato,
  prepararEdicionTipoDeContrato,
  guardarTipoDeContrato,
  confirmarEliminarTipoDeContrato,
  alternarVistaEstandar,
  confirmarImportacion
} = useTiposDeContratos();

onMounted(() => {
  void cargarTiposDeContratos();
});
</script> -->