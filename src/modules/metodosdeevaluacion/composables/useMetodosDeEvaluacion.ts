import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { metodosDeEvaluacionService } from '../services/metodosDeEvaluacion.service';
import type { MetodosDeEvaluacion, RangosDeEvaluacion } from '../types/metodosDeEvaluacion.types';
import { date } from 'quasar';

export function useMetodosDeEvaluacion() {
  const listaMetodos = ref<MetodosDeEvaluacion[]>([]);
  const listaRangos = ref<RangosDeEvaluacion[]>([]);
  const cargando = ref(false);
  const esVistaEstandar = ref(false); 
  const filtroBusqueda = ref('');
  const esVisibleDialogoMetodo = ref(false);
  const esVisibleDialogoRango = ref(false);
  const esModoEdicion = ref(false);
  const idEmpresa = String(idempresa_md5());

  const metodoActual = ref<MetodosDeEvaluacion>({
    nombre: '',
    descripcion: '',
    calificacionMax: 0,
    fecha: new Date()
  });

  const rangoActual = ref<RangosDeEvaluacion>({
    nombre: '',
    cantidad: 0,
    fecha: new Date(),
    idMetodoDeEvaluacion: 0
  });

  const metodoSeleccionado = ref<MetodosDeEvaluacion | null>(null);

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  // --- Métodos de Evaluación ---
  const cargarMetodos = async () => {
    cargando.value = true;
    try {
      listaMetodos.value = await metodosDeEvaluacionService.listarMetodosDeEvaluacion();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoMetodo = () => {
    metodoActual.value = { 
      nombre: '', 
      descripcion: '', 
      calificacionMax: 0, 
      fecha: new Date() 
    };
    esModoEdicion.value = false;
    esVisibleDialogoMetodo.value = true;
  };

  const prepararEdicionMetodo = async (id: number) => {
    try {
      const resp = await metodosDeEvaluacionService.editarMetodoDeEvaluacion(id);
      if (resp.estado === 'exito' && resp.datos) {
        metodoActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogoMetodo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarMetodo = async (datos: MetodosDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarMetodoevaluacion' : 'registroMetodoevaluacion',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        fecha: date.formatDate(datos.fecha, 'YYYY-MM-DD'),
        calmax: datos.calificacionMax, // Mapeo a 'calmax' según legacy JS
        descripcion: datos.descripcion
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await metodosDeEvaluacionService.guardarMetodoDeEvaluacion(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoMetodo.value = false;
        void cargarMetodos();
      } else {
        notificarAdvertencia(resp.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarMetodo = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await metodosDeEvaluacionService.eliminarMetodoDeEvaluacion(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarMetodos();
        } else {
          notificarAdvertencia(resp.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  // --- Rangos de Evaluación ---
  const gestionarRangos = (metodo: MetodosDeEvaluacion) => {
    if (!metodo.id) return;
    metodoSeleccionado.value = metodo;
    esVistaEstandar.value = true;
    void cargarRangos(metodo.id);
  };

  const cargarRangos = async (idMetodo: number) => {
    cargando.value = true;
    try {
      listaRangos.value = await metodosDeEvaluacionService.listarRangosDeEvaluacion(idMetodo);
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoRango = () => {
    if (!metodoSeleccionado.value?.id) return;
    rangoActual.value = {
      nombre: '', 
      cantidad: 0, 
      fecha: new Date(),
      idMetodoDeEvaluacion: metodoSeleccionado.value.id
    };
    esModoEdicion.value = false;
    esVisibleDialogoRango.value = true;
  };

  const prepararEdicionRango = async (id: number) => {
    try {
      const resp = await metodosDeEvaluacionService.editarRangoDeEvaluacion(id);
      if (resp.estado === 'exito' && resp.datos) {
        rangoActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogoRango.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarRango = async (datos: RangosDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarRangoevaluacion' : 'registroRangoevaluacion',
        metodoevaluacion: datos.idMetodoDeEvaluacion, // Mapeo según legacy JS
        id: datos.id,
        nombre: datos.nombre,
        cantidad: datos.cantidad
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await metodosDeEvaluacionService.guardarRangoDeEvaluacion(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoRango.value = false;
        if (metodoSeleccionado.value?.id) void cargarRangos(metodoSeleccionado.value.id);
      } else {
        notificarAdvertencia(resp.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarRango = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await metodosDeEvaluacionService.eliminarRangoDeEvaluacion(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          if (metodoSeleccionado.value?.id) void cargarRangos(metodoSeleccionado.value.id);
        } else {
          notificarAdvertencia(resp.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const alternarVista = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
    if (!esVistaEstandar.value) {
      metodoSeleccionado.value = null;
    }
  };

  return {
    listaMetodos, listaRangos, cargando, esVistaEstandar, filtroBusqueda,
    esVisibleDialogoMetodo, esVisibleDialogoRango, esModoEdicion,
    metodoActual, rangoActual, metodoSeleccionado,
    cargarMetodos, prepararNuevoMetodo, prepararEdicionMetodo, guardarMetodo, confirmarEliminarMetodo,
    gestionarRangos, prepararNuevoRango, prepararEdicionRango, guardarRango, confirmarEliminarRango,
    alternarVista
  };
}
