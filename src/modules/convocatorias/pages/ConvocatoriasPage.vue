<template>
  <q-page>
    <div class="lt-sm">
      <div class="row justify-left">
        <h4 class="q-my-none text-primary">{{ $t('convocatorias.title') }}</h4>
      </div>
      <div class="row justify-left">
        <p class="text-grey-7">{{ $t('convocatorias.subtitle') }}</p>
      </div>
    </div>

    <q-card-section class="row no-wrap justify-between items-center q-gutter-x-sm">
      <!-- <template > -->
        <q-btn
          class="global-btn-page"
          icon="sym_o_add_notes"
          size="15px"
          :label="$q.screen.lt.sm ? '' : $t('convocatorias.new')"
          :round="$q.screen.lt.sm"
          @click="prepararNuevaConvocatoria"
        />
        <div class="row no-wrap q-gutter-x-sm items-center col-grow justify-end">
          <BuscadorGlobal v-model="filtroBusqueda" class="col-grow" style="max-width: 300px" />
        </div>
      <!-- </template> -->

    </q-card-section>
    
    <div >
      <ConvocatoriasTable
        v-model:filtro="filtroBusqueda"
        :cargando="cargando"
        :lista-convocatorias="listaConvocatorias"
        @editar="prepararEdicionConvocatoria"
        @eliminar="confirmarEliminarConvocatoria"
        @cambiar-estado-registro="cambiarEstadoRegistro"
      />
    </div>

    <q-dialog v-model="esVisibleDialogo">
      <ConvocatoriasForm
        :convocatoria="convocatoriaActual"
        :lista-areas="listaAreas"
        :lista-cargos="listaCargos"
        :es-modo-edicion="esModoEdicion"
        @guardar="guardarConvocatoria"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import BuscadorGlobal from 'src/components/core/BuscadorGlobal.vue';

import { useConvocatorias } from '../composables/useConvocatorias';
import ConvocatoriasForm from '../components/ConvocatoriasForm.vue';
import ConvocatoriasTable from '../components/ConvocatoriasTable.vue';
import { useAreas } from 'src/modules/areas/composables/useAreas';
import { useCargos } from 'src/modules/cargos/composables/useCargos';

// const prepararNuevaConvocatoria = () => {
//   nuevaConvocatoria(Number(listaAreas.value[0]?.id ?? 0), Number(listaCargos.value[0]?.id ?? 0));
// };

const prepararNuevaConvocatoria = () => {
  const primeraArea = listaAreas.value[0];

  if (!primeraArea) {
    nuevaConvocatoria(0, 0);
    return;
  }

  const idArea = Number(primeraArea.id);

  const primerCargo = listaCargos.value.find(
    cargo => Number(cargo.idarea) === idArea
  );

  const idCargo = primerCargo ? Number(primerCargo.id) : 0;

  nuevaConvocatoria(idArea, idCargo);
};

const {
  listaConvocatorias, convocatoriaActual,
  cargando, filtroBusqueda, esModoEdicion,  esVisibleDialogo,
  cargarConvocatorias, nuevaConvocatoria,
  guardarConvocatoria, prepararEdicionConvocatoria, confirmarEliminarConvocatoria,
  cambiarEstadoRegistro,
} = useConvocatorias();

const {
  listaAreas, cargarAreas
} = useAreas();

const {
  listaCargos, cargarCargos
} = useCargos();

onMounted(() => {
  void cargarConvocatorias();
  void cargarAreas();
  void cargarCargos();
});
</script>