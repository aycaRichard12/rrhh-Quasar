<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('salariominimo.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('salariominimo.subtitle') }}</p>
      </div>
    </div>
    
    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('salariominimo.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoSalarioMinimo"
        />
        <div class="row q-gutter-sm">
          <q-btn outline
            color="secondary"
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarSalariosMinimosEstandar"
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
      <SalarioMinimoTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-salarios-minimos="listaSalariosMinimos"
        @editar="prepararEdicionSalarioMinimo"
        @eliminar="confirmarEliminarSalarioMinimo"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>
    
    <div v-else>
      <SalarioMinimoStandar
        :rows="listaSalariosMinimosEstandar"
      />
    </div>
    
    <q-dialog v-model="esVisibleDialogo">
      <SalarioMinimoForm
        :salario-minimo="salarioMinimoActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarSalarioMinimo"
      />
    </q-dialog>
  </q-page>
</template>
    
<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useSalarioMinimo } from '../composables/useSalarioMinimo.js';
import SalarioMinimoForm from '../components/SalarioMinimoForm.vue';
import SalarioMinimoTable from '../components/SalarioMinimoTable.vue';
import SalarioMinimoStandar from '../components/SalarioMinimoStandar.vue';

const {
    listaSalariosMinimos, salarioMinimoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaSalariosMinimosEstandar,
    cargarSalariosMinimos, guardarSalarioMinimo,
    prepararNuevoSalarioMinimo, prepararEdicionSalarioMinimo, confirmarEliminarSalarioMinimo,
    alternarVistaEstandar, cargarSalariosMinimosEstandar, confirmarImportacion,
    cambiarEstadoRegistro
} = useSalarioMinimo();
    
onMounted(() => {
  void cargarSalariosMinimos();
});
</script>