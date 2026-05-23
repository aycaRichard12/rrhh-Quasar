<template>
  <q-card style="min-width: 50vw;">
    <q-card-section class="bg-primary row items-center justify-between text-white">
      <div class="text-h6">{{ props.esModoEdicion ? $t('areas.form.formEdit') : $t('areas.form.formNew') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />  
    </q-card-section>

   <q-form @submit="emitirGuardar">
    <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
     <div class="row q-col-gutter-md">
      <div class="col-12">
       <q-input
        v-model="datosLocales.nombre"
        :label="$t('areas.form.name') + ' *'"
        outlined
        dense
        autofocus
        lazy-rules
        :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Campo obligatorio')]"
       />
      </div>

      <div class="col-12">
       <q-input
        v-model="datosLocales.descripcion"
        :label="$t('tables.description') + ' *'"
        outlined
        dense
        type="textarea"
        autogrow
        lazy-rules
        :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Campo obligatorio')]"
       />
      </div>

      <div class="col-12">
       <q-select
        v-model="datosLocales.idsucursal"
        :options="sucursales"
        option-value="id"
        :option-label="item => item ? `${item.sucursal || item.nombre} - ${item.region}` : ''"
        :label="$t('areas.form.branch') + ' *'"
        outlined
        dense
        emit-value
        map-options
        lazy-rules
        :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Campo obligatorio')]"
       >
       </q-select>
      </div>
     </div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
     <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup />
     <q-btn type="submit" icon="save" :label="$t('common.actions.save')" color="primary" />
    </q-card-actions>
   </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Area, Sucursal } from '../types/areas.types';

const props = defineProps<{
  area          : Area;
  sucursales    : Sucursal[];
  esModoEdicion : boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Area): void;
  (e: 'cerrar'): void;
}>();

const datosLocales = ref<Area>({ ...props.area });

watch(() => props.area, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

</script>