import type { QTableColumn } from 'quasar';
import type { MotivoDeBaja } from '../types/motivosDeBaja.types';

export const normalizarTipoMotivo = (val: unknown): string => {
  const v = String(val).trim().toLowerCase();
  if (v === '1' || v === 'temporal') {
    return 'Temporal';
  }
  return 'Definitiva';
};

export const obtenerColumnasMotivosDeBaja = (t: (key: string) => string): QTableColumn<MotivoDeBaja>[] => [
  {
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 47px'
  },
  {
    name: 'nombre',
    label: t('motivosdebaja.name'),
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
    name: 'tipo',
    label: t('motivosdebaja.type'),
    align: 'center',
    field: 'tipo',
    style: 'width: 200px; white-space: normal',
    format: normalizarTipoMotivo
  },
  {
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px;'
  }
];