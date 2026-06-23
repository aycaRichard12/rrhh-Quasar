import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { MotivosDeBaja } from '../types/motivosDeBaja.types';

const sanearMotivo = (item: MotivosDeBaja): MotivosDeBaja => ({
  ...item,
  id: Number(item.id),
  tipo: Number(item.tipo)
});

export const motivosDeBajaService = {
  async listarMotivosDeBaja(): Promise<MotivosDeBaja[]> {
      const { data } = await api.get(`listamotivobaja/${idempresa_md5()}`);
      return Array.isArray(data) ? data.map(sanearMotivo) : [];
    },
  
    async guardarMotivoDeBaja(payload: FormData): Promise<RespuestaApi> {
      const { data } = await api.post('/', payload);
      return data;
    },
  
    async editarMotivoDeBaja(id: number): Promise<RespuestaApi<MotivosDeBaja>> {
      const { data } = await api.get(`verificarIDmotivobaja/${id}`);
          if (data.estado === 'exito' && data.datos) {
            return {
              ...data,
              datos: sanearMotivo(data.datos)
            };
          }
      return data;
    },
  
    async eliminarMotivoDeBaja(id: number): Promise<RespuestaApi> {
      const { data } = await api.get(`eliminarmotivobaja/${id}`);
      return data;
    },
}