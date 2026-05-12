export interface Sucursal {
  id: string;
  sucursal: string;
  region: string;
  idregion: string;
  idempresa: string;
}

export interface Area {
  id: number | string;
  nombre: string;
  descripcion: string;
  sucursal: SucursalAnidada | string | number | null;
}

export interface SucursalAnidada {
  idsucursal?: string | number;
  id?: string | number;
  nombre?: string;
  region?: string;
}