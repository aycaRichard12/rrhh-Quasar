<template>
  <q-dialog v-model="esVisible" persistent>
    <q-card style="width: 100vh;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ props.esEdicion ? $t('common.actions.edit') : $t('common.actions.new') }} Trabajador
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="emitirGuardar" class="q-gutter-md">
          <div class="row q-col-gutter-sm">
            
            <div class="col-12 col-md-6">
              <q-input
                v-model="datosLocales.nombres"
                :label="$t('workers.firstName')"
                outlined
                dense
                :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="datosLocales.apellidos"
                :label="$t('workers.lastName')"
                outlined
                dense
                :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="datosLocales.ci"
                :label="$t('workers.ci')"
                outlined
                dense
                :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="datosLocales.telefono"
                :label="$t('workers.phone')"
                outlined
                dense
                :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="datosLocales.email"
                :label="$t('workers.email')"
                type="email"
                outlined
                dense
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="datosLocales.fechan"
                :label="$t('workers.birthDate')"
                outlined
                dense
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="datosLocales.fechan" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup :label="$t('common.actions.close')" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="datosLocales.idcargo"
                :options="props.cargos"
                option-value="id"
                option-label="cargo"
                emit-value
                map-options
                :label="$t('workers.cargo')"
                outlined
                dense
                :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model="datosLocales.nacionalidad" :label="$t('workers.nationality')" outlined dense />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="datosLocales.profesion" :label="$t('workers.profession')" outlined dense />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="datosLocales.direccion" :label="$t('workers.address')" outlined dense />
            </div>

          </div>

          <div class="row justify-end q-mt-md q-gutter-sm">
            <q-btn :label="$t('common.actions.cancel')" color="negative" flat v-close-popup />
            <q-btn :label="$t('common.actions.save')" color="primary" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Trabajador } from '../types/trabajadores.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

const props = defineProps<{
  modelValue: boolean;
  trabajador: Trabajador;
  esEdicion: boolean;
  cargos: Cargo[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'guardar', datos: Trabajador): void;
}>();

const esVisible = computed({
  get: () => props.modelValue,
  set: (valor) => emits('update:modelValue', valor)
});

const datosLocales = ref<Trabajador>({} as Trabajador);

watch(
  () => props.trabajador,
  (nuevoValor) => {
    if (nuevoValor) {
      datosLocales.value = JSON.parse(JSON.stringify(nuevoValor)) as Trabajador;
    }
  },
  { deep: true, immediate: true }
);

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>