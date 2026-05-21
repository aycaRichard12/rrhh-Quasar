import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { entesReguladoresService } from '../services/entesReguladores.service';
import type { EnteRegulador } from '../types/entesReguladores.types';

const listaEntesReguladores        = ref<EnteRegulador[]>([]);
const listaEntesReguladoresEstandar= ref<EnteRegulador[]>([]);
const esVisibleDialogo             = ref<boolean>(false);
const esModoEdicion                = ref<boolean>(false);
const esVistaEstandar              = ref<boolean>(false);

const enteReguladorActual = ref<EnteRegulador>({
  nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
});

export function useEntesReguladores() {
  const $q = useQuasar();

  const cargarEntesReguladores = async () => {
    try {
      listaEntesReguladores.value = await entesReguladoresService.listarEntesReguladores();
    } catch (error) {
      console.error('Error al cargar entes:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar entes reguladores.' });
    }
  };

  const cargarEntesReguladoresEstandar = async () => {
    try {
      listaEntesReguladoresEstandar.value = await entesReguladoresService.listarEntesReguladoresEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error('Error al cargar entes estándar:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar catálogo estándar.' });
    }
  };

  const prepararNuevoEnteRegulador = () => {
    enteReguladorActual.value = {
      nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
    }
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionEnteRegulador = async (id: string | number) => {
    try{
      const respuesta = await entesReguladoresService.actualizarEnteRegulador(id);
      if (respuesta.estado === 'exito' && respuesta.datos){
        enteReguladorActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
        console.error(error);
        $q.notify({ type: 'negative', message: 'Error al obtener datos del ente regulador' });
    }
  };

  const guardarEnteRegulador = async (datosGuardar: EnteRegulador) => {
    try {
      const formData = new FormData();
      const idEmpresa = String(idempresa_md5());
      formData.append('ver', esModoEdicion.value ? 'editarEnteregulador' : 'registroEnteregulador');
      formData.append('idempresa', idEmpresa);

      if (esModoEdicion.value && datosGuardar.id) {
        formData.append('id', String(datosGuardar.id));
      }

      formData.append('nombre', String(datosGuardar.nombre));
      formData.append('porcentaje', String(datosGuardar.porcentaje));
      formData.append('descripcion', String(datosGuardar.descripcion));
      formData.append('monto', String(datosGuardar.monto));
      formData.append('orden', String(datosGuardar.orden));
      const respuesta = await entesReguladoresService.guardarEnteRegulador(formData);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con exito' });
        esVisibleDialogo.value = false;
        void cargarEntesReguladores();
      } else {
        $q.notify({ type: 'warning', message: respuesta.mensaje })
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al procesar la solicitud' });
    }
  };

  const confirmarEliminarEnteRegulador = (id: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar este registro.',
      cancel: { color: 'primary', label: 'Cancelar', flat: true },
      persistent: true,
    }).onOk(() => {
      
      const ejecutarEliminacion = async () => {
        try {
          const respuesta = await entesReguladoresService.eliminarEnteRegulador(id);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: respuesta.mensaje });
            void cargarEntesReguladores();
          }
        } catch (error) {
          console.error(error);
          $q.notify({ type: 'negative', message: 'Error al eliminar el registro' });
        }
      };
      void ejecutarEliminacion();
    });
  };

  const cambiarEstadoEnteRegulador = async (id: string | number, estadoActual: string | number) => {
    try {
      const nuevoEstado = String(estadoActual) === '1' ? '0' : '1';
      const respuesta = await entesReguladoresService.cambiarEstadoEnteRegulador(id, nuevoEstado);
      if (respuesta.estado =='exito') {
        void cargarEntesReguladores();
      }
    } catch (error) {
      console.error(error);
      $q.notify({type: 'negative', message: 'Error al cambiar el estado' });
    }
  };

  const procesarImportacion = (tipoImportacion: number) => {
    const textoAccion = tipoImportacion === 1 
      ? 'reemplazará todos sus datos actuales' 
      : 'agregará los datos';
      
    $q.dialog({
      title: '¿Está seguro?',
      message: `Esta acción ${textoAccion}.`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      
      const ejecutarImportacion = async () => {
        try {
          const idEmpresa = String(idempresa_md5());
          const formData = new FormData();
          formData.append('ver', 'remplazarocopiardatosEntesReguladores');
          formData.append('idempresa', idEmpresa);
          formData.append('datos', JSON.stringify(listaEntesReguladoresEstandar.value));
          formData.append('tipo', String(tipoImportacion));

          const respuesta = await entesReguladoresService.procesarImportacionEstandar(formData);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: 'Proceso completado con éxito' });
            esVistaEstandar.value = false;
            void cargarEntesReguladores();
          }
        } catch (error) {
          console.error(error);
          $q.notify({ type: 'negative', message: 'Error en la importación' });
        }
      };
      void ejecutarImportacion();
    });
  };

  return {
    listaEntesReguladores, listaEntesReguladoresEstandar, esVisibleDialogo, esModoEdicion,  enteReguladorActual, esVistaEstandar,
    cargarEntesReguladores, cargarEntesReguladoresEstandar, prepararEdicionEnteRegulador, prepararNuevoEnteRegulador, guardarEnteRegulador, confirmarEliminarEnteRegulador , cambiarEstadoEnteRegulador, procesarImportacion
  };
}