import { api } from 'src/boot/axios';
import { idempresa_md5, urlApiAdministracion} from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { EnteRegulador } from '../types/entesReguladores.types';

const ID_EMPRESA = idempresa_md5();

export const entesReguladoresService = {

  async listarEntesReguladores(): Promise<EnteRegulador[]> {
    const { data } = await api.get<EnteRegulador[]>(`listaEntesreguladores/${ID_EMPRESA}`);
    return data;
  },

  async guardarEnteRegulador(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async cambiarEstadoEnteRegulador(id: string, estado: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`editarEstadoEntesreguladores/${id}/${estado}`);
    return data;
  },

  async editarEnteRegulador(id: string): Promise<RespuestaApi<EnteRegulador>> {
    const { data } = await api.get<RespuestaApi<EnteRegulador>>(`verificarIDentesreguladores/${id}`);
    return data;
  },

  async eliminarEnteRegulador(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarEntesreguladores/${id}`);
    return data;
  },

  async listarEntesReguladoresEstandar(): Promise<EnteRegulador[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get<EnteRegulador[]>(`${urlAd}api/listareguladores`);
    return data;
  },

  async procesarImportacionEstandar (payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  }
  
};