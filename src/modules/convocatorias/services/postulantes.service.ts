import { api } from "src/boot/axios";
import { idempresa_md5 } from "src/composables/funcionesGenerales";
// import type { RespuestaApi } from "src/types/api.types";
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
  }
}