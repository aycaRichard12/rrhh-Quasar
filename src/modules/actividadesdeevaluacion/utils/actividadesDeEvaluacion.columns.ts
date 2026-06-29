import type { QTableColumn } from "quasar";
import type { ActividadDeEvaluacion } from "../types/actividadesDeEvaluacion.types";

export const obtenerColumnasActividadesDeEvaluacion = (t: (key: string) => string): QTableColumn<ActividadDeEvaluacion>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 47px'
  },
  {
    name: 'nombre',
    label: t('actividadesdeevaluacion.name'),
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
    name: 'metodoevaluacion',
    label: t('metodosdeevaluacion.name'),
    align: 'center',
    field: 'metodoevaluacion',
    style: 'width: 200px; white-space: normal'

  },
  {
    name: 'fecha',
    label: t('tables.date'),
    align: 'center',
    field: 'fecha',
    style: 'width: 100px;'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px;'
  }
];