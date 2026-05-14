<template>
  <q-page padding>
    <div v-if="!esVistaTemplates">
      <EntesReguladoresTable />
    </div>

    <div v-else>
      <div class="row q-mb-md justify-between">
        <q-btn icon="arrow_back" color="primary" label="Volver" @click="esVistaTemplates = false" />
        <div class="q-gutter-sm">
          <q-btn color="warning" label="Reemplazar" @click="procesarTemplates(1)" />
          <q-btn color="positive" label="Añadir" @click="procesarTemplates(2)" />
        </div>
      </div>
      <q-table :rows="listaTemplates" :loading="cargando" title="Templates Disponibles" flat bordered />
    </div>
    <EntesReguladoresForm />
  </q-page>
</template>

<script setup lang="ts">
import EntesReguladoresTable from '../components/EntesReguladoresTable.vue';
import EntesReguladoresForm from '../components/EntesReguladoresForm.vue';
import { useEntesReguladores } from '../composables/useEntesReguladores';
import { provide } from 'vue';

// Instanciamos nuestro cerebro
const entesCore = useEntesReguladores();

// Proveemos todo el estado y funciones a los componentes hijos (para no pasar docenas de props)
Object.entries(entesCore).forEach(([key, value]) => {
  provide(key, value);
});

// Extraemos lo que necesitamos usar directamente en esta página
const { esVistaTemplates, listaTemplates, cargando, procesarTemplates } = entesCore;
</script>