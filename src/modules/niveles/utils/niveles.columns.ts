import type { QTableColumn } from "quasar";
import type { NivelesDeGravedad } from "../types/niveles.types";

export const obtenerColumnasNiveles = (t: (key: string) => string): QTableColumn<NivelesDeGravedad>[] => [
  { name: 'numero',   label: 'N°',                align: 'right',  field: () => '',style: 'width: 45px; max-width: 45px; min-width: 45px;'},
  { name: 'nombre',   label: t('levels.name'),   align: 'left',   field: 'nombre' , style: 'min-width: 100px; white-space: normal', classes: 'ellipsis'},
  { name: 'pos',      label: t('tables.order'),   align: 'center', field: 'pos', style: 'width: 45px' },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '', style: 'width: 100px; max-width: 100px; min-width: 100px;'  }
];
