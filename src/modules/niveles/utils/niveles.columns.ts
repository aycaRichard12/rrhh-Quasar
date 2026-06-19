import type { QTableColumn } from "quasar";
import type { NivelesDeGravedad } from "../types/niveles.types";

export const obtenerColumnasNiveles = (t: (key: string) => string): QTableColumn<NivelesDeGravedad>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 47px' },
  { name: 'nombre', label: t('niveles.name'), align: 'left', field: 'nombre' },
  { name: 'pos', label: t('tables.order'), align: 'center', field: 'pos' },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];
