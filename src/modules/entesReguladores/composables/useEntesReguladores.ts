import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { entesReguladoresService } from '../services/entesReguladores.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { EnteRegulador, EnteReguladorEstandar } from '../types/entesReguladores.types';

const listaEntes        = ref<EnteRegulador[]>([]);
const listaEntesEstandar= ref<EnteReguladorEstandar[]>([]);
const cargando          = ref<boolean>(false);
const esVisibleDialogo  = ref<boolean>(false);
const esModoEdicion     = ref<boolean>(false);
const esVistaEstandar   = ref<boolean>(false);

const enteActual = ref<EnteRegulador>({
  nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
});

export function useEntesReguladores() {
  const $q = useQuasar();

  const cargarEntes = async () => {
    cargando.value = true;
    try {
      listaEntes.value = await entesReguladoresService.listarEntesReguladores();
    } catch (error: unknown) {
      console.error('Error al cargar entes:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar entes reguladores.' });
    } finally {
      cargando.value = false;
    }
  };

  const cargarEntesEstandar = async () => {
    cargando.value = true;
    try {
      listaEntesEstandar.value = await entesReguladoresService.listarEntesReguladoresEstandar();
    } catch (error: unknown) {
      console.error('Error al cargar entes estándar:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar catálogo estándar.' });
    } finally {
      cargando.value = false;
    }
  };

  const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
    if (esVistaEstandar.value && listaEntesEstandar.value.length === 0) {
      void cargarEntesEstandar();
    }
  };

  const abrirDialogoNuevo = () => {
    enteActual.value = { nombre: '', porcentaje: '', descripcion: '', monto: '', orden: '' };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const abrirDialogoEditar = async (ente: EnteRegulador) => {
    if (!ente.id) return;
    cargando.value = true;
    try {
      const respuesta = await entesReguladoresService.actualizarEnteRegulador(ente.id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        enteActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error: unknown) {
      console.error('Error al obtener ente:', error);
      $q.notify({ type: 'negative', message: 'Error al obtener datos.' });
    } finally {
      cargando.value = false;
    }
  };

  const procesarGuardado = async (datosFormulario: EnteRegulador) => {
    cargando.value = true;
    try {
      const payload = new FormData();
      const idEmpresa = String(idempresa_md5());

      payload.append('ver', esModoEdicion.value ? 'editarEnteregulador' : 'registroEnteregulador');
      payload.append('idempresa', idEmpresa);
      
      if (esModoEdicion.value && datosFormulario.id) {
        payload.append('id', String(datosFormulario.id));
      }

      Object.entries(datosFormulario).forEach(([clave, valor]) => {
        if (valor !== undefined && valor !== null && clave !== 'id') {
          payload.append(clave, String(valor));
        }
      });

      const respuesta = await entesReguladoresService.guardarEnteRegulador(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Registro guardado exitosamente.' });
        esVisibleDialogo.value = false;
        void cargarEntes();
      }
    } catch (error: unknown) {
      console.error('Error al guardar ente:', error);
      $q.notify({ type: 'negative', message: 'Error de comunicación con el servidor.' });
    } finally {
      cargando.value = false;
    }
  };

  const confirmarEliminacion = (idEnte: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar este registro.',
      persistent: true,
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', label: 'Cancelar', flat: true }
    }).onOk(() => {
      cargando.value = true;
      entesReguladoresService.eliminarEnteRegulador(idEnte)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Ente Regulador Eliminado.' });
          void cargarEntes();
        })
        .catch((error: unknown) => {
          console.error('Error al eliminar ente:', error);
          $q.notify({ type: 'negative', message: 'Error al eliminar el ente.' });
        })
        .finally(() => { cargando.value = false; });
    });
  };

  const cambiarEstadoRegistro = async (ente: EnteRegulador) => {
    if (!ente.id) return;
    cargando.value = true;
    const nuevoEstado = ente.estado == '1' ? '0' : '1'; 
    try {
      await entesReguladoresService.cambiarEstadoEnteRegulador(ente.id, nuevoEstado);
      $q.notify({ type: 'positive', message: 'Estado actualizado.' });
      void cargarEntes();
    } catch (error: unknown) {
      console.error('Error al cambiar estado:', error);
      $q.notify({ type: 'negative', message: 'Error al cambiar estado.' });
    } finally {
      cargando.value = false;
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'anadir') => {
    const mensaje = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos por el template.'
      : 'Esta acción agregará los datos del template a la tabla actual.';

    $q.dialog({
      title: '¿Está seguro?', message: mensaje, persistent: true,
      ok: { color: 'primary', label: 'Proceder' }, cancel: { color: 'negative', label: 'Cancelar', flat: true }
    }).onOk(() => {
      void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'anadir') => {
    cargando.value = true;
    try {
      const payload = new FormData();
      const idEmpresa = String(idempresa_md5());
      
      payload.append('ver', 'reemplazarocopiardatosentesreguladores');
      payload.append('idempresa', idEmpresa);
      payload.append('datos', JSON.stringify(listaEntesEstandar.value));
      payload.append('tipo', tipoAccion === 'reemplazar' ? '1' : '2');

      const respuesta = await entesReguladoresService.guardarEnteRegulador(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Catálogo procesado correctamente.' });
        alternarVistaEstandar();
        void cargarEntes();
      }
    } catch (error: unknown) {
      console.error('Error al procesar catálogo:', error);
      $q.notify({ type: 'negative', message: 'Error al procesar catálogo.' });
    } finally {
      cargando.value = false;
    }
  };

  onMounted(() => {
    if (listaEntes.value.length === 0) void cargarEntes();
  });

  return {
    listaEntes, listaEntesEstandar, cargando, esVisibleDialogo, esModoEdicion,  enteActual, esVistaEstandar,
    abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion, cambiarEstadoRegistro, alternarVistaEstandar, confirmarImportacion
  };
}