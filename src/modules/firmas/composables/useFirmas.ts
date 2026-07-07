import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { firmasService } from '../services/firmas.service';
import type { Firma, Usuario } from '../types/firmas.types';

export function useFirmas() {
  const listaUsuarios = ref<Usuario[]>([]);
  const listaFirmas = ref<Firma[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const firmaActual = ref<Firma>({
    cargo: '',
    ci: '',
    nombre: '',
    idusuario: 0,
    estado: 1
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

  const cargarUsuarios = async () => {
    cargando.value = true;
  try {
    listaUsuarios.value = await firmasService.listarUsuarios();
  } catch (error) {
    console.error(error);
    notificarErrorAccion('cargar');
  } finally {
    cargando.value = false;
  }
};

  const prepararNuevaFirma = (): void => {
    firmaActual.value = {
      cargo: '',
      ci: '',
      nombre: '',
      idusuario: 0,
      estado: 1
    };

    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFirma = async (id: number) => {
    try {
      const respuesta = await firmasService.editarFirma(id);
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

  const ejecutarAccionFirma = async (datosGuardar: Firma) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarFirma': 'registrarFirma',
        ...datosGuardar,
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.accionFirma(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        await cargarFirmas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const eliminarFirma = (idfirma: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const payload = {
          ver: 'eliminarFirma',
          idfirma: idfirma
        };
        const datosFormulario = prepararDatosFormulario(payload);
        const respuesta = await firmasService.accionFirma(datosFormulario);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarFirmas();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cambiarEstadoRegistro = async (idfirma: number) => {
    try {
      const payload = {
        ver: 'cambiarEstadoFirma',
        idfirma
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.accionFirma(datosFormulario);
      if(respuesta.estado === 'exito')
      notificarExitoAccion('guardar');
      void cargarFirmas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaFirmas, firmaActual, listaUsuarios,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarFirmas, prepararNuevaFirma,
    prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
    cambiarEstadoRegistro,
    cargarUsuarios
  };
}