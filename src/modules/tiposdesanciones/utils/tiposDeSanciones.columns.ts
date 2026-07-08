import type { QTableColumn } from "quasar";
import type { TipoDeSancion } from "../types/tiposDeSanciones.types";

export const obtenerColumnasTiposDeSanciones = (t: (key: string) => string): QTableColumn<TipoDeSancion>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('tiposdesanciones.name'),
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
    name: 'nivel',
    label: t('niveles.name'),
    align: 'center',
    field: 'nivel',
    style: 'width: 100px'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];