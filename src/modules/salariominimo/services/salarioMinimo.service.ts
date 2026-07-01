import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { SalarioMinimo } from '../types/salarioMinimo.types';

const sanearSalarioMinimo = (item: SalarioMinimo): SalarioMinimo => ({
	...item,
	id: Number(item.id),
	anio: Number(item.anio),
	monto: Number(item.monto),
	estado: Number(item.estado),
	porcentaje: Number(item.porcentaje)
});

export const salarioMinimoService= {
	async listarSalariosMinimos(): Promise<SalarioMinimo[]> {
		const { data } = await api.get(`listasalariominimo/${idempresa_md5()}`);
		return Array.isArray(data) ? data.map(sanearSalarioMinimo) : [];
	},

	async guardarSalarioMinimo(payload: FormData): Promise<RespuestaApi> {
		const { data } = await api.post('/', payload);
		return data;
	},

	async editarSalarioMinimo(id: number): Promise<RespuestaApi<SalarioMinimo>> {
		const  { data } = await api.get(`verificarIDsalariominimo/${id}`);
		return data;
	},

	async eliminarSalarioMinimo(id: number): Promise<RespuestaApi> {
		const { data } = await api.get(`eliminarsalariominimo/${id}`);
		return data;
	},
	
	async cambiarEstadoSalarioMinimo(id: number, estado: number): Promise<RespuestaApi> {
		const { data } = await api.get(`cambiarestadosalariominimo/${id}/${estado}/${idempresa_md5()}`);
		return data;
	},

	async listarSalariosMinimosEstandar(): Promise<SalarioMinimo[]> {
		const urlAd = 'https://mistersofts.com/app/ad/'
		const { data } = await api.get(`${urlAd}api/listasalario`);
		return Array.isArray(data) ? data.map(sanearSalarioMinimo) : [];
	}
}