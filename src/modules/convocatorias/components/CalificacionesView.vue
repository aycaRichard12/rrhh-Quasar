<template>
  <div>
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 text-primary q-mb-sm">Datos del Postulante</div>
            <div><strong>Nombre Completo:</strong> {{ postulante?.nombre }} {{ postulante?.apellido }}</div>
            <div><strong>Cédula (CI):</strong> {{ postulante?.ci }}</div>
            <div><strong>Fecha Postulación:</strong> {{ postulante?.fecha }}</div>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle2 text-primary q-mb-sm">Resultados Finales</div>
            <div><strong>Promedio Actual:</strong> {{ Number(postulante?.promedio || 0).toFixed(2) }}</div>
            <div><strong>Conclusión:</strong> {{ postulante?.conclucion || 'En evaluación' }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      
      <TablaGenerica
        v-model:modelo-busqueda="filtroBusqueda"
        :filas="filasTipadas"
        :columnas="listaColumnas"
        :columnas-personalizadas="['estado', 'opciones']"
        :esta-cargando="cargando"
      >
        <template #body-cell-estado="propsCell">
          <q-td :props="propsCell">
            {{ propsCell.row.estado }} / {{ propsCell.row.calificacionmax }}
          </q-td>
        </template>
        
        <template #body-cell-opciones="propsCell">
          <q-td :props="propsCell">
            <q-btn 
              dense round class="global-btn-page" 
              icon="sym_o_visibility" 
              @click="emits('verDetalle', propsCell.row)"
            >
              <q-tooltip>Ver Detalle</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </TablaGenerica>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';
import type { Postulante } from 'src/modules/postulantes/types/postulantes.types';
import type { MetodoEvaluacionResumen } from '../types/convocatorias.types';
import { obtenerColumnasCalificaciones } from '../utils/calificacionesView.columns';

const props = defineProps<{
  postulante: Postulante | null;
}>();

const emits = defineEmits<{
  (e: 'verDetalle', metodo: MetodoEvaluacionResumen): void;
}>();

const listaColumnas = computed(() => obtenerColumnasCalificaciones());
const filtroBusqueda = ref('');
const cargando = ref(false);
const listaMetodos = ref<MetodoEvaluacionResumen[]>([]);
const filasTipadas = computed(() => listaMetodos.value as unknown as FilaBase[]);

const cargarResumenCalificaciones = async () => {
  if (!props.postulante?.id) return;
  cargando.value = true;
  try {
    const { data } = await api.get(`/listacalificacionpostulante/${props.postulante.id}`);
    listaMetodos.value = Array.isArray(data) ? data.map(item => ({
      ...item,
      idevaluacionpostulante: Number(item.idevaluacionpostulante),
      idmetodoevaluacion: Number(item.idmetodoevaluacion),
      calificacionmax: Number(item.calificacionmax),
      sumtotal: Number(item.sumtotal),
      cantnotas: Number(item.cantnotas),
      promedio: Number(item.promedio)
    })) : [];
  } catch (error) {
    console.error(error);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  void cargarResumenCalificaciones();
});
</script>