<template>
  <q-card style="width: 100vh; max-width: 90vw;">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('entesreguladores.edit') : $t('entesreguladores.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />  
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense outlined
              v-model="datosLocales.nombre" 
              :label="$t('entesreguladores.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>

          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.porcentaje" 
              :label="$t('entesreguladores.percentage') + ' *'" 
              type="number"
              step="0.01"
              :rules="[val => !!val || $t('common.rules.required')]" 
            /> 
          </div>

          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.monto" 
              :label="$t('tables.amount2') + ' *'" 
              type="number"
              step="0.01"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense outlined 
              v-model="datosLocales.descripcion" 
              :label="$t('tables.description') + ' *'"
              type="textarea"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>  
                  
          <div class="col-12">
            <q-input dense outlined
              v-model="datosLocales.orden" 
              :label="$t('tables.order') + ' *'" 
              type="number"
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
import type { EnteRegulador } from '../types/entesReguladores.types';

const props = defineProps<{
  enteRegulador: EnteRegulador;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{ (e: 'guardar', datos: EnteRegulador): void }>();

const datosLocales = ref<EnteRegulador>({ ...props.enteRegulador });

watch(() => props.enteRegulador, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>
