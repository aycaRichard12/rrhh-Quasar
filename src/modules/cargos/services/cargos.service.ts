import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Cargo } from '../types/cargos.types';

const sanearCargo = (item: Cargo): Cargo => ({
  ...item,
  id: Number(item.id),
  salario: Number(item.salario),
  idarea: Number(item.idarea)
})

export const cargosService = {
  async listarCargos(): Promise<Cargo[]> {
    const { data } = await api.get(`listaCargos/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearCargo) : [];
  },

  async guardarCargo(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarCargo(id: number): Promise<RespuestaApi<Cargo>> {
    const { data } = await api.get(`verificarIDcargo/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearCargo(data.datos)
      };
    }
    return data;
  },

  async eliminarCargo(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarCargo/${id}`);
    return data;
  },
};