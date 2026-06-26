<template>
  <TablaGenerica
    v-model:modelo-busqueda="filtroInterno"
    :filas="filasTipadas"
    :columnas="listaColumnas"
    :esta-cargando="cargando"
    @editar="(id) => emits('editar', Number(id))"
    @eliminar="(id) => emits('eliminar', Number(id))"
  >
    <template #body-cell-opciones="propsCell">
      <q-td :props="propsCell" class="q-gutter-sm">

        <q-btn
          dense
          round
          class="global-btn-page"
          icon="sym_o_edit_square"
          @click="emits('editar', propsCell.row.id!)"
        >
          <q-tooltip>{{ $t('common.actions.edit') }}</q-tooltip>
        </q-btn>

        <q-btn
          dense
          round
          color="negative"
          icon="delete_forever"
          @click="emits('eliminar', propsCell.row.id!)"
        >
          <q-tooltip>{{ $t('common.actions.delete') }}</q-tooltip>
        </q-btn>

        <q-btn
          dense
          round
          color="info"
          icon="history"
          @click="emits('historial', propsCell.row)"
        >
          <q-tooltip>{{ $t('common.actions.history') }}</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </TablaGenerica>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFiltroExcel } from 'src/composables/core/useFiltroExcel';
import TablaGenerica from 'src/components/core/TablaGenerica.vue'; // Ajusta la ruta a tu tabla
import { obtenerColumnasTrabajadores } from '../utils/trabajadores.columns';
import type { Trabajador } from '../types/trabajadores.types';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue'
  
  const filasTipadas = computed(() => datosFiltrados.value as unknown as FilaBase[]);

const props = defineProps<{
  listaTrabajadores: Trabajador[];
  cargando: boolean;
  filtro: string;
}>();

const emits = defineEmits<{
  (e: 'editar', id: number): void;
  (e: 'eliminar', id: number): void;
  (e: 'historial', trabajador: Trabajador): void;
  (e: 'update:filtro', val: string): void;
}>();

const { t } = useI18n();

const { datosFiltrados } = useFiltroExcel(() => props.listaTrabajadores, []);

const filtroInterno = computed({
  get: () => props.filtro,
  set: (val: string) => emits('update:filtro', val)
});

const listaColumnas = computed(() => obtenerColumnasTrabajadores(t));
</script>