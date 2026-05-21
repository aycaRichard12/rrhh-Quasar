export interface Sucursal {
  id?      :string;
  sucursal :string;
  region   :string;
  idregion :string;
  idempresa:string;
}

export interface Area {
  id?          : string;
  nombre       : string;
  descripcion  : string;
  idsucursal?  : string;
  sucursal?: {
    idsucursal?: string;
    nombre     : string;
    region     : string;
    idregion?  : string;
  };
}