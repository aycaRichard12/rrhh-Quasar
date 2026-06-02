export interface Cargo {
  id: string;
  cargo: string;
  salario: string;
  descripcion: string;
  area: string;
  idarea: string;
}

export interface FuncionYObligacion {
  id?: string;
  nombre: string;
  descripcion: string;
  idcargo: string;
  cargo?: string;
}

export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}