import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { postulantesService } from '../services/postulantes.service';
import type { Postulante } from '../types/postulantes.types';
import { idusuario_md5 } from 'src/composables/funcionesGenerales';

export function usePostulantes() {
  const listaPostulantes = ref <Postulante[]>([]);

	const cargando = ref(false);
	const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

	// 1. Añade estas variables de estado al principio de tu composable:
  const esVisibleDialogoConclusion = ref(false);
  const idPostulanteConclusion = ref(0);
  const conclusionActual = ref('');

// 2. Añade estas dos funciones:
  const prepararConclusion = (fila: Postulante) => {
    idPostulanteConclusion.value = Number(fila.id);
    conclusionActual.value = fila.conclucion || '';
    esVisibleDialogoConclusion.value = true;
  };

	const postulanteActual = ref<Postulante>({
		nombre: '',
		apellido: '',
		ci: '',
		cv: new File([], ''),
		email: '',
		telefono: '',
		fecha: '',
		idconvocatoria: 0,
		convocatoria: '',
		conclucion: '',
		promedio: 0
	})

	const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

	const cargarPostulantes = async (): Promise<void> => {
		cargando.value = true;
		try {
			listaPostulantes.value = await postulantesService.listarPostulantes();
		} catch (error) {
			console.error(error);
			notificarErrorAccion('cargar');
		} finally {
			cargando.value = false;
		}
	};

	const nuevoPostulante = (idConvocatoria: number) => {
		postulanteActual.value = {
			nombre: '',
			apellido: '',
			ci: '',
			cv: new File([], ''),
			email: '',
			telefono: '',
			fecha: '',
			idconvocatoria: idConvocatoria,
			convocatoria: '',
			conclucion: '',
			promedio: 0
		}
		esModoEdicion.value = false;
		esVisibleDialogo.value = true;
	};

	const prepararEdicionPostulante = async (id: number) => {
		try {
			const respuesta = await postulantesService.editarPostulante(id);
			if (respuesta.estado === 'exito' && respuesta.datos) {
        postulanteActual.value = { ...respuesta.datos };
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

	const guardarPostulante = async (datosGuardar: Postulante) => {
		try {
      const payload = {
        ver: esModoEdicion.value ? 'editarpostulante' : 'registropostulante',
        idusuario: idusuario_md5(), // Requerido por el backend para autorizar el registro
        archivoExistente: '', // Llave legacy para edición/creación de archivos
        nombre: datosGuardar.nombre,
        apellido: datosGuardar.apellido,
        ci: datosGuardar.ci,
        cv: datosGuardar.cv,
        email: datosGuardar.email,
        telefono: datosGuardar.telefono,
        fecha: datosGuardar.fecha,
        convocatoria: datosGuardar.idconvocatoria, // Pasamos el ID, pero usando la llave que exige la BD
        estado: 0 // Estado inicial que vimos en el payload antiguo
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await postulantesService.guardarPostulante(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarPostulantes();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
	};

	const confirmarEliminarPostulante = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await postulantesService.eliminarPostulante(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarPostulantes();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

	const guardarConclusion = async (conclusion: string) => {
    if (!idPostulanteConclusion.value) return;
    
    try {
      const respuesta = await postulantesService.guardarConclusionPostulante(idPostulanteConclusion.value, conclusion);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar'); 
        esVisibleDialogoConclusion.value = false;
        void cargarPostulantes();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

	return {
		listaPostulantes, postulanteActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
		conclusionActual, esVisibleDialogoConclusion,
		cargarPostulantes, guardarPostulante,
		nuevoPostulante, prepararEdicionPostulante, confirmarEliminarPostulante,
		prepararConclusion, guardarConclusion
	}
}