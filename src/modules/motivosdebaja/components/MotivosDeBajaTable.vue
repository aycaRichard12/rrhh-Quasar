<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="datosFiltrados"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
    >
      <!-- Columna Header: Tipo -->
      <template v-slot:header-cell-tipo="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['tipo']?.length || orden.campo === 'tipo' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['tipo']?.length || orden.campo === 'tipo'"
              :color="filtrosActivos['tipo']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'tipo' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['tipo'] ?? []"
              :modelo-filtro="filtrosActivos['tipo'] || []"
              :sentido-orden="orden.campo === 'tipo' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('tipo', val)"
              @ordenar="(sentido) => ordenarColumna('tipo', sentido)"
              @limpiar="() => limpiarFiltrosColumna('tipo')"
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

      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn dense round
            class="global-btn-page"
            icon="sym_o_edit_square"
            @click="emits('editar', propsCell.row.id!)"
          >
            <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round
            color="negative"
            icon="delete_forever"
            @click="emits('eliminar', propsCell.row.id!)"
          >
            <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { obtenerColumnasMotivosDeBaja, normalizarTipoMotivo } from '../utils/motivosDeBaja.columns';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { MotivosDeBaja } from '../types/motivosDeBaja.types';

const { t } = useI18n();

const props = defineProps<{
  listaMotivos: MotivosDeBaja[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'tipo',
    titulo: t('reasonLeave.type'),
    tipoDato: 'texto',
    format: normalizarTipoMotivo
  }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaMotivos, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasMotivosDeBaja(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>
