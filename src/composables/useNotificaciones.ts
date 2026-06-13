import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

// Tipado estricto para las acciones repetitivas de todos tus módulos
export type AccionesCRUD = 'cargar' | 'guardar' | 'eliminar' | 'importar';

export function useNotificaciones() {
  const $q = useQuasar();
  const { t } = useI18n();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. NOTIFICACIONES DINÁMICAS (Para usar con respuestas de la API)
  // ─────────────────────────────────────────────────────────────────────────────
  const notificarExito = (mensaje: string) => {
    $q.notify({ type: 'positive', message: mensaje });
  };

  const notificarError = (mensaje: string) => {
    $q.notify({ type: 'negative', message: mensaje });
  };

  const notificarAdvertencia = (mensaje: string) => {
    $q.notify({ type: 'warning', message: mensaje });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. NOTIFICACIONES PREDEFINIDAS E INTERNACIONALIZADAS
  // ─────────────────────────────────────────────────────────────────────────────
  
  /**
   * Genera notificaciones de error automáticas basadas en la acción del CRUD.
   */
  const notificarErrorAccion = (accion: AccionesCRUD) => {
    const mensajesError: Record<AccionesCRUD, string> = {
      // El segundo parámetro en t() es un fallback por si no existe la traducción aún
      cargar: t('notificaciones.error.cargar', 'Error al cargar los datos o conexión a internet desactivada'),
      guardar: t('notificaciones.error.guardar', 'Error al procesar y guardar la solicitud'),
      eliminar: t('notificaciones.error.eliminar', 'Error al intentar eliminar el registro'),
      importar: t('notificaciones.error.importar', 'Error al procesar el catálogo de importación')
    };
    notificarError(mensajesError[accion]);
  };

  /**
   * Genera notificaciones de éxito automáticas basadas en la acción del CRUD.
   */
  const notificarExitoAccion = (accion: AccionesCRUD) => {
    const mensajesExito: Record<AccionesCRUD, string> = {
      cargar: t('notificaciones.exito.cargar', 'Datos cargados exitosamente'),
      guardar: t('notificaciones.exito.guardar', 'Registro procesado y guardado con éxito'),
      eliminar: t('notificaciones.exito.eliminar', 'Registro eliminado correctamente'),
      importar: t('notificaciones.exito.importar', 'Catálogo procesado correctamente')
    };
    notificarExito(mensajesExito[accion]);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. DIÁLOGOS DE CONFIRMACIÓN
  // ─────────────────────────────────────────────────────────────────────────────

  const confirmarAccion = (
    titulo: string, 
    mensaje: string, 
    accionConfirmar: () => void | Promise<void>
  ) => {
    $q.dialog({
      title: titulo,
      message: mensaje,
      cancel: { color: 'primary', label: t('common.actions.cancel'), flat: true },
      persistent: true,
    }).onOk(() => {
      void accionConfirmar();
    });
  };

  /**
   * Wrapper predefinido específicamente para eliminar registros (súper repetitivo)
   */
  const confirmarEliminacionPredefinida = (accionConfirmar: () => void | Promise<void>) => {
    confirmarAccion(
      t('notificaciones.confirmar.eliminar.titulo', '¿Está Seguro?'),
      t('notificaciones.confirmar.eliminar.mensaje', 'No podrá recuperar este registro.'),
      accionConfirmar
    );
  };
  
  const confirmarImportacionPredefinida = (
    tipoAccion: 'reemplazar' | 'agregar', 
    accionConfirmar: () => void | Promise<void>
  ) => {
    const mensaje = tipoAccion === 'reemplazar'
      ? t('notificaciones.confirmar.importar.reemplazar', 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?')
      : t('notificaciones.confirmar.importar.agregar', 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?');

    confirmarAccion(
      t('notificaciones.confirmar.importar.titulo', 'Confirmar Importación'),
      mensaje,
      accionConfirmar
    );
  };

  return {
    notificarExito, notificarError, notificarAdvertencia,
    notificarErrorAccion, notificarExitoAccion, confirmarAccion,
    confirmarEliminacionPredefinida, confirmarImportacionPredefinida
  };
}