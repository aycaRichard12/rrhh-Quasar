import { ref } from 'vue';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { convocatoriasService } from '../services/convocatorias.service';
import type { Convocatoria } from '../types/convocatorias.types';

export function useConvocatorias() {
  const listaConvocatorias = ref <Convocatoria[]>([]);

	const cargando = ref(false);
	const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

	const convocatoriaActual = ref<Convocatoria>({
		nombre: '',
		descripcion: '',
		fechai: '',
		fechaf: '',
		nvacantes: 0,
		estado: 1,
		publico: 0,
		idcargo: 0,
		cargo: '',
		idarea: 0,
		area: '',
	})

	const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

	const cargarConvocatorias = async (): Promise<void> => {
		cargando.value = true;
		try {
			listaConvocatorias.value = await convocatoriasService.listarConvocatorias();
		} catch (error) {
			console.error(error);
			notificarErrorAccion('cargar');
		} finally {
			cargando.value = false;
		}
	};

	const nuevaConvocatoria = (idArea: number, idCargo: number) => {
		convocatoriaActual.value = {
			nombre: '',
			descripcion: '',
			fechai: '',
			fechaf: '',
			nvacantes: '',
			estado: 1,
			publico: 1,
			idcargo: idCargo,
			cargo: '',
			idarea: idArea, // seleccione un area primero
			area: '',
		} as Convocatoria;	
		esModoEdicion.value = false;
		esVisibleDialogo.value = true;
	};

	const prepararEdicionConvocatoria = async (id: number) => {
		try {
			const respuesta = await convocatoriasService.editarConvocatoria(id);
			if (respuesta.estado === 'exito' && respuesta.datos) {
        convocatoriaActual.value = { ...respuesta.datos };
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

	const guardarConvocatoria = async (datosGuardar: Convocatoria) => {
		try {
      const payload = {
        ver: esModoEdicion.value ? 'editarConvocatoria' : 'registroConvocatoria',
        ...datosGuardar
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await convocatoriasService.guardarConvocatoria(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarConvocatorias();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
	};

	const confirmarEliminarConvocatoria = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await convocatoriasService.eliminarConvocatoria(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarConvocatorias();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

	const cambiarEstadoRegistro = async (convocatoria: Convocatoria) => {
    if (!convocatoria.id) return;
    const nuevoEstado = convocatoria.estado === 1 ? 2 : 1;
    try {
      await convocatoriasService.cambiarEstadoConvocatoria(convocatoria.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarConvocatorias();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

	return {
		listaConvocatorias, convocatoriaActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo, 
		cargarConvocatorias, guardarConvocatoria,
		nuevaConvocatoria, prepararEdicionConvocatoria, confirmarEliminarConvocatoria,
		cambiarEstadoRegistro
	}
}