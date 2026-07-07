<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('metodosdeevaluacion.range.edit') : $t('metodosdeevaluacion.range.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="text-center q-pb-md q-pr-md">
          <strong>{{$t('metodosdeevaluacion.name') + ' : ' + metodoNombre }}</strong>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input dense outlined 
              v-model="datosLocales.nombre"
              :label="$t('metodosdeevaluacion.range.name') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.cantidad"
              type="number"
              step="0.01"
              :label="$t('metodosdeevaluacion.range.score')"
              :rules="[
                val => !!val || $t('common.rules.required'),
                val => Number(val) <= calificacionMaxMetodo || 'El puntaje no puede ser mayor a la calificación máxima'
              ]"
            />
          </div>
          <div class="col-6">
            <q-input dense readonly outlined
              :model-value="calificacionMaxMetodo"
              :label="$t('metodosdeevaluacion.rating')"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat v-close-popup
          color="negative"
          :label="$t('common.actions.cancel')"
        />
        <q-btn
          class="global-btn-page"
          icon="save"
          type="submit"
          :label="$t('common.actions.save')"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { RangoDeEvaluacion } from '../types/metodosDeEvaluacion.types';

const props = defineProps<{
  rango: RangoDeEvaluacion;
  esModoEdicion: boolean;
  metodoNombre: string;
  calificacionMaxMetodo: number;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: RangoDeEvaluacion): void
}>();

const datosLocales = ref<RangoDeEvaluacion>({ ...props.rango });

watch(() => props.rango, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>
