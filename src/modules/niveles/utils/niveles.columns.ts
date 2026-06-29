import type { QTableColumn } from "quasar";
import type { NivelDeGravedad } from "../types/niveles.types";

export const obtenerColumnasNiveles = (t: (key: string) => string): QTableColumn<NivelDeGravedad>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('niveles.name'),
    align: 'left',
    field: 'nombre' ,
    style: 'white-space: normal'
  },
  {
    name: 'pos',
    label: t('tables.order'),
    align: 'center',
    field: 'pos',
    style: 'width: 80px'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];