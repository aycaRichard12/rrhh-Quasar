<template>
 <q-dialog v-model="estaAbierto" :position="$q.screen.lt.sm ? 'bottom' : 'standard'">
  
  <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">
      
   <q-form @submit="onSave">
    
    <q-card-section class="bg-primary row items-center justify-between text-white">
     <div class="text-h6">{{ esModoEdicion ? $t('areas.form.formEdit') : $t('areas.form.formNew') }}</div>
     <q-btn
      icon="close"
      flat
      round
      dense
      v-close-popup
     />
    </q-card-section>

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
        :option-label="item => item ? `${item.sucursal} - ${item.region}` : ''"
        :label="$t('areas.form.branch') + ' *'"
        outlined
        dense
        emit-value
        map-options
        lazy-rules
        :rules="[val => (val !== null && val !== '') || $t('rules.required', 'Campo obligatorio')]"
       >
        <template v-slot:selected-item="scope">
         <div v-if="scope.opt">
          {{ scope.opt.sucursal || scope.opt.nombre }} - {{ scope.opt.region }}
         </div>
        </template>
       </q-select>
      </div>
     </div>
    </q-card-section>

    <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
     <q-btn
      flat
      :label="$t('common.actions.cancel')"
      color="negative"
      v-close-popup
     />
     <q-btn 
      type="submit"
      icon="save"
      :label="$t('common.actions.save')"
      color="primary"
      :loading="cargando"
     />
    </q-card-actions>
   </q-form>
  </q-card>
 </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Area, Sucursal } from '../types/areas.types';

const props = defineProps<{
  modelValue     : boolean;
  esModoEdicion  : boolean;
  cargando       : boolean;
  datosFormulario: Area;
  sucursales     : Sucursal[];
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const estaAbierto = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const datosLocales = ref<Area>({ ...props.datosFormulario });

watch(() => props.datosFormulario, (newVal) => {
  datosLocales.value = { ...newVal };
}, { deep: true });

const onSave = () => {
  emit('save', datosLocales.value);
};
</script>