export interface BonoEmpresa {
  id?        : string | number;
  nombre     : string;
  descripcion: string;
  tipo       : string | number;
  cantidad   : string | number;
  estado?    : string | number;
  orden      : string | number;
  destino    : string | number;
  fecha?     : string;
}

// export interface RespuestaApi<T = undefined> {
//   estado: 'exito' | 'error';
//   mensaje: string;
//   datos?: T;
// }