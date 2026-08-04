import { api } from 'src/boot/axios';
import type { RespuestaApi } from 'src/types/api.types';
import type { FirmaTipoPlanilla } from '../types/firmaTipoPlanilla.types';

const sanearFirmaTipoPlanilla = (item: FirmaTipoPlanilla): FirmaTipoPlanilla => ({
  ...item,
  id: Number(item.id)
})

export const firmaTipoPlanillaService = {
	async listarFirmaTipoplanilla(id: number): Promise<FirmaTipoPlanilla[]> {
    const { data } = await api.get(`listar_planillas_firma/${id}`);
    return Array.isArray(data) ? data.map(sanearFirmaTipoPlanilla) : [];
  },

  async accionFirmaTipoPlanilla(formData: FormData): Promise<RespuestaApi> {
    const { data } = await api.post('/', formData);
    return data;
  },
}