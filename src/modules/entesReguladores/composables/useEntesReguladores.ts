import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { entesReguladoresService } from '../services/entesReguladores.service';
import type { EnteRegulador } from '../types/entesReguladores.types';

export function useEntesReguladores() {
  const $q = useQuasar();
  
  // Estados (Sustantivos)
  const listaEntes = ref<EnteRegulador[]>([]);
  const listaTemplates = ref<EnteRegulador[]>([]);
  const esVisibleDialogo = ref(false);
  const esVistaTemplates = ref(false);
  const cargando = ref(false);
  const esEdicion = ref(false);
  
  const enteActual = ref<EnteRegulador>({
    nombre: '', porcentaje: '', descripcion: '', monto: '', orden: ''
  });

  // Acciones (Verbos)
const cargarEntes = async () => {
    cargando.value = true;
    try {
      // Borramos el argumento que sobraba aquí
      listaEntes.value = await entesReguladoresService.obtenerLista();
    } catch (error) {
      console.error(error); // Imprimimos el error para quitar la alerta de "no usado"
      $q.notify({ type: 'negative', message: 'Error al cargar entes reguladores' });
    } finally {
      cargando.value = false;
    }
  };

    const cargarTemplates = async () => {
    cargando.value = true;
    try {
      listaTemplates.value = await entesReguladoresService.obtenerListaTemplates();
      esVistaTemplates.value = true;
    } catch (error) {
      console.error(error); // Añadido console.error
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

    const abrirDialogoEdicion = async (id: string) => {
    cargando.value = true;
    try {
      const respuesta = await entesReguladoresService.obtenerPorId(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        enteActual.value = { ...respuesta.datos };
        esEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error); // Añadido console.error
      $q.notify({ type: 'negative', message: 'Error al obtener datos' });
    } finally {
      cargando.value = false;
    }
  };

const guardarEnte = async () => {
    try {
      // Borramos el 3er argumento de idEmpresa
      const respuesta = await entesReguladoresService.guardar(enteActual.value, esEdicion.value);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Registro guardado exitosamente' });
        esVisibleDialogo.value = false;
        await cargarEntes();
      }
    } catch (error) {
      console.error(error); // Añadido console.error
      $q.notify({ type: 'negative', message: 'Error al guardar' });
    }
  };

    const confirmarEliminacion = (id: string) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar el registro del Ente Regulador',
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', label: 'Cancelar', flat: true }
    }).onOk(() => {
      // Quitamos el async () => y usamos .then() .catch()
      entesReguladoresService.eliminar(id)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Eliminación exitosa' });
          void cargarEntes();
        })
        .catch(error => {
          console.error(error); // Añadido console.error
          $q.notify({ type: 'negative', message: 'Error al eliminar' });
        });
    });
  };

const cambiarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await entesReguladoresService.cambiarEstado(id, nuevoEstado);
      await cargarEntes();
    } catch (error) {
      console.error(error); // Añadido console.error
      $q.notify({ type: 'negative', message: 'Error al cambiar estado' });
    }
  };

const procesarTemplates = (tipo: number) => {
    const mensaje = tipo === 1 
      ? 'Esta acción reemplazará todos sus datos por el template'
      : 'Esta acción agregará los datos del template a la tabla actual';

    $q.dialog({
      title: '¿Está seguro?', 
      message: mensaje, // ¡Arreglado! Aquí tenías solo "message" y buscaba una variable en inglés
      ok: { color: 'primary', label: 'Proceder' }, 
      cancel: true
    }).onOk(() => {
      // Quitamos el async () => y usamos .then() .catch(). Borramos también el 3er argumento.
      entesReguladoresService.importarTemplates(tipo, listaTemplates.value)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Operación exitosa' });
          esVistaTemplates.value = false;
          void cargarEntes();
        })
        .catch(error => {
          console.error(error); // Añadido console.error
          $q.notify({ type: 'negative', message: 'Error al procesar templates' });
        });
    });
  };

  onMounted(cargarEntes);

  return {
    listaEntes, listaTemplates, esVisibleDialogo, esVistaTemplates, cargando, enteActual, esEdicion,
    cargarEntes, cargarTemplates, abrirDialogoNuevo, abrirDialogoEdicion, guardarEnte,
    confirmarEliminacion, cambiarEstado, procesarTemplates
  };
}