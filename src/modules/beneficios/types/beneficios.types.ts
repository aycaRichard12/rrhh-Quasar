// Si ya tienes RespuestaApi en un archivo global (ej: src/types/index.ts), 
// puedes borrarla de aquí e importarla.
export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}

export interface Beneficio {
  id?: string; // Opcional porque al crear uno nuevo no tiene ID aún
  nombre: string;
  descripcion: string;
  tipo: string;
  cantidad: string | number;
  estado?: string;
  orden: string | number;
  destino: string;
}

// Aunque es casi idéntico a Beneficio, creamos una interfaz para los 
// beneficios estándar por si en el futuro la API de /ad/ devuelve más campos.
export interface BeneficioEstandar {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string; // Ojo: Aquí la API devuelve "Porcentaje" en lugar de "1"
  cantidad: string | number;
  estado: string;
  orden: string | number;
  destino: string;
}