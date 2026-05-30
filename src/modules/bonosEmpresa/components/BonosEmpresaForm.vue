<template>
  <q-card style="min-width: 50vw;">
    <q-card-section>
      <div class="text-h6">{{ esModoEdicion ? 'Editar Bono Empresa' : 'Nuevo Registro' }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-input autofocus dense outlined 
              v-model="datosLocales.nombre"
              :label="$t('bonoEmpresa.name')+ ' *'"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          
          <div class="col-12 col-md-4">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.tipo"
              :options="opcionesTipo"
              label="Tipo *"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>

          <div class="col-6 col-md-4">
            <q-input dense outlined
              v-model="datosLocales.cantidad"
              label="Cantidad *"
              type="number"
              step="0.01"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>

          <div class="col-6 col-md-4">
            <q-input dense outlined
              v-model="datosLocales.orden"
              label="Orden *"
              type="number"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-select dense emit-value map-options outlined
              v-model="datosLocales.destino"
              label="Destino *"
              :options="opcionesDestino"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>

          <div class="col-12">
            <q-input dense outlined
              v-model="datosLocales.descripcion"
              type="textarea"
              label="Descripción *"
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn type="submit" color="primary" icon="save" label="Registrar" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const props = defineProps<{
  bonoEmpresa: BonoEmpresa;
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{( e: 'guardar', datos: BonoEmpresa): void }>();

const datosLocales = ref<BonoEmpresa>({ ...props.bonoEmpresa });

watch(() => props.bonoEmpresa, (nuevosDatos) => { datosLocales.value = { ...nuevosDatos } }, { deep: true });

const emitirGuardar = () => { emits('guardar', datosLocales.value) };

const opcionesTipo = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Monto Específico', value: '2' },
  { label: 'Fórmula', value: '3' }
];

const opcionesDestino = [
  { label: 'Planilla', value: '1' },
  { label: 'Finiquito', value: '2' }
];
</script>