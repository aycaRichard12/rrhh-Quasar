import type { QTableColumn } from "quasar";
import type {BonoEmpresa } from "../types/bonosEmpresa.types";

export const obtenerColumnasBonosEmpresa = (t: (key: string) => string): QTableColumn<BonoEmpresa>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('bonosempresa.name'),
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
    name: 'tipo',
    label: t('tables.type'),
    align: 'center',
    field: 'tipo',
    style: 'width: 100px',
  },
  {
    name: 'cantidad',
    label: t('tables.amount'),
    align: 'right',
    field: 'cantidad',
    style: 'width: 80px',
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px',
  },
  {
    name: 'destino',
    label: 'Destino',
    align: 'center',
    field: 'destino',
    style: 'width: 100px',
  },
  {
    name: 'estado',
    label: t('tables.status'),
    align: 'center',
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
]

export const obtenerColumnasBonosEmpresaEstandar = (t: (key: string) => string): QTableColumn<BonoEmpresa>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('bonosempresa.name'),
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
    name: 'tipo',
    label: 'tables.type',
    align: 'center',
    field: 'tipo',
    style: 'width: 100px',
  },
  {
    name: 'cantidad',
    label: 'tables.amount',
    align: 'right',
    field: 'cantidad',
    style: 'width: 80px',
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px',
  },
  {
    name: 'destino',
    label: 'Destino',
    align: 'center',
    field: 'destino',
    style: 'width: 100px',
  }
];