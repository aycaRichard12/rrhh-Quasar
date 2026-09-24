<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :columnas-personalizadas="['opciones']"
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

      <template #body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <!-- 1. Editar -->
          <q-btn dense round class="global-btn-page" icon="sym_o_edit_square" @click="emits('editar', Number(propsCell.row.id))">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.edit') }}</q-tooltip>
          </q-btn>
          
          <!-- 2. Eliminar -->
          <q-btn dense round color="negative" icon="delete_forever" @click="emits('eliminar', Number(propsCell.row.id))">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">{{ $t('common.actions.delete') }}</q-tooltip>
          </q-btn>

          <!-- 3. Calificar Postulante -->
          <q-btn dense round color="warning" icon="star" @click="emits('calificar', propsCell.row)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Calificar Postulante</q-tooltip>
          </q-btn>

          <!-- 4. Agregar Conclusión -->
          <q-btn dense round color="info" icon="post_add" @click="emits('conclusion', propsCell.row)">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Agregar Conclusión</q-tooltip>
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

import type { Postulante } from '../types/postulantes.types';
import { obtenerColumnasPostulantes } from '../utils/postulantes.columns';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasPostulantes(t));
const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const props = defineProps<{
  listaPostulantes: Postulante[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'calificar', fila: Postulante): void; // <-- Nuevo
  (e: 'conclusion', fila: Postulante): void; // <-- Nuevo
  (e: 'update:filtro', val: string): void;
}>();

const configuracionFiltros: ConfiguracionColumnaExcel[] = [
  { 
    campo: 'convocatoria', 
    titulo: t('tables.status'), 
    tipoDato: 'texto'
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


const { 
  filtrosActivos, valoresUnicosPorColumna, datosFiltrados,
  orden, establecerOrden, limpiarFiltrosColumna
} = useFiltroExcel(() => props.listaPostulantes, configuracionFiltros);
</script>