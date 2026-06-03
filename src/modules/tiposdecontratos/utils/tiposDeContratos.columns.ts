import type { QTableColumn } from 'quasar';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

export const obtenerColumnasTiposDeContratos = (t: (key: string) => string): QTableColumn<TipoDeContrato>[] => [
  {name: 'numero',     label: 'N°',              align: 'center',field: () => '',},
  {name: 'nombre',     label: 'Tipo de contrato',align: 'left',field: (row) => row.nombre,},
  {name: 'observacion',label: 'Observación',align: 'left',field: (row) => row.observacion,},
  {name: 'naturaleza', label: 'Naturaleza',align: 'left',field: (row) => row.naturaleza,},
  {name: 'opciones',   label: t('common.table.options') || 'Opciones',align: 'center',field: () => '',}
];












// import type { QTableColumn } from 'quasar';
// import type { TipoDeContrato } from '../types/tiposDeContratos.types';

// export const obtenerColumnasTiposDeContratos = (t: (key: string) => string): QTableColumn<TipoDeContrato>[] => [
//   {name: 'numero', label: 'N°', align: 'center', field: () => '' },
//   {name: 'nombre', label: 'Tipo de contrato', align: 'left', field: (row) => row.nombre},
//   {name: 'observacion', label: 'Observación', align: 'left', field: (row) => row.observacion },
//   {name: 'naturaleza',label: 'Naturaleza',align: 'left',field: (row) => row.naturaleza,},
//   {name: 'opciones',label: t('common.table.options') || 'Opciones',align: 'center',field: () => ''}
// ];