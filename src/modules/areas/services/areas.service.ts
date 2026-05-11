import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
const ID_EMPRESA = idempresa_md5()

export const areasService = {

  async obtenerAreas() {
    const { data } = await api.get(`listaAreas/${ID_EMPRESA}`);
    return data;
  },

  async obtenerSucursales() {
    const { data } = await api.get(`listaSucursales/${ID_EMPRESA}`);
    return data;
  },

  async verificarArea(id: string | number) {
    const { data } = await api.get(`verificarIDarea/${id}`);
    return data;
  },

  async guardarArea(payload: FormData) {
    const { data } = await api.post('', payload);
    return data;
  },

  async eliminarArea(id: string | number) {
    const { data } = await api.get(`eliminarAreas/${id}`);
    return data;
  }

};