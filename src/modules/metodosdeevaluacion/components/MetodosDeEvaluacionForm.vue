<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('evaluationMethods.edit') : $t('evaluationMethods.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('evaluationMethods.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
            <q-input dense outlined
              v-model="datosLocales.calificacionMax"
              :label="$t('evaluationMethods.maximumRating') + ' *'"
              type="number"
              step="0.01"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-7">
            <q-input dense outlined 
              v-model="fechaString"
              type="date"
              :label="$t('tables.date') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input autogrow dense outlined 
              v-model="datosLocales.descripcion"
              :label="$t('tables.description') + '*'"
              type="textarea"
              :rules="[val => !!val || $t('common.rules.required')]"
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
import { ref, watch, computed } from 'vue';
import { date } from 'quasar';
import type { MetodosDeEvaluacion } from '../types/metodosDeEvaluacion.types';


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
    if (!val) return;
    const partes = val.split('-');
    if (partes.length === 3) {
      const year = parseInt(partes[0] ?? '0', 10);
      const month = parseInt(partes[1] ?? '0', 10);
      const day = parseInt(partes[2] ?? '0', 10);
      
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        // El mes en JavaScript empieza en 0 (Enero = 0)
        datosLocales.value.fecha = new Date(year, month - 1, day);
      }
    }
  }
});

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.metodo, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });
</script>
