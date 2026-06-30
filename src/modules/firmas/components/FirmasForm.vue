<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('firmas.edit') : $t('firmas.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('nombres') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
					<div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.apellido"
              :label="$t('apellidos') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
					<div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.ci"
              :label="$t('C.I.') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
					<div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.cargo"
              :label="$t('cargo') + ' *'"
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
import type { Firma } from '../types/firmas.types';

const props = defineProps<{
  firma: Firma;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', data: Firma): void;
}>();

const datosLocales = ref<Firma>({ ...props.firma });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.firma, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });
</script>