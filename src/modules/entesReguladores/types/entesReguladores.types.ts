export interface EnteRegulador {
  id?: string | number;
  nombre: string;
  porcentaje: string | number;
  descripcion: string;
  estado?: string | number;
  orden: string | number;
  monto: string | number;
}

export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}