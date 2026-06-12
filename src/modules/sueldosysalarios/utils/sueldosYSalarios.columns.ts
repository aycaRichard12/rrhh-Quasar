import type { QTableColumn } from 'quasar';
import type { SueldosYSalarios } from '../types/sueldosYSalarios.types';

export const obtenerColumnasSueldosYSalarios = (t: (key: string) => string): QTableColumn<SueldosYSalarios>[] => [
  { name: 'nombre', label: t('Nombre'), align: 'left', field: 'nombre', sortable: true },
  { name: 'cargo', label: t('Cargo'), align: 'left', field: 'cargo', sortable: true },
  { name: 'ci', label: 'CI', align: 'left', field: 'ci', sortable: true },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];
