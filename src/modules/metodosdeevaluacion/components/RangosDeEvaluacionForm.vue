<template>
  <q-card style="width: 500px; max-width: 90vw;">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? 'Editar Rango' : 'Nuevo Rango' }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-gutter-md">
        <div class="text-center q-pa-sm bg-grey-2 rounded-borders">
          <strong>Método: {{ metodoNombre }}</strong>
        </div>

        <q-input
          v-model="datosLocales.nombre"
          label="Criterio/rango *"
          outlined dense
          :rules="[val => !!val || $t('common.rules.required')]"
        />
        <q-input
          :model-value="calificacionMaxMetodo"
          label="Calificación Max"
          outlined dense
          disabled
        />
        <q-input
          v-model="datosLocales.cantidad"
          label="Puntaje *"
          outlined dense
          type="number"
          step="0.01"
          :rules="[
            val => !!val || $t('common.rules.required'),
            val => Number(val) <= calificacionMaxMetodo || 'El puntaje no puede ser mayor a la calificación máxima'
          ]"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" label="Registrar" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { RangosDeEvaluacion } from '../types/metodosDeEvaluacion.types';

const props = defineProps<{
  rango: RangosDeEvaluacion;
  esModoEdicion: boolean;
  metodoNombre: string;
  calificacionMaxMetodo: number;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: RangosDeEvaluacion): void
}>();

const datosLocales = ref<RangosDeEvaluacion>({ ...props.rango });

watch(() => props.rango, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>
