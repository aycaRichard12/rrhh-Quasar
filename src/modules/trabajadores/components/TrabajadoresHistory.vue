<template>
  <q-dialog v-model="esVisible" persistent>
    <q-card style="min-width: 800px; max-width: 90vw;">
      <q-card-section class="bg-primary text-white row items-center">
        <div class="text-h6">
          Historial de: {{ props.trabajador?.nombres }} {{ props.trabajador?.apellidos }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-table
          flat
          bordered
          :rows="props.listaHistorial"
          :columns="listaColumnas"
          row-key="numero"
          :no-data-label="$t('common.messages.noData')"
        >
          <template v-slot:body-cell-numero="propsCell">
            <q-td :props="propsCell">
              {{ propsCell.rowIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          :label="$t('common.actions.close')"
          color="negative"
          flat
          v-close-popup
        />
        <q-btn
          label="Descargar PDF"
          color="primary"
          icon="picture_as_pdf"
          @click="emits('descargarPdf')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasHistorialTrabajador } from '../utils/trabajadores.columns';
import type { Trabajador, HistorialTrabajador } from '../types/trabajadores.types';

const props = defineProps<{
  modelValue: boolean;
  trabajador: Trabajador | null;
  listaHistorial: HistorialTrabajador[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'descargarPdf'): void;
}>();

const { t } = useI18n();

const esVisible = computed({
  get: () => props.modelValue,
  set: (valor) => emits('update:modelValue', valor)
});

const listaColumnas = computed(() => obtenerColumnasHistorialTrabajador(t));
</script>