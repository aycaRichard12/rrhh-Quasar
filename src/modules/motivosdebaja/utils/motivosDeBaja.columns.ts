import type { QTableColumn } from 'quasar';
import type { MotivosDeBaja } from '../types/motivosDeBaja.types';

export const normalizarTipoMotivo = (val: unknown): string => {
  const v = String(val).trim().toLowerCase();
  if (v === '1' || v === 'temporal') {
    return 'Temporal';
  }
  return 'Definitiva';
};

export const obtenerColumnasMotivosDeBaja = (t: (key: string) => string): QTableColumn<MotivosDeBaja>[] => [
  { name: 'numero',      label: 'N°',                   align: 'right',  field: () => '',      style: 'width: 50px' },
  { name: 'nombre',      label: t('reasonLeave.name'),  align: 'left',   field: 'nombre',      style: 'width: 200px; white-space: normal' },
  { name: 'descripcion', label: t('tables.description'),align: 'left',   field: 'descripcion', style: 'white-space: normal; min-width: 250px' },
  { name: 'tipo',        label: t('reasonLeave.type'),  align: 'center', field: 'tipo',        style: 'width: 150px', format: normalizarTipoMotivo },
  { name: 'opciones',    label: t('tables.options'),    align: 'center', field: () => '',      style: 'width: 110px' }
];
