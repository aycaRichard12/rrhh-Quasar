<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('metodosdeevaluacion.edit') : $t('metodosdeevaluacion.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('metodosdeevaluacion.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
            <q-input dense outlined
              v-model="datosLocales.calificacionMax"
              type="number"
              step="0.01"
              :label="$t('metodosdeevaluacion.rating') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-7">
            <q-input dense outlined 
              v-model="datosLocales.fecha"
              type="date"
              :label="$t('tables.date') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense outlined 
              v-model="datosLocales.descripcion"
              type="textarea"
              :label="$t('tables.description') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" :label="$t('common.actions.save')" class="global-btn-page" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { MetodoDeEvaluacion } from '../types/metodosDeEvaluacion.types';

const props = defineProps<{
  metodo: MetodoDeEvaluacion;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: MetodoDeEvaluacion): void
}>();

const datosLocales = ref<MetodoDeEvaluacion>({ ...props.metodo });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.metodo, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });
</script>