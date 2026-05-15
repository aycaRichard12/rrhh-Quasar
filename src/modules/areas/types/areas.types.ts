export interface SucursalAnidada {
  idsucursal: string | number;
  nombre    : string;
  region    : string;
  idregion  : string | number;
}

export interface Sucursal {
  id?      : string | number;
  sucursal : string;
  region   : string;
  idregion : string | number;
  idempresa: string | number;
}

export interface Area {
  id?        : string | number;
  nombre     : string;
  descripcion: string;
  sucursal   : SucursalAnidada | null;
}