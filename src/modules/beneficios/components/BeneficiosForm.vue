<template>
  <q-dialog 
    v-model="estaAbierto"
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">
      
      <q-form @submit.prevent="onSave">
        <q-card-section class="bg-primary row items-center justify-between text-white">
          <div class="text-h6">{{ esModoEdicion ? $t('beneficios.edit', 'Editar Beneficio') : $t('beneficios.new', 'Nuevo Beneficio') }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
          <div class="row q-col-gutter-md">
            
            <div class="col-12">
              <q-input
                v-model="datosLocales.nombre"
                :label="$t('beneficios.name', 'Nombre del Beneficio') + ' *'"
                outlined
                dense
                autofocus
                lazy-rules
                :rules="[val => !!val || $t('rules.required', 'Obligatorio')]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="datosLocales.descripcion"
                :label="$t('beneficios.description', 'Descripción') + ' *'"
                outlined
                dense
                type="textarea"
                autogrow
                lazy-rules
                :rules="[val => !!val || $t('rules.required', 'Obligatorio')]"
              />
            </div>

            <div class="col-12">
              <q-select
                v-model="datosLocales.tipo"
                :options="opcionesTipo"
                :label="$t('beneficios.type', 'Tipo') + ' *'"
                outlined
                dense
                emit-value
                map-options
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="datosLocales.cantidad"
                :label="$t('beneficios.amount', 'Cantidad') + ' *'"
                outlined
                dense
                type="number"
                step="0.01"
                lazy-rules
                :rules="[val => !!val || $t('rules.required', 'Obligatorio')]"
              />
            </div>

            <div class="col-6">
              <q-input
                v-model="datosLocales.orden"
                :label="$t('beneficios.order', 'Orden')"
                outlined
                dense
                type="number"
              />
            </div>

            <div class="col-6">
              <q-select
                v-model="datosLocales.destino"
                :options="opcionesDestino"
                :label="$t('beneficios.destination', 'Destino')"
                outlined
                dense
                emit-value
                map-options
              />
            </div>

          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
          <q-btn flat :label="$t('formBtn.cancel', 'Cancelar')" color="negative" v-close-popup />
          <q-btn type="submit" icon="save" :label="$t('formBtn.save', 'Guardar')" color="primary" :loading="cargando" :disable="cargando" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Beneficio } from '../types/beneficios.types';

const props = defineProps<{
  modelValue: boolean;
  esModoEdicion: boolean;
  cargando: boolean;
  datosFormulario: Beneficio;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const estaAbierto = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const datosLocales = ref<Beneficio>({ ...props.datosFormulario });

watch(() => props.datosFormulario, (newVal) => {
  datosLocales.value = { ...newVal };
}, { deep: true });

const onSave = () => {
  emit('save', datosLocales.value);
};

const opcionesTipo = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Monto Fijo', value: '2' }
];

const opcionesDestino = [
  { label: 'Planilla', value: '1' },
  { label: 'Finiquito', value: '2' }
];
</script>