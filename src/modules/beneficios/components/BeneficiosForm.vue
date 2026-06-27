<template>    
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('beneficios.edit') : $t('beneficios.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">     
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input autofocus dense lazy-rules outlined
              v-model="datosLocales.nombre"
              :label="$t('beneficios.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-6">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.tipo"
              :options="opcionesTipo"
              :label="$t('tables.type') + ' *'"
            />
          </div>
          <div class="col-5">
            <q-input dense lazy-rules outlined
              v-model="datosLocales.cantidad"
              :label="$t('tables.amount') + ' *'"
              type="number"
              step="0.01"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.destino"
              :options="opcionesDestino"
              :label="$t('tables.destination')"
            />
          </div>
          <div class="col-2">
            <q-input dense outlined
              v-model="datosLocales.orden"
              :label="$t('tables.order')"
              type="number"
            />
          </div>
          <div class="col-12">
            <q-input dense lazy-rules outlined
              v-model="datosLocales.descripcion"
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
import type { Beneficio } from '../types/beneficios.types';

const props = defineProps<{
  beneficio: Beneficio;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{(
  e: 'guardar', datos: Beneficio): void
}>();

const datosLocales = ref<Beneficio>({...props.beneficio});

watch(() => props.beneficio, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos }
}, { deep: true});

const emitirGuardar = () => {
  emits('guardar', datosLocales.value)
};

const opcionesTipo = [
  { label: 'Porcentaje', value: 1 },
  { label: 'Monto Especifico', value: 2 }
];

const opcionesDestino = [
  { label: 'Finiquito', value: 1 },
  { label: 'Bono', value: 2 }
];
</script>