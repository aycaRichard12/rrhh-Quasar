<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('actividadesdeevaluacion.edit') : $t('actividadesdeevaluacion.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('actividadesdeevaluacion.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idmetodoevaluacion"
              :options="listaMetodos"
              option-label="nombre"
              option-value="id"
              :label="$t('metodosdeevaluacion.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense outlined 
              v-model="datosLocales.descripcion"
              :label="$t('tables.description') + ' *'"
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
import { ref, watch } from 'vue';
import type { ActividadDeEvaluacion } from '../types/actividadesDeEvaluacion.types';
import type { MetodoDeEvaluacion } from 'src/modules/metodosdeevaluacion/types/metodosDeEvaluacion.types';

const props = defineProps<{
  actividad: ActividadDeEvaluacion;
  listaMetodos: MetodoDeEvaluacion[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: ActividadDeEvaluacion): void
}>();

const datosLocales = ref<ActividadDeEvaluacion>({ ...props.actividad });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.actividad, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });
</script>