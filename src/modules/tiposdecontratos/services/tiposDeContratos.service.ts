import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

const ID_EMPRESA = (): string => idempresa_md5();

export const tiposDeContratosService = {
  async listarTiposDeContratos(): Promise<TipoDeContrato[]> {
    const respuesta = await api.get<TipoDeContrato[]>(`/app/rrhh/api/listaTipocontrato/${ID_EMPRESA()}`);
    return respuesta.data;
  },

  async guardarTipoDeContrato(formData: FormData): Promise<RespuestaApi> {
    const respuesta = await api.post<RespuestaApi>('/app/rrhh/api/', formData);
    return respuesta.data;
  },

  async editarTipoDeContrato(id: string | number): Promise<RespuestaApi<TipoDeContrato>> {
    const respuesta = await api.get<RespuestaApi<TipoDeContrato>>(`/app/rrhh/api/verificarIDtipocontrato/${id}`);
    return respuesta.data;
  },

  async eliminarTipoDeContrato(id: string | number): Promise<RespuestaApi> {
    const respuesta = await api.get<RespuestaApi>(`/app/rrhh/api/eliminarTipocontrato/${id}`);
    return respuesta.data;
  },

  async listarTiposDeContratosEstandar(): Promise<TipoDeContrato[]> {
    const respuesta = await api.get<TipoDeContrato[]>('/app/ad/api/listatipocontrato');
    return respuesta.data;
  },

  async procesarImportacionEstandar(formData: FormData): Promise<RespuestaApi> {
    const respuesta = await api.post<RespuestaApi>('/app/rrhh/api/', formData);
    return respuesta.data;
  }
};