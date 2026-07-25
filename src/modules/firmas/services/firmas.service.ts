import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Firma } from '../types/firmas.types';

const sanearFirma = (item: Firma): Firma => ({
  ...item,
  idfirma: Number(item.idfirma),
  idusuario: Number(item.idusuario),
  estado: Number(item.estado)
});

export const firmasService = {
  async listarfirmas(): Promise<Firma[]> {
    const { data } = await api.get(`/listaFirmas/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearFirma) : [];
  },

  async accionFirma(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  // async editarFirma(idfirma: number): Promise<RespuestaApi<Firma>> {
  //   const { data } = await api.get(`/verificarFirma/${idfirma}`);
  //   if (data.estado === 'exito' && data.datos) {
  //     const firma: Firma = {
  //       idfirma: Number(data.datos.idfirma),
  //       cargo: String(data.datos.cargo),
  //       ci: String(data.datos.ci),
  //       nombre: String(data.datos.nombre),
  //       idusuario: Number(data.datos.idusuario),
  //       estado: Number(data.datos.estado)
  //     }
  //     return {
  //       ...data,
  //       datos: firma
  //     };
  //   }
  //   return data;
  // },

  async editarFirma(idfirma: number): Promise<RespuestaApi<Firma>> {
    const { data } = await api.get(`/verificarFirma/${idfirma}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearFirma(data.datos),
      };
    }
    return data;
  },
}