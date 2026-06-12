import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { SueldosYSalarios } from '../types/sueldosYSalarios.types';


export const sueldosYSalariosService = {
  async listarfirmasRRHH(): Promise<SueldosYSalarios[]> {
    const { data } = await api.get(`/firmasRRHH/${idempresa_md5()}`);
    return data;
  },

  async guardarfirmasRRHH(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarfirmasRRHH(id: string): Promise<RespuestaApi<SueldosYSalarios>> {
    const { data } = await api.get(`/verificarIDFirmasRRHH/${id}`);
    return data;
  },

  async eliminarfirmasRRHH(id: string): Promise<RespuestaApi> {
    const { data } = await api.get(`/eliminarFirmasRRHH/${id}`);
    return data;
  },
}