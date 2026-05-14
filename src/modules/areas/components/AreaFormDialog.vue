<template>
  <q-dialog 
    v-model="estaAbierto" 
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">

      <q-form @submit.prevent="onSave">

        <q-card-section class="bg-primary row items-center justify-between">
          <div class="text-h6">{{ esModoEdicion ? 'cambiarEditar Área' : 'cambiarNueva Área' }}</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md scroll" style="max-height: 70vh;">
          <div class="row q-col-gutter-md">
          
            <div class="col-12">
              <q-input
                v-model="datosLocales.nombre"
                :label="$t('areas.form.area') + ' *'"
                outlined
                dense
                autofocus
                lazy-rules
                :rules="[val => !!val || $t('rules.required')]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="datosLocales.descripcion"
                :label="$t('areas.form.description') + '*'"
                outlined
                dense
                type="textarea"
                autogrow
                lazy-rules
                :rules="[val => !!val || $t('rules.required')]"
              />
            </div>

            <div class="col-12">
              <q-select
                v-model="datosLocales.sucursal"
                :options="sucursales"
                :option-label="(item) => item ? `${item.sucursal || item.nombre} - ${item.region}` : ''"
                option-value="id"
                :label="$t('areas.form.branch') + '*'"
                outlined
                dense
                emit-value
                map-options
                :style="$q.screen.gt.xs ? 'max-width: 400px' : ''"
                :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'"
                lazy-rules
                :rules="[val => !!val || $t('rules.required')]"
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
            :label="$t('formBtn.cancel')"
            color="negative"
            v-close-popup
          />
          <q-btn 
            type="submit"
            icon="save"
            :label="$t('formBtn.save')"
            color="primary"
            :loading="guardando"
          />
        </q-card-actions>
      </q-form>

    </q-card>
  </q-dialog>
</template>

<script setup lang = "ts">
import type { Area, Sucursal } from '../types/areas.types'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue:     boolean;
  esModoEdicion:  boolean;
  datosFormulario:Area;
  sucursales:     Sucursal[];
  guardando?:     boolean;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const estaAbierto = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const datosLocales = ref<Area>({ ...props.datosFormulario });

// Sincroniza datos cuando se abre para editar
watch(() => props.datosFormulario, (newVal) => {
  datosLocales.value = { ...newVal };
}, { deep: true });

const onSave = () => {
  // Ya no necesitas emitir click, el q-form valida las rules y si pasa, dispara esto.
  emit('save', datosLocales.value);
};
</script>