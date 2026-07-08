<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('tiposdecontratos.edit') : $t('tiposdecontratos.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense outlined
              v-model="datosLocales.nombre"
              :label="$t('tiposdecontratos.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense outlined
              v-model="datosLocales.naturaleza"
              type="textarea"
              :label="$t('tiposdecontratos.nature') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense lazy-rules outlined
              v-model="datosLocales.observacion"
              type="textarea"
              :label="$t('tables.observation') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
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
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const props = defineProps<{
  tipoDeContrato: TipoDeContrato;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: TipoDeContrato): void;
}>();

const datosLocales = ref<TipoDeContrato>({ ...props.tipoDeContrato });

watch(() => props.tipoDeContrato,(nuevosDatos) => {
    datosLocales.value = { ...nuevosDatos };
  }, { deep: true }
);

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>