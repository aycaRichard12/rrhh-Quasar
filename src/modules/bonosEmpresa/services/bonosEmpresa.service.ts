import { api } from 'boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const ID_EMPRESA = idempresa_md5();

export const bonosEmpresaService = {

  async listarBonosEmpresa(): Promise<BonoEmpresa[]> {
    const { data } = await api.get<BonoEmpresa[]>(`/listaBonosEmpresa/${ID_EMPRESA}`);
    return data;
  },

  async guardarBonoEmpresa(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async cambiarEstadoBonoEmpresa(id: string, estado: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`/editarEstadoBonosEmpresa/${id}/${estado}`);
    return data;
  },

  async editarBonoEmpresa(id: string): Promise<RespuestaApi<BonoEmpresa>> {
    const { data } = await api.get<RespuestaApi<BonoEmpresa>>(`/verificarIDBonosEmpresa/${id}`);
    return data;
  },

  async eliminarBonoEmpresa(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`/eliminarBonosEmpresa/${id}`);
    return data;
  },

  async listarBonosEmpresaEstandar(): Promise<BonoEmpresa[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get<BonoEmpresa[]>(`${urlAd}api/listabonosempresa`);
    return data;
  },

  async procesarImportacionEstandar(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  }
  
};