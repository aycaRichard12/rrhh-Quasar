<template>
  <q-table
    :title="$t('cambioEntes Reguladores')"
    :rows="rows"
    :columns="columnas"
    row-key="id"
    :loading="cargando"
    :rows-per-page-label="t('areas.table.recordsPerPage')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('areas.table.of')} ${totalRows}`"
    flat
    bordered
  >
    <template v-slot:top-right>
      <q-btn color="primary" icon="add" :label="$t('cambioNuevo Registro')" @click="$emit('create')" class="q-mr-sm" />
      <q-btn color="secondary" icon="cloud_download" :label="$t('cambioImportar Estándar')" @click="$emit('import')" />
    </template>

    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-estado="props">
      <q-td :props="props" class="text-center">
        <q-btn
          v-if="props.row.estado === '1' || props.row.estado === 1"
          icon="thumb_up"
          color="primary"
          round
          dense
          size="sm"
          @click="$emit('change-status', props.row.id)"
        >
        <!-- revisar eliminacion(, '2') despues de props.row.id -->

          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('cambioDesactivar') }}
          </q-tooltip>
        </q-btn>

        <q-btn 
          v-else
          icon="thumb_down"
          color="negative"
          round
          dense
          size="sm"
          @click="$emit('change-status', props.row.id,)"
        >
                <!-- revisar eliminacion(, '1') despues de props.row.id -->

          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('cambioActivar') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <!-- revisar q-gutter-xs despues de textcenter -->
<!-- revisar eliminacion          class="q-mr-xs" -->
 <!-- revisar .id despues de prop.row en click emit-->
      <q-td :props="props" class="text-center">
        <q-btn
          icon="edit"
          color="info"
          round
          dense
          size="sm"

          @click="$emit('edit', props.row)">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('cambioEditar') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          icon="delete"
          color="negative"
          round
          dense
          size="sm"
          @click="$emit('delete', props.row.id)">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('cambioEliminar') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { EnteRegulador } from '../types/entesReguladores.types';
import type { QTableColumn } from 'quasar';
import { useI18n } from 'vue-i18n';
import { computed} from 'vue';

const { t } = useI18n();

defineProps<{
      rows: EnteRegulador[];
  cargando: boolean;
}>();
defineEmits([
  'create',
  'import',
  'edit',
  'delete',
  'change-status'
]);

const columnas= computed<QTableColumn[]>(() => [
{ name: 'numero',        label: 'N°',               align: 'center', field: 'numero', style: 'width: 30px' },
  { name: 'ente',        label: t('Ente Regulador'),align: 'left',   field: 'nombre',      style: 'white-space: normal; width: 180px' },
  { name: 'porcentaje',  label: t('Porcentaje'),    align: 'center', field: 'porcentaje', style: 'width: 30px' },
  { name: 'descripcion', label: t('Descripción'),   align: 'left',   field: 'descripcion', style: 'white-space: normal' },
  { name: 'monto',       label: t('Monto'),         align: 'right',  field: 'monto', style: 'width: 50px'},
  { name: 'orden',       label: t('Orden'),         align: 'center', field: 'orden', style: 'width: 30px'},
  { name: 'estado',      label: t('Estado'),        align: 'center', field: 'estado' , style: 'width: 50px'},
  { name: 'opciones',    label: t('Opciones'),      align: 'center', field: 'opciones',    style: 'width: 50px' }
]);
</script>