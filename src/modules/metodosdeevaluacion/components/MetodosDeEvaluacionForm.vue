<template>
  <q-card style="width: 500px; max-width: 90vw;">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? 'Editar Método' : 'Nuevo Método' }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-gutter-md">
        <q-input
          v-model="datosLocales.nombre"
          label="Método *"
          outlined dense
          :rules="[val => !!val || $t('common.rules.required')]"
        />
        <q-input
          v-model="fechaString"
          label="Fecha *"
          outlined dense
          type="date"
          :rules="[val => !!val || $t('common.rules.required')]"
        />
        <q-input
          v-model="datosLocales.calificacionMax"
          label="Calificación Máxima *"
          outlined dense
          type="number"
          step="0.01"
          :rules="[val => !!val || $t('common.rules.required')]"
        />
        <q-input
          v-model="datosLocales.descripcion"
          label="Descripción *"
          outlined dense autogrow
          type="textarea"
          :rules="[val => !!val || $t('common.rules.required')]"
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
import { ref, watch, computed } from 'vue';
import type { MetodosDeEvaluacion } from '../types/metodosDeEvaluacion.types';
import { date } from 'quasar';

const props = defineProps<{
  metodo: MetodosDeEvaluacion;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: MetodosDeEvaluacion): void
}>();

const datosLocales = ref<MetodosDeEvaluacion>({ ...props.metodo });

const fechaString = computed({
  get: () => date.formatDate(datosLocales.value.fecha, 'YYYY-MM-DD'),
  set: (val: string) => {
    datosLocales.value.fecha = new Date(val + 'T00:00:00');
  }
});

watch(() => props.metodo, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>
