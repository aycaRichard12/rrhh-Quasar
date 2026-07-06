export interface Firma {
  idfirma?: number;
  cargo: string;
  ci: string;
  nombre: string;
  idusuario: number;
  estado: number;
  apellido: string;
}

export interface Usuario {
  idusuario?: string,
  id?: number; //id numerico del usuario para poder comprarlo con idusuario de Firma
  usuario: string,
  nombre: string,
  apellido: string,
}