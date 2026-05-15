<template>
  <q-table
    :title="$t('areas.table.title', 'Gestion de Areas')"
    :rows="rows"
    :columns="columnas"
    row-key="id"
    :loading="cargando"
    :rows-per-page-label="t('areas.table.recordsPerPage', 'Registros por página:')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('areas.table.of')} ${totalRows}`"
    flat
    bordered
  >
    <template v-slot:top-right>
      <q-btn color="primary" icon="add" :label="t('cambioNuevo Registro')" @click="$emit('create')" />
    </template>

    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>
    
    <!-- revisar q-gutter -->
         <!-- class="q-mr-xs"  revisar su efecto-->
    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="text-center q-gutter-xs">
        <q-btn
          icon="edit" 
          color="info"
          round
          dense
          size="sm"
      
          @click="$emit('edit', props.row)">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ t('common.actions.edit') }}
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
            {{ t('common.actions.delete') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { Area } from '../types/areas.types'
import type { QTableColumn } from 'quasar'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

defineProps<{
  rows:      Area[] ;
  cargando?: boolean
}>();
defineEmits([
  'create',
  'edit',
  'delete'
]);

const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                        align: 'center',field: 'numero'},
  { name: 'nombre',     label: t('areas.table.name'),       align: 'left',  field: 'nombre',      style: 'white-space: normal; width: 150px;'},
  { name: 'descripcion',label: t('areas.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'sucursal',   label: t('areas.table.branch'),     align: 'center', style: 'white-space: normal; width: 150px;', field: (row: Area) => {
    const s = row.sucursal;
    if (s && s.nombre) {
      return `${s.nombre} - ${s.region || ''}`;
    }
    return t('areas.form.noBranch');
  }
},
  { name: 'opciones',   label: t('areas.table.options'),    align: 'center', field: 'opciones' }
]);
</script>