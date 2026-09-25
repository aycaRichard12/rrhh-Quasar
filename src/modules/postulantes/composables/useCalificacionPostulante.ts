import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { postulantesService } from '../services/postulantes.service';
import type { Postulante, CalificacionPostulante, } from '../types/postulantes.types';
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
  
  // Variables del proceso
  const idEvaluacionPostulante = ref<number>(0);
  const listaMetodos = ref<MetodoDeEvaluacion[]>([]);
  const listaActividades = ref<ActividadDeEvaluacion[]>([]);
  const listaCalificaciones = ref<CalificacionPostulante[]>([]);
  const cargandoTabla = ref(false);

  // Formulario de Calificación
  const idMetodoSeleccionado = ref<number | null>(null);
  const calificacionForm = ref({
    idactividadevaluacion: null as number | null,
    nota: 0,
    justificacion: ''
  });

  // COMPUTED: Lógica idéntica al JS Legacy para filtrar actividades excluyendo las ya calificadas
  const actividadesDisponibles = computed(() => {
    if (!idMetodoSeleccionado.value) return [];
    
    // 1. Extraemos las IDs de las actividades que ya están en la tabla
    const actividadesExcluidas = listaCalificaciones.value.map(item => item.idactividadevaluacion);
    
    // 2. Filtramos por el método seleccionado y que no estén en las excluidas
    return listaActividades.value.filter(item => 
      item.idmetodoevaluacion === idMetodoSeleccionado.value && 
      !actividadesExcluidas.includes(Number(item.id))
    );
  });

// Solución al error de Type 'number | ""': Forzamos a que el computed devuelva estrictamente un <number>
  const calificacionMaxPermitida = computed<number>(() => {
    const metodo = listaMetodos.value.find(m => m.id === idMetodoSeleccionado.value);
    return metodo ? Number(metodo.calificacionMax) : 0;
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

// FUNCIÓN AUXILIAR: Evita el error de la promesa asíncrona dentro del .onOk()
  const ejecutarRegistroInicial = async (idPostulante: number) => {
    try {
      // Engañamos a TS localmente diciéndole que el backend devolverá la llave 'id'
      const respRegistro = await postulantesService.registrarEvaluacionInicial(idPostulante) as unknown as { estado: string; id?: number; mensaje?: string };
      
      if (respRegistro.estado === 'exito' && respRegistro.id) {
        // CORRECCIÓN VITAL: Aquí llamamos a la función con su nuevo nombre
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
          // Usamos 'void' y llamamos a nuestra función síncrona para que ESLint esté feliz
          void ejecutarRegistroInicial(idPostulante); 
        });
      } 
      else if (resp.datos) {
        const datos = resp.datos as Record<string, unknown>;
        // CORRECCIÓN VITAL: Aquí también usamos el nuevo nombre
        abrirVistaCalificacion(Number(datos.id));
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('verificar');
    }
  };

  const cargarSelects = async () => {
    try {
      listaMetodos.value = await metodosDeEvaluacionService.listarMetodosDeEvaluacion();
      listaActividades.value = await actividadesDeEvaluacionService.listarActividadesDeEvaluacion();
    } catch (error) {
			console.error(error);
      console.error('Error cargando catálogos de evaluación');
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
        ver: 'registroCalificacionPostulante', // Ajusta al verbo que use tu backend
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
    esVistaCalificacion,
		esVisibleDialogoFormCalificacion,
    postulanteActual,
    listaMetodos,
    listaCalificaciones,
    cargandoTabla,
    idMetodoSeleccionado,
    calificacionForm,
    actividadesDisponibles,
    calificacionMaxPermitida,
    iniciarProcesoCalificacion,
    guardarCalificacion,
    confirmarEliminarCalificacion,
		alternarVistaCalificacion,
		prepararNuevaCalificacion
  };
}