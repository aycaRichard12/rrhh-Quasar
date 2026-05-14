export interface Sucursal {
  id?: string | number;
  sucursal: string;
  region: string;
  idregion: string | number;
  idempresa: string | number;
}

export interface Area {
  id?: string | number | undefined;
  nombre: string;
  descripcion: string;
  sucursal: SucursalAnidada | null;
}

export interface SucursalAnidada {
  idsucursal: string | number;
  nombre: string;
  region: string;
  idregion: string | number;
}
export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}