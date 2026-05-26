import type { QTableColumn } from "quasar";
import type {BonoEmpresa } from "../types/bonosEmpresa.types";

export const obtenerColumnasBonosEmpresa = (t: (key: string) => string): QTableColumn<BonoEmpresa>[] => [
  { name: 'numero',     label: 'N°',        align: 'left',  field: () => '' },
  { name: 'nombre',     label: t('Bneficio'),align: 'left', field: 'nombre', sortable: true, style: 'white-space: normal'},
  { name: 'descripcion',label: 'description', align: 'left', field: 'descripcion', style: 'white-space: normal'},
  { name: 'tipo',       label: 'Tipo',      align: 'center',field: 'tipo'},
  { name: 'cantidad',   label: 'Cantidad',  align: 'right', field: 'cantidad' },
  { name: 'orden',      label: 'Orden',     align: 'right', field: 'orden', sortable: true },
  { name: 'destino',    label: 'Destino',   align: 'center',field: 'destino'},
  { name: 'estado',     label: 'Estado',    align: 'center',field: 'estado' },
  { name: 'opciones',   label: 'Opciones',  align: 'center',field: () => ''}
]

export const obtenerColumnasBonosEmpresaEstandar = (t: (key: string) => string): QTableColumn<BonoEmpresa>[] => [
  { name: 'numero', label: 'N°', align: 'left', field: () => ''},
  { name: 'nombre', label: t('Beneficio'), align: 'left', field: 'nombre', sortable: true },
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion' },
  { name: 'tipo', label: 'Tipo', align: 'center', field: 'tipo' },
  { name: 'cantidad', label: 'Cantidad', align: 'right', field: 'cantidad' },
  { name: 'orden', label: 'Orden', align: 'right', field: 'orden', sortable: true },
  { name: 'destino', label: 'Destino', align: 'center', field: 'destino' }
];