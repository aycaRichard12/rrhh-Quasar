import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Cargo, AreaMin } from '../types/cargos.types';

const ID_EMPRESA = idempresa_md5();

export const cargosService = {
  async listarCargos(): Promise<Cargo[]> {
    const { data } = await api.get<Cargo[]>(`listaCargos/${ID_EMPRESA}`);
    return data;
  },

  async listarAreas(): Promise<AreaMin[]> {
    const { data } = await api.get<AreaMin[]>(`listaAreas/${ID_EMPRESA}`);
    return data;
  },

  async guardarCargo(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async editarCargo(id: string): Promise<RespuestaApi<Cargo>> {
    const { data } = await api.get<RespuestaApi<Cargo>>(`verificarIDcargo/${id}`);
    return data;
  },

  async eliminarCargo(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarCargo/${id}`);
    return data;
  }
};