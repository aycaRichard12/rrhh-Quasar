import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

const sanearPrerrequisito = (item: PrerrequisitoCargo): PrerrequisitoCargo => ({
  ...item,
  id: Number(item.id),
  idcargo: Number(item.idcargo),
})

const sanearCargo = (item: Cargo): Cargo => ({
  ...item,
  id: Number(item.id),
})

export const prerrequisitosCargoService = {
  async listarPrerrequisitos(): Promise<PrerrequisitoCargo[]> {
    const { data } = await api.get(`listaPrerrequisito/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearPrerrequisito) : [];
  },

  async listarCargos(): Promise<Cargo[]> {
    const { data } = await api.get(`listaCargos/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearCargo) : [];
  },

  async guardarPrerrequisito(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarPrerrequisito(id: number): Promise<RespuestaApi<PrerrequisitoCargo>> {
    const { data } = await api.get(`verificarIDPrerrequisito/${id}`);
    return data;
  },

  async eliminarPrerrequisito(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarPrerrequisito/${id}`);
    return data;
  }
};