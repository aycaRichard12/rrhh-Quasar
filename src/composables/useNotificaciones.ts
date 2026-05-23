import { useQuasar } from 'quasar';

export function useNotificaciones() {
  const $q = useQuasar();

  const notificarExito = (mensaje: string) => {
    $q.notify({ type: 'positive', message: mensaje });
  };

  const notificarError = (mensaje: string) => {
    $q.notify({ type: 'negative', message: mensaje });
  };

  const notificarAdvertencia = (mensaje: string) => {
    $q.notify({ type: 'warning', message: mensaje });
  };

  /**
   * Genera un diálogo de confirmación estandarizado.
   * @param titulo Título del diálogo
   * @param mensaje Mensaje de advertencia
   * @param accionConfirmar Función que se ejecutará si el usuario presiona "OK"
   */
  const confirmarAccion = (
    titulo: string, 
    mensaje: string, 
    accionConfirmar: () => void | Promise<void>
  ) => {
    $q.dialog({
      title: titulo,
      message: mensaje,
      cancel: { color: 'primary', label: 'Cancelar', flat: true },
      persistent: true,
    }).onOk(() => {
      // Usamos void para cumplir con la regla estricta de ESLint sobre promesas flotantes
      void accionConfirmar();
    });
  };

  return {
    notificarExito,
    notificarError,
    notificarAdvertencia,
    confirmarAccion
  };
}