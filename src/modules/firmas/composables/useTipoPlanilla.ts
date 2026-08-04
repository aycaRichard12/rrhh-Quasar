import { ref } from 'vue';
import { tipoPlanillaService } from '../services/tipoPlanilla.service';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import type { TipoPlanilla } from '../types/tipoPlanilla.types';

export function useTipoPlanilla() {
  const listaTipoPlanillas = ref<TipoPlanilla[]>([]);

  const { notificarErrorAccion } = useNotificaciones();
  
  const cargarTipoPlanillas = async () => {
    try {
      listaTipoPlanillas.value = await tipoPlanillaService.listarTipoPlanillas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  return {
    listaTipoPlanillas,
    cargarTipoPlanillas
  };
}