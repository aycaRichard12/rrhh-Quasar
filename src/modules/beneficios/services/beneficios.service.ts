import { api } from 'src/boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Beneficio, BeneficioEstandar} from '../types/beneficios.types';

const ID_EMPRESA = idempresa_md5();

export const beneficiosService = {

  async listarBeneficios(): Promise<Beneficio[]> {
    const { data } = await api.get(`listabeneficio/${ID_EMPRESA}`);
    return data;
  },
  
  async guardarBeneficio(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('', payload);
    return data;
  },

  async cambiarEstadoBeneficio(id: string | number, estado: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadobeneficio/${id}/${estado}`);
    return data;
  },

  async actualizarBeneficio(id: string | number): Promise<RespuestaApi<Beneficio>> {
    const { data } = await api.get(`verificarIDbeneficio/${id}`);
    return data;
  },

  async eliminarBeneficio(id: string | number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarbeneficio/${id}`);
    return data;
  },

  async listarBeneficiosEstandar(): Promise<BeneficioEstandar[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get(`${urlAd}api/listabeneficios`);
    return data;
  }
};