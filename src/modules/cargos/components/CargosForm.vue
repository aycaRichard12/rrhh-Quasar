<template>
  <q-card style="width: 100vh">

    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('cargos.edit') : $t('cargos.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup/>
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined
              v-model="datosLocales.cargo"
              :label="$t('cargos.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-6">
            <q-input dense outlined lazy-rules
              v-model="datosLocales.salario"
              type="number"
              :label="$t('cargos.salary') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required'), val => /^\d+(\.\d+)?$/.test(String(val)) || $t('rules.numeric')]"
            />
          </div>

          <div class="col-6">
            <q-select dense outlined emit-value map-options lazy-rules
              v-model="datosLocales.idarea"
              option-value="id"
              option-label="nombre"
              :options="listaAreas"
              :label="$t('areas.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense lazy-rules outlined
              v-model="datosLocales.descripcion"
              type="textarea"
              :label="$t('tables.description') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
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
import type { Cargo } from '../types/cargos.types';
import type { Area } from 'src/modules/areas/types/areas.types';

const props = defineProps<{
  cargo         : Cargo;
  listaAreas    : Area[];
  esModoEdicion : boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Cargo): void
}>();

const datosLocales = ref<Cargo>({ ...props.cargo });

watch(() => props.cargo, (nuevosDatos) => { 
  datosLocales.value = { ...nuevosDatos }; 
}, { deep: true });

const emitirGuardar = () => { 
  emits('guardar', datosLocales.value); 
};
</script>