export interface EnteRegulador {
  id?        : string | number;
  nombre     : string;
  descripcion: string;
  porcentaje : string | number;
  monto      : string | number;
  orden      : string | number;
  estado?    : string | number;
}
export interface EnteReguladorEstandar {
  id: string | number; // Sin el "?" porque los del catálogo siempre traen ID
  nombre: string;
  descripcion: string;
  porcentaje: string | number;
  monto: string | number;
  orden: string | number;
  estado: string | number;
}