import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { EnteRegulador} from '../types/entesReguladores.types';

const ID_EMPRESA = idempresa_md5();

export const entesReguladoresService = {
  async obtenerEntesReguladores(): Promise<EnteRegulador[]> {
    const { data } = await api.get(`listaEntesreguladores/${ID_EMPRESA}`);
    return data;
  },

  async verificarEnteRegulador(id: string | number): Promise<RespuestaApi<EnteRegulador>> {
    const { data } = await api.get(`verificarIDentesreguladores/${id}`);
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

  async eliminarEnteRegulador(id: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarEntesreguladores/${id}`);
    return data;
  },

  // === SECCIÓN TEMPLATES (ESTÁNDARES) ===
  async obtenerTemplatesEntesReguladores(): Promise<EnteRegulador[]> {
    const { data } = await api.get('app/ad/api/listareguladores');
    return data;
  },

  async importarTemplatesEntesReguladores(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('', payload);
    return data;
  }
};