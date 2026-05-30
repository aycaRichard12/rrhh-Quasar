<template>
  <q-card>
    <q-table flat bordered
      row-key="id"
      :rows="props.listaBonosEmpresa"
      :columns="listaColumnas"
      :grid="$q.screen.lt.sm"
      table-header-class="bg-primary"
      :rows-per-page-label="$t('table.recordsPerPage', 'Registros por página:')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('table.of', 'de')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>

      <template v-slot:body-cell-tipo="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-chip dense outline color="primary">
            {{ propsCell.row.tipo === '1' || propsCell.row.tipo === 1 ? 'Porcentaje' : propsCell.row.tipo === '2' || propsCell.row.tipo === 2 ? 'Monto Específico' : 'Fórmula' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-destino="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-chip dense outline color="primary">
            {{ propsCell.row.destino === '1' || propsCell.row.destino === 1 ? 'Planilla' : 'Finiquito' }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
      <q-td :props="propsCell" class="text-center">
        <q-btn dense round
          :color="String(propsCell.row.estado) === '1' ? 'positive' : 'negative'"
          :icon="String(propsCell.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
          @click="$emit('cambiarEstadoBonoEmpresa', propsCell.row)"
        >
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ $t('common.actions.active') }}
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="propsCell">
      <q-td :props="propsCell" class=" text-center q-gutter-sm">
        <q-btn round dense color="info" icon="edit" @click="emitirEditar(propsCell.row.id)" />
        <q-btn round dense color="negative" icon="delete" @click="emitirEliminar(propsCell.row.id)" />
      </q-td>
    </template>
  </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { obtenerColumnasBonosEmpresa } from '../utils/bonosEmpresa.columns';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const { t } = useI18n();
const $q = useQuasar();

const props = defineProps<{
  listaBonosEmpresa: BonoEmpresa[];
}>();

const emits = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
  (e: 'cambiarEstadoBonoEmpresa', bonoEmpresa: BonoEmpresa): void;
}>();

const emitirEditar = (id: string) => emits('editar', id);
const emitirEliminar = (id: string) => emits('eliminar', id);

const listaColumnas = computed(() => obtenerColumnasBonosEmpresa(t))


// const mapearTipo = (val: string | number) => {
//   const opciones: Record<string, string> = { '1': 'Porcentaje', '2': 'Monto Específico', '3': 'Fórmula' };
//   return opciones[String(val)] || String(val);
// };

// const mapearDestino = (val: string | number) => {
//   return String(val) === '1' ? 'Planilla' : 'Finiquito';
// };
</script>