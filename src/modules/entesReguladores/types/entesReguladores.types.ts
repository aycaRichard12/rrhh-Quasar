export interface EnteRegulador {
  id?: number;
  nombre: string;
  descripcion: string;
  porcentaje: number;
  monto: number;
  orden: number;
  estado?: number;
}