import type { QTableColumn } from "quasar";
import type { MetodoDeEvaluacion, RangoDeEvaluacion } from "../types/metodosDeEvaluacion.types";

export const obtenerColumnasMetodosDeEvaluacion = (t: (key: string) => string): QTableColumn<MetodoDeEvaluacion>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('metodosdeevaluacion.name'),
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
    name: 'calificacionMax',
    label: t('metodosdeevaluacion.rating'),
    align: 'center',
    field: 'calificacionMax',
    style: 'width: 100px',
  },
  {
    name: 'fecha',
    label: t('tables.date'),
    align: 'center',
    field: 'fecha',
    style: 'width: 100px',
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'

  }
];

export const obtenerColumnasRangosDeEvaluacion = (t: (key: string) => string): QTableColumn<RangoDeEvaluacion>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('metodosdeevaluacion.range.criteria'),
    align: 'left',
    field: 'nombre',
    style: 'white-space: normal'
    },
  {
    name: 'puntaje',
    label: t('metodosdeevaluacion.range.score'),
    align: 'center',
    field:'cantidad',
    style: 'width: 80px'
  },
  {
    name: 'fecha',
    label: t('tables.date'),
    align: 'center',
    field: 'fecha',
    style: 'width: 100px',
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];