import type { QTableColumn } from "quasar";
import type { MetodosDeEvaluacion, RangosDeEvaluacion } from "../types/metodosDeEvaluacion.types";
import { date } from 'quasar';

export const obtenerColumnasMetodosDeEvaluacion = (t: (key: string) => string): QTableColumn<MetodosDeEvaluacion>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 47px' },
  { name: 'nombre', label: t('evaluationMethods.name'), align: 'left', field: 'nombre' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'min-width: 150px; white-space: normal' },
  { name: 'calificacionMax', label: t('evaluationMethods.maximumRating'), align: 'center', field: 'calificacionMax' },
  { name: 'fecha', label: t('tables.date'), align: 'center', field: 'fecha', format: (val: Date) => date.formatDate(val, 'DD/MM/YYYY') },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];

export const obtenerColumnasRangosDeEvaluacion = (t: (key: string) => string): QTableColumn<RangosDeEvaluacion>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 47px' },
  { name: 'nombre', label: t('evaluationMethods.range.criteria'), align: 'left', field: 'nombre', style: 'min-width: 150px; white-space: normal'},
  { name: 'puntaje', label: t('evaluationMethods.range.score'), align: 'center', field:'cantidad', style: 'width: 60px' },
  { name: 'fecha', label: t('tables.date'), align: 'center', field: 'fecha', format: (val: Date) => date.formatDate(val, 'DD/MM/YYYY'), style: 'width: 60px' },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '', style: 'width: 60px' }
];
