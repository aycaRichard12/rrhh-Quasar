<template>
  <q-card>
    <q-table flat bordered
      :rows="props.listaAreas"
      :columns="listaColumnas"
      row-key="id"
      :grid="$q.screen.lt.sm"
      table-header-class="bg-primary"
      :rows-per-page-label="t('common.report.recordsPerPage')"
      :pagination-label="(firstRow, endRow, totalRows) => `${firstRow}-${endRow} ${t('common.report.of')} ${totalRows}`"
    >
      <template v-slot:body-cell-numero="propsCell">
        <q-td :props="propsCell">{{ propsCell.rowIndex + 1 }}</q-td>
      </template>
      
      <template v-slot:body-cell-opciones="propsCell">
        <q-td :props="propsCell" class="text-center q-gutter-xs">
          <q-btn round dense icon="edit" color="info" @click="emitirEditar(propsCell.row.id)" />
          <q-btn round dense icon="delete" color="negative" @click="emitirEliminar(propsCell.row.id)" />
        </q-td>
      </template>

      <template v-slot:item="propsGrid">
        <div class="q-pa-xs col-xs-12 col-sm-6">
          <q-card flat bordered class="q-pa-md">
            
            <div class="row items-center justify-between q-mb-sm">

              <div class="row items-center q-gutter-sm col">
                <q-badge
                  color="teal-5"
                  :label="`N° ${propsGrid.rowIndex + 1}`"
                  class="q-pa-sm text-subtitle2 text-weight-bold"
                />
                <div class="text-weight-bold text-subtitle1 q-pr-sm" style="line-height: 1.3;"> {{ propsGrid.row.nombre }} </div>
                </div>

              <q-btn-dropdown 
                flat 
                dense 
                round
                color="grey-7" 
                icon="settings" 
                dropdown-icon="none"
                no-icon-animation
              >
                <q-list style="min-width: 120px" class="q-pa-xs">
                  
                  <q-item 
                    clickable 
                    v-close-popup 
                    @click="emitirEditar(propsGrid.row.id)" 
                    class="bg-blue-5 text-white rounded-borders q-mb-xs q-py-xs q-px-sm row items-center no-wrap"
                  >
                    <q-icon name="edit" size="xs" class="q-mr-sm" />
                    <div class="text-weight-bold text-body2">
                      {{ t('common.actions.edit') }}
                    </div>
                  </q-item>

                  <q-item 
                    clickable 
                    v-close-popup 
                    @click="emitirEliminar(propsGrid.row.id)" 
                    class="bg-red-5 text-white rounded-borders q-py-xs q-px-sm row items-center no-wrap"
                  >
                    <q-icon name="delete" size="xs" class="q-mr-sm" />
                    <div class="text-weight-bold text-body2">
                      {{ t('common.actions.delete') }}
                    </div>
                  </q-item>

                </q-list>
              </q-btn-dropdown>

            </div>
            <q-separator class="q-my-sm" />

            <div class="q-mt-sm">
              <div class="text-caption text-uppercase text-weight-medium">
                {{ t('tables.description') }}
              </div>
              <div class="text-body2 text-grey-7">
                {{ propsGrid.row.descripcion }}
              </div>
            </div>

            <div class="q-mt-md">
              <div class="text-caption text-uppercase text-weight-medium">
                {{ t('areas.form.branch') }}
              </div>
              <div class="text-body2 text-grey-7">
                {{ propsGrid.row.sucursal && typeof propsGrid.row.sucursal === 'object' ? `${propsGrid.row.sucursal.nombre} - ${propsGrid.row.sucursal.region}` : t('areas.form.noBranch') }}
              </div>
            </div>

          </q-card>
        </div>
      </template>

    </q-table>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { obtenerColumnasAreas } from '../utils/areas.columns'
import type { Area } from '../types/areas.types'


const { t } = useI18n()
const $q = useQuasar()

const props = defineProps<{
  listaAreas: Area[]
}>()

const emits = defineEmits<{
  (e: 'editar', id: string): void
  (e: 'eliminar', id: string): void
}>()

const emitirEditar = (id: string) => emits('editar', id)
const emitirEliminar = (id: string) => emits('eliminar', id)

// Inyectamos la función "t" nativa del setup a nuestra utilidad limpia externa
const listaColumnas = computed(() => obtenerColumnasAreas(t))
</script>