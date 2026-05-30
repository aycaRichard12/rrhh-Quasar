export interface AreaMin {
  id: string;
  nombre: string;
}

export interface Cargo {
  id?: string;
  cargo: string;
  salario: string;
  descripcion: string;
  area?: string;      // Nombre visual devuelto por listarCargos
  idarea: string;     // ID relacional usado al guardar y editar
}