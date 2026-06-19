import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { MetodosDeEvaluacion, RangosDeEvaluacion } from '../types/metodosDeEvaluacion.types';

const sanearMetodo = (item: MetodosDeEvaluacion): MetodosDeEvaluacion => {
  // 1. Aseguramos extraer el texto de la fecha (por si alguna vez mandan hora, cortamos en la 'T' o el espacio)
  const fechaStr = String(item.fecha);
  const partes = fechaStr.split('-');
  // 2. Creamos una fecha segura (si por algún error la API manda vacío, usamos la fecha actual de respaldo)
  let fechaLocal = new Date();
  if (partes.length >= 3) {
    const year = Number(partes[0]);
    const month = Number(partes[1]);
    const day = Number(partes[2]);
    fechaLocal = new Date(year, month - 1, day);
  }
  return {
    ...item,
    id: Number(item.id),
    calificacionMax: Number(item.calificacionMax),
    // 3. Sobrescribimos el string original con el objeto Date real
    fecha: fechaLocal 
  };
};

const sanearRango = (item: RangosDeEvaluacion): RangosDeEvaluacion => {
  // 1. Aseguramos extraer el texto de la fecha (por si alguna vez mandan hora, cortamos en la 'T' o el espacio)
  const fechaStr = String(item.fecha);
  const partes = fechaStr.split('-');
  // 2. Creamos una fecha segura (si por algún error la API manda vacío, usamos la fecha actual de respaldo)
  let fechaLocal = new Date();
  if (partes.length >= 3) {
    const year = Number(partes[0]);
    const month = Number(partes[1]);
    const day = Number(partes[2]);
    fechaLocal = new Date(year, month - 1, day);
  }
  return {
    ...item,
    id: Number(item.id),
    cantidad: Number(item.cantidad),
    // 3. Sobrescribimos el string original con el objeto Date real
    fecha: fechaLocal,
    idMetodoDeEvaluacion: Number(item.idMetodoDeEvaluacion)
  };
};

export const metodosDeEvaluacionService = {
  //______________________ Métodos de Evaluación______________________________
  async listarMetodosDeEvaluacion(): Promise<MetodosDeEvaluacion[]> {
    const { data } = await api.get(`listaMetodoevaluacion/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearMetodo) : [];
  },

  async guardarMetodoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarMetodoDeEvaluacion(id: number): Promise<RespuestaApi<MetodosDeEvaluacion>> {
    const { data } = await api.get(`verificarIDMetodoevaluacion/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearMetodo(data.datos)
      };
    }
    return data;
  },

  async eliminarMetodoDeEvaluacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarMetodoevaluacion/${id}`);
    return data;
  },
  //______________________ Rangos de Evaluación______________________________
  async listarRangosDeEvaluacion(idMetodoDeEvaluacion: number): Promise<RangosDeEvaluacion[]> {
    const { data } = await api.get(`listaRangoevaluacion/${idMetodoDeEvaluacion}`);
    return Array.isArray(data) ? data.map(sanearRango) : [];
  },

  async guardarRangoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarRangoDeEvaluacion(id: number): Promise<RespuestaApi<RangosDeEvaluacion>> {
    const { data } = await api.get(`verificarIDRangoevaluacion/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearRango(data.datos)
      };
    }
    return data;
  },

  async eliminarRangoDeEvaluacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarRangoevaluacion/${id}`);
    return data;
  },
}
