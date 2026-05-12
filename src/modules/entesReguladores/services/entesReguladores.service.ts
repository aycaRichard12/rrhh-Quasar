import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { EnteRegulador, RespuestaApi } from '../types/entesReguladores.types';

const ID_EMPRESA = idempresa_md5();

export const entesReguladoresService = {
  async obtenerLista(): Promise<EnteRegulador[]> {
    const { data } = await api.get(`listaEntesreguladores/${ID_EMPRESA}`);
    return data;
  },

  async obtenerPorId(id: string): Promise<RespuestaApi<EnteRegulador>> {
    const { data } = await api.get(`verificarIDentesreguladores/${id}`);
    return data;
  },

  async guardar(datos: EnteRegulador, esEdicion: boolean): Promise<RespuestaApi> {
    const formData = new FormData();
    formData.append('ver', esEdicion ? 'editarEnteregulador' : 'registroEnteregulador');
    formData.append('idempresa', ID_EMPRESA);
    if (datos.id) formData.append('id', datos.id);
    formData.append('nombre', datos.nombre);
    formData.append('porcentaje', datos.porcentaje.toString());
    formData.append('descripcion', datos.descripcion);
    formData.append('monto', datos.monto.toString());
    formData.append('orden', datos.orden.toString());

    const { data } = await api.post('', formData);
    return data;
  },

  async cambiarEstado(id: string, nuevoEstado: string): Promise<RespuestaApi> {
    const { data } = await api.get(`editarEstadoEntesreguladores/${id}/${nuevoEstado}`);
    return data;
  },

  async eliminar(id: string): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarEntesreguladores/${id}`);
    return data;
  },

  async obtenerListaTemplates(): Promise<EnteRegulador[]> {
    const { data } = await api.get('app/ad/api/listareguladores');
    return data;
  },

  async importarTemplates(tipo: number, templates: EnteRegulador[]): Promise<RespuestaApi> {
    const formData = new FormData();
    formData.append('ver', 'reemplazarocopiardatosentesreguladores');
    formData.append('idempresa', ID_EMPRESA);
    formData.append('datos', JSON.stringify(templates));
    formData.append('tipo', tipo.toString());

    const { data } = await api.post('', formData);
    return data;
  }
};