import { ref } from 'vue';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { sueldosYSalariosService } from '../services/sueldosYSalarios.service';
import type { SueldosYSalarios } from '../types/sueldosYSalarios.types';

export function useSueldosYSalarios() {
  const listaItems = ref<SueldosYSalarios[]>([]);
  const cargando = ref(false);
  const esVisibleDialogo = ref(false);
  const esModoEdicion = ref(false);
  const itemActual = ref<SueldosYSalarios>({ nombre: '', cargo: '', ci: '' });

  const { notificarExitoAccion, notificarErrorAccion, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarItems = async () => {
    cargando.value = true;
    try {
      listaItems.value = await sueldosYSalariosService.listarfirmasRRHH();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevo = () => {
    itemActual.value = { id: '', nombre: '', cargo: '', ci: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicion = async (id: string) => {
    try {
      const resp = await sueldosYSalariosService.editarfirmasRRHH(id);
      if (resp.estado === 'exito' && resp.datos) {
        itemActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardar = async (datos: SueldosYSalarios) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarFirmasRRHH' : 'registrarFirmasRRHH',
        idempresa: idempresa_md5(),
        ...datos
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await sueldosYSalariosService.guardarfirmasRRHH(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarItems();
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const eliminar = (id: string) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await sueldosYSalariosService.eliminarfirmasRRHH(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarItems();
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaItems, cargando, esVisibleDialogo, esModoEdicion, itemActual,
    cargarItems, prepararNuevo, prepararEdicion, guardar, eliminar
  };
}
