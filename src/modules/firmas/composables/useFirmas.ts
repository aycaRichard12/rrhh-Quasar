import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { firmasService } from '../services/firmas.service';
import type { Firma, FirmaTipoPlanilla, TipoPlanilla, Usuario } from '../types/firmas.types';

export function useFirmas() {
  const listaUsuarios = ref<Usuario[]>([]);
  const listaFirmas = ref<Firma[]>([]);
  const listaTipoPlanillas = ref<TipoPlanilla[]>([]);
  const listaFirmaTipoPlanillas = ref<FirmaTipoPlanilla[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const esVistaFirmaTipoPlanilla = ref(false);
  const esVisibleDialogoFirmaTipoPlanilla = ref(false);
  const listaFirmaSeleccionada = ref<Firma | null>(null);

  const firmaActual = ref<Firma>({
    cargo: '',
    ci: '',
    nombre: '',
    idusuario: 0,
    estado: 1
  });

  const firmaTipoPlanillaActual = ref<FirmaTipoPlanilla>({
    id_firma: 0,
    idplanilla: 0,
    estado: 1,
    ci: '',
    firma_nombre: '',
    orden: 0
  })

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();
  //______________________ FIRMAS______________________________
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
//______________________ FIRMA TIPO PLANILLA ______________________________
  const alternarVista = () => {
    esVistaFirmaTipoPlanilla.value = !esVistaFirmaTipoPlanilla.value;
    if (!esVistaFirmaTipoPlanilla.value) {
      listaFirmaSeleccionada.value = null;
    }
  };

  const gestionarFirmas = (firma: Firma) => {
    if (!firma.idfirma) return;
    listaFirmaSeleccionada.value = firma;
    esVistaFirmaTipoPlanilla.value = true;
    void cargarFirmaTipoPlanillas(firma.idfirma);
  };

  const cargarFirmaTipoPlanillas= async (idFirma: number) => {
    cargando.value = true;
    try {
      listaFirmaTipoPlanillas.value = await firmasService.listarFirmaTipoPlanillas(idFirma);
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const cargarTipoPlanillas= async () => {
    cargando.value = true;
    try {
      listaTipoPlanillas.value = await firmasService.listarTipoPlanillas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevaFirmaTipoPlanilla = () => {
    if (!listaFirmaSeleccionada.value?.idfirma) return;
    firmaTipoPlanillaActual.value = {
      id_firma: listaFirmaSeleccionada.value.idfirma,
      idplanilla: 0,
      estado: 1,
      ci: '',
      firma_nombre: '',
      orden: 0
    };
    esModoEdicion.value = false;
    esVisibleDialogoFirmaTipoPlanilla.value = true;
  };

  // const prepararEdicionFirmaTipoPlanilla = async (id: number) => {
  //   try {
  //     const respuesta = await firmasService.editarFirmaTipoPlanilla(id);
  //     if (respuesta.estado === 'exito' && respuesta.datos) {
  //       firmaTipoPlanillaActual.value = { ...respuesta.datos };
  //       esModoEdicion.value = true;
  //       esVisibleDialogoFirmaTipoPlanilla.value = true;
  //     } else {
  //       notificarAdvertencia(respuesta.mensaje);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     notificarErrorAccion('cargar');
  //   }
  // };

  const guardarFirmaTipoPlanilla = async (datos: FirmaTipoPlanilla) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarFirmaTipoPlanilla' : 'registrarFirmaTipoPlanilla',
        ...datos,
        id_firma: datos.id_firma,
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await firmasService.accionFirmaTipoPlanilla(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoFirmaTipoPlanilla.value = false;
        if (listaFirmaSeleccionada.value?.idfirma) void cargarFirmaTipoPlanillas(listaFirmaSeleccionada.value.idfirma);
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const eliminarFirmaTipoPlanilla = (idfirma: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const payload = {
          ver: 'eliminarFirmaTipoPlanilla',
          idfirma: idfirma
        };
        const datosFormulario = prepararDatosFormulario(payload);
        const respuesta = await firmasService.accionFirmaTipoPlanilla(datosFormulario);
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


  return {
    listaFirmas, firmaActual, listaUsuarios,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaFirmaTipoPlanilla, listaFirmaSeleccionada,
    listaFirmaTipoPlanillas, firmaTipoPlanillaActual, esVisibleDialogoFirmaTipoPlanilla,
    listaTipoPlanillas,
    cargarFirmas, prepararNuevaFirma, cargarUsuarios,
    prepararEdicionFirma, ejecutarAccionFirma, eliminarFirma,
    cambiarEstadoRegistro,
    alternarVista,
    gestionarFirmas, cargarTipoPlanillas,
    prepararNuevaFirmaTipoPlanilla, guardarFirmaTipoPlanilla, eliminarFirmaTipoPlanilla,
  };
}