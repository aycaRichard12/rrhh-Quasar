import { api } from 'boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const sanearBonoEmpresa = (item: BonoEmpresa): BonoEmpresa => ({
  ...item,
  id: Number(item.id),
  tipo: Number(item.tipo),
  cantidad: Number(item.cantidad),
  estado: Number(item.estado),
  orden: Number(item.orden),
  destino: Number(item.destino)
})
export const bonosEmpresaService = {
  async listarBonosEmpresa(): Promise<BonoEmpresa[]> {
    const { data } = await api.get(`/listaBonosEmpresa/${idempresa_md5()}`);
    return data.map(sanearBonoEmpresa);
  },

  async guardarBonoEmpresa(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarBonoEmpresa(id: number): Promise<RespuestaApi<BonoEmpresa>> {
    const { data } = await api.get(`/verificarIDBonosEmpresa/${id}`);
    return data;
  },

  async eliminarBonoEmpresa(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`/eliminarBonosEmpresa/${id}`);
    return data;
  },

  async cambiarEstadoBonoEmpresa(id: number, estado: number): Promise<RespuestaApi> {
    const { data } = await api.get(`/editarEstadoBonosEmpresa/${id}/${estado}`);
    return data;
  },

  async listarBonosEmpresaEstandar(): Promise<BonoEmpresa[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get(`${urlAd}api/listabonosempresa`);
    return data;
  },

  // async procesarImportacionEstandar(payload: FormData): Promise<RespuestaApi> {
  //   const { data } = await api.post('/', payload);
  //   return data;
  // }
};