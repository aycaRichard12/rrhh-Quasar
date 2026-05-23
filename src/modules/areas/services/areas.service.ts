import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Area, Sucursal } from '../types/areas.types';

const ID_EMPRESA = idempresa_md5()

export const areasService = {

  async listarAreas(): Promise<Area[]> {
    const { data } = await api.get<Area[]>(`listaAreas/${ID_EMPRESA}`);
    return data;
  },

  async listarSucursales(): Promise<Sucursal[]> {
    const { data } = await api.get<Sucursal[]>(`listaSucursales/${ID_EMPRESA}`);
    return data;
  },

  async guardarArea(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async editarArea(id: string): Promise<RespuestaApi<Area>> {
    const { data } = await api.get<RespuestaApi<Area>>(`verificarIDarea/${id}`);
    return data;
  },

  async eliminarArea(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarAreas/${id}`);
    return data;
  }

};