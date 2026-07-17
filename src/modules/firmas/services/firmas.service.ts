import { api, apims} from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Firma, ListaPlanillasFirma, TipoPlanilla, Usuario } from '../types/firmas.types';

const sanearFirma = (item: Firma): Firma => ({
  ...item,
  idfirma: Number(item.idfirma),
  idusuario: Number(item.idusuario),
  estado: Number(item.estado)
});

const sanearUsuario = (item: Usuario): Usuario => ({
  ...item,
  id: Number(item.id)
})

const sanearListaPlanillasFirma = (item: ListaPlanillasFirma): ListaPlanillasFirma => ({
  ...item,
  id: Number(item.id)
})

const sanearTipoPlanilla = (item: TipoPlanilla): TipoPlanilla => ({
  ...item,
  id_tipoPlanilla: Number(item.id_tipoPlanilla),
  orden: Number(item.orden),
  estado: Number(item.estado)
})

// const sanearFirmaTipoPlanilla = (item: FirmaTipoPlanilla): FirmaTipoPlanilla => ({
//   ...item,
//   id: Number(item.id),
//   id_firma: Number(item.id_firma),
//   idplanilla: Number(item.idplanilla),
//   estado: Number(item.estado),
//   orden: Number(item.orden)
// })

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

  async listarUsuarios(): Promise<Usuario[]> {
    const { data } = await api.get(`/listar_usuarios/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearUsuario) : [];
  },

  async listarTipoPlanillas(): Promise<TipoPlanilla[]> {
    const { data } = await apims.get(`/listaTipoPlanilla`);
    return Array.isArray(data) ? data.map(sanearTipoPlanilla) : [];
  },

  async listarPlanillasFirma(id_firma: number): Promise<ListaPlanillasFirma[]> {
    const { data } = await apims.get(`listar_planillas_firma/${id_firma}`);
    return Array.isArray(data) ? data.map(sanearListaPlanillasFirma) : [];
  },

  async accionFirmaTipoPlanilla(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },
}