<template>
  <q-card>
    <q-table
      title="Beneficios Estándar (Catálogo)"
      :rows="listaBeneficiosEstandar"
      :columns="columnasBeneficiosEstandar"
      row-key="id"
      :loading="esCargando"
      :grid="$q.screen.lt.sm"
      flat
      bordered
      color="secondary"
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            color="warning"
            icon="autorenew"
            label="Reemplazar"
            outline
            @click="confirmarImportacion('reemplazar')"
          >
            <q-tooltip>Sobrescribir los datos actuales</q-tooltip>
          </q-btn>
          
          <q-btn
            color="positive"
            icon="add_circle_outline"
            label="Añadir"
            outline
            @click="confirmarImportacion('anadir')"
          >
            <q-tooltip>Agregar a los datos actuales</q-tooltip>
          </q-btn>
          
          <q-btn
            color="dark"
            icon="arrow_back"
            label="Volver"
            flat
            @click="alternarVistaEstandar"
          />
        </div>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { useBeneficios } from '../composables/useBeneficios';
import type { QTableColumn } from 'quasar';

const {
  listaBeneficiosEstandar, esCargando,
  alternarVistaEstandar, confirmarImportacion
} = useBeneficios();

const columnasBeneficiosEstandar: QTableColumn[] = [
  { name: 'nombre',     label: 'Nombre',     field: 'nombre',     align: 'left' },
  { name: 'descripcion',label: 'Descripción',field: 'descripcion',align: 'left' },
  { name: 'tipo',       label: 'Tipo',       field: 'tipo',       align: 'center' },
  { name: 'cantidad',   label: 'Cantidad',   field: 'cantidad',   align: 'center' },
  { name: 'orden',      label: 'Orden',      field: 'orden',      align: 'center' }
];
</script>