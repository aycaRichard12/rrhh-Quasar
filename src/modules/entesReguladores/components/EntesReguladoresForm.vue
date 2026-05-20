<template>
  <q-card style="min-width: 50vw;">
    <q-card-section class="bg-primary row items-center justify-between text-white">
     <div class="text-h6">{{ props.esModoEdicion ? $t('entity.form.formEdit') : $t('entity.form.formNew') }}</div>
     <q-btn icon="close" flat round dense v-close-popup />  
    </q-card-section>

   <q-form @submit="emitirGuardar">
    <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
     <div class="row q-col-gutter-md">
      <div class="col-12">
       <q-input 
        v-model="datosLocales.nombre" 
        :label="$t('entity.form.name') + ' *'"
        outlined
        dense
        :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
       />
      </div>

      <div class="col-6">
       <q-input 
        v-model="datosLocales.porcentaje" 
        :label="$t('entity.form.percentage') + ' *'" 
        outlined 
        dense
        :rules="[
          val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio'),
          val => /^\d+(\.\d+)?$/.test(String(val)) || $t('rules.numeric', 'Numérico')
        ]" 
       /> 
      </div>

      <div class="col-6">
       <q-input 
        v-model="datosLocales.monto" 
        :label="$t('entity.form.amount') + ' *'" 
        outlined 
        dense
        :rules="[
          val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio'),
          val => /^\d+(\.\d+)?$/.test(String(val)) || $t('common.rules.numeric', 'Numérico')
        ]"
       />
      </div>

      <div class="col-12">
       <q-input 
        v-model="datosLocales.descripcion" 
        :label="$t('tables.description') + ' *'" 
        outlined 
        dense
        type="textarea"
        autogrow
        lazy-rules
        :rules="[val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio')]"
       />
      </div>  
              
      <div class="col-12">
       <q-input 
        v-model="datosLocales.orden" 
        :label="$t('entity.form.order') + ' *'" 
        outlined 
        dense
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || $t('common.rules.required', 'Obligatorio'),
          val => /^\d+$/.test(String(val)) || $t('common.rules.integer', 'Entero')
        ]"
       />
      </div>
     </div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" @click="emitirCerrar" />
        <q-btn color="primary" label="Registrar" type="submit" />
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

const emits = defineEmits<{
  (e: 'guardar', datos: EnteRegulador): void;
  (e: 'cerrar'): void;
}>();

const datosLocales = ref<EnteRegulador>({ ...props.enteRegulador });

watch(() => props.enteRegulador, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const emitirGuardar = (evt?: Event) => {
  evt?.preventDefault();
  console.log('FORMULARIO ENVIADO');
  console.log(datosLocales.value);

  emits('guardar', datosLocales.value);
};
const emitirCerrar = () => {
  emits('cerrar');
}
</script>