import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { MetodoDePago } from '../types/metodosDePago.types';

const sanearPago = (item: MetodoDePago): MetodoDePago => ({
  ...item,
  id: Number(item.id),
  estado: Number(item.estado),
});

export const metodosDePagoService = {
  async listarMetodosDePago(): Promise<MetodoDePago[]> {
    const { data } = await api.get(`listametodopago/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearPago) : [];
  },

  async guardarMetodoDePago(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarMetodoDePago(id: number): Promise<RespuestaApi<MetodoDePago>> {
    const { data } = await api.get(`verificarIDmetodopago/${id}`);
    return data;
  },
  
  async eliminarMetodoDePago(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarmetodopago/${id}`);
    return data;
  },

  async cambiarEstadoMetodoDePago(id: number, estado: number): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadometodopago/${id}/${estado}`);
    return data;
  },

  async listarMetodosDePagoEstandar(): Promise<MetodoDePago[]> {
    const urlAd = 'https://mistersofts.com/app/ad/'
    const { data } = await api.get(`${urlAd}api/listamodopago`);
    return Array.isArray(data) ? data.map(sanearPago) : [];
  }
};