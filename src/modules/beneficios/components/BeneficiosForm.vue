<template>    
  <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">
    
    <q-card-section class="bg-primary row items-center justify-between text-white">
      <div class="text-h6">{{ esModoEdicion ? $t('beneficios.edit') : $t('beneficios.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">     
      <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined
              v-model="datosLocales.nombre"
              :label="$t('beneficios.name') + ' *'"
              :rules="[val => !!val || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense lazy-rules outlined
            v-model="datosLocales.descripcion"
            type="textarea"
            :label="$t('beneficios.description', 'Descripción') + ' *'"
            :rules="[val => !!val || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-6">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.tipo"
              :options="opcionesTipo"
              :label="$t('beneficios.type', 'Tipo') + ' *'"
            />
          </div>

          <div class="col-6">
            <q-input dense lazy-rules outlined
              v-model="datosLocales.cantidad"
              :label="$t('beneficios.amount', 'Cantidad') + ' *'"
              type="number"
              step="0.01"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-6">
            <q-input dense outlined
              v-model="datosLocales.orden"
              :label="$t('beneficios.order', 'Orden')"
              type="number"
            />
          </div>

          <div class="col-6">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.destino"
              :options="opcionesDestino"
              :label="$t('beneficios.destination', 'Destino')"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
        <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" :label="$t('common.actions.save')" color="primary" />
    </q-card-actions>
   </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Beneficio } from '../types/beneficios.types';

const props = defineProps<{
  beneficio    : Beneficio;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{( e: 'guardar', datos: Beneficio): void }>();

const datosLocales = ref<Beneficio>({ ...props.beneficio });

watch(() => props.beneficio, (nuevosDatos) => { datosLocales.value = { ...nuevosDatos } }, { deep: true });

const emitirGuardar = () => { emits('guardar', datosLocales.value) };

const opcionesTipo = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Monto Especifico', value: '2' }
];

const opcionesDestino = [
  { label: 'Finiquito', value: '1' },
  { label: 'Bono', value: '2' }
];
</script>