<template>
  <q-dialog
    v-model="estaAbierto"
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
    persistent
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">

      <q-form @submit.prevent="onSave">

        <q-card-section class="bg-primary row items-center justify-between">
          <div class="text-h6">{{ esModoEdicion ? $t('CambiarEditar Ente Regulador') : $t('cambiarNuevo Registro') }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
          <div class="row q-col-gutter-md">

            <div class="col-12">
              <q-input 
                  v-model="datosLocales.nombre" 
                  :label="$t('cambioEnte regulador') + '*'"
                  outlined
                  dense
                  lazy-rules
                  :rules="[val => !!val || $t('El nombre es obligatorio')]" 
                />
            </div>
            <div class="col-6">
              <q-input 
                  v-model="datosLocales.porcentaje" 
                  :label="$t('cambioPorcentaje') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required'),
                    val => /^\d+(\.\d+)?$/.test(val) || $t('cambioDebe ser un número válido')
                  ]" 
              />
            </div>

            <div class="col-6">
                <q-input 
                  v-model="datosLocales.monto" 
                  :label="$t('cambioMonto') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required'),
                    val => /^\d+(\.\d+)?$/.test(val) || $t('cambioDebe ser numérico')
                  ]" 
                />
              </div>

              <div class="col-12">
                <q-input 
                  v-model="datosLocales.descripcion" 
                  :label="$t('cambioDescripción') + ' *'" 
                  outlined 
                  dense
                  type="textarea"
                  autogrow
                  lazy-rules
                  :rules="[val => !!val || $t('rules.required')]" 
                />
              </div>  
              
              <div class="col-12">
                <q-input 
                  v-model="datosLocales.orden" 
                  :label="$t('cambioOrden') + ' *'" 
                  outlined 
                  dense
                  lazy-rules
                  :rules="[
                    val => !!val || $t('rules.required'),
                    val => /^\d+$/.test(val) || $t('cambioDebe ser un número entero')
                  ]" 
                />
              </div>

          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
          <q-btn
            flat
            :label="$t('formBtn.cancel')"
            color="negative"
            v-close-popup
          />
          <q-btn 
            type="submit" 
            icon="save" 
            :label="$t('formBtn.save')" 
            color="primary" 
            :loading="guardando"
          />
        </q-card-actions>
      </q-form>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { EnteRegulador } from '../types/entesReguladores.types';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  modelValue:     boolean;
  esModoEdicion:  boolean;
  datosFormulario:EnteRegulador;
  guardando?:     boolean;
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