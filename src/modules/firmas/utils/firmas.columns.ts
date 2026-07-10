import type { QTableColumn } from 'quasar';
import type { Firma, FirmaTipoPlanilla, Usuario } from '../types/firmas.types';

export const obtenerCadenaUsuario = (usuario: Usuario | null | undefined) => {
  if (!usuario) {
    return '';
  }
  return `${usuario.nombre}  ${usuario.apellido} - ${usuario.usuario}`;
};

export const obtenerNombreUsuario = (usuario: Usuario | null | undefined) => {
  if (!usuario) {
    return '';
  }
  return `${usuario.usuario}`;
};

export const obtenerColumnasFirmas = (t: (key: string) => string): QTableColumn<Firma>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('Nombres y Apellidos'),
    align: 'left',
    field: 'nombre',
    style: 'width: 150px; white-space: normal'
  },
  {
    name: 'ci',
    label: t('person.ci'),
    align: 'left',
    field: 'ci',
    style: 'width: 100px'
  },
  {
    name: 'cargo',
    label: t('firmas.role'),
    align: 'left',
    field: 'cargo',
    style: 'white-space: normal; min-width: 100px;'
  },
  {
    name: 'idusuario',
    label: t('Usuario de registro'),
    align: 'center',
    field: 'idusuario',
    style: 'white-space: normal; min-width: 150px;',
    format: obtenerCadenaUsuario
  },
  {
    name: 'estado',
    label: t('tables.status'),
    align: 'center',
    field: 'estado',
    style: 'width: 50px'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];

export const obtenerColumnasFirmasTipoPlanilla = (t: (key: string) => string): QTableColumn<FirmaTipoPlanilla>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'id_firma',
    label: t('Planilla'),
    align: 'left',
    field: 'id_firma',
    style: 'white-space: normal'
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];