<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <h4 class="q-my-none text-primary">Módulo de Beneficios</h4>
        <p class="text-grey-7">Gestión de beneficios e indemnizaciones del personal.</p>
      </div>
    </div>

    <BeneficiosTable v-if="!esVistaEstandar" />
    <BeneficiosStandar v-else />


    
  </q-page>
</template>

<script setup lang="ts">
import { useBeneficios } from '../composables/useBeneficios';
import BeneficiosTable from '../components/BeneficiosTable.vue';
import BeneficiosStandar from '../components/BeneficiosStandar.vue';

const { esVistaEstandar } = useBeneficios();
</script>