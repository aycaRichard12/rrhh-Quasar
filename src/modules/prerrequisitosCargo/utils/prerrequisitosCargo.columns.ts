import type { QTableColumn } from 'quasar';
import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';

export const obtenerColumnasPrerrequisitos = (t: (key: string) => string): QTableColumn<PrerrequisitoCargo>[] => [
  { name: 'numero',      label: 'N°', align: 'center', field: () => '', style: 'width: 50px' },
  { name: 'nombre',      label: t('prerrequisitos.form.name'), align: 'left', field: 'nombre', style: 'white-space: normal; min-width: 150px' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'white-space: normal' },
  { name: 'cargo',       label: t('prerrequisitos.form.cargo'), align: 'center', field: 'cargo', style: 'white-space: normal; width: 150px' },
  { name: 'opciones',    label: t('tables.options'), align: 'center', field: () => '', style: 'width: 100px' }
];