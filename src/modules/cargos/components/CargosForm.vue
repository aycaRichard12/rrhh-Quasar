<template>
  <q-card style="min-width: 50vw;">
    <q-card-section class="bg-primary row items-center justify-between text-white">
      <div class="text-h6">{{ esModoEdicion ? $t('cargos.form.edit', 'Editar Cargo') : $t('cargos.form.new', 'Nuevo Registro') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
        <div class="row q-col-gutter-md">
          
          <div class="col-12 col-md-8">
            <q-input autofocus dense outlined lazy-rules
              v-model="datosLocales.cargo"
              :label="$t('cargos.form.cargo', 'Cargo') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio')]"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-input dense outlined lazy-rules
              v-model="datosLocales.salario"
              :label="$t('cargos.form.salary', 'Salario') + ' *'"
              type="number"
              step="0.01"
              :rules="[
                val => (val !== null && val !== '') || $t('rules.required', 'Obligatorio'),
                val => /^\d+(\.\d+)?$/.test(String(val)) || $t('rules.numeric', 'Debe ser numérico')
              ]"
            />
          </div>

          <div class="col-12">
            <q-select dense outlined emit-value map-options lazy-rules
              v-model="datosLocales.idarea"
              :options="listaAreas"
              option-value="id"
              option-label="nombre"
              :label="$t('cargos.form.area', 'Área') + ' *'"
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
import type { Cargo, AreaMin } from '../types/cargos.types';

const props = defineProps<{
  cargo: Cargo;
  listaAreas: AreaMin[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{ (e: 'guardar', datos: Cargo): void }>();

const datosLocales = ref<Cargo>({ ...props.cargo });

watch(() => props.cargo, (nuevosDatos) => { 
  datosLocales.value = { ...nuevosDatos }; 
}, { deep: true });

const emitirGuardar = () => { 
  emits('guardar', datosLocales.value); 
};
</script>