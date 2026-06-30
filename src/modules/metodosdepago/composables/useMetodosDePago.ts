import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { metodosDePagoService } from '../services/metodosDePago.service';
import type { MetodoDePago } from '../types/metodosDePago.types';

export function useMetodosDePago() {
  const idEmpresa = String(idempresa_md5());
	const listaMetodosDePago = ref<MetodoDePago[]>([]);

	const cargando = ref<boolean>(false);
	const filtroBusqueda = ref<string>('');
	const esModoEdicion = ref<boolean>(false);
	const esVisibleDialogo = ref<boolean>(false);

	const esVistaEstandar = ref<boolean>(false);
	const listaMetodosDePagoEstandar = ref<MetodoDePago[]>([]);

	const metodoDePagoActual = ref<MetodoDePago>({
		nombre: '',
		descripcion: '',
		estado: 1
	});

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida, confirmarImportacionPredefinida } = useNotificaciones();

	const cargarMetodosDePago = async () => {
		cargando.value = true;
		try {
			listaMetodosDePago.value = await metodosDePagoService.listarMetodosDePago();
		} catch (error) {
			console.error(error);
			notificarErrorAccion('cargar')
		} finally {
			cargando.value = false;
		}
	};

	const prepararNuevoMetodoDePago = () => {
		metodoDePagoActual.value = {
			nombre: '',
			descripcion: '',
			estado: 1
		};
		esModoEdicion.value = false;
		esVisibleDialogo.value = true;
	};

	const prepararEdicionMetodoDePago = async (id: number) => {
		try {
			const respuesta = await metodosDePagoService.editarMetodoDePago(id);
			if (respuesta.estado === 'exito' && respuesta.datos) {
				metodoDePagoActual.value = { ...respuesta.datos };
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

	const guardarMetodoDePago = async (datosGuardar: MetodoDePago) => {
		try {
			const payload = {
				ver: esModoEdicion.value ? 'editarmetodopago' : 'registrometodopago',
				idempresa : idEmpresa,
				...datosGuardar
			};
			const datosFormulario = prepararDatosFormulario(payload);
			const respuesta = await metodosDePagoService.guardarMetodoDePago(datosFormulario);
			if (respuesta.estado === 'exito') {
				notificarExitoAccion('guardar');
				esVisibleDialogo.value = false;
				void cargarMetodosDePago();
			} else {
				notificarAdvertencia(respuesta.mensaje);
			}
		} catch (error) {
			console.error(error);
			notificarErrorAccion('guardar');
		}
	};

	const confirmarEliminarMetodoDePago = (id: number) => {
		confirmarEliminacionPredefinida(async () => {
			try {
				const respuesta = await metodosDePagoService.eliminarMetodoDePago(id);
				if (respuesta.estado === 'exito') {
					notificarExitoAccion('eliminar');
					void cargarMetodosDePago();
				} else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
		});
	};

	const cargarMetodosDePagoEstandar = async () => {
    cargando.value = true;
    try {
      listaMetodosDePagoEstandar.value = await metodosDePagoService.listarMetodosDePagoEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'agregar') => {
    confirmarImportacionPredefinida(tipoAccion, () => {
      void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'agregar') => {
    try {
      const payload = {
        ver : 'remplazarocopiardatosEntesReguladores',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaMetodosDePagoEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await metodosDePagoService.guardarMetodoDePago(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarMetodosDePago();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('importar');
    }
  };

  const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
  };

  const cambiarEstadoRegistro = async (metodoDePago: MetodoDePago) => {
    if (!metodoDePago.id) return;
    const nuevoEstado = metodoDePago.estado === 1 ? 2 : 1;
    try {
      await metodosDePagoService.cambiarEstadoMetodoDePago(metodoDePago.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarMetodosDePago();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

	return {
		listaMetodosDePago, metodoDePagoActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
		esVistaEstandar, listaMetodosDePagoEstandar,
		cargarMetodosDePago, guardarMetodoDePago,
		prepararNuevoMetodoDePago, prepararEdicionMetodoDePago, confirmarEliminarMetodoDePago,
		alternarVistaEstandar, cargarMetodosDePagoEstandar, confirmarImportacion,
		cambiarEstadoRegistro
	}
}