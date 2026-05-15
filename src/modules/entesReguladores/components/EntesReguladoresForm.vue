<template>
  <q-dialog
    v-model="estaAbierto"
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">
      
      <q-form @submit.prevent="onSave">
        <q-card-section class="bg-primary row items-center justify-between text-white">
          <div class="text-h6">{{ esModoEdicion ? $t('entes.edit', 'Editar Ente Regulador') : $t('entes.new', 'Nuevo Registro') }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
          <div class="row q-col-gutter-md">
            
            <div class="col-12">
              <q-input 
                  v-model="datosLocales.nombre" 
                  :label="$t('entes.name', 'Ente regulador') + ' *'"
                  outlined
                  dense
                  autofocus
                  lazy-rules
                  :rules="[val => !!val || $t('rules.required', 'Obligatorio')]" 
                />
            </div>

            <div class="col-6">
              <q-input 
                  v-model="datosLocales.porcentaje" 
                  :label="$t('entes.percentage', 'Porcentaje') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required', 'Obligatorio'),
                    val => /^\d+(\.\d+)?$/.test(val) || $t('rules.numeric', 'Debe ser numérico')
                  ]" 
              />
            </div>

            <div class="col-6">
                <q-input 
                  v-model="datosLocales.monto" 
                  :label="$t('entes.amount', 'Monto') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required', 'Obligatorio'),
                    val => /^\d+(\.\d+)?$/.test(val) || $t('rules.numeric', 'Debe ser numérico')
                  ]" 
                />
              </div>

              <div class="col-12">
                <q-input 
                  v-model="datosLocales.descripcion" 
                  :label="$t('entes.description', 'Descripción') + ' *'" 
                  outlined 
                  dense
                  type="textarea"
                  autogrow
                  lazy-rules
                  :rules="[val => !!val || $t('rules.required', 'Obligatorio')]" 
                />
              </div>  
              
              <div class="col-12">
                <q-input 
                  v-model="datosLocales.orden" 
                  :label="$t('entes.order', 'Orden') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required', 'Obligatorio'),
                    val => /^\d+$/.test(val) || $t('rules.integer', 'Debe ser entero')
                  ]" 
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
import type { EnteRegulador } from '../types/entesReguladores.types';

const props = defineProps<{
  modelValue: boolean;
  esModoEdicion: boolean;
  cargando: boolean;
  datosFormulario: EnteRegulador;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const estaAbierto = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const datosLocales = ref<EnteRegulador>({ ...props.datosFormulario });

watch(() => props.datosFormulario, (newVal) => {
  datosLocales.value = { ...newVal };
}, { deep: true });

const onSave = () => {
  emit('save', datosLocales.value);
};
</script>