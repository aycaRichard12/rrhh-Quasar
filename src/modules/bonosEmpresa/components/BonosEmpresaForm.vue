<template>
  <q-card style="min-width: 50vw;">
    <q-card-section>
      <div class="text-h6">{{ props.esModoEdicion ? 'Editar Bono Empresa' : 'Nuevo Registro' }}</div>
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-input
              v-model="datosLocales.nombre"
              label="Beneficio *"
              outlined
              dense
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-select
              v-model="datosLocales.tipo"
              :options="opcionesTipo"
              label="Tipo *"
              outlined
              dense
              emit-value
              map-options
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-6 col-md-4">
            <q-input
              v-model="datosLocales.cantidad"
              label="Cantidad *"
              type="number"
              step="0.01"
              outlined
              dense
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-6 col-md-4">
            <q-input
              v-model="datosLocales.orden"
              label="Orden *"
              type="number"
              outlined
              dense
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-select
              v-model="datosLocales.destino"
              :options="opcionesDestino"
              label="Destino *"
              outlined
              dense
              emit-value
              map-options
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="datosLocales.descripcion"
              label="Descripción *"
              type="textarea"
              outlined
              dense
              :rules="[val => (val !== null && val !== '') || 'Este campo es requerido']"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" @click="emitirCerrar" />
        <q-btn color="primary" label="Registrar" type="submit" />
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

const emits = defineEmits<{
  (e: 'guardar', datos: BonoEmpresa): void;
  (e: 'cerrar'): void;
}>();

// Copia local para poder modificar en el formulario sin mutar directamente el prop
const datosLocales = ref<BonoEmpresa>({ ...props.bonoEmpresa });

// Escuchar cambios por si la ventana se abre con nuevos datos
watch(() => props.bonoEmpresa, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const opcionesTipo = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Monto Específico', value: '2' },
  { label: 'Fórmula', value: '3' }
];

const opcionesDestino = [
  { label: 'Planilla', value: '1' },
  { label: 'Finiquito', value: '2' }
];

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

const emitirCerrar = () => {
  emits('cerrar');
};
</script>