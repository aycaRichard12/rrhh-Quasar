export interface Convocatoria {
  id?: number;
	nombre: string;
	descripcion: string;
	fechai: string;
	fechaf: string;
	nvacantes: number;
	estado: number;
	publico: number;
	idcargo: number;
	cargo: string;
	idarea: number;
	area: string;
}