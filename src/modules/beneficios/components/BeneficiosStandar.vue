<template>
  <div class="q-pa-md">
    <!-- RESTAURADO: Fila superior con distribución justificada idéntica para estandarizar la empresa -->
    <div class="row justify-between items-center q-mb-md">
      <q-btn 
        icon="arrow_back" 
        :label="$t('formBtn.back', 'Volver')" 
        color="negative" 
        outline
        @click="$emit('volver')" 
      />

      <div class="q-gutter-sm">
        <q-btn 
          icon="autorenew" 
          :label="$t('formBtn.replace', 'Reemplazar')" 
          color="warning" 
          :loading="cargando"
          :disable="cargando"
          @click="$emit('procesar', 1)" 
        />
        <q-btn 
          icon="add" 
          :label="$t('formBtn.add', 'Añadir')" 
          color="positive" 
          :loading="cargando"
          :disable="cargando"
          @click="$emit('procesar', 2)" 
        />
      </div>
    </div>

    <q-table
      :title="$t('beneficios.table.standardTitle', 'Beneficios Estándar (Catálogo)')"
      :rows="rows"
      :columns="columnas"
      row-key="id"
      :loading="cargando"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
      :grid="$q.screen.lt.sm"
      flat
      bordered
    >
      <!-- Regla de oro: Columna N° -->
      <template v-slot:body-cell-numero="props">
        <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
      </template>

      <!-- Formateo visual para la columna Tipo -->
      <template v-slot:body-cell-tipo="props">
        <q-td :props="props" class="text-center">
          <q-chip dense outline color="primary">
            {{ props.row.tipo === '1' || props.row.tipo === 1 || props.row.tipo === 'Porcentaje' ? 'Porcentaje' : 'Monto Fijo' }}
          </q-chip>
        </q-td>
      </template>

      <!-- Formateo visual para la columna Destino -->
      <template v-slot:body-cell-destino="props">
        <q-td :props="props" class="text-center">
          {{ props.row.destino === '1' || props.row.destino === 1 ? 'Planilla' : 'Finiquito' }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { BeneficioEstandar } from '../types/beneficios.types';
import type { QTableColumn } from 'quasar';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

defineProps<{
  rows: BeneficioEstandar[];
  cargando: boolean;
}>();

defineEmits(['volver', 'procesar']);

// Columnas completas e idénticas a la tabla principal (menos Estado y Opciones)
const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero', label: 'N°', field: 'numero', align: 'center', style: 'width: 50px' },
  { name: 'nombre', label: t('beneficios.table.name', 'Beneficio'), field: 'nombre', align: 'left', style: 'white-space: normal; width: 180px' },
  { name: 'descripcion', label: t('beneficios.table.description', 'Descripción'), field: 'descripcion', align: 'left', style: 'white-space: normal' },
  { name: 'tipo', label: t('beneficios.table.type', 'Tipo'), field: 'tipo', align: 'center', style: 'width: 100px' },
  { name: 'cantidad', label: t('beneficios.table.amount', 'Cantidad'), field: 'cantidad', align: 'right', style: 'width: 80px' },
  { name: 'orden', label: t('beneficios.table.order', 'Orden'), field: 'orden', align: 'center', style: 'width: 80px' },
  { name: 'destino', label: t('beneficios.table.destination', 'Destino'), field: 'destino', align: 'center', style: 'width: 100px' }
]);
</script>