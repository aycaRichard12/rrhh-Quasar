<template>
  <q-table
    :title="$t('areas.table.title')"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :loading="cargando"
    :rows-per-page-label="t('areas.table.recordsPerPage')"
    :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('areas.table.of')} ${totalRows}`"
    flat
    bordered
    :grid="$q.screen.lt.sm"
  >
    <template v-slot:top-right>
      <q-btn
        color="primary"
        icon="add"
        :label="t('areas.form.newTitle')"
        @click="$emit('create')"
      />
    </template>

    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>
    
    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="text-center">
        <q-btn icon="edit" color="info" round dense size="sm" class="q-mr-xs" @click="$emit('edit', props.row)">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ t('common.actions.edit') }}
          </q-tooltip>
        </q-btn>

        <q-btn icon="delete" color="negative" round dense size="sm" @click="$emit('delete', props.row.id)">
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

defineProps<{ rows: Area[] ; cargando?: boolean}>();
defineEmits(['create', 'edit', 'delete']);

const columns = computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                        align: 'center',field: 'numero',     style: 'width: 40px'},
  { name: 'nombre',     label: t('areas.table.name'),       align: 'left',  field: 'nombre',      style: 'white-space: normal; width: 120px', sortable: true},
  { name: 'descripcion',label: t('areas.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'sucursal',   label: t('areas.table.branch'), align: 'left', field: (row: Area) => {
    const s = row.sucursal;
    if (s && s.nombre) {
      return `${s.nombre} - ${s.region || ''}`;
    }
    return t('areas.form.noBranch');
  }
},
  { name: 'opciones',   label: t('areas.table.options'),    align: 'center', field: 'opciones', style: 'width: 100px' }
]);
</script>