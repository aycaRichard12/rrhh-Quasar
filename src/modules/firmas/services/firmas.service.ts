import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Firma, Usuario } from '../types/firmas.types';

const sanearFirma = (item: Firma): Firma => ({
  ...item,
  idfirma: Number(item.idfirma),
  estado: Number(item.estado)
});

const sanearUsuario = (item: Usuario): Usuario => ({
  ...item,
  id: Number(item.id)
})
export const firmasService = {
  async listarfirmas(): Promise<Firma[]> {
    const { data } = await api.get(`/listaFirmas/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearFirma) : [];
  },

  async accionFirma(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async cambiarEstadoFirma(idfirma: number, estado: number): Promise<RespuestaApi> {
     const { data } = await api.get(`editarEstadofirma/${idfirma}/${estado}`);
     return data;
   },

  async listarUsuarios(): Promise<Usuario[]> {
    const { data } = await api.get(`/listar_usuarios/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearUsuario) : [];
  }
}