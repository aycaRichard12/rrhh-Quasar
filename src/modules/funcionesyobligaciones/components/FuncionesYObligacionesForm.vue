<template>
  <q-card style="min-width: 450px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        {{ esModoEdicion ? t('common.editarRegistro') : t('common.nuevoRegistro') }}
      </div>
    </q-card-section>

    <q-form @submit="procesarGuardado">
      <q-card-section class="q-gutter-md">
        
        <q-select
          v-model="datosLocales.idcargo"
          :options="listaCargos"
          option-value="id"
          option-label="cargo"
          emit-value
          map-options
          outlined
          :label="t('funcionesYObligaciones.form.cargo', 'Cargo') + ' *'"
          :rules="[val => (val !== null && val !== '') || t('common.campoRequerido')]"
        />

        <q-input
          v-model="datosLocales.nombre"
          outlined
          :label="t('funcionesYObligaciones.form.nombre', 'Función u Obligación') + ' *'"
          :rules="[val => (val !== null && val !== '') || t('common.campoRequerido')]"
        />

        <q-input
          v-model="datosLocales.descripcion"
          type="textarea"
          outlined
          :label="t('funcionesYObligaciones.form.descripcion', 'Descripción') + ' *'"
          :rules="[val => (val !== null && val !== '') || t('common.campoRequerido')]"
        />
        
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pt-none">
        <q-btn flat :label="t('common.cancelar')" color="negative" @click="emit('cancelar')" />
        <q-btn flat :label="t('common.guardar')" type="submit" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FuncionYObligacion, Cargo } from '../types/funcionesYObligaciones.types';

const props = defineProps<{
  funcionYObligacion: FuncionYObligacion;
  listaCargos: Cargo[];
  esModoEdicion: boolean;
}>();

const emit = defineEmits<{
  (e: 'guardar', datos: FuncionYObligacion): void;
  (e: 'cancelar'): void;
}>();

const { t } = useI18n();
const datosLocales = ref<FuncionYObligacion>({ ...props.funcionYObligacion });

// Evita la mutación estricta de Props por parte de Vue actualizando la copia interna
watch(
  () => props.funcionYObligacion,
  (nuevosDatos) => {
    datosLocales.value = { ...nuevosDatos };
  },
  { deep: true }
);

const procesarGuardado = () => {
  emit('guardar', datosLocales.value);
};
</script>