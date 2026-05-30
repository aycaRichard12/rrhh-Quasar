import type { QTableColumn } from "quasar";
import type { EnteRegulador } from "../types/entesReguladores.types";

export const obtenerColumnasEntesReguladores = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  { name: 'numero',     label: 'N°',                       align: 'center', field: () => null ,  style: 'width: 20px' },
  { name: 'nombre',     label: t('entity.form.name'),      align: 'left', field: 'nombre',       style: 'white-space: normal; width: 170px' },
  { name: 'porcentaje', label: t('entity.form.percentage'),align: 'center', field: 'porcentaje', style: 'width: 100px' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entity.form.amount'),    align: 'right',  field: 'monto',      style: 'width: 100px'},
  { name: 'orden',      label: t('entity.form.order'),     align: 'center', field: 'orden',      style: 'width: 70px'},
  { name: 'estado',     label: t('tables.status'),         align: 'center', field: 'estado' ,    style: 'width: 90px'},
  { name: 'opciones',   label: t('tables.options'),        align: 'center', field: () => null ,  style: 'width: 100px'}
]

export const obtenerColumnasEntesReguladoresEstandar = (t: (key: string) => string): QTableColumn<EnteRegulador>[] => [
  { name: 'numero',     label: 'N°',                       align: 'center', field: () => null ,  style: 'width: 20px' },
  { name: 'nombre',     label: t('entity.form.name'),      align: 'left', field: 'nombre',       style: 'white-space: normal; width: 170px' },
  { name: 'porcentaje', label: t('entity.form.percentage'),align: 'center', field: 'porcentaje', style: 'width: 100px' },
  { name: 'descripcion',label: t('tables.description'),    align: 'left',   field: 'descripcion',style: 'white-space: normal' },
  { name: 'monto',      label: t('entity.form.amount'),    align: 'right',  field: 'monto',      style: 'width: 100px'},
  { name: 'orden',      label: t('entity.form.order'),     align: 'center', field: 'orden',      style: 'width: 70px'}
];