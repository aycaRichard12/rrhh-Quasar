import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Firma } from '../types/firmas.types';

const sanearFirma = (item: Firma): Firma => ({
  ...item,
	idfirma: Number(item.idfirma),
  idusuario: Number(item.idusuario),
  estado: Number(item.estado)
});

export const firmasService = {
  async listarfirmas(): Promise<Firma[]> {
    const { data } = await api.get(`/listaFirmas/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearFirma) : [];
  },

  async guardarfirma(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarfirma(id: number): Promise<RespuestaApi<Firma>> {
    const { data } = await api.get(`/verificarIDFirmasRRHH/${id}`);
    if (data.estado === 'exito' && data.datos) {
            return {
              ...data,
              datos: sanearFirma(data.datos)
            };
          }
      return data;
    },

  async eliminarfirma(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`/eliminarFirma/${id}`);
    return data;
  },

  async cambiarEstadoFirma(id: number, estado: number): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadofirma/${id}/${estado}`);
    return data;
  },
}