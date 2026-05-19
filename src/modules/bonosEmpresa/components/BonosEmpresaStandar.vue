<template>
  <div>
    <div class="row justify-between items-center q-mb-md">
      <q-btn color="primary" icon="arrow_back" label="Volver" @click="emitirVolver" />
      
      <div class="q-gutter-sm">
        <q-btn color="primary" label="Reemplazar" @click="emitirProcesar(1)" />
        <q-btn color="secondary" label="Añadir" @click="emitirProcesar(2)" />
      </div>
    </div>

    <q-table
      :rows="props.listaBonosEstandar"
      :columns="columnasEstandar"
      row-key="id"
      :grid="$q.screen.lt.sm"
      flat
      bordered
    >
      <template v-slot:body-cell-numero="props">
        <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const props = defineProps<{
  listaBonosEstandar: BonoEmpresa[];
}>();

const emits = defineEmits<{
  (e: 'volver'): void;
  (e: 'procesarImportacion', tipo: number): void;
}>();

const emitirVolver = () => emits('volver');
const emitirProcesar = (tipo: number) => emits('procesarImportacion', tipo);

const mapearTipo = (val: string | number) => {
  const opciones: Record<string, string> = { '1': 'Porcentaje', '2': 'Monto Específico', '3': 'Fórmula' };
  return opciones[String(val)] || String(val);
};

const mapearDestino = (val: string | number) => {
  return String(val) === '1' ? 'Planilla' : 'Finiquito';
};

const columnasEstandar: QTableColumn<BonoEmpresa>[] = [
  { name: 'numero', label: 'N°', align: 'left', field: 'id' },
  { name: 'nombre', label: 'Beneficio', align: 'left', field: 'nombre', sortable: true },
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion' },
  { name: 'tipo', label: 'Tipo', align: 'center', field: row => mapearTipo(row.tipo) },
  { name: 'cantidad', label: 'Cantidad', align: 'right', field: 'cantidad' },
  { name: 'orden', label: 'Orden', align: 'right', field: 'orden', sortable: true },
  { name: 'destino', label: 'Destino', align: 'center', field: row => mapearDestino(row.destino) }
];
</script>