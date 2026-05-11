<template>
  <q-dialog 
    v-model="isOpen" 
    :position="$q.screen.lt.sm ? 'bottom' : 'standard'"
  >
    <q-card :style="$q.screen.lt.sm ? 'width: 100vw' : 'width: 400px; max-width: 90vw;'">
      <q-card-section class="bg-primary text-white row items-center justify-between">
        <div class="text-h6">{{ isEditing ? 'Editar Área' : 'Nueva Área' }}</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <!-- Usamos un row para controlar el flujo -->
        <div class="row q-col-gutter-md">
          
          <div class="col-12">
            <q-input v-model="localData.nombre" label="Área" outlined dense autofocus />
          </div>

          <div class="col-12">
            <q-input v-model="localData.descripcion" label="Descripción" outlined dense type="textarea" autogrow />
          </div>

          <!-- Aquí limitamos el ancho del select en PC -->
          <div class="col-12">
            <q-select
              v-model="localData.sucursal"
              :options="sucursales"
              :option-label="(item) => item ? `${item.sucursal} - ${item.region}` : ''"
              option-value="id"
              label="Sucursal"
              outlined dense emit-value map-options
              :style="$q.screen.gt.xs ? 'max-width: 400px' : ''"
              :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'"
            />
          </div>
          
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn color="primary" icon="save" label="Guardar" @click="$emit('save', localData)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Area, Sucursal } from '../types/areas.types';

const props = defineProps<{
  modelValue: boolean;
  isEditing: boolean;
  formData: Area;
  sucursales: Sucursal[];
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const localData = ref<Area>({ ...props.formData });

watch(() => props.formData, (newVal) => {
  localData.value = { ...newVal };
}, { deep: true });

</script>