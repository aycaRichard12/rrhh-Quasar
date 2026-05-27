import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { PrerrequisitoCargo, CargoMin } from '../types/prerrequisitosCargo.types';

const ID_EMPRESA = idempresa_md5();

export const prerrequisitosCargoService = {
  async listarPrerrequisitos(): Promise<PrerrequisitoCargo[]> {
    const { data } = await api.get<PrerrequisitoCargo[]>(`listaPrerrequisito/${ID_EMPRESA}`);
    return data;
  },

  async listarCargos(): Promise<CargoMin[]> {
    const { data } = await api.get<CargoMin[]>(`listaCargos/${ID_EMPRESA}`);
    return data;
  },

  async guardarPrerrequisito(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async editarPrerrequisito(id: string): Promise<RespuestaApi<PrerrequisitoCargo>> {
    const { data } = await api.get<RespuestaApi<PrerrequisitoCargo>>(`verificarIDPrerrequisito/${id}`);
    return data;
  },

  async eliminarPrerrequisito(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarPrerrequisito/${id}`);
    return data;
  }
};