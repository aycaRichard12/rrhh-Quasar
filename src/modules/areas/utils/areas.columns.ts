import type { QTableColumn } from 'quasar';
import type { Area } from '../types/areas.types';

export const normalizarSucursal = (row: Area): string => {
  if (row.sucursal && typeof row.sucursal === 'object') {
    // Blindaje: Buscamos 'nombre' o 'sucursal' por si la API varía
    const nombre = row.sucursal.nombre || '';
    const region = row.sucursal.region || '';
    return nombre ? `${nombre} - ${region}` : '';
  }
  return '';
};

export const obtenerColumnasAreas = (t: (key: string) => string): QTableColumn<Area>[] => [
  { 
    name: 'numero',
    label: 'N°',
    align: 'right',
    field: () => '',
    style: 'width: 50px'
  },
  { 
    name: 'nombre',
    label: t('areas.name'),
    align: 'left',
    field: 'nombre',
    style: 'width: 100px; white-space: normal'
  },
  { 
    name: 'descripcion',
    label: t('tables.description'),
    align: 'left',
    field: 'descripcion',
    style: 'min-width:210px; white-space: normal'
  },
  { 
    name: 'sucursal',
    label: t('areas.branch'),
    align: 'center',
    field: normalizarSucursal, // Llamamos a nuestra nueva función
    style: 'width: 130px;'
  },
  { 
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px;'
  }
];