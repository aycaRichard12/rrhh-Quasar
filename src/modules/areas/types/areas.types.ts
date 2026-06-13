export interface Area {
  id?:number;
  nombre:string;
  descripcion:string;
  idsucursal:number;
  sucursal:Sucursal;
}

export interface Sucursal {
  id?:number;
  nombre:string;
  sucursal:string;
  idempresa:number;
  idregion:number;
  region:string;
}