import type { QTableColumn } from "quasar";
import type { Beneficio } from "../types/beneficios.types";

export const obtenerColumnasBeneficios = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  { 
    name: 'nombre',
    label: t('beneficios.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 200px; white-space: normal'
  },
  { name: 'descripcion',
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
    format: (val: number) => (val === 1 ? 'Porcentaje' : 'Monto Específico')
  },
  { name: 'cantidad',
    label: t('tables.amount'),
    align: 'right',
    field: 'cantidad',
    style: 'width: 80px',
    format: (val: number, row: Beneficio) => (row.tipo === 1 ? `${val} %` : `${val} Bs.`)
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px'
  },
  {
    name: 'destino',
    label: t('tables.destination'),
    align: 'center',
    field: 'destino',
    style: 'width: 100px',
    format: (val: number) => (val === 1 ? 'Planilla' : 'Finiquito')
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

export const obtenerColumnasBeneficiosEstandar = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('beneficios.name'),
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
    format: (val: number) => (val === 1 ? 'Porcentaje' : 'Monto')
  },
  {
    name: 'cantidad',
    label: t('tables.amount'),
    align: 'right',
    field: 'cantidad',
    style: 'width: 80px',
    format: (val: number, row: Beneficio) => (row.tipo === 1 ? `${val} %` : `${val} Bs.`)
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px'
  },
  {
    name: 'destino',
    label: t('tables.destination'),
    align: 'center',field: 'destino',
    style: 'width: 100px',
    format: (val: number) => (val === 1 ? 'Planilla' : 'Finiquito')
  }
];