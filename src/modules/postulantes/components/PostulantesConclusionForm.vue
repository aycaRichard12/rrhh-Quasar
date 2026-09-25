<template>
  <q-card style="width: 400px; max-width: 90vw;">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">Agregar conclusión</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense outlined 
              v-model="conclusionLocal"
              type="textarea"
              label="Ingrese la conclusión para el postulante *"
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

const props = defineProps<{
  conclusion: string;
}>();

const emits = defineEmits<{
  (e: 'guardar', conclusion: string): void;
}>();

const conclusionLocal = ref<string>(props.conclusion);

const emitirGuardar = () => {
  emits('guardar', conclusionLocal.value);
};

// Mantenemos sincronizado el dato si cambia desde fuera
watch(() => props.conclusion, (nuevoValor) => {
  conclusionLocal.value = nuevoValor;
});
</script>