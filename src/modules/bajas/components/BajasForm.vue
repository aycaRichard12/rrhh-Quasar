<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('bajas.edit') : $t('bajas.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('bajas.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-8">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idmotivo"
              :options="listaMotivos"
              option-label="nombre" 
              option-value="id"
              :label="$t('metodosdeevaluacion.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined 
              v-model="datosLocales.fecha"
              type="date"
              :label="$t('tables.date') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
            <q-input dense outlined 
              v-model="datosLocales.fechai"
              type="date"
              :label="$t('tables.date') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
            <q-input dense outlined 
              v-model="datosLocales.fechaf"
              type="date"
              :label="$t('tables.date') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-2">
            <q-input dense lazy-rules outlined 
              v-model.number="diasLocales"
              type="number"
              :label="$t('dias') + ' *'"
              :disable="props.esMotivoDefinitivo"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense outlined 
              v-model="datosLocales.observacion"
              :label="$t('tables.description') + ' *'"
              type="textarea"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat v-close-popup
          color="negative"
          :label="$t('common.actions.cancel')"
        />
        <q-btn
          class="global-btn-page"
          icon="save"
          type="submit"
          :label="$t('common.actions.save')"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import type { Baja } from '../types/bajas.types';
import type { MotivoDeBaja } from 'src/modules/motivosdebaja/types/motivosDeBaja.types';

const props = defineProps<{
  baja: Baja;
  listaMotivos: MotivoDeBaja[];
  esModoEdicion: boolean;
  inputDias: number | ''
  esMotivoDefinitivo: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Baja): void
  (e: 'update:input-dias', valor: number | ''): void;
}>();

const datosLocales = ref<Baja>({ ...props.baja });

    // 🚀 Computed que conecta el QInput bidireccionalmente con el Composable Padre
const diasLocales = computed({
  get: () => props.inputDias,
  set: (valor: number | '') => emits('update:input-dias', valor)
});

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.baja, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });
</script>