import type { QTableColumn } from "quasar";
import type { Trabajador, HistorialTrabajador } from "../types/trabajadores.types";

export const obtenerColumnasTrabajadores = (t: (key: string) => string): QTableColumn<Trabajador>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'foto', label: t('workers.photo'), align: 'center', field: 'foto', style: 'width: 60px' },
  { name: 'nombreCompleto', label: t('workers.fullName'), align: 'left', field: (row) => `${row.nombres} ${row.apellidos}` },
  { name: 'ci', label: t('workers.ci'), align: 'left', field: 'ci', style: 'width: 100px' },
  { name: 'telefono', label: t('workers.phone'), align: 'left', field: 'telefono', style: 'width: 100px' },
  { name: 'email', label: t('workers.email'), align: 'left', field: 'email' },
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
