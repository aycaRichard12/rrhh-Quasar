import { api } from 'src/boot/axios';
import { idempresa_md5, urlApiAdministracion} from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { EnteRegulador, EnteReguladorEstandar } from '../types/entesReguladores.types';

const ID_EMPRESA = idempresa_md5();

export const entesReguladoresService = {

  async listarEntesReguladores(): Promise<EnteRegulador[]> {
    const { data } = await api.get(`listaEntesreguladores/${ID_EMPRESA}`);
    return data;
  },

  async guardarEnteRegulador(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('', payload);
    return data;
  },

  async cambiarEstadoEnteRegulador(id: string | number, nuevoEstado: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadoEntesreguladores/${id}/${nuevoEstado}`);
    return data;
  },

  async actualizarEnteRegulador(id: string | number): Promise<RespuestaApi<EnteRegulador>> {
    const { data } = await api.get(`verificarIDentesreguladores/${id}`);
    return data;
  },

  async eliminarEnteRegulador(id: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarEntesreguladores/${id}`);
    return data;
  },

  async listarEntesReguladoresEstandar(): Promise<EnteReguladorEstandar[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get(`${urlAd}api/listareguladores`);
    return data;
  }
};