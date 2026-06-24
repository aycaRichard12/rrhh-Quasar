import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Area, Sucursal } from '../types/areas.types';

const sanearArea = (item: Area): Area => {
  return {
    ...item,
    id: Number(item.id),
    // Blindamos la sucursal por si el backend manda null o algo inconsistente
    sucursal: (item.sucursal && typeof item.sucursal === 'object') ? {
      idsucursal: Number(item.sucursal.idsucursal || 0),
      nombre: String(item.sucursal.nombre || ''),
      region: String(item.sucursal.region || ''),
      idregion: Number(item.sucursal.idregion || 0)
    } : {
      idsucursal: 0,
      nombre: '',
      region: '',
      idregion: 0
    }
  };
};

const sanearSucursal = (item: Sucursal): Sucursal => {
  return {
    ...item,
    id: Number(item.id),
    idregion: Number(item.idregion),
    idempresa: Number(item.idempresa)
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
    const { data } = await api.post('/', payload);
    return data;
  },

  async eliminarArea(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarAreas/${id}`);
    return data;
  }
};