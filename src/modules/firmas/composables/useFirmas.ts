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
    apellido: '',
    idusuario: 0,
    estado: 1
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia } = useNotificaciones();

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
      apellido: '',
      idusuario: 0,
      estado: 1
    };

    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFirma = (idfirma: number): void => {
  const firma = listaFirmas.value.find(
    item => item.idfirma === idfirma
  );

  if (!firma) {
    return;
  }

  const usuario = firma.idusuario;

  firmaActual.value = {
    ...firma,
    idusuario: usuario
  };

  esModoEdicion.value = true;
  esVisibleDialogo.value = true;
};

  const ejecutarAccionFirma = async (datos: Firma): Promise<void> => {
    try {
      const payload = esModoEdicion.value
        ? {
            ver: 'editarFirma',
            idfirma: datos.idfirma,
            nombre: datos.nombre,
            ci: datos.ci,
            cargo: datos.cargo
          }
        : {
            ver: 'registrarFirma',
            idusuario: datos.idusuario,
            nombre: datos.nombre,
            ci: datos.ci,
            cargo: datos.cargo
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

  const eliminarFirma = async (idfirma: number): Promise<void> => {
    try {
      const payload = {
        ver: 'eliminarFirma',
        idfirma: idfirma
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.accionFirma(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('eliminar');
        await cargarFirmas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('eliminar');
    }
  };

  const cambiarEstadoRegistro = async (firma: Firma): Promise<void> => {
    if (firma.idfirma === undefined) {
      return;
    }
    const nuevoEstado = firma.estado === 1 ? 2 : 1;
    try {
      await firmasService.cambiarEstadoFirma(
        firma.idfirma,
        nuevoEstado
      );
      notificarExitoAccion('guardar');
      await cargarFirmas();
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