<template>
  <q-page padding>
    
    <div class="row q-mb-md">
      <div class="col-12">
        <h4 class="q-my-none text-primary">{{ $t('beneficios.title', 'Módulo de Beneficios') }}</h4>
        <p class="text-grey-7">{{ $t('beneficios.description', 'Gestión de beneficios e indemnizaciones del personal.') }}</p>
      </div>
    </div>

    <div v-if="!esVistaEstandar">
      <BeneficiosTable 
        :rows="listaBeneficios"
        :cargando="cargando"
        @create="abrirDialogoNuevo"
        @import="alternarVistaEstandar"
        @edit="abrirDialogoEditar"
        @delete="confirmarEliminacion"
        @change-status="cambiarEstadoRegistro"
      />
    </div>

    <div v-else>
      <BeneficiosStandar 
        :rows="listaBeneficiosEstandar"
        :cargando="cargando"
        @volver="alternarVistaEstandar"
        @procesar="(tipoAccion) => confirmarImportacion(tipoAccion === 1 ? 'reemplazar' : 'anadir')"
      />
    </div>

    <BeneficiosForm
      v-model="esVisibleDialogo"
      :es-modo-edicion="esModoEdicion"
      :cargando="cargando"
      :datos-formulario="beneficioActual"
      @save="procesarGuardado"
    />

  </q-page>
</template>

<script setup lang="ts">
import BeneficiosTable from '../components/BeneficiosTable.vue';
import BeneficiosStandar from '../components/BeneficiosStandar.vue';
import BeneficiosForm from '../components/BeneficiosForm.vue';
import { useBeneficios } from '../composables/useBeneficios';

const { 
  listaBeneficios, listaBeneficiosEstandar, cargando, esVisibleDialogo, esVistaEstandar, esModoEdicion, beneficioActual,
  abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion, cambiarEstadoRegistro, alternarVistaEstandar, confirmarImportacion
} = useBeneficios();
</script>