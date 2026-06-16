import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { ActividadesDeEvaluacion } from '../types/actividadesdeevaluacion.types';
import type { MetodosDeEvaluacion } from 'src/modules/metodosdeevaluacion/types/metodosDeEvaluacion.types';

const sanearActividad = (item: ActividadesDeEvaluacion): ActividadesDeEvaluacion => {
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
    // 3. Sobrescribimos el string original con el objeto Date real
    fecha: fechaLocal,
    idmetodoevaluacion: Number(item.idmetodoevaluacion),
    calificacionMax: Number(item.calificacionMax)
  };
};

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

export const metodosDeEvaluacionService = {
  //______________________ Actividades de Evaluación______________________________
  async listarActividadesDeEvaluacion(): Promise<ActividadesDeEvaluacion[]> {
    const { data } = await api.get(`listaActividadevaluacion/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearActividad) : [];
  },

  async guardarActividadDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarActividadDeEvaluacion(id: number): Promise<RespuestaApi<ActividadesDeEvaluacion>> {
    const { data } = await api.get(`verificarIDMetodoevaluacion/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearActividad(data.datos)
      };
    }
    return data;
  },

  async eliminarActividadDeEvaluacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarMetodoevaluacion/${id}`);
    return data;
  },
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
}
