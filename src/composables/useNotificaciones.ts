import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

// 1. Agregamos 'verificar' al tipado estricto
export type AccionesCRUD = 'cargar' | 'guardar' | 'eliminar' | 'importar' | 'verificar';

export function useNotificaciones() {
  const $q = useQuasar();
  const { t } = useI18n();

  const notificarExito = (mensaje: string) => {
    $q.notify({ type: 'positive', message: mensaje });
  };

  const notificarError = (mensaje: string) => {
    $q.notify({ type: 'negative', message: mensaje });
  };

  const notificarAdvertencia = (mensaje: string) => {
    $q.notify({ type: 'warning', message: mensaje });
  };

  const notificarErrorAccion = (accion: AccionesCRUD) => {
    const mensajesError: Record<AccionesCRUD, string> = {
      cargar: t('notificaciones.error.cargar', 'Error al cargar los datos o conexión a internet desactivada'),
      guardar: t('notificaciones.error.guardar', 'Error al procesar y guardar la solicitud'),
      eliminar: t('notificaciones.error.eliminar', 'Error al intentar eliminar el registro'),
      importar: t('notificaciones.error.importar', 'Error al procesar el catálogo de importación'),
      verificar: t('notificaciones.error.verificar', 'Error al verificar el estado del registro') // <-- Añadido
    };
    notificarError(mensajesError[accion]);
  };

  const notificarExitoAccion = (accion: AccionesCRUD) => {
    const mensajesExito: Record<AccionesCRUD, string> = {
      cargar: t('notificaciones.exito.cargar', 'Datos cargados exitosamente'),
      guardar: t('notificaciones.exito.guardar', 'Registro procesado y guardado con éxito'),
      eliminar: t('notificaciones.exito.eliminar', 'Registro eliminado correctamente'),
      importar: t('notificaciones.exito.importar', 'Catálogo procesado correctamente'),
      verificar: t('notificaciones.exito.verificar', 'Verificación completada correctamente') // <-- Añadido
    };
    notificarExito(mensajesExito[accion]);
  };

  const confirmarAccion = (titulo: string, mensaje: string, accionConfirmar: () => void | Promise<void>) => {
    $q.dialog({
      title: titulo,
      message: mensaje,
      cancel: { color: 'primary', label: t('common.actions.cancel'), flat: true },
      persistent: true,
    }).onOk(() => {
      void accionConfirmar();
    });
  };

  const confirmarEliminacionPredefinida = (accionConfirmar: () => void | Promise<void>) => {
    confirmarAccion(
      t('notificaciones.confirmar.eliminar.titulo', '¿Está Seguro?'),
      t('notificaciones.confirmar.eliminar.mensaje', 'No podrá recuperar este registro.'),
      accionConfirmar
    );
  };
  
  const confirmarImportacionPredefinida = (tipoAccion: 'reemplazar' | 'agregar', accionConfirmar: () => void | Promise<void>) => {
    const mensaje = tipoAccion === 'reemplazar'
      ? t('notificaciones.confirmar.importar.reemplazar', 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?')
      : t('notificaciones.confirmar.importar.agregar', 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?');

    confirmarAccion(t('notificaciones.confirmar.importar.titulo', 'Confirmar Importación'), mensaje, accionConfirmar);
  };

  return {
    notificarExito, notificarError, notificarAdvertencia,
    notificarErrorAccion, notificarExitoAccion, confirmarAccion,
    confirmarEliminacionPredefinida, confirmarImportacionPredefinida
  };
}