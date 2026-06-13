import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const ID_EMPRESA = (): string => idempresa_md5();

export const tiposDeContratosService = {

  async listarTiposDeContratos(): Promise<TipoDeContrato[]> {
    const { data } = await api.get(`/listaTipocontrato/${ID_EMPRESA()}`);
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => {
      return {
        ...item,
        id: Number(item.id),
      } as TipoDeContrato;
    }) : [];
  },

  async guardarTipoDeContrato(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarTipoDeContrato(id: number): Promise<RespuestaApi<TipoDeContrato>> {
    const { data } = await api.get(`/verificarIDtipocontrato/${id}`);
    return data;
  },

  async eliminarTipoDeContrato(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`/eliminarTipocontrato/${id}`);
    return data;
  },

  async listarTiposDeContratosEstandar(): Promise<TipoDeContrato[]> {
    const { data } = await api.get('/listatipocontrato');
    return data;
  },

  async procesarImportacionEstandar(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  }
};