import { api } from "src/boot/axios";
import { idempresa_md5 } from "src/composables/funcionesGenerales";
import type { RespuestaApi } from "src/types/api.types";
import type { Postulante } from "../types/postulantes.types";

const sanearPostulante = (item: Postulante): Postulante => ({
  ...item,
  id: Number(item.id),
  idconvocatoria: Number(item.idconvocatoria),
  promedio: Number(item.promedio)
});

export const postulantesService = {
  async listarPostulantes(): Promise<Postulante[]>{
    const { data } = await api.get(`/listapostulante/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearPostulante) : [];
  },

  async guardarPostulante(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post(``, payload);
    return data;
  },

  async editarPostulante(id: number): Promise<RespuestaApi<Postulante>> {
    const { data } = await api.get(`/verificarIDpostulante/${id}`);
    if (data.estado === 'exito' && data.datos) {
      data.datos = sanearPostulante(data.datos);
    }
    return data; 
  },

  async eliminarPostulante(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarpostulante/${id}`);
    return data;
  }
}