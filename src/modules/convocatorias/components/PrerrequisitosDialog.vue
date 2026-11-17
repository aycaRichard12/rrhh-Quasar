<template>
  <q-dialog :model-value="modelValue" @update:model-value="emits('update:modelValue', $event)">
    <q-card style="width: 500px; max-width: 95vw;">
      <q-card-section class="global-form-header row justify-between items-center">
        <div class="text-h6">Prerrequisitos del Cargo</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        
        <q-list bordered separator v-if="listaPrerrequisitos.length > 0">
          <!-- Extraemos 'index' y usamos 'pre.id ?? index' para garantizar que el key nunca sea undefined -->
          <q-item v-for="(pre, index) in listaPrerrequisitos" :key="pre.id ?? index">
            <q-item-section>
            	<q-item-label class="text-weight-bold">{{ pre.nombre }}</q-item-label>
              <q-item-label caption>{{ pre.descripcion }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        
        <div v-else class="text-grey-6 text-center q-pa-md">
          No hay prerrequisitos registrados para esta convocatoria.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Convocatoria } from '../types/convocatorias.types';

defineProps<{
  modelValue: boolean;
  convocatoria: Convocatoria | null;
  listaPrerrequisitos: { 
    id?: number; 
    nombre: string; 
    descripcion: string; 
    idcargo?: number; 
    cargo?: string; 
  }[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();
</script>