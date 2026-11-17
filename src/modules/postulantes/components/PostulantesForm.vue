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
              :label="$t('nombre') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-6">
            <q-input dense lazy-rules outlined 
              v-model="datosLocales.apellido"
              :label="$t('apellidos') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense lazy-rules outlined 
              v-model="datosLocales.ci"
              :label="$t('ci') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.telefono"
              :label="$t('telefono') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-4">
            <q-input dense outlined 
              v-model="datosLocales.fecha"
              type="date"
              :label="$t('date.start') + '*'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          <div class="col-5">
          <q-file 
              dense 
              outlined 
              v-model="datosLocales.cv"
              :label="$t('CV') + ' *'"
              accept=".pdf"
              clearable
          >
              <template v-slot:prepend>
              <q-icon name="picture_as_pdf" />
              </template>
          </q-file>
          </div>
          <!-- :rules="[val => !!val || $t('common.rules.required')]" -->
          <div class="col-7">
            <q-input autofocus dense lazy-rules outlined 
              v-model="datosLocales.email"
              :label="$t('email') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            />
          </div>
          
          <div class="col-12">
            <q-select dense outlined emit-value map-options
              v-model="datosLocales.idconvocatoria"
              :options="convocatoriasActivas" 
              option-label="nombre"
              option-value="id"
              :label="$t('convocatorias') + ' *'"
              :rules="[val => !!val || $t('common.rules.required')]"
            >
              <!-- Mensaje si no hay convocatorias activas -->
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay convocatorias activas
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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

<script setup lang="ts">
import { ref, watch, computed} from 'vue';
import type { Postulante } from '../types/postulantes.types';
import type { Convocatoria } from 'src/modules/convocatorias/types/convocatorias.types';

const props = defineProps<{
  postulante: Postulante;
  listaConvocatorias: Convocatoria[];
  esModoEdicion: boolean;
}>();

const emits = defineEmits<{
  (e: 'guardar', datos: Postulante): void;
}>();

const datosLocales = ref<Postulante>({ ...props.postulante });

  // 🌟 1. COMPUTED: Filtrar para mostrar SOLO convocatorias activas (estado === 1)
const convocatoriasActivas = computed(() => {
  return props.listaConvocatorias.filter(c => Number(c.estado) === 1);
});

// 🌟 2. UX y FormData: Auto-llenar el nombre de la convocatoria para enviarlo al backend
watch(() => datosLocales.value.idconvocatoria, (nuevoId) => {
  const conv = props.listaConvocatorias.find(c => Number(c.id) === Number(nuevoId));
  if (conv) {
    datosLocales.value.convocatoria = conv.nombre;
  }
});

const emitirGuardar = () => {
  emits('guardar', datosLocales.value);
};

watch(() => props.postulante, (nuevosDatos) => {
  datosLocales.value = { ...nuevosDatos };
}, { deep: true });

</script>