export interface MenuNodo {
  titulo: string;
  codigo: string;
  permiso?: string;   // Permisos de lectura/escritura (ej: "1111")
  submenu?: MenuNodo[];  // Array recursivo: Aquí vienen los submenús y los tabs
}

// export interface MenuNodo {
//   idmenu: string;
//   modulo: string;
//   titulo: string;
//   codigo: string;
//   idp?: string;       // ID del padre (opcional por seguridad)
//   posp?: string;
//   posi?: string;
//   permiso?: string;   // Permisos de lectura/escritura (ej: "1111")
//   hijo?: MenuNodo[];  // Array recursivo: Aquí vienen los submenús y los tabs
// }

// Interfaz plana para las pestañas de la vista (Tabs del Nivel 3)
export interface TabItem {
  codigo: string;
  titulo: string;
  icono: string;
  permiso: string;
}

// Diccionario tipado para los iconos
export type IconConfig = Record<string, string>;

export interface PaginaPermitido {
  titulo: string;
  codigo: string;
  permiso: string;
}


////Antiguo Codigo

// export interface MenuItem {
//   codigo: string;
//   titulo: string;
//   submenu: SubmenuItem[];
// }

// export interface SubmenuItem {
//   codigo: string;
//   titulo: string;
//   permiso: string;
// }

// export interface TabItem {
//   codigo: string;
//   titulo: string;
//   icono: string;
//   permiso: string;
// }

// export interface PaginasConfig {
//   [key: string]: readonly string[];
// }

// export interface IconConfig {
//   [key: string]: string;
// }

// export interface PaginaPermitido {
//   titulo: string;
//   codigo: string;
//   permiso: string;
// }