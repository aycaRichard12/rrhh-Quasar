import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { tiposDeContratosService } from '../services/tiposDeContratos.service';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';

export function useTiposDeContratos() {
  const $q = useQuasar();
  const { t } = useI18n();

  // Estados
  const listaTiposDeContratos = ref<TipoDeContrato[]>([]);
  const listaTiposDeContratosEstandar = ref<TipoDeContrato[]>([]);
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  const esVisibleEstandar = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');

  const tipoDeContratoActual = ref<TipoDeContrato>({
    nombre: '',
    observacion: '',
    naturaleza: ''
  });

  // Acciones
  const cargarTiposDeContratos = async (): Promise<void> => {
    try {
      listaTiposDeContratos.value = await tiposDeContratosService.obtenerTiposDeContratos();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.errorLoad') });
    }
  };

  const cargarTiposDeContratosEstandar = async (): Promise<void> => {
    try {
      listaTiposDeContratosEstandar.value = await tiposDeContratosService.obtenerTiposDeContratosEstandar();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.errorLoad') });
    }
  };

  const prepararNuevoTipoDeContrato = (): void => {
    tipoDeContratoActual.value = { nombre: '', observacion: '', naturaleza: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionTipoDeContrato = async (id: string | number): Promise<void> => {
    try {
      const respuesta = await tiposDeContratosService.verificarTipoDeContrato(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        tipoDeContratoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.errorLoad') });
    }
  };

  const guardarTipoDeContrato = async (datosGuardar: TipoDeContrato): Promise<void> => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarTipocontrato' : 'registroTipocontrato',
        idempresa: idempresa_md5(),
        ...datosGuardar
      };

      // ✅ CORRECCIÓN: Llamamos a la función con 1 solo argumento y recibimos el FormData
      const formData = prepararDatosFormulario(payload);

      const respuesta = await tiposDeContratosService.guardarTipoDeContrato(formData);

      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: respuesta.mensaje });
        esVisibleDialogo.value = false;
        void cargarTiposDeContratos();
      } else {
        $q.notify({ type: 'warning', message: respuesta.mensaje });
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.errorSave') });
    }
  };

  const confirmarEliminarTipoDeContrato = (id: string | number): void => {
    $q.dialog({
      title: t('common.titles.confirm'),
      message: t('common.messages.deleteWarning'),
      cancel: true,
      persistent: true,
      color: 'negative'
    }).onOk(() => {
      const ejecutarEliminacion = async () => {
        try {
          const respuesta = await tiposDeContratosService.eliminarTipoDeContrato(id);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: respuesta.mensaje });
            void cargarTiposDeContratos();
          }
        } catch (error) {
          console.error(error);
          $q.notify({ type: 'negative', message: t('common.messages.errorDelete') });
        }
      };
      void ejecutarEliminacion();
    });
  };

  const alternarVistaEstandar = (mostrar: boolean): void => {
    esVisibleEstandar.value = mostrar;
    if (mostrar && listaTiposDeContratosEstandar.value.length === 0) {
      void cargarTiposDeContratosEstandar();
    }
  };

  const confirmarImportacion = (tipo: number): void => {
    $q.dialog({
      title: t('common.titles.confirm'),
      message: tipo === 1 ? '¿Está seguro de reemplazar todos los registros?' : '¿Desea añadir estos registros a su tabla?',
      cancel: true,
      persistent: true,
      color: 'info'
    }).onOk(() => {
      const ejecutarImportacion = async () => {
        try {
          const payload = {
            ver: 'remplazarocopiardatostipodecontrato',
            idempresa: idempresa_md5(),
            datos: JSON.stringify(listaTiposDeContratosEstandar.value),
            tipo: String(tipo)
          };

          // ✅ CORRECCIÓN: Llamamos a la función con 1 solo argumento y recibimos el FormData
          const formData = prepararDatosFormulario(payload);

          const respuesta = await tiposDeContratosService.procesarImportacionEstandar(formData);

          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: respuesta.mensaje ?? 'Importación exitosa' });
            alternarVistaEstandar(false);
            void cargarTiposDeContratos();
          }
        } catch (error) {
          console.error(error);
          $q.notify({ type: 'negative', message: t('common.messages.errorProcess') });
        }
      };
      void ejecutarImportacion();
    });
  };

  return {
    listaTiposDeContratos,
    listaTiposDeContratosEstandar,
    esModoEdicion,
    esVisibleDialogo,
    esVisibleEstandar,
    tipoDeContratoActual,
    filtroBusqueda,
    cargarTiposDeContratos,
    prepararNuevoTipoDeContrato,
    prepararEdicionTipoDeContrato,
    guardarTipoDeContrato,
    confirmarEliminarTipoDeContrato,
    alternarVistaEstandar,
    confirmarImportacion
  };
}



































































// import { ref } from 'vue';
// import { idempresa_md5 } from 'src/composables/funcionesGenerales';
// import { prepararDatosFormulario } from 'src/utils/formUtils';
// import { useNotificaciones } from 'src/composables/useNotificaciones';
// import { tiposDeContratosService } from '../services/tiposDeContratos.service';
// import type { TipoDeContrato } from '../types/tiposDeContratos.types';

// export function useTiposDeContratos() {

