import type { QTableColumn } from 'quasar';
import type { FirmaTipoPlanilla } from '../types/firmaTipoPlanilla.types';

export const obtenerColumnasFirmasTipoPlanilla = (t: (key: string) => string): QTableColumn<FirmaTipoPlanilla>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombrePlanilla',
    label: t('Planilla'),
    align: 'left',
    field: 'nombrePlanilla',
    style: 'white-space: normal'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];