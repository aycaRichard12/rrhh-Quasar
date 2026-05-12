export interface EnteRegulador {
  id?: string;
  nombre: string;
  porcentaje: string | number;
  descripcion: string;
  estado?: string;
  orden: string | number;
  monto: string | number;
}

export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}