import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { tiposDeSancionesService } from '../services/tiposDeSanciones.service';
import type { TiposDeSanciones } from '../types/tiposDeSanciones.types';
import type { NivelesDeGravedad } from 'src/modules/niveles/types/niveles.types';

export function useTiposDeSanciones() {
  const idEmpresa = String(idempresa_md5());
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const cargando = ref(false);

  const listaTiposDeSanciones = ref<TiposDeSanciones[]>([]);
  const listaNiveles = ref<NivelesDeGravedad[]>([]);
  const esVisibleDialogo = ref(false);

  const tipoDeSancionActual = ref<TiposDeSanciones>({
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
      listaNiveles.value = await tiposDeSancionesService.listarNivelesDeGravedad();
    } catch (error) {
      console.error(error);
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
      const resp = await tiposDeSancionesService.editarTipoDeSancion(id);
      if (resp.estado === 'exito' && resp.datos) {
        tipoDeSancionActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarTipoDeSancion = async (datos: TiposDeSanciones) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editartiposancion' : 'registrotiposancion',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        nivel: datos.idnivel
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await tiposDeSancionesService.guardarTipoDeSancion(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarTiposDeSanciones();
      } else {
        notificarAdvertencia(resp.mensaje);
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
    listaTiposDeSanciones,
    listaNiveles,
    cargando,
    filtroBusqueda,
    esVisibleDialogo,
    esModoEdicion,
    tipoDeSancionActual,
    cargarTiposDeSanciones,
    cargarNiveles,
    prepararNuevoTipoDeSancion,
    prepararEdicionTipoDeSancion,
    guardarTipoDeSancion,
    confirmarEliminarTipoDeSancion
  };
}
