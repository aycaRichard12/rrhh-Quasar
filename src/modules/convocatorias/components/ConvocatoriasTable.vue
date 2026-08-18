<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :columnas-personalizadas="['estado', 'opciones']"
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

      <template #body-cell-estado="propsCell">
        <q-td :props="propsCell">

					<q-chip dense square
						v-if="propsCell.row.estado === 3"
						class="global-btn-page"
					>
						{{ $t('convocatorias.status.finished', 'Finalizado') }}
						<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
							{{ $t('convocatorias.status.finishedTooltip', 'Convocatoria concluida') }}
						</q-tooltip>
					</q-chip>

          <q-btn v-else round dense
            :color="propsCell.row.estado === 1 ? 'primary' : 'negative'"
            :icon="propsCell.row.estado === 1 ? 'thumb_up' : 'thumb_down'"
            @click="emitirCambioEstado(propsCell.row)"
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
							{{ propsCell.row.estado === 1 ? $t('common.actions.asset') : $t('common.actions.idle')}}
						</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #body-cell-opciones="propsCell">
        <q-td :props="propsCell">
          <template v-if="propsCell.row.estado === 1" >
            <q-btn dense round color="info" icon="free_cancellation"  /> <!--  @click="concluirConvocatoria(propsCell.row.id)" -->
            <q-btn dense round class="global-btn-page" icon="sym_o_tv_options_edit_channels"  /> <!-- @click="prerrequisitos(propsCell.row.id)" -->
          </template>

          <template v-else-if="propsCell.row.estado === 2">
            <q-btn dense round class="global-btn-page" icon="sym_o_edit_square" @click="emits('editar', Number(propsCell.row.id))" 
          >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn dense round color="negative" icon="delete_forever" @click="emits('eliminar', Number(propsCell.row.id))" >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>
            <q-btn dense round class="global-btn-page" icon="sym_o_tv_options_edit_channels" color="positive"  > <!--  @click="prerrequisitos(propsCell.row.id)" -->
              <q-tooltip>Mostrar Prerrquisitos</q-tooltip>
            </q-btn>
          </template>

          <template v-else-if="propsCell.row.estado === 3">
            <q-btn dense round class="global-btn-page" icon="sym_o_group" color="positive" > <!-- @click="postulantes(propsCell.row.id)" -->
              <q-tooltip>Postulantes (Resultados)</q-tooltip>
            </q-btn>
          </template>
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

import type { Convocatoria } from '../types/convocatorias.types';
import { obtenerColumnasConvocatorias } from '../utils/convocatorias.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasConvocatorias(t));
const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const props = defineProps<{
  listaConvocatorias: Convocatoria[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'cambiarEstadoRegistro', convocatoria: Convocatoria): void;
  (e: 'update:filtro', val: string): void;
  //(e: 'gestionarFirmas', firma: Firma): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  { 
    campo: 'estado', 
    titulo: t('tables.status'), 
    tipoDato: 'estado',
    opciones: { 1: 'Activo', 2: 'Inactivo', 3: 'Finalizado' }
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

const emitirCambioEstado = (convocatoria: Convocatoria): void => {
  emits('cambiarEstadoRegistro', convocatoria);
};

const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaConvocatorias, configuracionFiltros);
</script>