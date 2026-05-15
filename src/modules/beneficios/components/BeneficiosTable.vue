<template>
  <q-card>
    <q-table
      :title="$t('beneficios.table.title', 'Gestión de Beneficios')"
      :rows="rows"
      :columns="columnas"
      row-key="id"
      :loading="cargando"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
      flat
      bordered
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            color="secondary"
            icon="cloud_download"
            :label="$t('formBtn.import', 'Importar Estándar')"
            outline
            @click="$emit('import')"
          />
          <q-btn
            color="primary"
            icon="add"
            :label="$t('formBtn.new', 'Nuevo Registro')"
            @click="$emit('create')"
          />
        </div>
      </template>

      <!-- Regla de oro: Columna N° -->
      <template v-slot:body-cell-numero="props">
        <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
      </template>

      <!-- Formateo visual para la columna Tipo -->
      <template v-slot:body-cell-tipo="props">
        <q-td :props="props" class="text-center">
          <q-chip dense outline color="primary">
            {{ props.row.tipo === '1' || props.row.tipo === 1 ? 'Porcentaje' : 'Monto Fijo' }}
          </q-chip>
        </q-td>
      </template>

      <!-- Formateo visual para la columna Destino -->
      <template v-slot:body-cell-destino="props">
        <q-td :props="props" class="text-center">
          {{ props.row.destino === '1' || props.row.destino === 1 ? 'Planilla' : 'Finiquito' }}
        </q-td>
      </template>

      <template v-slot:body-cell-estado="props">
        <q-td :props="props" class="text-center">
          <q-chip
            clickable
            @click="$emit('change-status', props.row)"
            :color="props.row.estado === '1' || props.row.estado === 1 ? 'positive' : 'negative'"
            text-color="white"
            dense
            size="sm"
          >
            {{ props.row.estado === '1' || props.row.estado === 1 ? $t('common.actions.activate', 'Activo') : $t('common.actions.deactivate', 'Inactivo') }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="text-center q-gutter-xs">
          <q-btn icon="edit" color="info" round dense size="sm" @click="$emit('edit', props.row)">
            <q-tooltip>{{ $t('common.actions.edit', 'Editar') }}</q-tooltip>
          </q-btn>
          <q-btn icon="delete" color="negative" round dense size="sm" @click="$emit('delete', props.row.id)">
            <q-tooltip>{{ $t('common.actions.delete', 'Eliminar') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { Beneficio } from '../types/beneficios.types';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

defineProps<{
  rows: Beneficio[];
  cargando: boolean;
}>();

defineEmits(['create', 'edit', 'delete', 'change-status', 'import']);

// N°, Beneficio, Descripción, Tipo, Cantidad, Orden, Destino, Estado, Opciones
const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero', label: 'N°', field: 'numero', align: 'center', style: 'width: 50px' },
  { name: 'nombre', label: t('beneficios.table.name', 'Beneficio'), field: 'nombre', align: 'left', style: 'white-space: normal; width: 180px' },
  { name: 'descripcion', label: t('beneficios.table.description', 'Descripción'), field: 'descripcion', align: 'left', style: 'white-space: normal' },
  { name: 'tipo', label: t('beneficios.table.type', 'Tipo'), field: 'tipo', align: 'center', style: 'width: 100px' },
  { name: 'cantidad', label: t('beneficios.table.amount', 'Cantidad'), field: 'cantidad', align: 'right', style: 'width: 80px' },
  { name: 'orden', label: t('beneficios.table.order', 'Orden'), field: 'orden', align: 'center', style: 'width: 80px' },
  { name: 'destino', label: t('beneficios.table.destination', 'Destino'), field: 'destino', align: 'center', style: 'width: 100px' },
  { name: 'estado', label: t('beneficios.table.status', 'Estado'), field: 'estado', align: 'center', style: 'width: 80px' },
  { name: 'opciones', label: t('beneficios.table.options', 'Opciones'), field: 'opciones', align: 'center', style: 'width: 100px' }
]);
</script>