import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { MetodoDeEvaluacion, RangoDeEvaluacion } from '../types/metodosDeEvaluacion.types';

const sanearMetodo = (item: MetodoDeEvaluacion): MetodoDeEvaluacion => ({
  ...item,
  id: Number(item.id),
  calificacionMax: Number(item.calificacionMax)
});

const sanearRango = (item: RangoDeEvaluacion): RangoDeEvaluacion => ({
  ...item,
  id: Number(item.id),
  cantidad: Number(item.cantidad),
  idMetodoDeEvaluacion: Number(item.idMetodoDeEvaluacion)
});

export const metodosDeEvaluacionService = {
  //______________________ Métodos de Evaluación______________________________
  async listarMetodosDeEvaluacion(): Promise<MetodoDeEvaluacion[]> {
    const { data } = await api.get(`listaMetodoevaluacion/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearMetodo) : [];
  },

  async guardarMetodoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarMetodoDeEvaluacion(id: number): Promise<RespuestaApi<MetodoDeEvaluacion>> {
    const { data } = await api.get(`verificarIDMetodoevaluacion/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearMetodo(data.datos),
      };
    }
    return data;
  },

  async eliminarMetodoDeEvaluacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarMetodoevaluacion/${id}`);
    return data;
  },
  //______________________ Rangos de Evaluación______________________________
  async listarRangosDeEvaluacion(idMetodoDeEvaluacion: number): Promise<RangoDeEvaluacion[]> {
    const { data } = await api.get(`listaRangoevaluacion/${idMetodoDeEvaluacion}`);
    return Array.isArray(data) ? data.map(sanearRango) : [];
  },

  async guardarRangoDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarRangoDeEvaluacion(id: number): Promise<RespuestaApi<RangoDeEvaluacion>> {
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