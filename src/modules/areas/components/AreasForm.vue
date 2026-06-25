<template>
  <q-card style="width: 100vh">

    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('areas.edit') : $t('areas.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup/>  
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
        
          <div class="col-6">
            <q-input autofocus dense lazy-rules outlined
              v-model="datosLocales.nombre"
              :label="$t('areas.name') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-6">
            <q-select dense emit-value lazy-rules map-options outlined
              option-value="id"
              v-model="datosLocales.sucursal.idsucursal"
              :options="sucursales"
              :option-label="(item) => item ? `${item.sucursal} - ${item.region}` : ''"
              :label="$t('areas.branch') + ' *'"
              :rules="[val => (val !== null && val !== '') || $t('common.rules.required')]"
            />
          </div>

          <div class="col-12">
            <q-input autogrow dense lazy-rules outlined
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
import { ref, watch } from 'vue'
import type { Area, Sucursal } from '../types/areas.types'

const props = defineProps<{
  area : Area
  sucursales : Sucursal[]
  esModoEdicion : boolean
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Area): void
}>();

const deconstruirArea = (area: Area): Area => {
  // Buscamos el ID en la sucursal, y si no está, lo buscamos en la raíz del área
  const idSucursalSeguro = area.sucursal?.idsucursal || 0;

  return {
    ...area,
    sucursal: { 
      idsucursal: Number(idSucursalSeguro), // Forzamos Number para que haga match con el QSelect
      nombre: area.sucursal?.nombre || '', 
      region: area.sucursal?.region || '', 
      idregion: Number(area.sucursal?.idregion || 0) 
    }
  };
};

const datosLocales = ref<Area>(deconstruirArea(props.area))

watch(() => props.area, (nuevosDatos) => {
  datosLocales.value = deconstruirArea(nuevosDatos);
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value)
}
</script>