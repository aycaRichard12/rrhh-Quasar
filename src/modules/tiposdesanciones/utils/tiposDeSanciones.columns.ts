import type { QTableColumn } from "quasar";
import type { TiposDeSanciones } from "../types/tiposDeSanciones.types";

export const obtenerColumnasTiposDeSanciones = (t: (key: string) => string): QTableColumn<TiposDeSanciones>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 47px' },
  { name: 'nombre', label: t('tiposdesanciones.name'), align: 'left', field: 'nombre' },
  { name: 'descripcion', label: t('tables.description'), align: 'left', field: 'descripcion', style: 'white-space: normal' },
  { name: 'nivel', label: t('levels.name'), align: 'center', field: 'nivel' },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '' }
];
