<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('funcionesYObligaciones.edit') : $t('funcionesYObligaciones.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup/>
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          
          <div class="col-6">
            <q-input autofocus dense outlined
              v-model="datosLocales.nombre"
              :label="$t('funcionesYObligaciones.name', 'Función u Obligación') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-6">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.idcargo"
              :options="listaCargos"
              option-value="id"
              option-label="cargo"
              :label="$t('cargos.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-12">
            <q-input dense outlined
              v-model="datosLocales.descripcion"
              type="textarea"
              :label="$t('tables.description') + ' *'"
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
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

const props = defineProps<{
  funcionYObligacion: FuncionYObligacion;
  listaCargos: Cargo[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: FuncionYObligacion): void;
}>();

const datosLocales = ref<FuncionYObligacion>({ ...props.funcionYObligacion });

watch(() => props.funcionYObligacion, (nuevosDatos) => {
    datosLocales.value = { ...nuevosDatos };
  },
  { deep: true }
);

const emitirGuardar = () => { 
  emits('guardar', datosLocales.value); 
};
</script>