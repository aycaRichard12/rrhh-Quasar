<template>
  <div class="texto-expandible-contenedor">
    <div
      ref="cajaTexto"
      :class="{ 'texto-limitado': !expandido }"
    >
      {{ props.texto }}
    </div>

    <q-btn dense flat no-caps
      v-if="estaDesbordado"
      color="primary"
      class="q-mt-xs q-pa-none"
      :label="expandido ? 'Ver menos' : 'Ver más...'"
      @click="expandido = !expandido"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  texto: string;
}>();

const cajaTexto = ref<HTMLElement | null>(null);
const expandido = ref(false);
const estaDesbordado = ref(false);

// Variable para guardar el observador nativo del navegador
let observador: ResizeObserver | null = null;

// La magia de la medición del DOM
const verificarDesborde = (): void => {
  if (!cajaTexto.value) return;

  // Si ya está expandido, no necesitamos calcular porque no hay límite
  if (expandido.value) return;

  // scrollHeight = Altura total del texto (incluso lo oculto)
  // clientHeight = Altura visible de la caja (limitada a 3 líneas)
  estaDesbordado.value = cajaTexto.value.scrollHeight > cajaTexto.value.clientHeight;
};

onMounted(() => {
  // El ResizeObserver vigila si la caja cambia de tamaño (ej. si el usuario voltea el celular o maximiza la ventana)
  observador = new ResizeObserver(verificarDesborde);
  
  if (cajaTexto.value) {
    observador.observe(cajaTexto.value);
  }
});

onBeforeUnmount(() => {
  // Limpieza vital para evitar fugas de memoria
  if (observador) {
    observador.disconnect();
  }
});
</script>

<style scoped>
.texto-limitado {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  /* transition opcional para suavizar, pero en tablas es mejor dejarlo estricto */
}
</style>