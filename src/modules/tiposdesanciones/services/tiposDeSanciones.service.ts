import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { TipoDeSancion } from '../types/tiposDeSanciones.types';

const sanearTipoDeSancion = (item: TipoDeSancion): TipoDeSancion => ({
  ...item,
  id: Number(item.id),
  idnivel: Number(item.idnivel)
});

export const tiposDeSancionesService = {
  async listarTiposDeSanciones(): Promise<TipoDeSancion[]> {
      const { data } = await api.get(`listatiposancion/${idempresa_md5()}`);
      return Array.isArray(data) ? data.map(sanearTipoDeSancion) : [];
    },
  
    async guardarTipoDeSancion(payload: FormData): Promise<RespuestaApi> {
      const { data } = await api.post('/', payload);
      return data;
    },
  
    async editarTipoDeSancion(id: number): Promise<RespuestaApi<TipoDeSancion>> {
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
}