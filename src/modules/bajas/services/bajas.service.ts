import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Baja } from '../types/bajas.types';

const sanearBaja = (item: Baja): Baja => {
  return {
    ...item,
    id: Number(item.id),
    tipo: Number(item.tipo),
    idmotivo: Number(item.idmotivo),
    idtrabajador: Number(item.idtrabajador),
    ci: Number(item.ci),
    idcargo: Number(item.idcargo),
    idcontrato: Number(item.idcontrato)
  };
};

export const bajasService = {
  async listarBajas(): Promise<Baja[]> {
    const { data } = await api.get(`listabaja/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearBaja) : [];
  },

  async guardarBaja(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarBaja(id: number): Promise<RespuestaApi<Baja>>{
    const {data } = await api.get(`verificarIDbaja/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearBaja(data.datos)
      };
    }
    return data;
  },

  async eliminarBaja(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarbaja/${id}`);
    return data;
  },
};