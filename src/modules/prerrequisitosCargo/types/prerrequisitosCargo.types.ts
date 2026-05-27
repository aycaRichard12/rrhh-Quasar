export interface CargoMin {
  id: string;
  cargo: string; // La API devuelve 'cargo' como nombre del puesto
}

export interface PrerrequisitoCargo {
  id?: string;
  nombre: string;
  descripcion: string;
  idcargo: string; // ID relacional que mandamos al guardar
  cargo?: string;  // Nombre visual devuelto por la vista de la API
}