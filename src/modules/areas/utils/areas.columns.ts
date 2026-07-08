import type { QTableColumn } from 'quasar';
import type { Area } from '../types/areas.types';

export const formatearSucursal = (val: unknown): string => {
  // 1. Si llega nulo o vacío, retornamos texto por defecto
  if (!val) return '';

  // Si por alguna razón ya es un string (debido al flujo del filtro), lo devolvemos tal cual
  if (typeof val === 'string') return val;

  if (typeof val !== 'object') return '';
  
  const data = val as Record<string, unknown>;

  // ==========================================
  // CASO A: Viene de la Tabla (recibe la fila entera 'Area')
  // ==========================================
  if (data.sucursal && typeof data.sucursal === 'object') {
    const suc = data.sucursal as Record<string, unknown>;
    const nombreBranch = String(suc.nombre);
    const regionBranch = String(suc.region);
    return `${nombreBranch || 'Sin sucursal'} - ${regionBranch || 'Sin región'}`;
  }

  // ==========================================
  // CASO B: Viene del useFiltroExcel o del Selector
  // ==========================================
  if ('region' in data || 'idregion' in data || 'idsucursal' in data) {
    // Si viene de la opción del select es 'data.sucursal', si viene del filtro interno es 'data.nombre'
    const nombreBranch = String(data.sucursal ?? data.nombre);
    const regionBranch = String(data.region);
    return `${nombreBranch || 'Sin sucursal'} - ${regionBranch || 'Sin región'}`;
  }

  return 'sin datos';
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
    name: 'sucursal',
    label: t('areas.branch'),
    align: 'center',
    field: formatearSucursal,
    style: 'width: 200px; white-space: normal'
  },
  { 
    name: 'opciones',
    label: t('tables.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px;'
  }
];