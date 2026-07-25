import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { firmasService } from '../services/firmas.service';
import type { Firma } from '../types/firmas.types';
import { useUsuarios } from 'src/composables/useUsuario';

export function useFirmas() {
  const listaFirmas = ref<Firma[]>([]);
  const { listaUsuarios, cargarUsuarios } = useUsuarios(); 

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

  const cargarFirmas = async (): Promise<void> => {
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

  const nuevaFirma = (idUsuario: number) => {
    firmaActual.value = {
      cargo: '',
      ci: '',
      nombre: '',
      idusuario: idUsuario,
      estado: 1
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFirma = async (id: number): Promise<void> => {
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

  const ejecutarAccionFirma = async (datosGuardar: Firma): Promise<void> => {
    try {
      console.log('Datos a guardar:', datosGuardar);
      console.log('Lista de usuarios:', listaUsuarios.value);
      await cargarUsuarios(); // Aseguramos que la lista de usuarios esté cargada antes de buscar el hash
      // 1. Buscamos el usuario exacto en nuestra lista de usuarios usando el ID numérico
      const usuarioSeleccionado = listaUsuarios.value.find(
        (u) => u.id === datosGuardar.idusuario
      );

      // 2. Extraemos su hash (string). Si por algún motivo no se encuentra, mandamos vacío.
      const hashUsuario = usuarioSeleccionado ? usuarioSeleccionado.idusuario : '';

      console.log(usuarioSeleccionado)

      const payload = {
        ver: esModoEdicion.value ? 'editarFirma' : 'registrarFirma',
        ...datosGuardar,
        // 3. Sobrescribimos el idusuario numérico con el hash en formato string
        idusuario: hashUsuario
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

  const eliminarFirma = (idfirma: number): void => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const payload = {
          ver: 'eliminarFirma',
          idfirma
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

  const cambiarEstadoRegistro = async (idfirma: number): Promise<void> => {
    try {
      const payload = {
        ver: 'cambiarEstadoFirma',
        idfirma
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.accionFirma(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        void cargarFirmas();
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaFirmas, firmaActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarFirmas, nuevaFirma,
    prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
    cambiarEstadoRegistro
  };
}