import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { actividadesDeEvaluacionService } from '../services/actividadesDeEvaluacion.service';
import type { ActividadDeEvaluacion } from '../types/actividadesDeEvaluacion.types';

export function useActividadesDeEvaluacion() {
  const idEmpresa = String(idempresa_md5());
  const listaActividades = ref<ActividadDeEvaluacion[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const actividadActual = ref<ActividadDeEvaluacion>({
    nombre: '',
    descripcion: '',
    fecha: '',
    idmetodoevaluacion: 0,
    metodoevaluacion: '',
    calificacionMax: 0
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarActividades = async () => {
    cargando.value = true;
    try {
      listaActividades.value = await actividadesDeEvaluacionService.listarActividadesDeEvaluacion();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const nuevaActividad = (idMetodo: number) => {
    actividadActual.value = {
      nombre: '',
      descripcion: '',
      fecha: '',
      idmetodoevaluacion: idMetodo,
      metodoevaluacion: '',
      calificacionMax: 0
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionActividad = async (id: number) => {
    try {
      const respuesta = await actividadesDeEvaluacionService.editarActividadDeEvaluacion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        actividadActual.value = { ...respuesta.datos };
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

  const guardarActividad = async (datos: ActividadDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarActividadevaluacion' : 'registroActividadevaluacion',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        metodoevaluacion: datos.idmetodoevaluacion,
        fecha: datos.fecha,
        calmax: datos.calificacionMax
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await actividadesDeEvaluacionService.guardarActividadDeEvaluacion(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarActividades();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarActividad = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await actividadesDeEvaluacionService.eliminarActividadDeEvaluacion(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarActividades();
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
    listaActividades, actividadActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarActividades, guardarActividad,
    nuevaActividad, prepararEdicionActividad, confirmarEliminarActividad,
  };
}