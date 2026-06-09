import { api } from 'src/boot/axios';
import { idempresa_md5, urlApiAdministracion } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Beneficio } from '../types/beneficios.types';

const ID_EMPRESA = idempresa_md5();

const sanearCantidad = (valor: unknown): number => {
  if (valor === null || valor === undefined || valor === '') return 0;
  if (typeof valor === 'number') return isNaN(valor) ? 0 : valor;
  
  if (typeof valor === 'string') {
    const valorLimpio = valor.replace(/%/g, '').replace(/Bs\.?/gi, '').trim();
    const numero = Number(valorLimpio);
    return isNaN(numero) ? 0 : numero;
  }
  return 0;
};

export const beneficiosService = {
  async listarBeneficios(): Promise<Beneficio[]> {
    const { data } = await api.get(`listabeneficio/${ID_EMPRESA}`);
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => ({
        ...item,
        id: Number(item.id),
        tipo: Number(item.tipo),
        estado: Number(item.estado),
        orden: Number(item.orden),
        destino: Number(item.destino),
        cantidad: sanearCantidad(item.cantidad)
    }) as Beneficio) : [];
  },
  
  async guardarBeneficio(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async editarBeneficio(id: number): Promise<RespuestaApi<Beneficio>> {
    const { data } = await api.get(`verificarIDbeneficio/${id}`);
    if (data.estado === 'exito' && data.datos) {
      data.datos.cantidad = sanearCantidad(data.datos.cantidad);
      data.datos.tipo = Number(data.datos.tipo);
      data.datos.destino = Number(data.datos.destino);
    }
    return data;
  },

  async eliminarBeneficio(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarbeneficio/${id}`);
    return data;
  },

  async cambiarEstadoBeneficio(id: number, estado: number): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadobeneficio/${id}/${estado}`);
    return data;
  },

  async listarBeneficiosEstandar(): Promise<Beneficio[]> {
    const urlAd = urlApiAdministracion();
    const { data } = await api.get(`${urlAd}api/listabeneficios`);
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => ({
        ...item,
        id: Number(item.id),
        tipo: Number(item.tipo),
        estado: Number(item.estado),
        orden: Number(item.orden),
        destino: Number(item.destino),
        cantidad: sanearCantidad(item.cantidad)
    }) as Beneficio) : [];
  },

  async procesarImportacionEstandar(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  }
};