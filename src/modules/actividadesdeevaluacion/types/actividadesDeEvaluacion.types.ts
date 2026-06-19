export interface ActividadesDeEvaluacion {
  id?: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  idmetodoevaluacion: number;
  metodoevaluacion: string;
  calificacionMax: number;
}