import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { FuncionYObligacion,} from '../types/funcionesYObligaciones.types';

const ID_EMPRESA = idempresa_md5();

export const funcionesYObligacionesService = {
  
  async obtenerFuncionesYObligaciones(): Promise<FuncionYObligacion[]> {
    const { data } = await api.get(`/listaFunYoblig/${ID_EMPRESA}`);
    return Array.isArray(data) ? data : [];
  },
  
  async guardarFuncionYObligacion(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async obtenerFuncionYObligacion(id: string): Promise<RespuestaApi<FuncionYObligacion>> {
    const { data } = await api.get<RespuestaApi<FuncionYObligacion>>(`/verificarIDFunYoblig/${id}`);
    return data;
  },

  async eliminarFuncionYObligacion(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`/eliminarFunYoblig/${id}`);
    return data;
  }
};
