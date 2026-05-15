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

// Aunque es casi idéntico a Beneficio, creamos una interfaz para los 
// beneficios estándar por si en el futuro la API de /ad/ devuelve más campos.
export interface BeneficioEstandar {
  id         : string | number;
  nombre     : string;
  descripcion: string;
  tipo       : string | number;
  cantidad   : string | number;
  orden      : string | number;
  destino    : string;
  estado     : string;
}