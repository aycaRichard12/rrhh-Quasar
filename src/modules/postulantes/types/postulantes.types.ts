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

// export interface MetodoEvaluacionSelect {
//   id: number;
//   nombre: string;
//   calificacionMax: number;
// }

// export interface ActividadEvaluacionSelect {
//   id: number;
//   nombre: string;
//   idmetodoevaluacion: number;
// }

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