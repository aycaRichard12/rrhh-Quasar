import type { QTableColumn } from 'quasar';
import type { Cargo } from '../types/cargos.types';

export const obtenerColumnasCargos = (t: (key: string) => string): QTableColumn<Cargo>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'cargo',
    label: t('cargos.name'),
    align: 'left',
    field: 'cargo',
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
    name: 'area',
    label: t('areas.name'),
    align: 'center',
    field: 'area',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'salario',
    label: t('cargos.salary'),
    align: 'right',
    field: 'salario',
    style: 'width: 50px'
  },
  { 
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];