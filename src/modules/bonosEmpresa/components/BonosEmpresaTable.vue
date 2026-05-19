<!-- <template>
  <q-table
    :rows="props.listaBonosEmpresa"
    :columns="columnas"
    row-key="id"
    :grid="$q.screen.lt.sm"
    flat
    bordered
  >
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-estado="props">
      <q-td :props="props">
        <q-btn
          round
          dense
          :color="String(props.row.estado) === '1' ? 'positive' : 'negative'"
          :icon="String(props.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
          @click="emitirCambiarEstado(props.row.id, props.row.estado)"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn round dense color="info" icon="edit" @click="emitirEditar(props.row.id)" />
        <q-btn round dense color="negative" icon="delete" @click="emitirEliminar(props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template> -->


<template>
  <q-table
    :rows="props.listaBonosEmpresa"
    :columns="columnas"
    row-key="id"
    :grid="$q.screen.lt.sm"
    flat
    bordered
  >
    <!-- SLOTS PARA LA VISTA DE TABLA NORMAL (Escritorio) -->
    <template v-slot:body-cell-numero="props">
      <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
    </template>

    <template v-slot:body-cell-estado="props">
      <q-td :props="props">
        <q-btn
          round
          dense
          :color="String(props.row.estado) === '1' ? 'positive' : 'negative'"
          :icon="String(props.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
          @click="emitirCambiarEstado(props.row.id, props.row.estado)"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-opciones="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn round dense color="info" icon="edit" @click="emitirEditar(props.row.id)" />
        <q-btn round dense color="negative" icon="delete" @click="emitirEliminar(props.row.id)" />
      </q-td>
    </template>

    <!-- SLOT PARA LA VISTA GRID (Móvil) -->
    <template v-slot:item="props">
      <div class="q-pa-xs col-12 col-sm-6 col-md-4">
        <q-card flat bordered>
          <q-card-section class="q-pa-sm">
            
            <!-- Recorremos todas las columnas definidas en tu script -->
            <div 
              v-for="col in props.cols" 
              :key="col.name" 
              class="row q-py-xs items-center"
              style="border-bottom: 1px solid #f5f5f5;"
            >
              <!-- Columna Izquierda: El Título -->
              <div class="col-3 text-weight-bold text-left text-black">
                {{ col.label }}
              </div>

              <!-- Columna Derecha: El Contenido -->
              <div class="col-9 text-left">
                
                <!-- Replicamos la lógica de los slots personalizados para el grid -->
                <template v-if="col.name === 'numero'">
                  {{ props.rowIndex + 1 }}
                </template>

                <template v-else-if="col.name === 'estado'">
                  <q-btn
                    round
                    dense
                    size="sm"
                    :color="String(props.row.estado) === '1' ? 'positive' : 'negative'"
                    :icon="String(props.row.estado) === '1' ? 'thumb_up' : 'thumb_down'"
                    @click="emitirCambiarEstado(props.row.id, props.row.estado)"
                  />
                </template>

                <template v-else-if="col.name === 'opciones'">
                  <div class="q-gutter-xs">
                    <q-btn round dense size="sm" color="info" icon="edit" @click="emitirEditar(props.row.id)" />
                    <q-btn round dense size="sm" color="negative" icon="delete" @click="emitirEliminar(props.row.id)" />
                  </div>
                </template>

                <!-- Comportamiento por defecto para las demás columnas -->
                <template v-else>
                  {{ col.value }}
                </template>

              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const props = defineProps<{
  listaBonosEmpresa: BonoEmpresa[];
}>();

const emits = defineEmits<{
  (e: 'editar', id: string | number): void;
  (e: 'eliminar', id: string | number): void;
  (e: 'cambiarEstado', id: string | number, estado: string | number): void;
}>();

const emitirEditar = (id: string | number) => emits('editar', id);
const emitirEliminar = (id: string | number) => emits('eliminar', id);
const emitirCambiarEstado = (id: string | number, estado: string | number) => emits('cambiarEstado', id, estado);

const mapearTipo = (val: string | number) => {
  const opciones: Record<string, string> = { '1': 'Porcentaje', '2': 'Monto Específico', '3': 'Fórmula' };
  return opciones[String(val)] || String(val);
};

const mapearDestino = (val: string | number) => {
  return String(val) === '1' ? 'Planilla' : 'Finiquito';
};

const columnas: QTableColumn<BonoEmpresa>[] = [
  { name: 'numero', label: 'N°', align: 'left', field: 'id' }, // El field aquí no importa gracias al slot
  { name: 'nombre', label: 'Beneficio', align: 'left', field: 'nombre', sortable: true, style: 'white-space: normal'},
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion', style: 'white-space: normal'},
  { name: 'tipo', label: 'Tipo', align: 'center', field: row => mapearTipo(row.tipo) },
  { name: 'cantidad', label: 'Cantidad', align: 'right', field: 'cantidad' },
  { name: 'orden', label: 'Orden', align: 'right', field: 'orden', sortable: true },
  { name: 'destino', label: 'Destino', align: 'center', field: row => mapearDestino(row.destino) },
  { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
  { name: 'opciones', label: 'Opciones', align: 'center', field: 'id' }
];
</script>