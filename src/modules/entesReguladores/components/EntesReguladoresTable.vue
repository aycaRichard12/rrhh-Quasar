<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
    >
      <!-- CUSTOMIZACIÓN DE CABECERAS (ICONOS DE FILTRO) -->
      <!-- Columna: Porcentaje -->
      <template v-slot:header-cell-porcentaje="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['porcentaje']?.length || orden.campo === 'porcentaje' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['porcentaje']?.length || orden.campo === 'porcentaje'"
              :color="filtrosActivos['porcentaje']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'porcentaje'"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['porcentaje'] ?? []"
              :modelo-filtro="filtrosActivos['porcentaje'] || []"
              :sentido-orden="orden.campo === 'porcentaje' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('porcentaje', val)"
              @ordenar="(sentido) => ordenarColumna('porcentaje', sentido)"
              @limpiar="() => limpiarFiltrosColumna('porcentaje')"
            />
          </q-btn>
        </q-th>
      </template>

      <!-- Columna: Monto -->
      <template v-slot:header-cell-monto="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['monto']?.length || orden.campo === 'monto' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['monto']?.length || orden.campo === 'monto'"
              :color="filtrosActivos['monto']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'monto'"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[1]!"
              :valores-disponibles="valoresUnicosPorColumna['monto'] ?? []"
              :modelo-filtro="filtrosActivos['monto'] || []"
              :sentido-orden="orden.campo === 'monto' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('monto', val)"
              @ordenar="(sentido) => ordenarColumna('monto', sentido)"
              @limpiar="() => limpiarFiltrosColumna('monto')"
            />
          </q-btn>
        </q-th>
      </template>

      <!-- Columna: Estado -->
      <template v-slot:header-cell-estado="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['estado']?.length || orden.campo === 'estado' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['estado']?.length || orden.campo === 'estado'"
              :color="filtrosActivos['estado']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'estado'"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[2]!"
              :valores-disponibles="valoresUnicosPorColumna['estado'] ?? []"
              :modelo-filtro="filtrosActivos['estado'] || []"
              :sentido-orden="orden.campo === 'estado' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('estado', val)"
              @ordenar="(sentido) => ordenarColumna('estado', sentido)"
              @limpiar="() => limpiarFiltrosColumna('estado')"
            />
          </q-btn>
        </q-th>
      </template>

      <!-- CUSTOMIZACIÓN DE CELDAS (BODY) -->
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">
          {{ propsCell.rowIndex + 1 }}
        </q-td>
      </template>

      <template v-slot:body-cell-estado="propsCell">
        <q-td :props="propsCell" class="text-center">
          <q-btn round dense
            :color="propsCell.row.estado === 1 ? 'primary' : 'negative'"
            :icon="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
            @click="emitirCambioEstado(propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.active') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emitirEditar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round
            icon="delete_forever"
            color="negative"
            @click="emitirEliminar(propsCell.row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import { obtenerColumnasEntesReguladores } from '../utils/entesReguladores.columns';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { EnteRegulador } from '../types/entesReguladores.types';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const { t } = useI18n();

const props = defineProps<{
  listaEntesReguladores: EnteRegulador[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'cambiarEstadoRegistro', ente: EnteRegulador): void;
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'porcentaje',
    titulo: t('entity.percentage'),
    tipoDato: 'numero'
  },
  {
    campo: 'monto',
    titulo: t('tables.amount2'),
    tipoDato: 'numero'
  },
  {
    campo: 'estado',
    titulo: t('tables.status'),
    tipoDato: 'estado',
    opciones: { 1: 'Activo', 2: 'Inactivo' }
  }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaEntesReguladores, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasEntesReguladores(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};

const emitirEditar = (id?: number): void => {
  if (id) emits('editar', id);
};

const emitirEliminar = (id?: number): void => {
  if (id) emits('eliminar', id);
};

const emitirCambioEstado = (ente: EnteRegulador): void => {
  emits('cambiarEstadoRegistro', ente);
};
</script>
