<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :columnas-personalizadas="['estado']"
      :esta-cargando="cargando"
      @editar="(id) => emits('editar', Number(id))"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
			<template
        v-for="config in configuracionFiltros"
        :key="config.campo"
        #[`header-filtro-${config.campo}`]
      >
        <q-btn dense flat round icon="filter_alt" size="xs" :color="filtrosActivos[config.campo]?.length || orden.campo === config.campo ? 'primary' : 'grey-7'">
          <q-badge floating rounded v-if="filtrosActivos[config.campo]?.length || orden.campo === config.campo" :color="filtrosActivos[config.campo]?.length ? 'negative' : 'primary'">
            <q-icon v-if="orden.campo === config.campo && orden.sentido" size="10px" :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"/>
          </q-badge>
          <TablaFiltroExcel
            :columna="config"
            :valores-disponibles="valoresUnicosPorColumna[config.campo] ?? []"
            :modelo-filtro="filtrosActivos[config.campo] || []"
            :sentido-orden="orden.campo === config.campo ? orden.sentido : null"
            @actualizar:filtro="(val) => actualizarFiltro(config.campo, val)"
            @ordenar="(sentido) => ordenarColumna(config.campo, sentido)"
            @limpiar="() => limpiarFiltrosColumna(config.campo)"
          />
        </q-btn>
      </template>

      <template #body-cell-idusuario="propsCell">
        <q-td :props="propsCell">
          {{ obtenerCadenaUsuario(buscarUsuario(propsCell.row.idusuario)) }}
        </q-td>
      </template>

      <template #body-cell-estado="propsCell">
        <q-td :props="propsCell">
          <q-btn round dense
            :color="propsCell.row.estado === 1 ? 'primary' : 'negative'"
            :icon="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
            @click="emitirCambioEstado(propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.active') }}</q-tooltip>
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
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'

import type { Firma, Usuario } from '../types/firmas.types';
import { obtenerColumnasFirmas, obtenerCadenaUsuario } from '../utils/firmas.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasFirmas(t));
const filasTipadas = computed(() =>
  datosFiltrados.value.map(item => ({
    ...item,
    id: item.idfirma
  })) as FilaBase[]
);

const props = defineProps<{
  listaFirmas: Firma[];
  listaUsuarios: Usuario[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
	(e: 'cambiarEstadoRegistro', firma: Firma): void;
  (e: 'update:filtro', val: string): void;
}>();

// const buscarUsuario = (id: string): Usuario | undefined =>
//   props.listaUsuarios.find((u: Usuario) => u.idusuario === id);

// const buscarUsuario = (idusuario: number): Usuario | undefined => {
//   return props.listaUsuarios.find(
//     usuario => {
//       return(usuario.id) === idusuario}
//   );
// };

const buscarUsuario = (idusuario: number): Usuario | undefined => {
  return props.listaUsuarios.find(
    usuario => usuario.id === idusuario
  );
};

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  { 
    campo: 'estado', 
    titulo: t('tables.status'), 
    tipoDato: 'estado',
    opciones: { 1: 'Activo', 2: 'Inactivo' }
  }
];
    
const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const actualizarFiltro = (campo: string, valores: string[]): void => {
  filtrosActivos.value[campo] = valores;
};

const ordenarColumna = (campo: string, sentido: 'asc' | 'desc' | null): void => {
  establecerOrden(campo, sentido);
};

const emitirCambioEstado = (firma: Firma): void => {
  emits('cambiarEstadoRegistro', firma);
};

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaFirmas, configuracionFiltros);
</script>