export interface MetodoDeEvaluacion {
  id?: number;
  nombre: string;
  descripcion: string;
  calificacionMax: number | '';
  fecha: string;
}

export interface RangoDeEvaluacion {
  id?: number;
  nombre: string;
  cantidad: number | '';
  fecha: string;
  idMetodoDeEvaluacion?: number;
}