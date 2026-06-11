import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Area, Sucursal } from '../types/areas.types';

export const areasService = {

  async listarAreas(): Promise<Area[]> {
    const { data } = await api.get(`listaAreas/${idempresa_md5()}`);

    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => {
      // Evitamos errores si la API manda string/null en vez de objeto
      const suc = typeof item.sucursal === 'object' && item.sucursal !== null 
        ? (item.sucursal as Record<string, unknown>) 
        : {};

      return {
        ...item,
        id: Number(item.id),
        nombre: String(item.nombre),
        descripcion: String(item.descripcion),
        idsucursal: Number(suc.idsucursal ?? item.idsucursal ?? 0),
        sucursal: {
          ...suc,
          id: Number(suc.id ?? suc.idsucursal ?? item.idsucursal ?? 0),
          nombre: String(suc.nombre ?? suc.sucursal ?? item.sucursal),
          sucursal: String(suc.sucursal ?? suc.nombre ?? item.sucursal),
          idempresa: Number(suc.idempresa ?? 0),
          idregion: Number(suc.idregion ?? 0),
          region: String(suc.region)
        }
      } as Area;
    }) : [];
  },

  async listarSucursales(): Promise<Sucursal[]> {
    const { data } = await api.get(`listaSucursales/${idempresa_md5()}`);

    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => ({
      ...item,
      id: Number(item.id),
      nombre: String(item.nombre ?? item.sucursal),
      sucursal: String(item.sucursal ?? item.nombre),
      idempresa: Number(item.idempresa ?? 0),
      idregion: Number(item.idregion ?? 0),
      region: String(item.region)
    }) as Sucursal) : [];
  },


  async editarArea(id: number): Promise<RespuestaApi<Area>> {
    const { data } = await api.get(`verificarIDarea/${id}`);
    
    if (data.estado === 'exito' && data.datos) {
      const item = data.datos as Record<string, unknown>;
      const suc = typeof item.sucursal === 'object' && item.sucursal !== null 
        ? (item.sucursal as Record<string, unknown>) 
        : {};

      data.datos = {
        ...item,
        id: Number(item.id),
        nombre: String(item.nombre ),
        descripcion: String(item.descripcion),
        idsucursal: Number(suc.idsucursal ?? item.idsucursal ?? 0),
        sucursal: {
          ...suc,
          id: Number(suc.id ?? suc.idsucursal ?? item.idsucursal ?? 0),
          nombre: String(suc.nombre ?? suc.sucursal ?? item.sucursal),
          sucursal: String(suc.sucursal ?? suc.nombre ?? item.sucursal),
          idempresa: Number(suc.idempresa ?? 0),
          idregion: Number(suc.idregion ?? 0),
          region: String(suc.region)
        }
      } as Area;
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