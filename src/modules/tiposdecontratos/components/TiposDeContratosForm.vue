<template>
  <q-card style="min-width: 400px; max-width: 600px;">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        {{ props.esEdicion ? 'Editar Registro' : 'Nuevo Registro' }}
      </div>
    </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section class="q-col-gutter-md">
        <q-input
          v-model="datosLocales.nombre"
          label="Tipo de contrato *"
          outlined
          dense
          :rules="[val => (val !== null && val !== '') || 'El nombre es obligatorio']"
        />

        <q-input
          v-model="datosLocales.observacion"
          label="Observación *"
          type="textarea"
          outlined
          dense
          :rules="[val => (val !== null && val !== '') || 'La observación es obligatoria']"
        />

        <q-input
          v-model="datosLocales.naturaleza"
          label="Naturaleza *"
          type="textarea"
          outlined
          dense
          :rules="[val => (val !== null && val !== '') || 'La naturaleza es obligatoria']"
        />
      </q-card-section>

      <q-card-actions align="right" class="bg-grey-2">
        <q-btn flat label="Cancelar" color="negative" @click="emits('cancelar')" />
        <q-btn type="submit" label="Registrar" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const props = defineProps<{
  tipoDeContrato: TipoDeContrato;
  esEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: TipoDeContrato): void;
  (e: 'cancelar'): void;
}>();

// Clon reactivo profundo
const datosLocales = ref<TipoDeContrato>({ ...props.tipoDeContrato });

watch(
  () => props.tipoDeContrato,
  (nuevoValor) => {
    datosLocales.value = { ...nuevoValor };
  },
  { deep: true }
);

const onSubmit = (): void => {
  emits('guardar', datosLocales.value);
};
</script>