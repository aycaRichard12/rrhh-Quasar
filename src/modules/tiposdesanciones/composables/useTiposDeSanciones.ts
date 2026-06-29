import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { tiposDeSancionesService } from '../services/tiposDeSanciones.service';
import type { TipoDeSancion } from '../types/tiposDeSanciones.types';

import { nivelesService } from 'src/modules/niveles/services/niveles.service';
import type { NivelDeGravedad } from 'src/modules/niveles/types/niveles.types';

export function useTiposDeSanciones() {
  const idEmpresa = String(idempresa_md5());
  const listaTiposDeSanciones = ref<TipoDeSancion[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const listaNiveles = ref<NivelDeGravedad[]>([]);

  const tipoDeSancionActual = ref<TipoDeSancion>({
    nombre: '',
    descripcion: '',
    idnivel: 0,
    nivel: ''
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarTiposDeSanciones = async () => {
    cargando.value = true;
    try {
      listaTiposDeSanciones.value = await tiposDeSancionesService.listarTiposDeSanciones();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const cargarNiveles = async () => {
    try {
      listaNiveles.value = await nivelesService.listarNivelesDeGravedad();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const prepararNuevoTipoDeSancion = () => {
    tipoDeSancionActual.value = {
      nombre: '',
      descripcion: '',
      idnivel: 0,
      nivel: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionTipoDeSancion = async (id: number) => {
    try {
      const respuesta = await tiposDeSancionesService.editarTipoDeSancion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        tipoDeSancionActual.value = { ...respuesta.datos };
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

  const guardarTipoDeSancion = async (datosGuardar: TipoDeSancion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editartiposancion' : 'registrotiposancion',
        idempresa: idEmpresa,
        id: datosGuardar.id,
        nombre: datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        nivel: datosGuardar.idnivel
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await tiposDeSancionesService.guardarTipoDeSancion(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarTiposDeSanciones();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarTipoDeSancion = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await tiposDeSancionesService.eliminarTipoDeSancion(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarTiposDeSanciones();
        } else {
          notificarAdvertencia(resp.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaTiposDeSanciones, tipoDeSancionActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    listaNiveles,
    cargarTiposDeSanciones, guardarTipoDeSancion,
    prepararNuevoTipoDeSancion, prepararEdicionTipoDeSancion, confirmarEliminarTipoDeSancion,
    cargarNiveles 
  };
}