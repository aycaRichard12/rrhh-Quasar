export interface MetodosDeEvaluacion {
  id?: number;
  nombre: string;
  descripcion: string;
  calificacionMax: number;
  fecha: Date;
}

export interface RangosDeEvaluacion {
  id?: number;
  nombre: string;
  cantidad: number;
  fecha: Date;
  idMetodoDeEvaluacion: number;
}
