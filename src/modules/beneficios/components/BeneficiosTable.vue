<template>
  <q-card>
    <q-table
      title="Gestión de Beneficios"
      :rows="listaBeneficios"
      :columns="columnasBeneficios"
      row-key="id"
      :loading="esCargando"
      :grid="$q.screen.lt.sm"
      flat
      bordered
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            color="secondary"
            icon="cloud_download"
            label="Importar Estándar"
            outline
            @click="alternarVistaEstandar"
          />
          <q-btn
            color="primary"
            icon="add"
            label="Nuevo Registro"
            @click="abrirDialogoNuevo"
          />
        </div>
      </template>

      <template v-slot:body-cell-estado="props">
        <q-td :props="props">
          <q-chip
            clickable
            @click="cambiarEstadoRegistro(props.row)"
            :color="props.row.estado === '1' ? 'positive' : 'negative'"
            text-color="white"
            dense
            size="sm"
          >
            {{ props.row.estado === '1' ? 'Activo' : 'Inactivo' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="q-gutter-xs">
          <q-btn
            flat
            dense
            round
            color="primary"
            icon="edit"
            @click="abrirDialogoEditar(props.row)"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
            @click="confirmarEliminacion(props.row.id)"
          >
            <q-tooltip>Eliminar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { useBeneficios } from '../composables/useBeneficios';
import type { QTableColumn } from 'quasar';

const {
  listaBeneficios, esCargando,
  abrirDialogoNuevo, abrirDialogoEditar, confirmarEliminacion, cambiarEstadoRegistro, alternarVistaEstandar
} = useBeneficios();

const columnasBeneficios: QTableColumn[] = [
  { name: 'numero',     label: 'N°',         field: 'numero',     align: 'center' },
  { name: 'nombre',     label: 'Nombre',     field: 'nombre',     align: 'left' },
  { name: 'descripcion',label: 'Descripción',field: 'descripcion',align: 'left' },
  { name: 'tipo',       label: 'Tipo',       field: 'tipo',       align: 'left' },
  { name: 'cantidad',   label: 'Cantidad',   field: 'cantidad',   align: 'right' },
  { name: 'orden',      label: 'Orden',      field: 'orden',      align: 'right' },
  { name: 'destino',    label: 'Destino',    field: 'destino',    align: 'left' },
  { name: 'estado',     label: 'Estado',     field: 'estado',     align: 'center' },
  { name: 'opciones',   label: 'Opciones',   field: 'opciones',   align: 'center' }
];
</script>