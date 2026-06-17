import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { TiposDeSanciones } from '../types/tiposDeSanciones.types';
import type { NivelesDeGravedad } from 'src/modules/niveles/types/niveles.types';

const sanearTipoDeSancion = (item: TiposDeSanciones): TiposDeSanciones => ({
  ...item,
  id: Number(item.id),
  idnivel: Number(item.idnivel)
});

const sanearNivel = (item: NivelesDeGravedad): NivelesDeGravedad => ({
  ...item,
  id: Number(item.id),
  pos: Number(item.pos)
});

export const tiposDeSancionesService = {
  async listarTiposDeSanciones(): Promise<TiposDeSanciones[]> {
      const { data } = await api.get(`listatiposancion/${idempresa_md5()}`);
      return Array.isArray(data) ? data.map(sanearTipoDeSancion) : [];
    },
  
    async guardarTipoDeSancion(payload: FormData): Promise<RespuestaApi> {
      const { data } = await api.post('/', payload);
      return data;
    },
  
    async editarTipoDeSancion(id: number): Promise<RespuestaApi<TiposDeSanciones>> {
      const { data } = await api.get(`verificarIDtiposancion/${id}`);
          if (data.estado === 'exito' && data.datos) {
            return {
              ...data,
              datos: sanearTipoDeSancion(data.datos)
            };
          }
      return data;
    },
  
    async eliminarTipoDeSancion(id: number): Promise<RespuestaApi> {
      const { data } = await api.get(`eliminartiposancion/${id}`);
      return data;
    },

    async listarNivelesDeGravedad(): Promise<NivelesDeGravedad[]> {
      const { data } = await api.get(`listaNiveles/${idempresa_md5()}`);
      return Array.isArray(data) ? data.map(sanearNivel) : [];
    },
}