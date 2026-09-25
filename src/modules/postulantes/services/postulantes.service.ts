import { api } from "src/boot/axios";
import { idempresa_md5 } from "src/composables/funcionesGenerales";
import type { RespuestaApi } from "src/types/api.types";
import type { Postulante, CalificacionPostulante } from "../types/postulantes.types";

// Usamos Record<string, unknown> para interceptar llaves "sucias" o faltantes del backend
const sanearPostulante = (item: Record<string, unknown>): Postulante => ({
  ...(item as unknown as Postulante),
  id: Number(item.id),
  idconvocatoria: Number(item.idconvocatoria ?? item.convocatoria ?? 0),
  promedio: Number(item.promedio || 0),
});

const sanearCalificacionPostulante = (item: Record<string, unknown>): CalificacionPostulante => ({
  ...(item as unknown as CalificacionPostulante),
  id: Number(item.id),
  nota: Number(item.nota),
  idevaluacionPostulante: Number(item.idevaluacionPostulante),
  idactividadevaluacion: Number(item.idactividadevaluacion),
  calificacionMax: Number(item.calificacionMax),
  idmetodoevaluacion: Number(item.idmetodoevaluacion)
})

export const postulantesService = {
  async listarPostulantes(): Promise<Postulante[]>{
    const { data } = await api.get(`/listapostulante/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(item => sanearPostulante(item as Record<string, unknown>)) : [];
  },

  async guardarPostulante(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post(``, payload);
    return data;
  },

  async editarPostulante(id: number): Promise<RespuestaApi<Postulante>> {
    const { data } = await api.get(`/verificarIDpostulante/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearPostulante(data.datos as Record<string, unknown>)
      };
    }
    return data; 
  },

  async eliminarPostulante(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarpostulante/${id}`);
    return data;
  },

  async guardarConclusionPostulante(id: number, conclusion: string): Promise<RespuestaApi> {
    // Usamos encodeURIComponent para convertir espacios en %20 y evitar que la URL se rompa
    const { data } = await api.get(`cambiarConclucionPostulante/${id}/${encodeURIComponent(conclusion)}`);
    return data;
  },

  async verificarEvaluacionInicial(idPostulante: number): Promise<RespuestaApi> {
    const { data } = await api.get(`verificarPostulanteCalificacion/${idPostulante}`);
    return data;
  },

  async registrarEvaluacionInicial(idPostulante: number): Promise<RespuestaApi> {
    const { data } = await api.get(`registroCalifiacionPostulante/${idPostulante}`);
    return data;
  },

  // async listarMetodosEvaluacion(): Promise<MetodoEvaluacionSelect[]> {
  //   const { data } = await api.get(`listaMetodoevaluacion/${idempresa_md5()}`);
  //   return Array.isArray(data) ? data.map(item => ({
  //     id: Number(item.id),
  //     nombre: String(item.nombre),
  //     calificacionMax: Number(item.calificacionMax)
  //   })) : [];
  // },

  // async listarActividadesEvaluacion(): Promise<ActividadEvaluacionSelect[]> {
  //   const { data } = await api.get(`listaActividadevaluacion/${idempresa_md5()}`);
  //   return Array.isArray(data) ? data.map(item => ({
  //     id: Number(item.id),
  //     nombre: String(item.nombre),
  //     idmetodoevaluacion: Number(item.idmetodoevaluacion)
  //   })) : [];
  // },

  async listarCalificaciones(idEvaluacionPostulante: number): Promise<CalificacionPostulante[]> {
    const { data } = await api.get(`listaCalifiacionPostulante/${idEvaluacionPostulante}`);
    return Array.isArray(data) ? data.map(item => sanearCalificacionPostulante(item as Record<string, unknown>)) : [];
  },

  async guardarCalificacionDetalle(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post(``, payload); // Reemplaza con el endpoint real de guardado de calificación
    return data;
  },

  async eliminarCalificacionDetalle(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarCalificacion/${id}`); // Asumiendo este endpoint
    return data;
  }
};