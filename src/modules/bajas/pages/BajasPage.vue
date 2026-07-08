<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('bajas.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('bajas.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <q-btn
        class="global-btn-page"
        icon="sym_o_add_notes"
        size="15px"
        :label="$q.screen.lt.sm ? '' : $t('bajas.new')"
        :round="$q.screen.lt.sm"
        @click="prepararNuevaBaja"
      />
      <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
        <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
      </div>
    </q-card-section>

    <div>
      <BajasTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-bajas="listaBajas"
        @editar="prepararEdicionBaja"
        @eliminar="confirmarEliminarBaja"
      />
    </div>
    <!-- Diálogos -->
    <q-dialog v-model="esVisibleDialogo">
      <BajasForm
				v-model:input-dias="inputDias"
        :baja="bajaActual"
        :lista-motivos="listaMotivos"
        :es-modo-edicion="esModoEdicion"
				:es-motivo-definitivo="esMotivoDefinitivo"
        @guardar="guardarBaja"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useBajas } from '../composables/useBajas.js';
import { useMotivosDeBaja } from 'src/modules/motivosdebaja/composables/useMotivosDeBaja.js';
import BajasForm from '../components/BajasForm.vue';
import BajasTable from '../components/BajasTable.vue';

const prepararNuevaBaja = () => {
  nuevaBaja(Number(listaMotivos.value[0]?.id ?? 0));
};

const {
  listaBajas, bajaActual,
  cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
	inputDias, esMotivoDefinitivo,
  cargarBajas, guardarBaja, nuevaBaja,
  prepararEdicionBaja, confirmarEliminarBaja,
} = useBajas();

const {
	listaMotivos,
	cargarMotivosDeBaja,
} = useMotivosDeBaja();

onMounted(() => {
  void cargarBajas();
  void cargarMotivosDeBaja();
});
</script>