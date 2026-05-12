<template>
  <q-dialog v-model="esVisibleDialogo" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ esEdicion ? 'Editar Ente Regulador' : 'Nuevo Registro' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit.prevent="guardarEnte">
        <q-card-section class="q-gutter-md">
          <q-input 
            v-model="enteActual.nombre" 
            label="Ente regulador *" 
            lazy-rules
            :rules="[val => !!val || 'El nombre es obligatorio']" 
          />
          <q-input 
            v-model="enteActual.porcentaje" 
            label="Porcentaje *" 
            lazy-rules
            :rules="[
              val => !!val || 'El porcentaje es obligatorio',
              val => /^\d+(\.\d+)?$/.test(val) || 'Debe ser un número válido (ej. 12.5)'
            ]" 
          />
          <q-input 
            v-model="enteActual.descripcion" 
            label="Descripción *" 
            lazy-rules
            :rules="[val => !!val || 'La descripción es obligatoria']" 
          />
          <q-input 
            v-model="enteActual.monto" 
            label="Monto *" 
            lazy-rules
            :rules="[val => /^\d+(\.\d+)?$/.test(val) || 'Debe ser numérico']" 
          />
          <q-input 
            v-model="enteActual.orden" 
            label="Orden *" 
            lazy-rules
            :rules="[
              val => !!val || 'El orden es obligatorio',
              val => /^\d+$/.test(val) || 'Debe ser un número entero'
            ]" 
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Registrar" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { EnteRegulador } from '../types/entesReguladores.types';

// Inyectamos las variables y funciones desde el Page principal
const esVisibleDialogo = inject<Ref<boolean>>('esVisibleDialogo')!;
const enteActual = inject<Ref<EnteRegulador>>('enteActual')!;
const esEdicion = inject<Ref<boolean>>('esEdicion')!;
const guardarEnte = inject<() => Promise<void>>('guardarEnte')!;
</script>