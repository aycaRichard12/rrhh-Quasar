<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('beneficios.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('beneficios.subtitle') }}</p>
      </div>
    </div>
    
    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <template v-if="!esVistaEstandar">
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('beneficios.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevoBeneficio"
        />

        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <q-btn outline
            color="secondary"
            icon="cloud_download"
            size="15px"
            :label="$q.screen.lt.sm ? '' : $t('forms.standar')"
            :round="$q.screen.lt.sm"
            @click="cargarBeneficiosEstandar"
          />
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
      <BeneficiosTable
        v-model:filtro="filtroBusqueda"
        :lista-beneficios="listaBeneficios"
        :cargando="cargando"
        @editar="prepararEdicionBeneficio"
        @eliminar="confirmarEliminarBeneficio"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>
    
    <div v-else>
      <BeneficiosStandar
        :rows="listaBeneficiosEstandar"
      />
    </div>
    
    <q-dialog
      v-model="esVisibleDialogo"
    >
      <BeneficiosForm
        :beneficio="beneficioActual"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarBeneficio"
      />
    </q-dialog>
  </q-page>
</template>
    
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useBeneficios } from '../composables/useBeneficios';
  import BeneficiosTable from '../components/BeneficiosTable.vue';
  import BeneficiosForm from '../components/BeneficiosForm.vue';
  import BeneficiosStandar from '../components/BeneficiosStandar.vue';
  import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';
      
  const {
    listaBeneficios, beneficioActual, esModoEdicion, esVisibleDialogo,
    filtroBusqueda, cargando,
    listaBeneficiosEstandar, esVistaEstandar,
    cargarBeneficios, prepararNuevoBeneficio, guardarBeneficio,
    prepararEdicionBeneficio, confirmarEliminarBeneficio,
    cargarBeneficiosEstandar, alternarVistaEstandar, confirmarImportacion,
    cambiarEstadoRegistro,
  } = useBeneficios();
    
  onMounted(() => {
    void cargarBeneficios();
  });
</script>