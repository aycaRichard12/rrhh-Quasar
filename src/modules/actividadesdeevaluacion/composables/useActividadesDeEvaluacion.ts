import { ref } from 'vue';
import { date } from 'quasar';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { metodosDeEvaluacionService } from '../services/actividadesDeEvaluacion.service';
import type { ActividadesDeEvaluacion } from '../types/actividadesDeEvaluacion.types';
import type { MetodosDeEvaluacion } from 'src/modules/metodosdeevaluacion/types/metodosDeEvaluacion.types';

/**
 * Retorna una nueva fecha con la hora reseteada a 00:00:00:000
 */
const obtenerFechaLimpia = (fecha: Date = new Date()) => {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
};

export function useActividadesDeEvaluacion() {
  const idEmpresa = String(idempresa_md5());
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const cargando = ref(false);

  const listaActividades = ref<ActividadesDeEvaluacion[]>([]);
  const listaMetodos = ref<MetodosDeEvaluacion[]>([]);
  const esVisibleDialogo = ref(false);

  const actividadActual = ref<ActividadesDeEvaluacion>({
    nombre: '',
    descripcion: '',
    fecha: obtenerFechaLimpia(),
    idmetodoevaluacion: 0,
    metodoevaluacion: '',
    calificacionMax: 0
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarActividades = async () => {
    cargando.value = true;
    try {
      listaActividades.value = await metodosDeEvaluacionService.listarActividadesDeEvaluacion();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const cargarMetodos = async () => {
    try {
      listaMetodos.value = await metodosDeEvaluacionService.listarMetodosDeEvaluacion();
    } catch (error) {
      console.error(error);
    }
  };

  const prepararNuevaActividad = () => {
    actividadActual.value = {
      nombre: '',
      descripcion: '',
      fecha: obtenerFechaLimpia(),
      idmetodoevaluacion: 0,
      metodoevaluacion: '',
      calificacionMax: 0
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionActividad = async (id: number) => {
    try {
      const resp = await metodosDeEvaluacionService.editarActividadDeEvaluacion(id);
      if (resp.estado === 'exito' && resp.datos) {
        actividadActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarActividad = async (datos: ActividadesDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarActividadevaluacion' : 'registroActividadevaluacion',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        metodoevaluacion: datos.idmetodoevaluacion,
        fecha: date.formatDate(datos.fecha, 'YYYY-MM-DD'),
        calmax: datos.calificacionMax
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await metodosDeEvaluacionService.guardarActividadDeEvaluacion(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarActividades();
      } else {
        notificarAdvertencia(resp.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarActividad = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await metodosDeEvaluacionService.eliminarActividadDeEvaluacion(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarActividades();
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
    listaActividades,
    listaMetodos,
    cargando,
    filtroBusqueda,
    esVisibleDialogo,
    esModoEdicion,
    actividadActual,
    cargarActividades,
    cargarMetodos,
    prepararNuevaActividad,
    prepararEdicionActividad,
    guardarActividad,
    confirmarEliminarActividad
  };
}
