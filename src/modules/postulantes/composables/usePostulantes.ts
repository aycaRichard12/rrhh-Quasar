import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { postulantesService } from '../services/postulantes.service';
import type { Postulante } from '../types/postulantes.types';

export function usePostulantes() {
  const listaPostulantes = ref <Postulante[]>([]);

	const cargando = ref(false);
	const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

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
		promedio: 0,
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
        ...datosGuardar
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

	return {
		listaPostulantes, postulanteActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo, 
		cargarPostulantes, guardarPostulante,
		nuevoPostulante, prepararEdicionPostulante, confirmarEliminarPostulante
	}
}