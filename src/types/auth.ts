export interface Empresa {
  nombre: string;
  licencia: string;
  idempresa: string;
  nit: string;
  idsucursal: string;
  region: string | null;
  idtiponegocio: string;
  direccion: string;
  email: string;
  fex: string;
  logo: string;
  ocelular: string;
  telefono: string;
  ocierrefiscal: string;
  ociudad: string;
  oestado: string;
  onempleador: string | null;
  onpatronal: string | null;
  opais: string;
  ositioweb: string;
  idregion: string;
  sucursal: string;
  tipo: string;
  tiponegocio: string;
  idnt: number;
}

export interface Factura {
  access_token: string;
  token: string;
  tipof: string;
  expires_in: string;
  tipo: number;
  token_type: string;
}

export interface Submenu {
  titulo: string;
  codigo: string;
  permiso: string;
}

export interface Menu {
  titulo: string;
  codigo: string;
  usuario?: string;
  submenu: Submenu[];
}

export interface UserResponse {
  ok: "success" | "error";
  login: string;
  idusuario: string;
  usuario: string;
  nombre: string;
  cargo: string;
  idcargo: string;
  area: string;
  idarea: string;
  empresa: Empresa;
  factura: Factura;
  menu: Menu[];
}

export interface LoginPayload {
  action: "login";
  usuario: string;
  password:  string;
  modulo: "rrhh";
}
