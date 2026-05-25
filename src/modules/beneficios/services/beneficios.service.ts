import { api } from 'src/boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Beneficio} from '../types/beneficios.types';

const ID_EMPRESA = idempresa_md5();

export const beneficiosService = {

	async listarBeneficios(): Promise<Beneficio[]> {
  const { data } = await api.get<Beneficio[]>(`listabeneficio/${ID_EMPRESA}`);
   return data;
  },
  
  async guardarBeneficio(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async cambiarEstadoBeneficio(id: string, estado: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`editarEstadobeneficio/${id}/${estado}`);
    return data;
  },

  async editarBeneficio(id: string): Promise<RespuestaApi<Beneficio>> {
    const { data } = await api.get<RespuestaApi<Beneficio>>(`verificarIDbeneficio/${id}`);
    return data;
  },

  async eliminarBeneficio(id: string): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarbeneficio/${id}`);
    return data;
  },

  async listarBeneficiosEstandar(): Promise<Beneficio[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get<Beneficio[]>(`${urlAd}api/listabeneficios`);
    return data;
  },

  async procesarImportacionEstandar (payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  }
  
};				