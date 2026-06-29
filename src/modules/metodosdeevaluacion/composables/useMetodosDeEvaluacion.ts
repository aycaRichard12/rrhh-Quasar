import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { metodosDeEvaluacionService } from '../services/metodosDeEvaluacion.service';
import type { MetodoDeEvaluacion, RangoDeEvaluacion } from '../types/metodosDeEvaluacion.types';

export function useMetodosDeEvaluacion() {
  const idEmpresa = String(idempresa_md5());
  const listaMetodos = ref<MetodoDeEvaluacion[]>([]);
  const listaRangos = ref<RangoDeEvaluacion[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogoMetodo = ref(false);
  const esVisibleDialogoRango = ref(false);

  const esVistaRangos = ref(false); 
  const listaMetodoSeleccionado = ref<MetodoDeEvaluacion | null>(null);
  
  const metodoActual = ref<MetodoDeEvaluacion>({
    nombre: '',
    descripcion: '',
    calificacionMax: 0,
    fecha: ''
  });

  const rangoActual = ref<RangoDeEvaluacion>({
    nombre: '',
    cantidad: 0,
    fecha: '',
    idMetodoDeEvaluacion: 0
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();
  //______________________ Métodos de Evaluación______________________________
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
      fecha: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogoMetodo.value = true;
  };

  const prepararEdicionMetodo = async (id: number) => {
    try {
      const respuesta = await metodosDeEvaluacionService.editarMetodoDeEvaluacion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        metodoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogoMetodo.value = true;
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarMetodo = async (datos: MetodoDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarMetodoevaluacion' : 'registroMetodoevaluacion',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        fecha: datos.fecha,
        calmax: datos.calificacionMax,
        descripcion: datos.descripcion
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await metodosDeEvaluacionService.guardarMetodoDeEvaluacion(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoMetodo.value = false;
        void cargarMetodos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarMetodo = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await metodosDeEvaluacionService.eliminarMetodoDeEvaluacion(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarMetodos();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };
  //______________________ Rangos de Evaluación______________________________
  const gestionarRangos = (metodo: MetodoDeEvaluacion) => {
    if (!metodo.id) return;
    listaMetodoSeleccionado.value = metodo;
    esVistaRangos.value = true;
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
    if (!listaMetodoSeleccionado.value?.id) return;
    rangoActual.value = {
      nombre: '', 
      cantidad: 0, 
      fecha: '',
      idMetodoDeEvaluacion: listaMetodoSeleccionado.value.id
    };
    esModoEdicion.value = false;
    esVisibleDialogoRango.value = true;
  };

  const prepararEdicionRango = async (id: number) => {
    try {
      const respuesta = await metodosDeEvaluacionService.editarRangoDeEvaluacion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        rangoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogoRango.value = true;
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarRango = async (datos: RangoDeEvaluacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarRangoevaluacion' : 'registroRangoevaluacion',
        metodoevaluacion: datos.idMetodoDeEvaluacion,
        id: datos.id,
        nombre: datos.nombre,
        cantidad: datos.cantidad
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await metodosDeEvaluacionService.guardarRangoDeEvaluacion(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoRango.value = false;
        if (listaMetodoSeleccionado.value?.id) void cargarRangos(listaMetodoSeleccionado.value.id);
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarRango = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await metodosDeEvaluacionService.eliminarRangoDeEvaluacion(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          if (listaMetodoSeleccionado.value?.id) void cargarRangos(listaMetodoSeleccionado.value.id);
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const alternarVista = () => {
    esVistaRangos.value = !esVistaRangos.value;
    if (!esVistaRangos.value) {
      listaMetodoSeleccionado.value = null;
    }
  };

  return {
    listaMetodos, metodoActual, 
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogoMetodo,
    listaRangos, rangoActual,
    esVistaRangos, esVisibleDialogoRango, listaMetodoSeleccionado,
    cargarMetodos, guardarMetodo,
    prepararNuevoMetodo, prepararEdicionMetodo, confirmarEliminarMetodo,
    alternarVista,
    gestionarRangos, guardarRango,
    prepararNuevoRango, prepararEdicionRango, confirmarEliminarRango,
  };
}