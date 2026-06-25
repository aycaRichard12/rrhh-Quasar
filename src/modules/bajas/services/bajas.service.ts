import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Baja } from '../types/bajas.types';
import type { MotivosDeBaja } from 'src/modules/motivosdebaja/types/motivosDeBaja.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';
import type { Trabajador } from 'src/modules/trabajadores/types/trabajadores.types';

const sanearBaja = (item: Baja): Baja => {
  return {
    ...item,
    id: Number(item.id),
    tipo: Number(item.tipo),
    idmotivo: Number(item.idmotivo),
    idtrabajador: Number(item.idtrabajador),
    ci: Number(item.ci),
    idcargo: Number(item.cargo),
    idcontrato: Number(item.idcontrato)
  };
};

const sanearMotivo = (item: MotivosDeBaja): MotivosDeBaja => ({
  ...item,
  id: Number(item.id),
  tipo: Number(item.tipo)
});

const sanearCargo = (item: Cargo): Cargo => ({
  ...item,
  id: Number(item.id),
  salario: Number(item.salario),
  idarea: Number(item.idarea)
})

const sanearTrabajador = (item: Trabajador): Trabajador => {
	return {
		...item,
		id: Number(item.id),
		ci: String(item.ci ?? ''),
		telefono: String(item.telefono ?? ''),
		
		fechan: item.fechan ? String(item.fechan) : null,
		fecha: item.fecha ? String(item.fecha) : null,
		
		estado: Number(item.estado) || '',
		estadot: Number(item.estadot) || '',
		idcargo: Number(item.idcargo) || '',
		salario: Number(item.salario) || '',
		sexo: Number(item.sexo),
		estadocivil: Number(item.estadocivil) || '',
	};
};

export const bajasService = {
  async listarBajas(): Promise<Baja[]> {
    const { data } = await api.get(`listabaja/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearBaja) : [];
  },

  async guardarBaja(payload: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', payload);
    return data;
  },

  async eliminarBaja(id: number): Promise<RespuestaApi> {
    const { data } = await api.get(`eliminarAreas/${id}`);
    return data;
  },

  async listarMotivosDeBaja(): Promise<MotivosDeBaja[]> {
    const { data } = await api.get(`listamotivobaja/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearMotivo) : [];
  },
      
	async listarCargos(): Promise<Cargo[]> {
    const { data } = await api.get(`listaCargos/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearCargo) : [];
  },

	async listarTrabajadores(): Promise<Trabajador[]> {
			const { data } = await api.get(`listatrabajador/${idempresa_md5()}`);
			return Array.isArray(data) ? data.map(sanearTrabajador) : [];
		},
};