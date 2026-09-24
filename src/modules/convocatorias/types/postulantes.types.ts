export interface Postulante {
  id?: number;
  nombre: string;
  apellido: string;
  ci: string;
  cv: string;
  email: string;
  telefono: string;
  fecha: string;
  idconvocatoria: number;
  convocatoria: string;
  conclucion: string;
  promedio: number;
}