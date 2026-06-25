<template>
  <q-card shadow-2 rounded>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
    >
      <!-- Columna: Nivel -->
      <template v-slot:header-cell-nivel="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['nivel']?.length || orden.campo === 'nivel' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['nivel']?.length || orden.campo === 'nivel'"
              :color="filtrosActivos['nivel']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'nivel' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['nivel'] ?? []"
              :modelo-filtro="filtrosActivos['nivel'] || []"
              :sentido-orden="orden.campo === 'nivel' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('nivel', val)"
              @ordenar="(sentido) => ordenarColumna('nivel', sentido)"
              @limpiar="() => limpiarFiltrosColumna('nivel')"
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
import { obtenerColumnasTiposDeSanciones } from '../utils/tiposDeSanciones.columns';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { TiposDeSanciones } from '../types/tiposDeSanciones.types';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const { t } = useI18n();

const props = defineProps<{
  listaTiposDeSanciones: TiposDeSanciones[];
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
    campo: 'nivel',
    titulo: t('niveles.name'),
    tipoDato: 'texto'
  }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaTiposDeSanciones, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasTiposDeSanciones(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>
