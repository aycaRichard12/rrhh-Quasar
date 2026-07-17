export interface Firma {
  idfirma?: number;
  cargo: string;
  ci: string;
  nombre: string;
  idusuario: number;
  estado: number;
}

export interface Usuario {
  id?: number;
  idusuario?: string;
  usuario: string;
  nombre: string;
  apellido: string;
}

export interface TipoPlanilla {
  id_tipoPlanilla?: number;
  orden: number;
  estado: number;
  nombrePlanilla: string;
}

export interface FirmaTipoPlanilla {
  id?: number;
  id_firma: number;
  idplanilla: number;
  estado: number;
  ci: string;
  firma_nombre: string;
  orden: number;
}

export interface ListaPlanillasFirma {
  id?: number;
  nombrePlanilla: string;
}