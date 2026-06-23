import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Trabajador } from '../types/trabajadores.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

// const sanearTrabajador = (item: Trabajador): Trabajador => {
//   const fechaStr = String(item.fecha);
//   const partes = fechaStr.split('-');
//   let fechaLocal = new Date();
//   if (partes.length >= 3) {
//     const year = Number(partes[0]);
//     const month = Number(partes[1]);
//     const day = Number(partes[2]);
//     fechaLocal = new Date(year, month - 1, day);
//   }
//   return {
//     ...item,
//     id: Number(item.id),
//     ci: Number(item.ci),
//     telefono: Number(item.telefono),
//     fechan: fechaLocal,
//     estado: Number(item.estado),
//     estadot: Number(item.estadot),
//     fecha: fechaLocal,
//     idcargo: Number(item.idcargo),
//     salario: Number(item.salario),
//     sexo: Number(item.sexo),
//     estadocivil: Number(item.estadocivil),		
//   };
// };
const sanearTrabajador = (item: Trabajador): Trabajador => {
  return {
    ...item,
    id: Number(item.id),
    // ci y telefono deben quedarse como string por los símbolos y letras
    ci: String(item.ci ?? ''),
    telefono: String(item.telefono ?? ''),
    
    // Si la fecha existe la mantenemos, si es null la respetamos
    fechan: item.fechan ? String(item.fechan) : null,
    fecha: item.fecha ? String(item.fecha) : null,
    
    estado: Number(item.estado) || '',
    estadot: Number(item.estadot) || '',
    idcargo: Number(item.idcargo) || '',
    salario: Number(item.salario) || '',
    sexo: Number(item.sexo),
    estadocivil: Number(item.estadocivil) || '',
    // No tocamos ni "contrato" ni "infcontcto", el spread (...item) los transfiere intactos
  };
};

const sanearCargo = (item: Cargo): Cargo => ({
  ...item,
  id: Number(item.id),
  salario: Number(item.salario),
  idarea: Number(item.idarea)
})

export const trabajadoresService = {
  async listarTrabajadores(): Promise<Trabajador[]> {
    const { data } = await api.get(`listatrabajador/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearTrabajador) : [];
  },

  async guardarTrabajador(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },

  async editarTrabajador(id: number): Promise<RespuestaApi<Trabajador>> {
    const { data } = await api.get(`verificarIDtrabajador/${id}`);
    if (data.estado === 'exito' && data.datos) {
      return {
        ...data,
        datos: sanearTrabajador(data.datos)
      };
    }
    return data;
  },

  async eliminarTrabajador(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminartrabajador/${id}`);
    return data;
  },

  async listarCargos(): Promise<Cargo[]> {
    const { data } = await api.get(`listaCargos/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearCargo) : [];
  },
}
