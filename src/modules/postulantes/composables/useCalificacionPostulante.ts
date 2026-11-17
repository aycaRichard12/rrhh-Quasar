import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { postulantesService } from '../services/postulantes.service';
import type { Postulante, CalificacionPostulante } from '../types/postulantes.types';
import type { MetodoDeEvaluacion } from 'src/modules/metodosdeevaluacion/types/metodosDeEvaluacion.types';
import type { ActividadDeEvaluacion } from 'src/modules/actividadesdeevaluacion/types/actividadesDeEvaluacion.types';
import { metodosDeEvaluacionService } from 'src/modules/metodosdeevaluacion/services/metodosDeEvaluacion.service';
import { actividadesDeEvaluacionService } from 'src/modules/actividadesdeevaluacion/services/actividadesDeEvaluacion.service';

export function useCalificacionPostulante() {
  const $q = useQuasar();
  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const esVistaCalificacion = ref<boolean>(false);
  const esVisibleDialogoFormCalificacion = ref<boolean>(false);
  const postulanteActual = ref<Postulante | null>(null);
  
  // Variables del proceso principal
  const idEvaluacionPostulante = ref<number>(0);
  const listaMetodos = ref<MetodoDeEvaluacion[]>([]);
  const listaActividades = ref<ActividadDeEvaluacion[]>([]);
  const listaCalificaciones = ref<CalificacionPostulante[]>([]);
  const cargandoTabla = ref(false);

  // Variables para la vista dinámica y filtros
  const idMetodoFiltroTabla = ref<number | null>(null);
  const idMetodoSeleccionado = ref<number | null>(null);
  
  const calificacionForm = ref({
    idactividadevaluacion: null as number | null,
    nota: 0,
    justificacion: ''
  });

  // COMPUTED: Filtramos las actividades excluyendo las ya calificadas
  const actividadesDisponibles = computed(() => {
    if (!idMetodoSeleccionado.value) return [];
    const actividadesExcluidas = listaCalificaciones.value.map(item => item.idactividadevaluacion);
    return listaActividades.value.filter(item => 
      item.idmetodoevaluacion === idMetodoSeleccionado.value && 
      !actividadesExcluidas.includes(Number(item.id))
    );
  });

  // COMPUTED: Calificación máxima del select del formulario
  const calificacionMaxPermitida = computed<number>(() => {
    const metodo = listaMetodos.value.find(m => m.id === idMetodoSeleccionado.value);
    return metodo ? Number(metodo.calificacionMax) : 0;
  });

  // COMPUTED: Tabla de Calificaciones Filtrada
  const calificacionesFiltradas = computed(() => {
    if (!idMetodoFiltroTabla.value) return listaCalificaciones.value;
    return listaCalificaciones.value.filter(c => Number(c.idmetodoevaluacion) === idMetodoFiltroTabla.value);
  });

  // COMPUTED: Máximo para la columna dinámica
  const maximoFiltroSeleccionado = computed<number>(() => {
    const metodo = listaMetodos.value.find(m => m.id === idMetodoFiltroTabla.value);
    return metodo ? Number(metodo.calificacionMax) : 0;
  });

  // COMPUTED: Obtenemos el nombre del método actual para el título
  const nombreFiltroSeleccionado = computed<string>(() => {
    const metodo = listaMetodos.value.find(m => m.id === idMetodoFiltroTabla.value);
    return metodo ? String(metodo.nombre) : '';
  });

  // COMPUTED: Promedio matemático de las notas filtradas
  const promedioObtenido = computed<number>(() => {
    const cantidad = calificacionesFiltradas.value.length;
    if (cantidad === 0) return 0; // Si no hay notas, el promedio es 0
    
    // Sumamos todas las notas
    const suma = calificacionesFiltradas.value.reduce((acc, actual) => acc + Number(actual.nota), 0);
    
    // Dividimos entre la cantidad y limitamos a 2 decimales
    return Number((suma / cantidad).toFixed(2));
  });

  const abrirVistaCalificacion = (idEvaluacion: number) => {
    idEvaluacionPostulante.value = idEvaluacion;
    esVistaCalificacion.value = true;
    void cargarSelects();
    void cargarTablaCalificaciones();
  };

  const alternarVistaCalificacion = () => {
    esVistaCalificacion.value = false;
    postulanteActual.value = null;
  };

  const prepararNuevaCalificacion = () => {
    idMetodoSeleccionado.value = null;
    calificacionForm.value = { idactividadevaluacion: null, nota: 0, justificacion: '' };
    esVisibleDialogoFormCalificacion.value = true;
  };

  // FUNCIÓN ÚNICA cargarSelects: Carga catálogos y auto-selecciona con protección `?.`
  const cargarSelects = async () => {
    try {
      listaMetodos.value = await metodosDeEvaluacionService.listarMetodosDeEvaluacion();
      listaActividades.value = await actividadesDeEvaluacionService.listarActividadesDeEvaluacion();
      
      // Auto-seleccionar el primer método para el filtro de la tabla si está vacío
      if (listaMetodos.value.length > 0 && !idMetodoFiltroTabla.value) {
        idMetodoFiltroTabla.value = Number(listaMetodos.value[0]?.id ?? 0);
      }
    } catch (error) {
      console.error(error);
      console.error('Error cargando catálogos de evaluación');
    }
  };

  const ejecutarRegistroInicial = async (idPostulante: number) => {
    try {
      const respRegistro = await postulantesService.registrarEvaluacionInicial(idPostulante) as unknown as { estado: string | number; id?: number };
      
      if ((respRegistro.estado === 'exito' || String(respRegistro.estado) === '2') && respRegistro.id) {
        abrirVistaCalificacion(Number(respRegistro.id)); 
      } else {
        notificarAdvertencia('No se pudo iniciar la calificación.');
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const iniciarProcesoCalificacion = async (postulante: Postulante) => {
    postulanteActual.value = postulante;
    const idPostulante = Number(postulante.id);
    
    try {
      const resp = await postulantesService.verificarEvaluacionInicial(idPostulante);
      
      if (String(resp.estado) === '1') {
        $q.dialog({
          title: 'Aún no se calificó a este postulante',
          message: '¿Desea calificarlo ahora?',
          color: 'info',
          cancel: true,
          persistent: true
        }).onOk(() => {
          void ejecutarRegistroInicial(idPostulante); 
        });
      } 
      else if (resp.datos) {
        const datos = resp.datos as Record<string, unknown>;
        abrirVistaCalificacion(Number(datos.id));
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('verificar');
    }
  };

  const cargarTablaCalificaciones = async () => {
    cargandoTabla.value = true;
    try {
      listaCalificaciones.value = await postulantesService.listarCalificaciones(idEvaluacionPostulante.value);
    } catch (error) {
      console.error(error);
    } finally {
      cargandoTabla.value = false;
    }
  };

  const guardarCalificacion = async () => {
    try {
      const payload = {
        ver: 'registroCalificacionPostulante',
        idevaluacionpostulante: idEvaluacionPostulante.value,
        Metodo: idMetodoSeleccionado.value,
        idactividadevaluacion: calificacionForm.value.idactividadevaluacion,
        calificacion: calificacionForm.value.nota,
        justificacion: calificacionForm.value.justificacion
      };

      const formData = prepararDatosFormulario(payload);
      const respuesta = await postulantesService.guardarCalificacionDetalle(formData);

      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogoFormCalificacion.value = false;
        void cargarTablaCalificaciones();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarCalificacion = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await postulantesService.eliminarCalificacionDetalle(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarTablaCalificaciones();
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
    // Variables y Vistas
    esVistaCalificacion,
    esVisibleDialogoFormCalificacion,
    postulanteActual,
    listaMetodos,
    listaCalificaciones,
    cargandoTabla,
    idMetodoSeleccionado,
    calificacionForm,
    
    // Variables Computadas del Filtro y Total
    idMetodoFiltroTabla,
    calificacionesFiltradas,
    actividadesDisponibles,
    calificacionMaxPermitida,
    maximoFiltroSeleccionado,
    nombreFiltroSeleccionado,
    promedioObtenido,
    
    // Funciones
    iniciarProcesoCalificacion,
    guardarCalificacion,
    confirmarEliminarCalificacion,
    alternarVistaCalificacion,
    prepararNuevaCalificacion
  };
}