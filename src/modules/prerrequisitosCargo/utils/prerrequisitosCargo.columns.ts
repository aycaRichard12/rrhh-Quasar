import type { QTableColumn } from 'quasar';
import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';

export const obtenerColumnasPrerrequisitosCargo = (t: (key: string) => string): QTableColumn<PrerrequisitoCargo>[] => [
  { 
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  { 
    name: 'nombre',
    label: t('prerrequisitos.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 200px; white-space: normal'
  },
  { 
    name: 'descripcion',
    label: t('tables.description'),
    align: 'left',
    field: 'descripcion',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'cargo',
    label: t('cargos.name'),
    align: 'center',
    field: 'cargo',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];