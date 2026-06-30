import type { QTableColumn } from "quasar";
import type { Baja } from "../types/bajas.types";
import { normalizarTipoMotivo } from 'src/modules/motivosdebaja/utils/motivosDeBaja.columns';

export const obtenerColumnasBajas = (t: (key: string) => string): QTableColumn<Baja>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 47px'
  },
  {
    name: 'fecha',
    label: t('date.registration'),
    align: 'center',
    field: 'fecha',
    style: 'width: 100px;'
  },
  {
    name: 'fechai',
    label: t('date.start'),
    align: 'center',
    field: 'fechai',
    style: 'width: 100px;'
  },
  {
    name: 'fechaf',
    label: t('date.end'),
    align: 'center',
    field: 'fechaf',
    style: 'width: 100px;'
  },
  {
    name: 'cargo',
    label: t('cargos.name'),
    align: 'center',
    field: 'cargo',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'nombre',
    label: t('person.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'apellido',
    label: t('person.lastname'),
    align: 'left',
    field: 'apellido',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'ci',
    label: t('C.I'),
    align: 'center',
    field: 'ci',
    style: 'width: 100px;'
  },
  {
    name: 'motivo',
    label: t('motivosdebaja.name'),
    align: 'center',
    field: 'motivo',
    style: 'width: 100px;'
  },
  {
    name: 'obervacion',
    label: t('tables.observation'),
    align: 'left',
    field: 'observacion',
    style: 'white-space: normal; min-width: 228px;'
  },
  
  {
    name: 'tipo',
    label: t('tables.type'),
    align: 'center',
    field: 'tipo',
    style: 'width: 100px;',
    format: normalizarTipoMotivo
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px;'
  }
];