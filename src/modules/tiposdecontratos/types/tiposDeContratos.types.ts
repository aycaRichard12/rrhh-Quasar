export interface TipoDeContrato {
  id?: string | number;
  nombre: string;
  observacion: string;
  naturaleza: string;
}

export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}








// export interface TipoDeContrato {
//   id?: string;
//   nombre: string;
//   observacion: string;
//   naturaleza: string;
// }