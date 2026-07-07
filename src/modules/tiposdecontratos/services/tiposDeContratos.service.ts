import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const sanearTipoDeContrato = (item: TipoDeContrato): TipoDeContrato => ({
  ...item,
  id: Number(item.id)
})

export const tiposDeContratosService = {
  async listarTiposDeContratos(): Promise<TipoDeContrato[]> {
    const { data } = await api.get(`/listaTipocontrato/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearTipoDeContrato) : [];
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
    const urlAd = 'https://mistersofts.com/app/ad/'
    const { data } = await api.get(`${urlAd}api/listatipocontrato`);
    return data;
  },

  // async procesarImportacionEstandar(formData: FormData): Promise<RespuestaApi> {
  //   const { data } = await api.post('/', formData);
  //   return data;
  // }
};