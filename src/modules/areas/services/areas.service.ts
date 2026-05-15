import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Area, Sucursal } from '../types/areas.types';

const ID_EMPRESA = idempresa_md5()

export const areasService = {

  async obtenerAreas(): Promise<Area[]> {
    const { data } = await api.get(`listaAreas/${ID_EMPRESA}`);
    return data;
  },

  async obtenerSucursales(): Promise<Sucursal[]> {
    const { data } = await api.get(`listaSucursales/${ID_EMPRESA}`);
    return data;
  },

  async verificarArea(id: string | number): Promise<RespuestaApi<Area>> {
    const { data } = await api.get(`verificarIDarea/${id}`);
    return data;
  },

  async guardarArea(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('', payload);
    return data;
  },

  async eliminarArea(id: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarAreas/${id}`);
    return data;
  }
};