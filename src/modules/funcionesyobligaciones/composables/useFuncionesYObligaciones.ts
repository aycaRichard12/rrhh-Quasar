import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { funcionesYObligacionesService } from '../services/funcionesYObligaciones.service';
import type { FuncionYObligacion, Cargo } from '../types/funcionesYObligaciones.types';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { useNotificaciones } from 'src/composables/useNotificaciones';

export function useFuncionesYObligaciones() {
  const { t } = useI18n();
  const $q = useQuasar();
  const { notificarExito, notificarError } = useNotificaciones();

  // Estados reactivos (Sustantivos)
  const listaFuncionesYObligaciones = ref<FuncionYObligacion[]>([]);
  const listaCargos = ref<Cargo[]>([]);
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');

  // Variables nuevas para el filtrado por Cargo
  const cargoFiltro = ref<string>('Todos');
  
  const funcionYObligacionActual = ref<FuncionYObligacion>({
    nombre: '', descripcion: '', idcargo: ''
  });

  // 🌟 COMPUTED: Inyecta "Todos" al principio de la lista de cargos para el filtro
  const opcionesFiltroCargo = computed(() => {
    return [
      { id: 'Todos', cargo: t('common.todos', 'Todos') } as Cargo,
      ...listaCargos.value
    ];
  });

  // 🌟 COMPUTED: Filtra la tabla en el cliente sin llamar a la API
  const listaFuncionesYObligacionesFiltrada = computed(() => {
    if (cargoFiltro.value === 'Todos' || !cargoFiltro.value) {
      return listaFuncionesYObligaciones.value;
    }
    return listaFuncionesYObligaciones.value.filter(
      (item) => String(item.idcargo) === String(cargoFiltro.value)
    );
  });

  // Funciones de acción (Verbos)
  const cargarCargos = async () => {
    try {
      listaCargos.value = await funcionesYObligacionesService.obtenerCargos();
    } catch (error) {
      console.error(error);
      notificarError(t('common.errorCargarDatos'));
    }
  };

  const cargarFuncionesYObligaciones = async () => {
    try {
      listaFuncionesYObligaciones.value = await funcionesYObligacionesService.obtenerFuncionesYObligaciones();
    } catch (error) {
      console.error(error);
      notificarError(t('common.errorCargarDatos'));
    }
  };

  const prepararNuevaFuncionYObligacion = () => {
    funcionYObligacionActual.value = { nombre: '', descripcion: '', idcargo: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFuncionYObligacion = async (id: string) => {
    try {
      const respuesta = await funcionesYObligacionesService.obtenerFuncionYObligacion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        funcionYObligacionActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      } else {
        notificarError(respuesta.mensaje || t('common.error'));
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.errorCargarDatos'));
    }
  };

  const guardarFuncionYObligacion = async (datosFormulario: FuncionYObligacion) => {
    try {
      // Mapeo plano para el FormData, respetando nombres que exige la API legacy
      const payload: Record<string, string> = {
        ver: esModoEdicion.value ? 'editarFunYoblig' : 'registroFunYoblig',
        idempresa: String(idempresa_md5()),
        cargo: String(datosFormulario.idcargo),
        nombre: String(datosFormulario.nombre),
        descripcion: String(datosFormulario.descripcion)
      };

      if (esModoEdicion.value && datosFormulario.id) {
        payload.id = String(datosFormulario.id);
      }

      const formData = prepararDatosFormulario(payload);
      const respuesta = await funcionesYObligacionesService.guardarFuncionYObligacion(formData);

      if (respuesta.estado === 'exito') {
        notificarExito(respuesta.mensaje);
        esVisibleDialogo.value = false;
        void cargarFuncionesYObligaciones();
      } else {
        notificarError(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarError(t('common.errorGuardar'));
    }
  };

  const confirmarEliminarFuncionYObligacion = (id: string) => {
    $q.dialog({
      title: t('common.confirmar'),
      message: t('common.confirmarEliminar'),
      cancel: true,
      persistent: true
    }).onOk(() => {
      const ejecutarEliminacion = async () => {
        try {
          const respuesta = await funcionesYObligacionesService.eliminarFuncionYObligacion(id);
          if (respuesta.estado === 'exito') {
            notificarExito(respuesta.mensaje);
            void cargarFuncionesYObligaciones();
          } else {
            notificarError(respuesta.mensaje);
          }
        } catch (error) {
          console.error(error);
          notificarError(t('common.errorEliminar'));
        }
      };
      
      // Controlando la promesa flotante (ESLint Guard)
      void ejecutarEliminacion();
    });
  };

  return {
    listaFuncionesYObligacionesFiltrada,
    listaCargos,
    opcionesFiltroCargo,
    cargoFiltro,
    esModoEdicion,
    esVisibleDialogo,
    filtroBusqueda,
    funcionYObligacionActual,
    cargarCargos,
    cargarFuncionesYObligaciones,
    prepararNuevaFuncionYObligacion,
    prepararEdicionFuncionYObligacion,
    guardarFuncionYObligacion,
    confirmarEliminarFuncionYObligacion
  };
}