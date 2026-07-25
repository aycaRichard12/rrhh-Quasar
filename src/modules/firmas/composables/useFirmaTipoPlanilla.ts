import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { firmaTipoPlanillaService } from '../services/firmaTipoPlanilla.service';
import type { FirmaTipoPlanilla } from '../types/firmaTipoPlanilla.types';
import type { Firma } from '../types/firmas.types';
import { useTipoPlanilla } from './useTipoPlanilla';

export function useFirmaTipoPlanilla() {
  const listaFirmasTipoPlanilla = ref<FirmaTipoPlanilla[]>([]);
  const firmaSeleccionada = ref<Firma | null>(null);
  const { listaTipoPlanillas, cargarTipoPlanillas } = useTipoPlanilla();

  const cargandoPlanillas = ref(false);
  const esVistaFirmaTipoPlanilla = ref(false);
  const esVisibleDialogoPlanilla = ref(false);
  const esModoEdicionPlanilla = ref(false);

  const firmaTipoPlanillaActual = ref<FirmaTipoPlanilla>({
    nombrePlanilla: '',
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarFirmasTipoPlanilla = async (idFirma: number): Promise<void> => {
    cargandoPlanillas.value = true;
    try {
      listaFirmasTipoPlanilla.value = await firmaTipoPlanillaService.listarFirmaTipoplanilla(idFirma);
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargandoPlanillas.value = false;
    }
  };

  const gestionarFirmas = (firma: Firma): void => {
    if (!firma.idfirma) return;
    firmaSeleccionada.value = firma;
    esVistaFirmaTipoPlanilla.value = true;
    void cargarFirmasTipoPlanilla(firma.idfirma);
  };

  const alternarVista = (): void => {
    esVistaFirmaTipoPlanilla.value = !esVistaFirmaTipoPlanilla.value;
    if (!esVistaFirmaTipoPlanilla.value) {
      firmaSeleccionada.value = null;
    }
  };

  const nuevaFirmaTipoPlanilla = (idPlanilla: number) => {
    firmaTipoPlanillaActual.value = {
      id: idPlanilla,
      nombrePlanilla: ''
    };
    esModoEdicionPlanilla.value = false;
    esVisibleDialogoPlanilla.value = true;
  };

  const guardarFirmaTipoPlanilla = async (datos: FirmaTipoPlanilla): Promise<void> => {
    try {
      await cargarTipoPlanillas();
      const planillaSeleccionada = listaTipoPlanillas.value.find(
        (p) => Number(p.id_tipoPlanilla) === Number(datos.id) 
      );
      const hashPlanilla = planillaSeleccionada ? planillaSeleccionada.id_tipoPlanilla : '';
      const payload = {
        ver: esModoEdicionPlanilla.value ? 'editarFirmaTipoPlanilla' : 'registrarFirmaTipoPlanilla',
        ...datos,
        id_firma: firmaSeleccionada.value?.idfirma,
        idplanilla: hashPlanilla
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmaTipoPlanillaService.accionFirmaTipoPlanilla(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoPlanilla.value = false;
        if (firmaSeleccionada.value?.idfirma) {
          void cargarFirmasTipoPlanilla(firmaSeleccionada.value.idfirma);
        }
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const eliminarFirmaTipoPlanilla = (idFirmaTipoPlanilla: number): void => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const payload = {
          ver: 'eliminarFirmaTipoPlanilla',
          id: idFirmaTipoPlanilla,
        };
        const datosFormulario = prepararDatosFormulario(payload);
        const respuesta = await firmaTipoPlanillaService.accionFirmaTipoPlanilla(datosFormulario);

        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          if (firmaSeleccionada.value?.idfirma) {
            void cargarFirmasTipoPlanilla(firmaSeleccionada.value.idfirma);
          }
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaFirmasTipoPlanilla, firmaSeleccionada,
    cargandoPlanillas, esVistaFirmaTipoPlanilla, esVisibleDialogoPlanilla, esModoEdicionPlanilla,
    firmaTipoPlanillaActual,
    gestionarFirmas, alternarVista, cargarFirmasTipoPlanilla,
    nuevaFirmaTipoPlanilla, guardarFirmaTipoPlanilla, eliminarFirmaTipoPlanilla
  };
}