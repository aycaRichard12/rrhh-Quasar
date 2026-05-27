import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { cargosService } from '../services/cargos.service';
import type { Cargo, AreaMin } from '../types/cargos.types';

const listaCargos = ref<Cargo[]>([]);
const listaAreas = ref<AreaMin[]>([]);
const esVisibleDialogo = ref<boolean>(false);
const esModoEdicion = ref<boolean>(false);
const filtroBusqueda = ref<string>('');
const idAreaSeleccionada = ref<string>('');

const cargoActual = ref<Cargo>({
  cargo: '', salario: '', descripcion: '', idarea: ''
});

export function useCargos() {
  const { t } = useI18n();
  const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
  const idEmpresa = String(idempresa_md5());

  const cargarCargosYAreas = async () => {
    try {
      listaCargos.value = await cargosService.listarCargos();
      listaAreas.value = await cargosService.listarAreas();
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorFetch', 'Error al cargar los datos o conexión a internet desactivada'));
    }
  };

  const listaCargosFiltrados = computed<Cargo[]>(() => {
    if (!idAreaSeleccionada.value || idAreaSeleccionada.value === '_todos_') {
      return listaCargos.value;
    }
    return listaCargos.value.filter((cargo: Cargo) => cargo.idarea === idAreaSeleccionada.value);
  });

  const prepararNuevoCargo = () => {
    cargoActual.value = { cargo: '', salario: '', descripcion: '', idarea: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionCargo = async (id: string) => {
    try {
      const respuesta = await cargosService.editarCargo(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        cargoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorFetch', 'Error al obtener datos del cargo'));
    }
  };

  const guardarCargo = async (datosGuardar: Cargo) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarCargo' : 'registroCargo',
        idempresa: idEmpresa,
        id: esModoEdicion.value ? datosGuardar.id : undefined,
        cargo: datosGuardar.cargo,
        salario: datosGuardar.salario,
        descripcion: datosGuardar.descripcion,
        area: datosGuardar.idarea // El payload API espera el select como "area"
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await cargosService.guardarCargo(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? t('common.messages.updateSuccess', 'Registro actualizado con éxito') : t('common.messages.createSuccess', 'Registro creado con éxito'));
        esVisibleDialogo.value = false;
        void cargarCargosYAreas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.messages.errorRequest', 'Error al procesar la solicitud'));
    }
  };

  const confirmarEliminarCargo = (id: string) => {
    confirmarAccion(
      t('common.actions.confirm', '¿Está Seguro?'),
      t('common.messages.deleteWarning', 'No podrá recuperar este registro.'),
      async () => {
        try {
          const respuesta = await cargosService.eliminarCargo(id);
          if (respuesta.estado === 'exito') {
            notificarExito(respuesta.mensaje);
            void cargarCargosYAreas();
          }
        } catch (error) {
          console.error(error);
          notificarError(t('common.messages.errorDelete', 'Error al eliminar el registro'));
        }
      }
    );
  };

  return {
    listaCargos, listaCargosFiltrados ,listaAreas, esVisibleDialogo, esModoEdicion, cargoActual, filtroBusqueda, idAreaSeleccionada,
    cargarCargosYAreas, prepararNuevoCargo, prepararEdicionCargo, guardarCargo, confirmarEliminarCargo
  };
}