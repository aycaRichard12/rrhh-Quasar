import { ref } from 'vue';
import { idusuario_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { firmasService } from '../services/firmas.service';
import type { Firma } from '../types/firmas.types';

export function useFirmas() {
  const idUsuario = String(idusuario_md5());
  const listaFirmas = ref<Firma[]>([]);

  const cargando = ref(false);
	const filtroBusqueda = ref('');
	const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);
  
  const firmaActual = ref<Firma>({
		cargo: '',
		ci: '',
		nombre: '',
		idusuario: Number(idUsuario),
		estado: 1,
		apellido: '',
	});

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarFirmas = async () => {
    cargando.value = true;
    try {
      listaFirmas.value = await firmasService.listarfirmas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevaFirma = () => {
    firmaActual.value = {
			cargo: '',
			ci: '',
			nombre: '',
			idusuario: 0,
			estado: 1,
			apellido: ''
		};
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFirma = async (id: number) => {
    try {
      const respuesta = await firmasService.editarfirma(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        firmaActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarFirma = async (datos: Firma) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarFirma' : 'registrarFirma',
        ...datos
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.guardarfirma(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarFirmas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarFirma = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await firmasService.eliminarfirma(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarFirmas();
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

	const cambiarEstadoRegistro = async (firma: Firma) => {
    if (!firma.idfirma) return;
    const nuevoEstado = firma.estado === 1 ? 2 : 1;
    try {
      await firmasService.cambiarEstadoFirma(firma.idfirma, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarFirmas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaFirmas, firmaActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo, 
    cargarFirmas, guardarFirma,
		prepararNuevaFirma, prepararEdicionFirma, confirmarEliminarFirma,
		cambiarEstadoRegistro
  };
}