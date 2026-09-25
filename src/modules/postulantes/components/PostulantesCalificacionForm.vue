<template>
  <q-card style="width: 800px; max-width: 95vw;">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">Registrar Nueva Calificación</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emits('guardar')" class="q-pa-md">
      <div class="row q-col-gutter-md items-start">
        <div class="col-12 col-md-6">
          <q-select dense outlined emit-value map-options
            v-model="idMetodoLocal"
            :options="listaMetodos"
            option-label="nombre"
            option-value="id"
            label="Método de Evaluación *"
            :rules="[val => !!val || $t('common.rules.required')]"
          />
        </div>
        
        <div class="col-12 col-md-6">
          <q-select dense outlined emit-value map-options
            v-model="calificacionFormLocal.idactividadevaluacion"
            :options="actividadesDisponibles"
            option-label="nombre"
            option-value="id"
            label="Actividad *"
            :disable="!idMetodoLocal"
            :rules="[val => !!val || $t('common.rules.required')]"
          >
            <template #no-option>
              <q-item><q-item-section class="text-grey">Seleccione un método o no hay actividades pendientes</q-item-section></q-item>
            </template>
          </q-select>
        </div>
        
        <div class="col-12 col-md-4">
          <q-input dense readonly outlined
            :model-value="calificacionMaxPermitida"
            label="Calificación Max."
          />
        </div>
        
        <div class="col-12 col-md-8">
          <q-input dense outlined
            v-model="calificacionFormLocal.nota"
            type="number"
            step="0.01"
            label="Calificación *"
            :rules="[
              val => !!val || $t('common.rules.required'),
              val => Number(val) <= calificacionMaxPermitida || 'No puede superar el máximo'
            ]"
          />
        </div>
        
        <div class="col-12">
          <q-input dense outlined
            v-model="calificacionFormLocal.justificacion"
            type="textarea"
            label="Justificación *"
            :rules="[val => !!val || $t('common.rules.required')]"
          />
        </div>
      </div>

      <q-card-actions align="right" class="q-pt-md">
        <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" :label="$t('common.actions.save')" class="global-btn-page" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MetodoDeEvaluacion } from 'src/modules/metodosdeevaluacion/types/metodosDeEvaluacion.types';
import type { ActividadDeEvaluacion } from 'src/modules/actividadesdeevaluacion/types/actividadesDeEvaluacion.types';


// 1. Creamos la interfaz exacta que manejará el formulario
export interface CalificacionFormulario {
  idactividadevaluacion: number | null;
  nota: number;
  justificacion: string;
}
// 2. Aplicamos la interfaz en lugar de objetos sueltos o "any"
const props = defineProps<{
  listaMetodos: MetodoDeEvaluacion[];
  actividadesDisponibles: ActividadDeEvaluacion[];
  calificacionMaxPermitida: number;
  idMetodoSeleccionado: number | null;
  calificacionForm: CalificacionFormulario; 
}>();

const emits = defineEmits<{
  (e: 'guardar'): void;
  (e: 'update:idMetodoSeleccionado', val: number | null): void;
  (e: 'update:calificacionForm', val: CalificacionFormulario): void; // <-- Adiós 'any'
}>();

// Proxies para V-Model bidireccional
const idMetodoLocal = computed({
  get: () => props.idMetodoSeleccionado,
  set: (val) => emits('update:idMetodoSeleccionado', val)
});

const calificacionFormLocal = computed({
  get: () => props.calificacionForm,
  set: (val) => emits('update:calificacionForm', val)
});
</script>