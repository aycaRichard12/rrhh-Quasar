export interface Convocatoria {
  id?: number;
	nombre: string;
	descripcion: string;
	fechai: string;
	fechaf: string;
	nvacantes: number | '';
	estado: number;
	publico: number;
	idcargo: number;
	cargo: string;
	idarea: number;
	area: string;
}

export interface MetodoEvaluacionResumen {
  idevaluacionpostulante: number;
  idmetodoevaluacion: number;
  metodo: string;
  descripcion: string;
  calificacionmax: number;
  sumtotal: number;
  cantnotas: number;
  promedio: number;
  estado: string;
}