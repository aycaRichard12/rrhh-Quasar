import { api } from 'src/boot/axios';
import type { TipoPlanilla } from '../types/tipoPlanilla.types';

const sanearTipoPlanilla = (item: TipoPlanilla): TipoPlanilla => ({
  ...item,
  id_tipoPlanilla: Number(item.id_tipoPlanilla),
  orden: Number(item.orden),
  estado: Number(item.estado)
})

export const tipoPlanillaService = {
  async listarTipoPlanillas(): Promise<TipoPlanilla[]> {
		const { data } = await api.get(`/listaTipoPlanilla`);
		return Array.isArray(data) ? data.map(sanearTipoPlanilla) : [];
	}
}