import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { NivelesDeGravedad } from '../types/niveles.types';

const sanearNivel = (item: NivelesDeGravedad): NivelesDeGravedad => ({
  ...item,
  id: Number(item.id),
  pos: Number(item.pos)
});

export const nivelesService = {
  async listarNivelesDeGravedad(): Promise<NivelesDeGravedad[]> {
      const { data } = await api.get(`listaNiveles/${idempresa_md5()}`);
      return Array.isArray(data) ? data.map(sanearNivel) : [];
    },
  
    async guardarNivelDeGravedad(payload: FormData): Promise<RespuestaApi> {
      const { data } = await api.post('/', payload);
      return data;
    },
  
    async editarNivelDeGravedad(id: number): Promise<RespuestaApi<NivelesDeGravedad>> {
      const { data } = await api.get(`verificarIDniveles/${id}`);
          if (data.estado === 'exito' && data.datos) {
            return {
              ...data,
              datos: sanearNivel(data.datos)
            };
          }
      return data;
    },
  
    async eliminarNivelDeGravedad(id: number): Promise<RespuestaApi> {
      const { data } = await api.get(`eliminarNiveles/${id}`);
      return data;
    },
}