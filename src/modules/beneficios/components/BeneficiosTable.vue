<template>
  <q-card>
    <TablaGenerica
      v-model:modelo-busqueda="filtroInterno"
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="cargando"
    >
    <!-- CUSTOMIZACIÓN DE CABECERAS (ICONOS DE FILTRO) -->
    <!-- Columna: Tipo -->
      <template v-slot:header-cell-tipo="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense icon="filter_alt" size="xs" :color="filtrosActivos['tipo']?.length || orden.campo === 'tipo' ? 'primary' : 'grey-7'">
            <q-badge
              floating rounded
              v-if="filtrosActivos['tipo']?.length || orden.campo === 'tipo'" 
              :color="filtrosActivos['tipo']?.length ? 'negative' : 'primary'" 
            >
              <q-icon 
                v-if="orden.campo === 'tipo'"
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
              @ordenar="(sentido) => ordenarColumna('tipo', sentido) "
              @limpiar="() => limpiarFiltrosColumna('tipo')"
            />
          </q-btn>
        </q-th>
      </template>
      
      <!-- Columna: Cantidad -->
      <template v-slot:header-cell-cantidad="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['cantidad']?.length || orden.campo === 'cantidad' ? 'primary' : 'grey-7'"
          >
            <q-badge floating rounded
              v-if="filtrosActivos['cantidad']?.length || orden.campo === 'cantidad'" 
              :color="filtrosActivos['cantidad']?.length ? 'negative' : 'primary'" 
            >
              <q-icon 
                v-if="orden.campo === 'cantidad'"
                size="10px"
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'"
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[1]!"
              :valores-disponibles="valoresUnicosPorColumna['cantidad'] ?? []"
              :modelo-filtro="filtrosActivos['cantidad'] || []"
              :sentido-orden="orden.campo === 'cantidad' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('cantidad', val)"
              @ordenar="(sentido) => ordenarColumna('cantidad', sentido)"
              @limpiar="() => limpiarFiltrosColumna('cantidad')"
            />
          </q-btn>
        </q-th>
      </template>
  
      <!-- Columna: Destino -->
      <template v-slot:header-cell-destino="propsCell">
        <q-th :props="propsCell">
          {{ propsCell.col.label }}
          <q-btn flat round dense
            icon="filter_alt"
            size="xs"
            :color="filtrosActivos['destino']?.length || orden.campo === 'destino' ? 'primary' : 'grey-7'"
          >
            <q-badge 
              v-if="filtrosActivos['destino']?.length || orden.campo === 'destino'" 
              :color="filtrosActivos['destino']?.length ? 'negative' : 'primary'" 
              floating rounded
            >
              <q-icon 
                v-if="orden.campo === 'destino'" 
                :name="orden.sentido === 'asc' ? 'arrow_upward' : 'arrow_downward'" 
                size="10px" 
              />
            </q-badge>
            <TablaFiltroExcel
              :columna="configuracionFiltros[2]!"
              :valores-disponibles="valoresUnicosPorColumna['destino'] ?? []"
              :modelo-filtro="filtrosActivos['destino'] || []"
              :sentido-orden="orden.campo === 'destino' ? orden.sentido : null"
              @actualizar:filtro="(val) => actualizarFiltro('destino', val)"
              @ordenar="(sentido) => ordenarColumna('destino', sentido)"
              @limpiar="() => limpiarFiltrosColumna('destino')"
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
              :columna="configuracionFiltros[3]!"
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
  import { obtenerColumnasBeneficios } from '../utils/beneficios.columns';
  import TablaGenerica from 'src/components/core/TablaGenerica.vue';
  import TablaFiltroExcel from 'src/components/core/TablaFiltroExcel.vue';
  import type { Beneficio } from '../types/beneficios.types';
  import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);
  const { t } = useI18n();
  
  // Traducimos los datos estrictos al tipo genérico de la tabla de forma segura


  const props = defineProps<{
    listaBeneficios: Beneficio[];
    cargando: boolean;
    filtro: string;
  }>();
    
  const emits = defineEmits<{
    (e: 'editar', id: number): void;
    (e: 'eliminar', id: number): void;
    (e: 'cambiarEstadoRegistro', beneficio: Beneficio): void;
    (e: 'update:filtro', val: string): void;
  }>();
    
  const configuracionFiltros: ConfiguracionColumnaExcel[] = [
    { 
      campo: 'tipo', 
      titulo: t('tables.type'), 
      tipoDato: 'texto',
      opciones: { 1: 'Porcentaje', 2: 'Monto Especifico' }
    },
    { campo: 'cantidad',
      titulo: t('tables.amount'),
      tipoDato: 'numero' },
    { 
      campo: 'destino', 
      titulo: t('tables.destination'), 
      tipoDato: 'texto',
      opciones: { 1: 'Planilla', 2: 'Finiquito' }
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
  } = useFiltroExcel(() => props.listaBeneficios, configuracionFiltros);

  const filtroInterno = computed({
    get: () => props.filtro,
    set: (val: string) => emits('update:filtro', val)
  });
    
  const listaColumnas = computed(() => obtenerColumnasBeneficios(t));
    
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
    
  const emitirCambioEstado = (beneficio: Beneficio): void => {
    emits('cambiarEstadoRegistro', beneficio);
  };
</script>