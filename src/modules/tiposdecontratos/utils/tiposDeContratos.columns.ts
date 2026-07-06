import type { QTableColumn } from 'quasar';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

export const obtenerColumnasTiposDeContratos = (t: (key: string) => string): QTableColumn<TipoDeContrato>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {name: 'nombre',
    label: t('tiposdecontratos.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 200px; white-space: normal'
  },
  {name: 'observacion',
    label: t('tables.observation'),
    align: 'left',
    field: 'observacion',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'naturaleza',
    label: t('tiposdecontratos.nature'),
    align: 'left',  field: 'naturaleza',
    style: 'white-space: normal; min-width: 228px;'
  },
  {name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'}
];

export const obtenerColumnasTiposDeContratosEstandar = (t: (key: string) => string): QTableColumn<TipoDeContrato>[] => [
  {name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {name: 'nombre',
    label: t('tiposdecontratos.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 100px; white-space: normal'
  },
  {name: 'observacion',
    label: t('tables.observation'),
    align: 'left',
    field: 'observacion',
    style: 'white-space: normal; min-width: 228px;'
  },
];