<template>
  <q-card style="width: 900px; max-width: 95vw;">
    <q-card-section class="global-form-header row justify-between items-center">
      <div class="text-h6">
        Detalle: {{ metodo?.metodo || 'Desconocido' }}
      </div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>

      <TablaGenerica
        v-model:modelo-busqueda="filtroBusqueda"
        :filas="filasTipadas"
        :columnas="listaColumnas"
        :esta-cargando="cargando"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import TablaGenerica from 'src/components/core/TablaGenerica.vue';
import type { FilaBase } from 'src/components/core/TablaGenerica.vue';
import type { MetodoEvaluacionResumen } from '../types/convocatorias.types';
import type { CalificacionPostulante } from 'src/modules/postulantes/types/postulantes.types';
import { obtenerColumnasDetalle } from '../utils/detalleCalificacionesDialog.columns';
import { postulantesService } from 'src/modules/postulantes/services/postulantes.service';

const props = defineProps<{
  metodo: MetodoEvaluacionResumen | null;
}>();

const filtroBusqueda = ref('');
const cargando = ref(false);
const listaDetalles = ref<CalificacionPostulante[]>([]);

// Generamos las columnas enviándole la calificación máxima al título
const listaColumnas = computed(() => 
  obtenerColumnasDetalle(props.metodo?.calificacionmax || 0)
);

const filasTipadas = computed(() => listaDetalles.value as unknown as FilaBase[]);

// const cargarDetalles = async () => {
//   if (!props.metodo?.idevaluacionpostulante) return;
//   cargando.value = true;
//   try {
//     listaDetalles.value = await postulantesService.listarCalificaciones(props.metodo.idevaluacionpostulante);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     cargando.value = false;
//   }
// };

const cargarDetalles = async () => {
  if (!props.metodo?.idevaluacionpostulante || !props.metodo?.idmetodoevaluacion) return;
  cargando.value = true;
  
  try {
    const respuesta = await postulantesService.listarCalificaciones(props.metodo.idevaluacionpostulante);
    
    // Filtrar estrictamente por el idmetodoevaluacion del método seleccionado
    listaDetalles.value = respuesta.filter(
      (item) => Number(item.idmetodoevaluacion) === Number(props.metodo?.idmetodoevaluacion)
    );
  } catch (error) {
    console.error(error);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  void cargarDetalles();
});



watch(() => props.metodo?.idevaluacionpostulante, (nuevoId) => {
  if (nuevoId) void cargarDetalles();
});
</script>