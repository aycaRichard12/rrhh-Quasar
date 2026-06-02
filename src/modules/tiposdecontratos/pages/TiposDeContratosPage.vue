<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="row q-col-gutter-sm items-center">
        <div class="col-12 col-sm-4 text-left">
          <q-input 
            v-if="!esVisibleEstandar"
            v-model="filtroBusqueda" 
            dense 
            outlined 
            clearable 
            placeholder="Buscar en contratos..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn 
            v-else
            color="primary" 
            icon="arrow_back" 
            label="Volver" 
            @click="alternarVistaEstandar(false)"
          />
        </div>

        <div class="col-12 col-sm-4 text-center">
          <div class="text-h6 text-primary text-weight-bold">
            {{ esVisibleEstandar ? 'Catálogo Estándar de Contratos' : 'Tipos de Contratos' }}
          </div>
        </div>

        <div class="col-12 col-sm-4 text-right">
          <template v-if="!esVisibleEstandar">
            <q-btn 
              color="primary" 
              icon="add" 
              label="Nuevo Registro" 
              @click="prepararNuevoTipoDeContrato"
              class="q-mr-sm"
            />
            <q-btn 
              color="secondary" 
              icon="download" 
              label="Importar Estándar" 
              @click="alternarVistaEstandar(true)"
            />
          </template>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <TiposDeContratosStandar 
          v-if="esVisibleEstandar"
          :listaEstandar="listaTiposDeContratosEstandar"
          @importar="confirmarImportacion"
        />
        <TiposDeContratosTable 
          v-else
          :listaTiposDeContratos="listaTiposDeContratos"
          :filtro="filtroBusqueda"
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
import { useTiposDeContratos } from '../composables/useTiposDeContratos';
import TiposDeContratosTable from '../components/TiposDeContratosTable.vue';
import TiposDeContratosForm from '../components/TiposDeContratosForm.vue';
import TiposDeContratosStandar from '../components/TiposDeContratosStandar.vue';

const {
  listaTiposDeContratos,
  listaTiposDeContratosEstandar,
  esModoEdicion,
  esVisibleDialogo,
  esVisibleEstandar,
  tipoDeContratoActual,
  filtroBusqueda,
  cargarTiposDeContratos,
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