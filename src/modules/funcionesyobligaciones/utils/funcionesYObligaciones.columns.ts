import type { QTableColumn } from 'quasar';
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';

export const obtenerColumnasFuncionesYObligaciones = (t: (key: string) => string): QTableColumn<FuncionYObligacion>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('funcionesyobligaciones.name'),
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
    align: 'left',
    field: 'cargo',
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 110px'
  }
]