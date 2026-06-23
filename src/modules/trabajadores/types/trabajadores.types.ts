export interface Trabajador {
  id?: number;
  nombres: string;
  apellidos: string;
  ci: string;           // ¡Cambiado a string! (Por ej: "6365451 Cbba")
  telefono: string;     // ¡Cambiado a string! (Por ej: "+591 79388575")
  email: string;
  fechan: string | null; // Es mejor manejar fechas como string YYYY-MM-DD para QDate
  direccion: string;
  estado: number | '';
  foto: string | null;
  nacionalidad: string;
  profesion: string;
  estadot: number | '';
  fecha: string | null;  // Puede venir null
  idcargo: number | '';
  cargo: string;
  salario: number | '';
  sexo: number;
  estadocivil: number | '';
  infcontcto: InfoContacto;
  // Magia TS: Le decimos que puede ser un contrato activo o inactivo
  contrato: ContratoActivo | ContratoInactivo; 
}

export interface InfoContacto {
  estado: string;
  mensaje: string;
}

// Interfaces para los estados posibles del contrato
export interface ContratoInactivo {
  mensaje: string; // "sin contrato"
  codigo: number;  // 101
}

export interface ContratoActivo {
  id?: number;
  fechai: string;
  fechaf: string | null;
  fechab: string | null;
  modo: number | string;
  salario: number;
  idmodopago: number;
  idtrabajdor: number;
  idtipocontrato: number;
  estado: number | string;
  horas: number;
}

export interface HistorialTrabajador {
	tipo: string;
	fecha: string;
	nombre: string;
	apellido: string;
	detalles: string
	otrosdetalles: string;
}