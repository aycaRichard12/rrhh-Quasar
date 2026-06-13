import type { QTableColumn } from "quasar";
import type { MetodosDeEvaluacion, RangosDeEvaluacion } from "../types/metodosDeEvaluacion.types";
import { date } from 'quasar';

export const obtenerColumnasMetodosDeEvaluacion = (t: (key: string) => string): QTableColumn<MetodosDeEvaluacion>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'nombre', label: t('tables.name'), align: 'left', field: 'nombre' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'min-width: 150px; white-space: normal' },
  { name: 'calificacionMax', label: 'Calificacion Max', align: 'center', field: 'calificacionMax' },
  { name: 'fecha', label: 'Fecha', align: 'center', field: 'fecha', format: (val: Date) => date.formatDate(val, 'DD/MM/YYYY') },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];

export const obtenerColumnasRangosDeEvaluacion = (t: (key: string) => string): QTableColumn<RangosDeEvaluacion>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'nombre', label: 'Criterio/rango', align: 'left', field: 'nombre' },
  { name: 'cantidad', label: 'Puntaje', align: 'right', field: 'cantidad' },
  { name: 'fecha', label: 'Fecha', align: 'center', field: 'fecha', format: (val: Date) => date.formatDate(val, 'DD/MM/YYYY') },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];
