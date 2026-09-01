<template>
  <q-card style="width: 100vh">
    <q-card-section class="global-form-header row justify-between">
      <div class="text-h6">{{ esModoEdicion ? $t('convocatorias.edit') : $t('convocatorias.new') }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form @submit="emitirGuardar">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.nombre"
              :label="$t('convocatorias.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense lazy-rules outlined 
              v-model="datosLocales.nvacantes"
              :label="$t('convocatorias.vacancies') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined 
              v-model="datosLocales.fechai"
              type="date"
              :label="$t('date.start') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined 
              v-model="datosLocales.fechaf"
              type="date"
              :label="$t('date.end') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idarea"
              :options="listaAreas"
              option-label="nombre"
              option-value="id"
              :label="$t('areas.name') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-6">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idcargo"
              :options="cargosFiltrados"
              option-label="nombre"
              option-value="id"
              :label="$t('cargos.name') + ' *'"
              :disable="!datosLocales.idarea"
              :rules="[val => !!val || $t('common.rules.required')]"
              >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Seleccione primero un área
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-6">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.publico"           
              :label="$t('convocatorias.public') + ' *'"
              :options="opcionesPublico"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-12">
            <q-input dense outlined 
              v-model="datosLocales.descripcion"
              :label="$t('tables.description') + ' *'"
              type="textarea"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
        </div>
      </q-card-section>
      
      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat :label="$t('common.actions.cancel')" color="negative" v-close-popup />
        <q-btn type="submit" icon="save" :label="$t('common.actions.save')" class="global-btn-page" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<!-- <script setup lang="ts">
import { ref, watch, computed } from 'vue'; // Añadido computed
import type { Convocatoria } from '../types/convocatorias.types';
import type { Area } from 'src/modules/areas/types/areas.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

const props = defineProps<{
  convocatoria: Convocatoria;
  listaAreas: Area[];
  listaCargos: Cargo[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Convocatoria): void;
}>();

const datosLocales = ref<Convocatoria>({ ...props.convocatoria });

// 1. COMPUTED PARA FILTRAR CARGOS
const cargosFiltrados = computed(() => {
  if (!datosLocales.value.idarea) return [];
  return props.listaCargos.filter(
    (cargo) => Number(cargo.idarea) === Number(datosLocales.value.idarea)
  );
});

// 2. UX: LIMPIAR CARGO SI SE CAMBIA EL ÁREA
watch(() => datosLocales.value.idarea, (nuevoIdArea, viejoIdArea) => {
  // Si no es la primera carga y cambiamos a una área diferente
  if (viejoIdArea !== undefined && viejoIdArea !== 0 && nuevoIdArea !== viejoIdArea) {
    datosLocales.value.idcargo = 0; // Opcionamente, podrías dejarlo vacío ''
  }
});

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.convocatoria, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

const opcionesPublico = [
  { label: 'No', value: 1 },
  { label: 'Sí', value: 2 }
];
</script> -->




































<script setup lang="ts">
import { ref, watch, computed} from 'vue';
import type { Convocatoria } from '../types/convocatorias.types';
import type { Area } from 'src/modules/areas/types/areas.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

const props = defineProps<{
  convocatoria: Convocatoria;
  listaAreas: Area[];
  listaCargos: Cargo[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Convocatoria): void;
}>();

const datosLocales = ref<Convocatoria>({ ...props.convocatoria });

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

// watch(() => props.convocatoria, (nuevosDatos) => {
//   datosLocales.value = { ...nuevosDatos };
// }, { deep: true });


const cargosFiltrados = computed(() => {
  return props.listaCargos.filter(
    cargo => Number(cargo.idarea) === Number(datosLocales.value.idarea)
  );
});

watch(
  () => datosLocales.value.idarea,
  (nuevoIdArea) => {
    const cargoActual = props.listaCargos.find(
      cargo => Number(cargo.id) === Number(datosLocales.value.idcargo)
    );

    if (cargoActual && Number(cargoActual.idarea) === Number(nuevoIdArea)) {
      return;
    }

    const primerCargo = props.listaCargos.find(
      cargo => Number(cargo.idarea) === Number(nuevoIdArea)
    );

    datosLocales.value.idcargo = primerCargo
      ? Number(primerCargo.id)
      : 0;
  }
);

const opcionesPublico = [
  { label: 'No', value: 1 },
  { label: 'Sí', value: 2 }
];
</script>