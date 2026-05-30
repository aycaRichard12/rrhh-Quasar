import type { QTableColumn } from "quasar";
import type { Beneficio } from "../types/beneficios.types";

export const obtenerColumnasBeneficios = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  { name: 'numero',     label: 'N°',align: 'center',field: () => '',style: 'width: 50px'},
  { name: 'nombre',     label: t('beneficios'),align: 'left',field: 'nombre',style: 'white-space: normal; width: 150px;'},
  { name: 'descripcion',label: t('descripcion'), align: 'left', field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'tipo',       label: t('Tipo'), align: 'center', field: 'tipo',style: 'width: 100px'},
  { name: 'cantidad',   label: t('Cantidad'), align: 'right', field: 'cantidad',style: 'width: 80px'},
  { name: 'orden',      label: t('Orden'), align: 'center', field: 'orden',style: 'width: 80px'},
  { name: 'destino',    label: t('Destino'), align: 'center', field: 'destino',style: 'width: 100px'},
  { name: 'estado',     label: t('Estado'), align: 'center', field: 'estado', style: 'width: 80px' },
  { name: 'opciones',   label: t('Opciones'), align: 'center', field: () => '',style: 'width: 100px'}
]

export const obtenerColumnasBeneficiosEstandar = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  { name: 'numero',     label: 'N°',                             align: 'center',field: () => '',     style: 'width: 50px' },
  { name: 'nombre',     label: t('Nombre'),       align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 180px' },
  { name: 'descripcion',label: t('Descripción'),align: 'left',  field: 'descripcion',style: 'white-space: normal' },
  { name: 'tipo',       label: t('Tipo'),       align: 'center',field: 'tipo',       style: 'width: 100px' },
  { name: 'cantidad',   label: t('Monto'),     align: 'right', field: 'cantidad',   style: 'width: 80px' },
  { name: 'orden',      label: t('Orden'),      align: 'center',field: 'orden',      style: 'width: 80px' },
  { name: 'destino',    label: t('Destino'),align: 'center',field: 'destino',    style: 'width: 100px' }
];