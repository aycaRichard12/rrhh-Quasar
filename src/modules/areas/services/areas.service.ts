import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Area, Sucursal } from '../types/areas.types';


const sanearSucursal = (item: Sucursal): Sucursal => {
  return {
    ...item,
    id: Number(item.id),
    idregion: Number(item.idregion),
    idempresa: Number(item.idempresa)
  };
};

const sanearArea = (item: Area): Area => {
  return {
    ...item,
    id: Number(item.id),
    sucursal: item.sucursal?{
      ...item.sucursal,
      idsucursal: Number(item.sucursal.idsucursal),
      idregion: Number(item.sucursal.idregion),
    }:{
      idsucursal: 0,
      nombre: '',
      region: '',
      idregion: 0
    }
  };
};

export const areasService = {

  async listarAreas(): Promise<Area[]> {
    const { data } = await api.get(`listaAreas/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearArea) : [];
  },

  async listarSucursales(): Promise<Sucursal[]> {
    const { data } = await api.get(`listaSucursales/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearSucursal) : [];
  },

  async editarArea(id: number): Promise<RespuestaApi<Area>> {
    const { data } = await api.get(`verificarIDarea/${id}`);
    
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearArea(data.datos)
      };
    }
    return data;
  },

  async guardarArea(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post<RespuestaApi>('/', payload);
    return data;
  },

  async eliminarArea(id: number): Promise<RespuestaApi> {
    const { data } = await api.get<RespuestaApi>(`eliminarAreas/${id}`);
    return data;
  }
};