import type { QTableColumn } from 'quasar';
import type { Firma } from '../types/firmas.types';

export const obtenerColumnasFirmas = (t: (key: string) => string): QTableColumn<Firma>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('firmas.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 200px; white-space: normal'
  },
  {
    name: 'apellido',
    label: t('firmas.name'),
    align: 'left',
    field: 'apellido',
    style: 'width: 200px; white-space: normal'

  },
  {
    name: 'ci',
    label: 'C.I',
    align: 'center',
    field: 'ci',
    style: 'width: 80px'
  },
  {
    name: 'cargo',
    label: t('firmas.role'),
    align: 'center',
    field: 'cargo',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'estado',
    label: t('estado'),
    align: 'left',
    field: 'estado',
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