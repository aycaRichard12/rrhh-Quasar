import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { EnteRegulador } from '../types/entesReguladores.types';

const sanearEnte = (item: EnteRegulador): EnteRegulador => ({
    ...item,
    id: Number(item.id),
    porcentaje: Number(item.porcentaje),
    monto: Number(item.monto),
    orden: Number(item.orden),
    estado: Number(item.estado),
});

export const entesReguladoresService = {

  async listarEntesReguladores(): Promise<EnteRegulador[]> {
    const { data } = await api.get<EnteRegulador[]>(`listaEntesreguladores/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearEnte) : [];
  },

  async guardarEnteRegulador(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async cambiarEstadoEnteRegulador(id: number, estado: number): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`editarEstadoEntesreguladores/${id}/${estado}`);
    return data;
  },

  async editarEnteRegulador(id: number): Promise<RespuestaApi<EnteRegulador>> {
    const { data } = await api.get(`verificarIDentesreguladores/${id}`);
        if (data.estado === 'exito' && data.datos) {
          return {
            ...data,
            datos: sanearEnte(data.datos)
          };
        }
    return data;
  },

  async eliminarEnteRegulador(id: number): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarEntesreguladores/${id}`);
    return data;
  },

  async listarEntesReguladoresEstandar(): Promise<EnteRegulador[]> {
    const urlAd = 'https://mistersofts.com/app/ad/'
    const { data } = await api.get<EnteRegulador[]>(`${urlAd}api/listareguladores`);
    return Array.isArray(data) ? data.map(sanearEnte) : [];
  }
};