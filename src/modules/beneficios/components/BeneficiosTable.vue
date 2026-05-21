<template>
 <div class="row justify-between items-center q-mb-md">
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
 
 <q-card>
  <q-table
   :rows="rows"
   :columns="columnas"
   row-key="id"
   :loading="cargando"
   :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
   :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
   flat
   bordered
  >

   <template v-slot:body-cell-numero="props">
    <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
   </template>

   <template v-slot:body-cell-tipo="props">
    <q-td :props="props" class="text-center">
     <q-chip dense outline color="primary">
      {{ props.row.tipo === '1' || props.row.tipo === 1 ? 'Porcentaje' : 'Monto Fijo' }}
     </q-chip>
    </q-td>
   </template>

   <template v-slot:body-cell-destino="props">
    <q-td :props="props" class="text-center">
      <q-chip dense outline color="primary">
     {{ props.row.destino === '1' || props.row.destino === 1 ? 'Planilla' : 'Finiquito' }}
     </q-chip>
    </q-td>
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
      @click="$emit('change-status', props.row)"
     >
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
      @click="$emit('change-status', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('cambioActivar') }}
      </q-tooltip>
     </q-btn>
    </q-td>
   </template>

   <template v-slot:body-cell-opciones="props">
    <q-td :props="props" class="text-center q-gutter-xs">
     <q-btn
      icon="edit"
      color="info"
      round
      dense
      size="sm"
      @click="$emit('edit', props.row)"
     >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
       {{ $t('common.actions.edit', 'Editar') }}
      </q-tooltip>
     </q-btn>
          
     <q-btn
      icon="delete"
      color="negative"
      round
      dense
      size="sm"
      @click="$emit('delete', props.row.id)"
     >
      <q-tooltip>{{ $t('common.actions.delete', 'Eliminar') }}</q-tooltip>
     </q-btn>
    </q-td>
   </template>
  </q-table>
 </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QTableColumn } from 'quasar';
import type { Beneficio } from '../types/beneficios.types';

const { t } = useI18n();

defineProps<{ rows: Beneficio[]; cargando: boolean }>();

defineEmits(['create', 'edit', 'delete', 'change-status', 'import' ]);

const columnas = computed<QTableColumn[]>(() => [
  { name: 'numero',     label: 'N°',                             align: 'center',field: 'numero',     style: 'width: 50px' },
  { name: 'nombre',     label: t('beneficios.table.name'),       align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 150px;' },
  { name: 'descripcion',label: t('beneficios.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'tipo',       label: t('beneficios.table.type'),       align: 'center',field: 'tipo',       style: 'width: 100px' },
  { name: 'cantidad',   label: t('beneficios.table.amount'),     align: 'right', field: 'cantidad',   style: 'width: 80px' },
  { name: 'orden',      label: t('beneficios.table.order'),      align: 'center',field: 'orden',      style: 'width: 80px' },
  { name: 'destino',    label: t('beneficios.table.destination'),align: 'center',field: 'destino',    style: 'width: 100px' },
  { name: 'estado',     label: t('beneficios.table.status'),     align: 'center',field: 'estado',     style: 'width: 80px' },
  { name: 'opciones',   label: t('beneficios.table.options'),    align: 'center',field: 'opciones',   style: 'width: 100px' }
]);
</script>