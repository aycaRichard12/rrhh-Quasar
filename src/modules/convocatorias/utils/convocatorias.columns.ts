import type { QTableColumn } from 'quasar';
import type { Convocatoria } from '../types/convocatorias.types';

export const obtenerColumnasConvocatorias = (t: (key: string) => string): QTableColumn<Convocatoria>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('convocatorias.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 150px; white-space: normal'
  },
  {
    name: 'descripcion',
    label: t('tables.description'),
    align: 'left',
    field: 'descripcion',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'fechai',
    label: t('date.start'),
    align: 'center',
    field: 'fechai',
    style: 'width: 50px; white-space: normal'
  },
  {
    name: 'fechaf',
    label: t('date.end'),
    align: 'center',
    field: 'fechaf',
    style: 'width: 50px; white-space: normal'
  },
  {
    name: 'nvacantes',
    label: t('convocatorias.vacancies'),
    align: 'right',
    field: 'nvacantes',
    style: 'width: 10px'
  },
  {
    name: 'cargo',
    label: t('cargos.name'),
    align: 'center',
    field: 'cargo',
    style: 'width: 100px; white-space: normal'
  },
  {
    name: 'estado',
    label: t('tables.status'),
    align: 'center',
    field: 'estado',
    style: 'width: 30px'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];