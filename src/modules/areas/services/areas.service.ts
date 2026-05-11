import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
const ID_EMPRESA = idempresa_md5()
// 1. Configuramos el "mini-cliente" (Instancia)


export const areasService = {

  async obtenerAreas() {
    // 2. Extraemos 'data' directamente. ¡Adiós a res.json() y res.ok!
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
    // 3. Para POST, solo pasamos la ruta '/' y el payload al lado
    const { data } = await api.post('', payload);
    return data;
  },

  async eliminarArea(id: string | number) {
    const { data } = await api.get(`eliminarAreas/${id}`);
    return data;
  }

};



// ANTES

// const BASE_URL = 'https://vivasoft.link/app/rrhh/api';
// const ID_EMPRESA = 'd09bf41544a3365a46c9077ebb5e35c3';

// export const areasService = {
//   async obtenerAreas() {
//     const res = await fetch(`${BASE_URL}/listaAreas/${ID_EMPRESA}`);
//     if (!res.ok) throw new Error('Error al obtener áreas');
//     return await res.json();
//   },

//   async obtenerSucursales() {
//     const res = await fetch(`${BASE_URL}/listaSucursales/${ID_EMPRESA}`);
//     if (!res.ok) throw new Error('Error al obtener sucursales');
//     return await res.json();
//   },

//   async verificarArea(id: string | number) {
//     const res = await fetch(`${BASE_URL}/verificarIDarea/${id}`);
//     if (!res.ok) throw new Error('Error al verificar área');
//     return await res.json();
//   },

//   async guardarArea(payload: FormData) {
//     const res = await fetch(`${BASE_URL}/`, { method: 'POST', body: payload });
//     if (!res.ok) throw new Error('Error al guardar área');
//     return await res.json();
//   },

//   async eliminarArea(id: string | number) {
//     const res = await fetch(`${BASE_URL}/eliminarAreas/${id}`);
//     if (!res.ok) throw new Error('Error al eliminar área');
//     return await res.json();
//   }
// };
