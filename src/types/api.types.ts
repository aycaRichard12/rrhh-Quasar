/**
 * Interfaz genérica para las respuestas de la API del sistema base antiguo.
 * Se usa en todos los módulos.
 */
export interface RespuestaApi<T = undefined> {
  estado: 'exito' | 'error';
  mensaje: string;
  datos?: T;
}