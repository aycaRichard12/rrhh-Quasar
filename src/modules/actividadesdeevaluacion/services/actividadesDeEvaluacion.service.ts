import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { ActividadDeEvaluacion } from '../types/actividadesDeEvaluacion.types';

const sanearActividad = (item: ActividadDeEvaluacion): ActividadDeEvaluacion => ({
    ...item,
    id: Number(item.id),
    idmetodoevaluacion: Number(item.idmetodoevaluacion),
    calificacionMax: Number(item.calificacionMax)
  });

export const actividadesDeEvaluacionService = {
  async listarActividadesDeEvaluacion(): Promise<ActividadDeEvaluacion[]> {
    const { data } = await api.get(`listaActividadevaluacion/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearActividad) : [];
  },

  async guardarActividadDeEvaluacion(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarActividadDeEvaluacion(id: number): Promise<RespuestaApi<ActividadDeEvaluacion>> {
    const { data } = await api.get(`verificarIDActividadevaluacion/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearActividad(data.datos)
      };
    }
    return data;
  },

  async eliminarActividadDeEvaluacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarActividadevaluacion/${id}`);
    return data;
  },
}