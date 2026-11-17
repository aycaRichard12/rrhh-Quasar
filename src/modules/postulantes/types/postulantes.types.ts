export interface Postulante {
	id?: number;
	nombre: string;
	apellido: string;
	ci: string;
	cv: File;
	email: string;
	telefono: string;
	fecha: string;
	idconvocatoria: number;
	convocatoria: string;
	conclucion: string;
	promedio: number;
}

export interface CalificacionPostulante {
  id?: number;
  nota: number;
  fecha: string;
  idevaluacionPostulante: number;
  idactividadevaluacion: number;
  nombreactividad: string;
  calificacionMax: number;
  idmetodoevaluacion: number;
  justificacion: string;
}