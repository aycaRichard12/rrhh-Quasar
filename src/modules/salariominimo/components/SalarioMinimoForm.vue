<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('salariosminimos.edit') : $t('salariosminimos.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />  
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense outlined
              v-model="datosLocales.anio" 
              type="number"
              :label="$t('entesreguladores.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined
              v-model="datosLocales.monto" 
              step="0.01"
              type="number"
              :label="$t('tables.amount2') + ' *'" 
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined
              v-model="datosLocales.porcentaje"
              step="0.01"
              type="number"
              :label="$t('entesreguladores.percentage') + ' *'" 
              :rules="[val => !!val || $t('common.rules.required')]" 
            /> 
          </div>
          <div class="col-12">
            <q-input dense outlined
              v-model="datosLocales.observacion"
              type="textarea"
              :label="$t('tables.description') + ' *'"
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
import type { SalarioMinimo } from '../types/salarioMinimo.types';

const props = defineProps<{
  salarioMinimo: SalarioMinimo;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: SalarioMinimo): void
}>();

const datosLocales = ref<SalarioMinimo>({ ...props.salarioMinimo });

watch(() => props.salarioMinimo, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>