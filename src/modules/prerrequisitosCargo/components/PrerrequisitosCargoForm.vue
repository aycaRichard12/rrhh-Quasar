<template>
  <q-card style="min-width: 50vw;">
    <q-card-section class="bg-primary row items-center justify-between text-white">
      <div class="text-h6">{{ esModoEdicion ? $t('prerrequisitos.form.edit', 'Editar Prerrequisito') : $t('prerrequisitos.form.new', 'Nuevo Registro') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
        <div class="row q-col-gutter-md">
          
          <div class="col-12 col-md-6">
            <q-input autofocus dense outlined lazy-rules
              v-model="datosLocales.nombre"
              :label="$t('prerrequisitos.form.name', 'Prerrequisito') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-12 col-md-6">
            <q-select dense outlined emit-value map-options lazy-rules
              v-model="datosLocales.idcargo"
              :options="listaCargos"
              option-value="id"
              option-label="cargo"
              :label="$t('prerrequisitos.form.cargo', 'Cargo') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense outlined lazy-rules
              v-model="datosLocales.descripcion"
              type="textarea"
              :label="$t('tables.description', 'Descripción') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
        <q-btn flat :label="$t('common.actions.cancel', 'Cancelar')" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" :label="$t('common.actions.save', 'Guardar')" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PrerrequisitoCargo, CargoMin } from '../types/prerrequisitosCargo.types';

const props = defineProps<{
  prerrequisito: PrerrequisitoCargo;
  listaCargos: CargoMin[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{ (e: 'guardar', datos: PrerrequisitoCargo): void }>();

const datosLocales = ref<PrerrequisitoCargo>({ ...props.prerrequisito });

watch(() => props.prerrequisito, (nuevosDatos) => { 
  datosLocales.value = { ...nuevosDatos }; 
}, { deep: true });

const emitirGuardar = () => { 
  emits('guardar', datosLocales.value); 
};
</script>