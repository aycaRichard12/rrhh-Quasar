<template>
  <div class="q-pa-md">
    
    <div class="row justify-between items-center q-mb-md">
      <q-btn 
        icon="arrow_back" 
        :label="$t('cambioVolver')" 
        color="negative" 
        outline
        @click="$emit('volver')" 
      />

      <div class="q-gutter-sm">
        <q-btn 
          icon="autorenew" 
          :label="$t('cambioReemplazar')" 
          color="warning" 
          :loading="cargando"
          @click="$emit('procesar', 1)" 
        />
        <q-btn 
          icon="add" 
          :label="$t('cambioAñadir')" 
          color="positive" 
          :loading="cargando"
          @click="$emit('procesar', 2)" 
        />
      </div>
    </div>

    <q-table
      :title="$t('cambioPlantilla Estándar de Entes Reguladores')"
      :rows="templates"
      :columns="columnas"
      row-key="id"
      :loading="cargando"
      flat 
      bordered
      :grid="$q.screen.lt.sm"
      :rows-per-page-options="[10, 20, 50]"
    >
      <template v-slot:body-cell-numero="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>

      <template v-slot:body-cell-porcentaje="props">
        <q-td :props="props">
          {{ props.row.porcentaje }} %
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { EnteRegulador } from '../types/entesReguladores.types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Recibimos la lista de templates y si el sistema está cargando
defineProps<{
  templates: EnteRegulador[];
  cargando:  boolean;
}>();

// Emitimos las acciones hacia el Page principal (Composables)
defineEmits(['volver', 'procesar']);

// Definición estricta de las columnas solicitadas
const columnas = [
  { 
    name: 'numero', 
    label: 'N°', 
    align: 'left' as const, 
    field: 'numero' // Este campo se llena dinámicamente con el rowIndex en el template
  },
  { 
    name: 'nombre', 
    label: t('cambioEnte Regulador'), 
    align: 'left' as const, 
    field: 'nombre',
    sortable: true
  },
  { 
    name: 'porcentaje', 
    label: t('cambioPorcentaje'), 
    align: 'right' as const, 
    field: 'porcentaje',
    sortable: true
  },
  { 
    name: 'descripcion', 
    label: t('cambioDescripción'), 
    align: 'left' as const, 
    field: 'descripcion'
  },
  { 
    name: 'monto', 
    label: t('cambioMonto'), 
    align: 'right' as const, 
    field: 'monto',
    sortable: true
  },
  { 
    name: 'orden', 
    label: t('cambioOrden'), 
    align: 'center' as const, 
    field: 'orden',
    sortable: true
  }
];
</script>