import type { QTableColumn } from "quasar";
import type { EnteRegulador } from "../types/entesReguladores.types";

export const obtenerColumnasEntesReguladores = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  { name: 'numero',     label: 'N°',                       align: 'right',  field: () => '',     style: 'width: 50px' },
  { name: 'nombre',     label: t('entesreguladores.name'),           align: 'left',   field: 'nombre',     style: 'white-space: normal; width: 150px;' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal; min-width: 150px;' },
  { name: 'porcentaje', label: t('entesreguladores.percentage'),     align: 'center', field: 'porcentaje', style: 'width: 100px', format: (val: number) => `${val} %` },
  { name: 'monto',      label: t('tables.amount2'),        align: 'right',  field: 'monto',      style: 'width: 100px', format: (val: number) => `${val} Bs.` },
  { name: 'orden',      label: t('tables.order'),          align: 'center', field: 'orden',      style: 'width: 80px' },
  { name: 'estado',     label: t('tables.status'),         align: 'center', field: 'estado',     style: 'width: 80px' },
  { name: 'opciones',   label: t('tables.options'),        align: 'center', field: () => '',     style: 'width: 100px' }
];

export const obtenerColumnasEntesReguladoresEstandar = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  { name: 'numero',     label: 'N°',                       align: 'right',  field: () => '',     style: 'width: 50px' },
  { name: 'nombre',     label: t('entesreguladores.name'),           align: 'left',   field: 'nombre',     style: 'white-space: normal; width: 180px' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal' },
  { name: 'porcentaje', label: t('entesreguladores.percentage'),     align: 'center', field: 'porcentaje', style: 'width: 100px', format: (val: number) => `${val} %` },
  { name: 'monto',      label: t('tables.amount2'),        align: 'right',  field: 'monto',      style: 'width: 100px', format: (val: number) => `${val} Bs.` },
  { name: 'orden',      label: t('tables.order'),          align: 'center', field: 'orden',      style: 'width: 80px' }
];
