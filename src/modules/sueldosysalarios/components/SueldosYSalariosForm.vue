<template>
  <q-card style="min-width: 350px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ props.esModoEdicion ? 'Editar Registro' : 'Nuevo Registro' }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="alEnviar">
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.nombre" label="Nombre *" dense outlined :rules="[val => !!val || 'Campo requerido']" />
        <q-input v-model="form.cargo" label="Cargo *" dense outlined :rules="[val => !!val || 'Campo requerido']" />
        <q-input v-model="form.ci" label="CI *" dense outlined :rules="[val => !!val || 'Campo requerido']" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn unelevated label="Guardar" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SueldosYSalarios } from '../types/sueldosYSalarios.types';

const props = defineProps<{
  item: SueldosYSalarios;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', data: SueldosYSalarios): void;
}>();

const form = ref<SueldosYSalarios>({ ...props.item });

watch(() => props.item, (val) => {
  form.value = { ...val };
}, { deep: true });

const alEnviar = () => {
  emits('guardar', form.value);
};
</script>
