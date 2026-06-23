export interface Area {
  id?: number;
  nombre: string;
  descripcion: string;
  sucursal: {
    idsucursal: number;
    nombre: string;
    region: string;
    idregion: number;
  }
}

export interface Sucursal {
  id?: number;
  sucursal: string;
  region: string;
  idregion: number;
  idempresa: number;
}