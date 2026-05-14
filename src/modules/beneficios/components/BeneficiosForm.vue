<template>
  <q-dialog v-model="esVisibleDialogo" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          {{ esModoEdicion ? 'Editar Beneficio' : 'Nuevo Beneficio' }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-form @submit.prevent="procesarGuardado" class="q-gutter-md">
          <q-input
            v-model="beneficioActual.nombre"
            label="Nombre del Beneficio *"
            outlined
            dense
            :rules="[val => !!val || 'El nombre es obligatorio']"
          />

          <q-input
            v-model="beneficioActual.descripcion"
            label="Descripción *"
            outlined
            dense
            type="textarea"
            rows="3"
            :rules="[val => !!val || 'La descripción es obligatoria']"
          />

          <q-select
            v-model="beneficioActual.tipo"
            :options="opcionesTipo"
            label="Tipo *"
            outlined
            dense
            emit-value
            map-options
          />

          <q-input
            v-model="beneficioActual.cantidad"
            label="Cantidad *"
            outlined
            dense
            type="number"
            step="0.01"
            :rules="[val => !!val || 'La cantidad es obligatoria']"
          />

          <div class="row q-gutter-sm">
            <q-input
              v-model="beneficioActual.orden"
              label="Orden"
              outlined
              dense
              type="number"
              class="col"
            />
            <q-input
              v-model="beneficioActual.destino"
              label="Destino"
              outlined
              dense
              class="col"
            />
          </div>

          <div class="row justify-end q-gutter-sm q-mt-md">
            <q-btn label="Cancelar" color="negative" flat v-close-popup />
            <q-btn 
              label="Guardar" 
              color="primary" 
              type="submit" 
              :loading="esCargando" 
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useBeneficios } from '../composables/useBeneficios';

const {
  esVisibleDialogo, esModoEdicion, esCargando, beneficioActual,
  procesarGuardado
} = useBeneficios();

// Adaptamos las opciones según lo que espera el sistema antiguo
const opcionesTipo = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Monto Fijo', value: '2' }
];
</script>