import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { prerrequisitosCargoService } from '../services/prerrequisitosCargo.service';
import type { PrerrequisitoCargo, CargoMin } from '../types/prerrequisitosCargo.types';

const listaPrerrequisitos = ref<PrerrequisitoCargo[]>([]);
const listaCargos = ref<CargoMin[]>([]);
const esVisibleDialogo = ref<boolean>(false);
const esModoEdicion = ref<boolean>(false);
const filtroBusqueda = ref<string>('');
const idCargoSeleccionado = ref<string>('_todos_');

const prerrequisitoActual = ref<PrerrequisitoCargo>({
  nombre: '', descripcion: '', idcargo: ''
});

export function usePrerrequisitosCargo() {
  const { t } = useI18n();
  const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
  const idEmpresa = String(idempresa_md5());

  const cargarDatos = async () => {
    try {
      listaPrerrequisitos.value = await prerrequisitosCargoService.listarPrerrequisitos();
      listaCargos.value = await prerrequisitosCargoService.listarCargos();
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorFetch', 'Error al cargar los datos o conexión a internet desactivada'));
    }
  };

  // Filtrado reactivo antes de mandar a la vista
  const listaPrerrequisitosFiltrados = computed<PrerrequisitoCargo[]>(() => {
    if (!idCargoSeleccionado.value || idCargoSeleccionado.value === '_todos_') {
      return listaPrerrequisitos.value;
    }
    return listaPrerrequisitos.value.filter((item: PrerrequisitoCargo) => item.idcargo === idCargoSeleccionado.value);
  });

  const prepararNuevoPrerrequisito = () => {
    prerrequisitoActual.value = { nombre: '', descripcion: '', idcargo: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionPrerrequisito = async (id: string) => {
    try {
      const respuesta = await prerrequisitosCargoService.editarPrerrequisito(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        prerrequisitoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorFetch', 'Error al obtener datos del registro'));
    }
  };

  const guardarPrerrequisito = async (datosGuardar: PrerrequisitoCargo) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarPrerrequisito' : 'registroPrerrequisito',
        idempresa: idEmpresa,
        id: esModoEdicion.value ? datosGuardar.id : undefined,
        nombre: datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        idcargo: datosGuardar.idcargo
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await prerrequisitosCargoService.guardarPrerrequisito(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? t('common.messages.updateSuccess', 'Registro actualizado con éxito') : t('common.messages.createSuccess', 'Registro creado con éxito'));
        esVisibleDialogo.value = false;
        void cargarDatos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorRequest', 'Error al procesar la solicitud'));
    }
  };

  const confirmarEliminarPrerrequisito = (id: string) => {
    confirmarAccion(
      t('common.actions.confirm', '¿Está Seguro?'),
      t('prerrequisitos.messages.deleteWarning', 'No podrá recuperar el registro de este prerrequisito.'),
      async () => {
        try {
          const respuesta = await prerrequisitosCargoService.eliminarPrerrequisito(id);
          if (respuesta.estado === 'exito') {
            notificarExito(respuesta.mensaje);
            void cargarDatos();
          }
        } catch (error) {
          console.error(error);
          notificarError(t('common.messages.errorDelete', 'Error al eliminar el registro'));
        }
      }
    );
  };

  return {
    listaPrerrequisitosFiltrados, listaCargos, esVisibleDialogo, esModoEdicion, prerrequisitoActual, filtroBusqueda,idCargoSeleccionado,
    cargarDatos, prepararNuevoPrerrequisito, prepararEdicionPrerrequisito, guardarPrerrequisito, confirmarEliminarPrerrequisito
  };
}