//   const listaTiposDeContratos = ref<TipoDeContrato[]>([]);
//   const listaTiposDeContratosEstandar = ref<TipoDeContrato[]>([]);
//   const esModoEdicion = ref<boolean>(false);
//   const esVisibleDialogo = ref<boolean>(false);
//   const esVistaEstandar = ref<boolean>(false);
  
//   const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
//   const idEmpresa = String(idempresa_md5());

//   const tipoDeContratoActual = ref<TipoDeContrato>({
//     nombre: '', observacion: '', naturaleza: ''
//   });

//   const cargarTiposDeContratos = async (): Promise<void> => {
//     try {
//       listaTiposDeContratos.value = await tiposDeContratosService.listarTiposDeContratos();
//     } catch (error) {
//       console.error('Error al cargar tipos de contrato:', error);
//       notificarError('Error al cargar los datos o conexión a internet desactivada');
//     }
//   };

//   const cargarTiposDeContratosEstandar = async (): Promise<void> => {
//     try {
//       listaTiposDeContratosEstandar.value = await tiposDeContratosService.listarTiposDeContratosEstandar();
//     } catch (error) {
//       console.error('Error al cargar tipos de contrato:', error);
//       notificarError('Error al cargar los datos o conexión a internet desactivada');
//     }
//   };

//   const prepararNuevoTipoDeContrato = (): void => {
//     tipoDeContratoActual.value = {
//         nombre: '', observacion: '', naturaleza: ''
//     };
//     esModoEdicion.value = false;
//     esVisibleDialogo.value = true;
//   };

//   const prepararEdicionTipoDeContrato = async (id: string): Promise<void> => {
//     try {
//       const respuesta = await tiposDeContratosService.editarTipoDeContrato(id);
//       if (respuesta.estado === 'exito' && respuesta.datos) {
//         tipoDeContratoActual.value = { ...respuesta.datos };
//         esModoEdicion.value = true;
//         esVisibleDialogo.value = true;
//       }
//     } catch (error) {
//       console.error(error);
//       notificarError(('common.messages.errorLoad'));
//     }
//   };

//   const guardarTipoDeContrato = async (datosGuardar: TipoDeContrato): Promise<void> => {
//     try {
//       const payload = {
//         ver: esModoEdicion.value ? 'editarTipocontrato' : 'registroTipocontrato',
//         idempresa: idEmpresa,
//         id : esModoEdicion.value ? datosGuardar.id : undefined,
// 				nombre : datosGuardar.nombre,
// 				observacion: datosGuardar.observacion,
// 				naturaleza: datosGuardar.naturaleza
//       };
//       const formData = prepararDatosFormulario(payload);
//       const respuesta = await tiposDeContratosService.guardarTipoDeContrato(formData);
//       if (respuesta.estado === 'exito') {
//         notificarExito(esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con éxito');
//         esVisibleDialogo.value = false;
//         void cargarTiposDeContratos();
//       } else {
//         notificarAdvertencia(respuesta.mensaje);
//       }
//     } catch (error){
//       console.error(error);
//       notificarError('Error al procesar la solicitud');
//     }
//   };

//   const confirmarEliminarTipoDeContrato = (id: string): void => {
//     confirmarAccion('¿Está Seguro?', 'No podrá recuperar este registro.', async () => {
//         try {
//           const respuesta = await tiposDeContratosService.eliminarTipoDeContrato(id);
//           if (respuesta.estado === 'exito') {
//             notificarExito(respuesta.mensaje);
//             void cargarTiposDeContratos();
//           }
//         } catch (error) {
//           console.error(error);
//           notificarError('Error al eliminar el registro');
//         }
//     });
//   };

//   const confirmarImportacion = (tipoAccion: 'reemplazar' | 'agregar'): void => {
//     const mensaje = tipoAccion === 'reemplazar'
//       ? 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?'
//       : 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?';
//     confirmarAccion('Confirmar Importación', mensaje, () => {
//       void procesarImportacion(tipoAccion);
//     });
//   };

// 	const procesarImportacion = async (tipoAccion: 'reemplazar' | 'agregar') => {
//     try {
//       const payload = {
//         ver : 'remplazarocopiardatosBonosEmpresa',
//         idempresa : idEmpresa,
//         datos : JSON.stringify(listaTiposDeContratosEstandar.value),
//         tipo : tipoAccion === 'reemplazar' ? '1' : '2'
//       };
//       const datosFormulario = prepararDatosFormulario(payload);
//       const respuesta = await tiposDeContratosService.guardarTipoDeContrato(datosFormulario);
//       if (respuesta.estado === 'exito') {
//         notificarExito('Catálogo procesado correctamente');
//         alternarVistaEstandar();
//         void cargarTiposDeContratos();
//       } else {
//         notificarAdvertencia(respuesta.mensaje);
//       }
//     } catch (error) {
//       console.error('Error procesando importación:', error);
//       notificarError('Error al procesar el catálogo');
//     }
//   };

//     const alternarVistaEstandar = (): void => {
//     esVistaEstandar.value = !esVistaEstandar.value;
//   };

//   return {
//     listaTiposDeContratos, listaTiposDeContratosEstandar, esModoEdicion, esVisibleDialogo, esVistaEstandar, tipoDeContratoActual,
//     cargarTiposDeContratos, cargarTiposDeContratosEstandar, prepararNuevoTipoDeContrato, prepararEdicionTipoDeContrato, guardarTipoDeContrato, confirmarEliminarTipoDeContrato, alternarVistaEstandar, confirmarImportacion
//   };
// }