<template>
  <q-table
    title="Entes Reguladores"
    :rows="listaEntes"
    :columns="columnas"
    row-key="id"
    :loading="cargando"
    flat
    bordered
  >
    <template v-slot:top-right>
      <q-btn color="primary" icon="add" label="Nuevo Registro" @click="abrirDialogoNuevo" class="q-mr-sm" />
      <q-btn color="secondary" icon="download" label="Importar Estándar" @click="cargarTemplates" />
    </template>

    <template v-slot:body-cell-estado="props">
      <q-td :props="props" class="text-center">
        <q-btn 
          v-if="props.row.estado === '1'" 
          icon="thumb_up" color="primary" round dense size="sm"
          @click="cambiarEstado(props.row.id, '2')" 
        />
        <q-btn 
          v-else 
          icon="thumb_down" color="negative" round dense size="sm"
          @click="cambiarEstado(props.row.id, '1')" 
        />
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="text-center">
        <q-btn icon="edit" color="info" round dense size="sm" class="q-mr-xs" @click="abrirDialogoEdicion(props.row.id)" />
        <q-btn icon="delete" color="negative" round dense size="sm" @click="confirmarEliminacion(props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { EnteRegulador } from '../types/entesReguladores.types';

const listaEntes = inject<Ref<EnteRegulador[]>>('listaEntes')!;
const cargando = inject<Ref<boolean>>('cargando')!;
const abrirDialogoNuevo = inject<() => void>('abrirDialogoNuevo')!;
const cargarTemplates = inject<() => Promise<void>>('cargarTemplates')!;
const abrirDialogoEdicion = inject<(id: string) => Promise<void>>('abrirDialogoEdicion')!;
const confirmarEliminacion = inject<(id: string) => void>('confirmarEliminacion')!;
const cambiarEstado = inject<(id: string, nuevoEstado: string) => Promise<void>>('cambiarEstado')!;

const columnas = [
  { name: 'nombre', label: 'Ente Regulador', align: 'left', field: 'nombre', sortable: true },
  { name: 'porcentaje', label: 'Porcentaje', align: 'right', field: 'porcentaje' },
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion' },
  { name: 'monto', label: 'Monto', align: 'right', field: 'monto' },
  { name: 'orden', label: 'Orden', align: 'right', field: 'orden' },
  { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
  { name: 'opciones', label: 'Opciones', align: 'center' }
];
</script>