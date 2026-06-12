import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { MetodosDeEvaluacion, RangosDeEvaluacion } from '../types/metodosDeEvaluacion.types';

interface MetodoApi {
  id: string | number;
  nombre: string;
  descripcion: string;
  calificacionMax: string | number;
  fecha: string;
}

interface RangoApi {
  id: string | number;
  nombre: string;
  cantidad: string | number;
  fecha: string;
  idMetodoDeEvaluacion?: string | number;
}

const sanearMetodo = (item: MetodoApi): MetodosDeEvaluacion => ({
  ...item,
  id: Number(item.id),
  calificacionMax: Number(item.calificacionMax) || 0,
  fecha: item.fecha ? new Date(item.fecha + 'T00:00:00') : new Date()
});

const sanearRango = (item: RangoApi, idMetodo?: number): RangosDeEvaluacion => ({
  ...item,
  id: Number(item.id),
  cantidad: Number(item.cantidad) || 0,
  fecha: item.fecha ? new Date(item.fecha + 'T00:00:00') : new Date(),
  idMetodoDeEvaluacion: idMetodo ?? Number(item.idMetodoDeEvaluacion)
});

export const metodosDeEvaluacionService = {
  async listarMetodosDeEvaluacion(): Promise<MetodosDeEvaluacion[]> {
    const { data } = await api.get<MetodoApi[]>(`listaMetodoevaluacion/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearMetodo) : [];
  },

  async guardarMetodoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', formData);
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
    const { data } = await api.get<RespuestaApi>(`eliminarMetodoevaluacion/${id}`);
    return data;
  },

  async listarRangosDeEvaluacion(idMetodo: number): Promise<RangosDeEvaluacion[]> {
    const { data } = await api.get<RangoApi[]>(`listaRangoevaluacion/${idMetodo}`);
    return Array.isArray(data) ? data.map(item => sanearRango(item, idMetodo)) : [];
  },

  async guardarRangoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', formData);
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
    const { data } = await api.get<RespuestaApi>(`eliminarRangoevaluacion/${id}`);
    return data;
  },
}
