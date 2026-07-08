<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('reasonLeave.edit') : $t('reasonLeave.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined
              v-model="datosLocales.nombre"
              :label="$t('motivosdebaja.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.tipo"
              :options="opcionesTipo"
              :label="$t('motivosdebaja.type') + ' *'"
            />
          </div>
          <div class="col-12">
            <q-input dense lazy-rules outlined
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
import { ref, watch, computed } from 'vue';
import type { MotivoDeBaja } from '../types/motivosDeBaja.types';

const props = defineProps<{
  motivo: MotivoDeBaja;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: MotivoDeBaja): void;
}>();

const datosLocales = ref<MotivoDeBaja>({ ...props.motivo });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

const opcionesTipo = computed(() => [
  { label: 'Temporal', value: 1 },
  { label: 'Definitva', value: 2 }
]);

watch(() => props.motivo, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });
</script>