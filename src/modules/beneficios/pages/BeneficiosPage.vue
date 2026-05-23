<template>
  <q-page padding>
    
    <div class="col q-mb-md">
      <div class="row justify-center">
        <h4 class="q-my-none text-primary">{{ $t('Beneficios') }}</h4>
      </div>
      <div class="row justify-center">
        <p class="text-grey-7">{{ $t('beneficios.description', 'Gestión de beneficios e indemnizaciones del personal.') }}</p>
      </div>
    </div>

    <div class="row justify-between items-center q-mb-md">

  <!-- VISTA NORMAL -->
  <template v-if="!esVistaEstandar">

    <q-btn
      color="secondary"
      icon="cloud_download"
      :label="$t('formBtn.import', 'Importar Estándar')"
      outline
      @click="cargarBeneficiosEstandar"
    />

    <q-btn
      icon="add"
      color="primary"
      :label="$t('formBtn.new', 'Nuevo Registro')"
      @click="prepararNuevoBeneficio"
    />

  </template>

  <!-- VISTA IMPORTACIÓN -->
  <template v-else>

    <q-btn
      icon="arrow_back"
      :label="$t('formBtn.back', 'Volver')"
      color="negative"
      outline
      @click="alternarVistaEstandar"
    />

    <div class="q-gutter-sm">

      <q-btn
        icon="autorenew"
        :label="$t('formBtn.replace', 'Reemplazar')"
        color="warning"
        @click="confirmarImportacion('reemplazar')"
      />

      <q-btn
        icon="add"
        :label="$t('formBtn.add', 'Añadir')"
        color="positive"
        @click="confirmarImportacion('anadir')"
      />

    </div>

  </template>

</div>

    <div v-if="!esVistaEstandar">
      <BeneficiosTable
        :lista-beneficios="listaBeneficios"
        @import="alternarVistaEstandar"
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

    <q-dialog v-model="esVisibleDialogo" >
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
import BeneficiosStandar from '../components/BeneficiosStandar.vue';
import BeneficiosForm from '../components/BeneficiosForm.vue';


const { 
  listaBeneficios, listaBeneficiosEstandar, esVisibleDialogo, esModoEdicion, beneficioActual, esVistaEstandar,
  cargarBeneficios, cargarBeneficiosEstandar, prepararNuevoBeneficio, prepararEdicionBeneficio, guardarBeneficio, confirmarEliminarBeneficio, cambiarEstadoRegistro, alternarVistaEstandar, confirmarImportacion
} = useBeneficios();

onMounted(() => { void cargarBeneficios() })
</script>