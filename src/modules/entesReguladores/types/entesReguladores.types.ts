export interface EnteRegulador {
  id?        : string | number;
  nombre     : string;
  descripcion: string;
  porcentaje : string | number;
  monto      : string | number;
  orden      : string | number;
  estado?    : string | number;
}