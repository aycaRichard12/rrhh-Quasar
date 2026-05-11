<template>
  <q-table title="Gestión de Áreas" :rows="rows" :columns="columns" row-key="id" flat bordered>
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props">
        <q-btn flat dense color="primary" icon="edit" class="q-mr-sm" @click="$emit('edit', props.row)" />
        <q-btn flat dense color="negative" icon="delete" @click="$emit('delete', props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { Area, SucursalAnidada } from '../types/areas.types';

defineProps<{ rows: Area[] }>();
defineEmits(['edit', 'delete']);

const columns: QTableColumn[] = [
  { name: 'numero', label: 'N°', align: 'center', field: 'numero', style: 'width: 40px'},
  { name: 'area', label: 'Área', align: 'left', field: 'nombre', sortable: true, style: 'white-space: normal; width: 100px' },
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion',style: 'white-space: normal; min-width: 150px;', classes: 'ellipsis-3-lines' },
  { name: 'sucursal', label: 'Sucursal', align: 'left', field: 'sucursal', style: 'width: 120px',
    // 2. Cambiamos 'any' por el tipo exacto (objeto de sucursal o nulo)
    format: (val: SucursalAnidada | null) => {
      if (val && typeof val === 'object') {
        return `${val.nombre || ''} - ${val.region || ''}`;
      }
      return 'Sin sucursal';
    }
  },
  { name: 'opciones', label: 'Opciones', align: 'center', field: 'opciones', style: 'width: 80px' }
];
</script>