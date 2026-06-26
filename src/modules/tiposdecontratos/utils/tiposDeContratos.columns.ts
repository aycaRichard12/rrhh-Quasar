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
    style: 'white-space: pre'
  },
  {name: 'observacion',
    label: t('tiposdecontratos.observation'),
    align: 'left',
    field: 'observacion',
    style: 'min-width:210px; white-space: normal'
  },
  {
    name: 'naturaleza',
    label: t('tiposdecontratos.nature'),
    align: 'left',  field: 'naturaleza',
    style: 'min-width:210px; white-space: normal'
  },
  {name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 110px'}
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
    style: 'width: 153px'
  },
  {name: 'observacion',
    label: t('tiposdecontratos.observation'),
    align: 'left',
    field: 'observacion',
    style: 'min-width:210px; white-space: normal'
  },
];