export interface SubmenuItem {
  codigo: string;
  titulo: string;
  permiso: string;
}

export interface MenuItem {
  codigo: string;
  titulo: string;
  submenu: SubmenuItem[];
}

export interface TabItem {
  codigo: string;
  titulo: string;
  icono: string;
  permiso: string;
}

export interface PaginasConfig {
  [key: string]: readonly string[];
}

export interface IconConfig {
  [key: string]: string;
}

export interface PaginaPermitido {
  titulo: string;
  codigo: string;
  permiso: string;
}
