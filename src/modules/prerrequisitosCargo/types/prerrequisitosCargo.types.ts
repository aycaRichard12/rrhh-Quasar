export interface PrerrequisitoCargo {
  id?: number;
  nombre: string;
  descripcion: string;
  idcargo: number | ''; // ID relacional que mandamos al guardar
  cargo?: string;  // Nombre visual devuelto por la vista de la API
}