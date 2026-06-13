<template>
  <q-table bordered flat
    row-key="id"
    class="global-table-header"
    :rows="listaFuncionesYObligaciones"
    :columns="columnas"
    :filter="filtro"
    :rows-per-page-label="$t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${$t('common.report.of')} ${totalRows}`"
  >
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn dense flat round
          class="global-btn-page"
          icon="sym_o_edit_square"
          @click="emit('editar', String(props.row.id))"
        >
          <q-tooltip>{{ t('common.editar') }}</q-tooltip>
        </q-btn>
        
        <q-btn dense round
          color="negative"
          icon="delete_forever"
          @click="emit('eliminar', String(props.row.id))"
        >
          <q-tooltip>{{ t('common.eliminar') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template v-slot:body-cell-descripcion="props">
      <q-td :props="props">
        <div
          :class="{ 'ellipsis-3-lines': !descripcionesExpandidas[props.row.id] }"
          style="white-space: normal; transition: all 0.3s ease;"
        >
          {{ props.row.descripcion }}
        </div>
        
        <div
          v-if="props.row.descripcion && props.row.descripcion.length > 90"
          class="text-primary text-caption cursor-pointer q-mt-xs text-weight-bold"
          @click="alternarDescripcion(props.row.id)"
        >
          {{ descripcionesExpandidas[props.row.id] ? 'Ver menos' : 'Ver más...' }}
        </div>
      </q-td>
    </template>

    
  </q-table>
</template>

<script setup lang="ts">
import { computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';
import { obtenerColumnasFuncionesYObligaciones } from '../utils/funcionesYObligaciones.columns';

defineProps<{
  listaFuncionesYObligaciones: FuncionYObligacion[];
  filtro: string;
}>();

const emit = defineEmits<{
  (e: 'editar', id: string): void;
  (e: 'eliminar', id: string): void;
}>();

const { t } = useI18n();
const columnas = computed(() => obtenerColumnasFuncionesYObligaciones(t));

// 🌟 NUEVO: Control de descripciones expandidas usando un Diccionario (Record)
// Guardará el estado así: { 'id123': true, 'id456': false }
const descripcionesExpandidas = ref<Record<string, boolean>>({});

const alternarDescripcion = (id?: string) => {
  if (!id) return;
  descripcionesExpandidas.value[id] = !descripcionesExpandidas.value[id];
};
</script>