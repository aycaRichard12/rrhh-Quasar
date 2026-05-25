import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { entesReguladoresService } from '../services/entesReguladores.service';
import type { EnteRegulador } from '../types/entesReguladores.types';

const listaEntesReguladores        = ref<EnteRegulador[]>([]);
const listaEntesReguladoresEstandar= ref<EnteRegulador[]>([]);
const esVisibleDialogo             = ref<boolean>(false);
const esModoEdicion                = ref<boolean>(false);
const esVistaEstandar              = ref<boolean>(false);

const enteReguladorActual          = ref<EnteRegulador>({
	nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
});

export function useEntesReguladores() {
  
	const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
	const idEmpresa = String(idempresa_md5());

 	const cargarEntesReguladores = async () => {
  	try {
   		listaEntesReguladores.value = await entesReguladoresService.listarEntesReguladores();
  	} catch (error) {
   		console.error('Error al cargar entes:', error);
   		notificarError('Error al cargar los datos o conexión a internet desactivada');
  	}
 	};

  const cargarEntesReguladoresEstandar = async () => {
    try {
      listaEntesReguladoresEstandar.value = await entesReguladoresService.listarEntesReguladoresEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error('Error al cargar entes estándar:', error);
   		notificarError('Error al cargar los datos o conexión a internet desactivada');
    }
  };

  const prepararNuevoEnteRegulador = () => {
    enteReguladorActual.value = {
      nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
    }
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionEnteRegulador = async (id: string) => {
    try{
      const respuesta = await entesReguladoresService.editarEnteRegulador(id);
      if (respuesta.estado === 'exito' && respuesta.datos){
        enteReguladorActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      	console.error(error);
      	notificarError('Error al obtener datos del ente regulador' );
    }
  };

  const guardarEnteRegulador = async (datosGuardar: EnteRegulador) => {
    try {
			const payload = {
				ver				 : esModoEdicion.value ? 'editarEnteregulador' : 'registroEnteregulador',
				idempresa	 : idEmpresa,
      	id				 : esModoEdicion.value ? datosGuardar.id: undefined,
				nombre		 : datosGuardar.nombre,
      	porcentaje : datosGuardar.porcentaje,
      	descripcion: datosGuardar.descripcion,
      	monto			 : datosGuardar.monto,
      	orden			 : datosGuardar.orden
			}
			const datosFormulario = prepararDatosFormulario(payload)
      const respuesta = await entesReguladoresService.guardarEnteRegulador(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con éxito');
        esVisibleDialogo.value = false;
        void cargarEntesReguladores();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarError('Error al procesar la solicitud');
    }
  };

  const confirmarEliminarEnteRegulador = (id: string) => {
    confirmarAccion('¿Está Seguro?', 'No podrá recuperar este registro.', async () => {
      try {
        const respuesta = await entesReguladoresService.eliminarEnteRegulador(id);
          if (respuesta.estado === 'exito') {
            notificarExito(respuesta.mensaje);
            void cargarEntesReguladores();
          }
      } catch (error) {
        	console.error(error);
        	notificarError('Error al eliminar el registro');
      }
    });
  };

  const cambiarEstadoEnteRegulador = async (enteRegulador: EnteRegulador) => {
    if (!enteRegulador.id) return;
      const nuevoEstado = enteRegulador.estado == '1' ? '0' : '1';
		try {
			await entesReguladoresService.cambiarEstadoEnteRegulador(enteRegulador.id, nuevoEstado);
      notificarExito('Estado actualizado correctamente');
      void cargarEntesReguladores();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
			notificarError('Error al cambiar el estado del registro');
		}
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'agregar') => {
    const mensaje = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?'
      : 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?';
      
    confirmarAccion('Confirmar Importación', mensaje, () => {
        void procesarImportacion(tipoAccion);
      });
	};
      
  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'agregar') => {
  	try {
			const payload = {
				ver			 : 'remplazarocopiardatosEntesReguladores',
      	idempresa: idEmpresa,
      	datos		 : JSON.stringify(listaEntesReguladoresEstandar.value),
        tipo		 : tipoAccion === 'reemplazar' ? '1' : '2'
			};    
      const datosFormulario = prepararDatosFormulario(payload);
			const respuesta = await entesReguladoresService.guardarEnteRegulador(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExito('Catálogo procesado correctamente');
        alternarVistaEstandar();
        void cargarEntesReguladores();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error('Error procesando importación:', error);
      notificarError('Error al procesar el catálogo');
    }
  };
	
	const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
  };

  return {
    listaEntesReguladores, listaEntesReguladoresEstandar, esVisibleDialogo, esModoEdicion,  enteReguladorActual, esVistaEstandar,
    cargarEntesReguladores, cargarEntesReguladoresEstandar, prepararEdicionEnteRegulador, prepararNuevoEnteRegulador, guardarEnteRegulador, confirmarEliminarEnteRegulador , cambiarEstadoEnteRegulador, confirmarImportacion, alternarVistaEstandar
  };
}