import type { QTableColumn } from "quasar";
import type { SalarioMinimo } from "../types/salarioMinimo.types";

export const obtenerColumnasSalariosMinimos = (t: (key: string) => string): QTableColumn<SalarioMinimo>[] => [
  { 
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  { 
    name: 'anio',
    label: t('common.timeUnits.year'),
    align: 'center',
    field: 'anio',
    style: 'width: 100px',
  },
  {
    name: 'observacion',
    label: t('tables.description'),
    align: 'left',
    field: 'observacion',
    style: 'white-space: normal; min-width: 228px;'
  },
  { 
    name: 'porcentaje',
    label: t('tables.percentage'),
    align: 'center',
    field: 'porcentaje',
    style: 'width: 100px',
  },
  { 
    name: 'monto',
    label: t('tables.amount2'),
    align: 'right',
    field: 'monto',
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
];

export const obtenerColumnasSalariosMinimosEstandar = (t: (key: string) => string): QTableColumn<SalarioMinimo>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
	{ 
    name: 'anio',
    label: t('common.timeUnits.year'),
    align: 'center',
    field: 'anio',
    style: 'width: 100px',
  },
  {
    name: 'observacion',
    label: t('tables.description'),
    align: 'left',
    field: 'observacion',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'monto',
    label: t('tables.amount2'),
    align: 'right',
    field: 'monto',
    style: 'width: 100px',
  },
];