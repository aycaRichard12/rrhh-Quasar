<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">{{ esModoEdicion ? $t('firmas.planillas.edit') : $t('firmas.planillas.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="text-center q-pb-md q-pr-md">
          <strong>{{$t('Planillas para') + ' : ' + firmaNombre }}</strong>
        </div>
        <div class="row q-col-gutter-md">

          <div class="col-12">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idplanilla"
              option-value="id_tipoPlanilla"
              option-label="nombrePlanilla"
              :options="listaTipoPlanillas"
              :label="$t('firmas.planillas.name') + ' *'"
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
import { ref, watch } from 'vue';
import type { FirmaTipoPlanilla, TipoPlanilla } from '../types/firmas.types';

const props = defineProps<{
  firma: FirmaTipoPlanilla;
  listaTipoPlanillas: TipoPlanilla[];
  esModoEdicion: boolean;
  firmaNombre: string;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: FirmaTipoPlanilla): void
}>();

const datosLocales = ref<FirmaTipoPlanilla>({ ...props.firma });

watch(() => props.firma, (val) => {
  datosLocales.value = { ...val };
}, { deep: true });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};
</script>