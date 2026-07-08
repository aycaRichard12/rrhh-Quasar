import type { QTableColumn } from "quasar";
import type { EnteRegulador } from "../types/entesReguladores.types";

export const obtenerColumnasEntesReguladores = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  { 
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('entesreguladores.name'),
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
    name: 'porcentaje',
    label: t('tables.percentage'),
    align: 'center',
    field: 'porcentaje',
    style: 'width: 100px',
    format: (val: number) => `${val} %`
  },
  { 
    name: 'monto',
    label: t('tables.amount2'),
    align: 'right',
    field: 'monto',
    style: 'width: 100px',
    format: (val: number) => `${val} Bs.`
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px'
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
];

export const obtenerColumnasEntesReguladoresEstandar = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('entesreguladores.name'),
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
    name: 'porcentaje',
    label: t('tables.percentage'),
    align: 'center',
    field: 'porcentaje',
    style: 'width: 100px',
    format: (val: number) => `${val} %`
  },
  {
    name: 'monto',
    label: t('tables.amount2'),
    align: 'right',
    field: 'monto',
    style: 'width: 100px',
    format: (val: number) => `${val} Bs.`
  },
  {
    name: 'orden',
    label: t('tables.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 50px'
  }
];
