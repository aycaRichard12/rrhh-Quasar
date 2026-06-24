<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="datosFiltrados"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
      <template v-slot:header-cell-sucursal="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['sucursal']?.length || orden.campo === 'sucursal' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['sucursal']?.length || orden.campo === 'sucursal'"
              :color="filtrosActivos['sucursal']?.length ? 'negative' : 'primary'"
            >
              <q-icon
                v-if="orden.campo === 'sucursal' && orden.sentido"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[0]!"
              :valores-disponibles="valoresUnicosPorColumna['sucursal'] ?? []"
              :modelo-filtro="filtrosActivos['sucursal'] || []"
              :sentido-orden="orden.campo === 'sucursal' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('sucursal', val)"
              @ordenar="(sentido) => ordenarColumna('sucursal', sentido)"
              @limpiar="() => limpiarFiltrosColumna('sucursal')"
            />
          </q-btn>
        </q-th>
      </template>
    </TablaGenerica>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel, type ConfiguracionColumnaExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import { obtenerColumnasAreas } from '../utils/areas.columns';
import type { Area } from '../types/areas.types';

const { t } = useI18n();

const props = defineProps<{
  listaAreas: Area[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'update:filtro', val: string): void;
}>();

const mappedAreas = computed(() => {
  return props.listaAreas.map((area) => {
    const text = area.sucursal && typeof area.sucursal === 'object'
      ? `${area.sucursal.nombre ?? area.sucursal.nombre} - ${area.sucursal.region}`
      : '';
    return {
      ...area,
      sucursal: area.sucursal
        ? {
            ...area.sucursal,
            toString() {
              return text;
            },
          }
        : {
            idsucursal: 0,
            nombre: '',
            region: '',
            idregion: 0,
            toString() {
              return '';
            },
          },
    };
  });
});

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  {
    campo: 'sucursal',
    titulo: t('areas.branch'),
    tipoDato: 'texto',
    format: (val: unknown) => {
      if (val && typeof val === 'object') {
        const suc = val as { nombre?: string; region?: string; sucursal?: string };
        const nombre = suc.nombre ?? suc.sucursal ?? '';
        const region = suc.region ?? '';
        return region ? `${nombre} - ${region}` : nombre;
      }
      return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
        ? String(val)
        : '';
    }
  }
];

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(mappedAreas, configuracionFiltros);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasAreas(t));

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};
</script>