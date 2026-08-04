import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { RespuestaApi } from 'src/types/api.types';
import type { Convocatoria } from '../types/convocatorias.types';

const sanearConvocatoria = (item: Convocatoria): Convocatoria => ({
  ...item,
	id: Number(item.id),
	nvacantes: Number(item.nvacantes),
	estado: Number(item.estado),
	publico: Number(item.publico),
	idcargo: Number(item.idcargo),
	idarea: Number(item.idarea)
});

export const convocatoriasService = {
	async listarConvocatorias(): Promise<Convocatoria[]> {
		const { data } = await api.get(`${idempresa_md5()}`);
		return Array.isArray(data) ? data.map(sanearConvocatoria) : [];
	},

	async guardarConvocatoria(payload: FormData): Promise<RespuestaApi> {
		const { data } = await api.post('/', payload);
		return data;
	},

	async editarConvocatoria(id: number): Promise<RespuestaApi<Convocatoria>> {
		const { data } = await api.get(`${id}`);
		return data;
	},

	// async eliminarConvocatoria(id: number): Promise<RespuestaApi> {
	// 	const {data} = await 
	// }
}