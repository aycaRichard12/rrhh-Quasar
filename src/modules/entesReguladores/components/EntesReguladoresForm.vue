<template>
  <q-card style="min-width: 30vw;">

    <q-card-section class="bg-primary row items-center justify-between text-white">
      <div class="text-h6">{{ esModoEdicion ? $t('entity.form.formEdit') : $t('entity.form.formNew') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />  
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-md scroll" style="max-height: 40vh;">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense outlined
              v-model="datosLocales.nombre" 
              :label="$t('entity.form.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.porcentaje" 
              :label="$t('entity.form.percentage') + ' *'" 
              :rules="[
                val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio'),
                val => /^\d+(\.\d+)?$/.test(String(val)) || $t('rules.numeric', 'Numérico')
              ]" 
            /> 
          </div>

          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.monto" 
              :label="$t('entity.form.amount') + ' *'" 
              :rules="[
                val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio'),
                val => /^\d+(\.\d+)?$/.test(String(val)) || $t('common.rules.numeric', 'Numérico')
              ]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense outlined lazy-rules
              v-model="datosLocales.descripcion" 
              :label="$t('tables.description') + ' *'"
              type="textarea"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio')]"
            />
          </div>  
                  
          <div class="col-12">
            <q-input dense outlined lazy-rules
              v-model="datosLocales.orden" 
              :label="$t('entity.form.order') + ' *'" 
              :rules="[
                val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio'),
                val => /^\d+$/.test(String(val)) || $t('common.rules.integer', 'Entero')
              ]"
            />
          </div>
        </div>
      </q-card-section>

    <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
        <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup  />
        <q-btn icon="save" color="primary" :label="$t('common.actions.save')" type="submit" />
    </q-card-actions>
   </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { EnteRegulador } from '../types/entesReguladores.types';

const props = defineProps<{
  enteRegulador : EnteRegulador;
  esModoEdicion : boolean;
}>();

const emits = defineEmits<{ (e: 'guardar', datos: EnteRegulador): void }>();

const datosLocales = ref<EnteRegulador>({ ...props.enteRegulador });

watch(() => props.enteRegulador, (nuevosDatos) => {datosLocales.value = { ...nuevosDatos }}, { deep: true } );

const emitirGuardar = () => { emits('guardar', datosLocales.value) };
</script>