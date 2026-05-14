import { entesReguladoresService } from '../services/entesReguladores.service';
import type { EnteRegulador } from '../types/entesReguladores.types';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

export function useEntesReguladores() {
  
  const idEmpresa        = String(idempresa_md5());
  const $q               = useQuasar();
  const listaEntes       = ref<EnteRegulador[]>([]);
  const listaTemplates   = ref<EnteRegulador[]>([]);
  const esVisibleDialogo = ref(false);
  const esVistaTemplates = ref(false);
  const cargando         = ref(false);
  const esEdicion        = ref(false);
  
  const enteActual = ref<EnteRegulador>({
    nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
  });

  // Acciones (Verbos)
  const cargarEntes = async () => {
    cargando.value = true;
    try {
      listaEntes.value = await entesReguladoresService.obtenerEntesReguladores();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al cargar entes reguladores' });
    } finally {
      cargando.value = false;
    }
  };

    const cargarTemplates = async () => {
    cargando.value = true;
    try {
      listaTemplates.value = await entesReguladoresService.obtenerTemplatesEntesReguladores();
      esVistaTemplates.value = true;
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al cargar templates (500)' });
    } finally {
      cargando.value = false;
    }
  };

  const abrirDialogoNuevo = () => {
    enteActual.value = { nombre: '', porcentaje: '', descripcion: '', monto: '', orden: '' };
    esEdicion.value = false;
    esVisibleDialogo.value = true;
  };

    const abrirDialogoEdicion = async (id: string | number) => {
    cargando.value = true;
    try {
      const respuesta = await entesReguladoresService.verificarEnteRegulador(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        enteActual.value = { ...respuesta.datos };
        esEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al obtener datos' });
    } finally {
      cargando.value = false;
    }
  };

  const guardarEnte = async () => {
    // ESTANDARIZACIÓN: El Composable construye el FormData
    const payload = new FormData();
    payload.append('ver', esEdicion.value ? 'editarEnteregulador' : 'registroEnteregulador');
    payload.append('idempresa', idEmpresa);
    
    if (enteActual.value.id) {
      payload.append('id', String(enteActual.value.id));
    }
    
    payload.append('nombre', enteActual.value.nombre);
    payload.append('porcentaje', String(enteActual.value.porcentaje));
    payload.append('descripcion', enteActual.value.descripcion);
    payload.append('monto', String(enteActual.value.monto));
    payload.append('orden', String(enteActual.value.orden));

    try {
      const respuesta = await entesReguladoresService.guardarEnteRegulador(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Registro guardado exitosamente' });
        esVisibleDialogo.value = false;
        await cargarEntes();
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al guardar' });
    }
  };

    const confirmarEliminacion = (id: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar el registro del Ente Regulador',
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', label: 'Cancelar', flat: true }
    }).onOk(() => {
      entesReguladoresService.eliminarEnteRegulador(id)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Eliminación exitosa' });
          void cargarEntes();
        })
        .catch(error => {
          console.error(error);
          $q.notify({ type: 'negative', message: 'Error al eliminar' });
        });
    });
  };

  const cambiarEstado = async (id: string | number, nuevoEstado: string | number) => {
    try {
      await entesReguladoresService.cambiarEstadoEnteRegulador(id, nuevoEstado);
      await cargarEntes();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al cambiar estado' });
    }
  };

  const procesarTemplates = (tipo: number) => {
    const mensaje = tipo === 1 
      ? 'Esta acción reemplazará todos sus datos por el template'
      : 'Esta acción agregará los datos del template a la tabla actual';

    $q.dialog({
      title: '¿Está seguro?', 
      message: mensaje,
      ok: { color: 'primary', label: 'Proceder' }, 
      cancel: true
    }).onOk(() => {
// ESTANDARIZACIÓN: El Composable construye el FormData para el Template
      const payload = new FormData();
      payload.append('ver', 'reemplazarocopiardatosentesreguladores');
      payload.append('idempresa', idEmpresa);
      payload.append('datos', JSON.stringify(listaTemplates.value));
      payload.append('tipo', String(tipo));

      entesReguladoresService.importarTemplatesEntesReguladores(payload)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Operación exitosa' });
          esVistaTemplates.value = false;
          void cargarEntes();
        })
        .catch(error => {
          console.error(error);
          $q.notify({ type: 'negative', message: 'Error al procesar templates' });
        });
    });
  };

  onMounted(cargarEntes);

  return {
    listaEntes, listaTemplates, esVisibleDialogo, esVistaTemplates, cargando, enteActual, esEdicion,
    cargarEntes, cargarTemplates, abrirDialogoNuevo, abrirDialogoEdicion, guardarEnte, confirmarEliminacion, cambiarEstado, procesarTemplates
  };
}