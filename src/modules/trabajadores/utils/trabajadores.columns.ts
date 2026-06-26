import type { QTableColumn } from "quasar";
import type { Trabajador, HistorialTrabajador } from "../types/trabajadores.types";

export const obtenerColumnasTrabajadores = (t: (key: string) => string): QTableColumn<Trabajador>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'foto', label: t('workers.photo'), align: 'center', field: 'foto', style: 'width: 60px' },
  { name: 'nombres', label: t('workers.names'), align: 'left', field: 'nombres'},
  { name: 'apellidos', label: t('workers.lastNames'), align: 'left', field: 'apellidos'},
  { name: 'sexo', label: t('workers.gender'), align: 'center', field: 'sexo'},
  { name: 'ci', label: t('workers.ci'), align: 'left', field: 'ci', style: 'width: 100px' },
  { name: 'telefono', label: t('workers.phone'), align: 'right', field: 'telefono', style: 'width: 100px' },
  { name: 'email', label: t('workers.email'), align: 'center', field: 'email' },
  { name: 'fechan', label: t('workers.birthDate'), align: 'center', field: 'fechan' },
  { name: 'direccion', label: t('workers.address'), align: 'left', field: 'direccion' },
  { name: 'nacionalidad', label: t('workers.nationality'), align: 'center', field: 'nacionalidad' },
  { name: 'profesion', label: t('workers.profession'), align: 'center', field: 'profesion' },
  { name: 'estadocivil', label: t('workers.civilStatus'), align: 'center', field: 'estadocivil' },
  { name: 'cargo', label: t('workers.cargo'), align: 'center', field: 'cargo', style: 'width: 130px' },
  { name: 'estadot', label: t('workers.status'), align: 'center', field: 'estadot', style: 'width: 100px' },
  { name: 'opciones', label: t('tables.options'), align: 'center', field: () => '', style: 'width: 140px' }
];

export const obtenerColumnasHistorialTrabajador = (t: (key: string) => string): QTableColumn<HistorialTrabajador>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'tipo', label: t('tables.type'), align: 'left', field: 'tipo', style: 'width: 120px' },
  { name: 'fecha', label: t('tables.date'), align: 'center', field: 'fecha', style: 'width: 100px' },
  { name: 'detalles', label: t('common.labels.detail'), align: 'left', field: 'detalles' },
  { name: 'otrosdetalles', label: t('tables.description'), align: 'left', field: 'otrosdetalles' }
];
