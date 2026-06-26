import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { FuncionYObligacion,} from '../types/funcionesYObligaciones.types';

const sanearFuncionYObligacion = (item: FuncionYObligacion): FuncionYObligacion =>({
  ...item,
  id: Number(item.id),
  idcargo: Number(item.idcargo)
})

export const funcionesYObligacionesService = {
  async listarFuncionesYObligaciones(): Promise<FuncionYObligacion[]> {
    const { data } = await api.get(`/listaFunYoblig/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearFuncionYObligacion) : [];
  },
  
  async guardarFuncionYObligacion(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarFuncionYObligacion(id: number): Promise<RespuestaApi<FuncionYObligacion>> {
    const { data } = await api.get(`/verificarIDFunYoblig/${id}`);
    return data;
  },

  async eliminarFuncionYObligacion(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`/eliminarFunYoblig/${id}`);
    return data;
  },
};