import type { QTableColumn } from "quasar";
import type { ActividadesDeEvaluacion } from "../types/actividadesDeEvaluacion.types";
import { date } from 'quasar';

export const obtenerColumnasActividadesDeEvaluacion = (t: (key: string) => string): QTableColumn<ActividadesDeEvaluacion>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 47px' },
  { name: 'nombre', label: t('evaluationActivities.name'), align: 'left', field: 'nombre', style: 'white-space: normal' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'min-width: 150px; white-space: normal' },
  { name: 'metodoevaluacion', label: t('evaluationMethods.name'), align: 'center', field: 'metodoevaluacion' },
  { name: 'fecha', label: t('tables.date'), align: 'center', field: 'fecha', format: (val: Date) => date.formatDate(val, 'DD/MM/YYYY') },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];
