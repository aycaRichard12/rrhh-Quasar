import { api } from 'boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const ID_EMPRESA = idempresa_md5();

export const bonosEmpresaService = {

  obtenerBonosEmpresa: async () => {
    const { data } = await api.get<BonoEmpresa[]>(`/listaBonosEmpresa/${ID_EMPRESA}`);
    return data;
  },

  obtenerBonoEmpresaPorId: async (id: string | number) => {
    const { data } = await api.get<RespuestaApi<BonoEmpresa>>(`/verificarIDBonosEmpresa/${id}`);
    return data;
  },

  guardarBonoEmpresa: async (payload: FormData) => {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  editarEstadoBonoEmpresa: async (id: string | number, estado: string | number) => {
    const { data } = await api.get<RespuestaApi>(`/editarEstadoBonosEmpresa/${id}/${estado}`);
    return data;
  },

  eliminarBonoEmpresa: async (id: string | number) => {
    const { data } = await api.get<RespuestaApi>(`/eliminarBonosEmpresa/${id}`);
    return data;
  },

  // con la URL quemada
  // obtenerBonosEstandar: async () => {
  //   // Apunta al endpoint de administración externa
  //   const { data } = await api.get<BonoEmpresa[]>('https://vivasoft.link/app/ad/api/listabonosempresa');
  //   return data;
  // },

  obtenerBonosEstandar: async () => {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get<BonoEmpresa[]>(`${urlAd}api/listabonosempresa`);
    return data;
  },

  procesarImportacionEstandar: async (payload: FormData) => {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  }
};