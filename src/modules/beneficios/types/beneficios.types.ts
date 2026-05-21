export interface Beneficio {
  id?        : string | number;
  nombre     : string;
  descripcion: string;
  tipo       : string | number;
  cantidad   : string | number;
  orden      : string | number;
  destino    : string | number;
  estado?    : string | number;
}