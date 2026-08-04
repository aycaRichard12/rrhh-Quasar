<template>
  <q-card>
    <TablaGenerica
      :filas="filasTipadas"
      :columnas="listaColumnas"
      :esta-cargando="props.loading"
      modelo-busqueda="" 
      :columnas-personalizadas="['opciones']"
      @eliminar="(id) => emits('eliminar', Number(id))"
    >
      <template #body-cell-opciones="propsCell">
        <q-td :props="propsCell">
          <q-btn dense round
            color="negative"
            icon="delete_forever"
            @click="emits('eliminar', Number(propsCell.row.id))"
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
import TablaGenerica from 'src/components/core/TablaGenerica.vue'; // <-- Asegúrate de importarla
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';

import { obtenerColumnasFirmasTipoPlanilla } from '../utils/firmasTipoPlanilla.columns';
import type { FirmaTipoPlanilla } from '../types/firmaTipoPlanilla.types';

const { t } = useI18n();
const listaColumnas = computed(() => obtenerColumnasFirmasTipoPlanilla(t));
const filasTipadas = computed(() => props.rows as unknown as FilaBase[]);

const props = defineProps<{
  rows: FirmaTipoPlanilla[];
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: 'eliminar', id: number): void;
}>();

</script>