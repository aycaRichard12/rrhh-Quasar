import type { QTableColumn } from 'quasar';
import type { Cargo } from '../types/cargos.types';

export const obtenerColumnasCargos = (t: (key: string) => string): QTableColumn<Cargo>[] => [
  { name: 'numero',      label: 'N°', align: 'center', field: () => '', style: 'width: 50px' },
  { name: 'cargo',       label: t('cargos.form.cargo'), align: 'left', field: 'cargo', style: 'white-space: normal; min-width: 150px' },
  { name: 'salario',     label: t('cargos.form.salary'), align: 'right', field: 'salario', style: 'width: 100px' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'white-space: normal' },
  { name: 'area',        label: t('cargos.form.area'), align: 'center', field: 'area', style: 'white-space: normal; width: 150px' },
  { name: 'opciones',    label: t('tables.options'), align: 'center', field: () => '', style: 'width: 100px' }
];