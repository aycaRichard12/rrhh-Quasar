import type { QTableColumn } from 'quasar';
import type { Postulante } from '../types/postulantes.types';

export const obtenerColumnasPostulantes = (t: (key: string) => string): QTableColumn<Postulante>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  {
    name: 'nombre',
    label: t('nombres'),
    align: 'left',
    field: 'nombre',
    style: 'width: 150px; white-space: normal'
  },
  {
    name: 'apellido',
    label: t('apellidos'),
    align: 'left',
    field: 'apellido',
    style: 'white-space: normal; min-width: 228px;'
  },
  {
    name: 'ci',
    label: t('ci'),
    align: 'center',
    field: 'ci',
    style: 'width: 50px; white-space: normal'
  },
  {
    name: 'telefono',
    label: t('telefono'),
    align: 'center',
    field: 'telefono',
    style: 'width: 50px; white-space: normal'
  },
  {
    name: 'email',
    label: t('email'),
    align: 'right',
    field: 'email',
    style: 'width: 10px'
  },
  {
    name: 'fecha',
    label: t('fecha'),
    align: 'center',
    field: 'fecha',
    style: 'width: 100px; white-space: normal'
  },
  {
    name: 'conclucion',
    label: t('conclusion'),
    align: 'center',
    field: 'conclucion',
    style: 'width: 30px'
  },
  {
    name: 'convocatoria',
    label: t('convocatoria'),
    align: 'center',
    field: 'convocatoria',
    style: 'width: 30px'
  },
  {
    name: 'opciones',
    label: t('opciones'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
  }
];