import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { entesReguladoresService } from '../services/entesReguladores.service';
import type { EnteRegulador } from '../types/entesReguladores.types';

export function useEntesReguladores() {
  const idEmpresa = String(idempresa_md5());
  const listaEntesReguladores = ref<EnteRegulador[]>([]);
  
  const cargando = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  const esVistaEstandar = ref<boolean>(false);
  const listaEntesReguladoresEstandar = ref<EnteRegulador[]>([]);

  const enteReguladorActual = ref<EnteRegulador>({
    nombre: '',
    descripcion: '',
    porcentaje: 0,
    monto: 0,
    orden: 1,
    estado: 1
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida, confirmarImportacionPredefinida } = useNotificaciones();

  const cargarEntesReguladores = async () => {
    cargando.value = true;
    try {
      listaEntesReguladores.value = await entesReguladoresService.listarEntesReguladores();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoEnteRegulador = () => {
    enteReguladorActual.value = {
      nombre: '',
      descripcion: '',
      porcentaje: '',
      monto: '',
      orden: calcularSiguienteOrden(),
      estado: 1
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionEnteRegulador = async (id: number) => {
    try {
      const respuesta = await entesReguladoresService.editarEnteRegulador(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        enteReguladorActual.value = { ...respuesta.datos };
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

  const guardarEnteRegulador = async (datosGuardar: EnteRegulador) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarEnteregulador' : 'registroEnteregulador',
        idempresa : idEmpresa,
        ...datosGuardar
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await entesReguladoresService.guardarEnteRegulador(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarEntesReguladores();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarEnteRegulador = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await entesReguladoresService.eliminarEnteRegulador(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarEntesReguladores();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cargarEntesReguladoresEstandar = async () => {
    cargando.value = true;
    try {
      listaEntesReguladoresEstandar.value = await entesReguladoresService.listarEntesReguladoresEstandar();
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
        datos : JSON.stringify(listaEntesReguladoresEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await entesReguladoresService.guardarEnteRegulador(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarEntesReguladores();
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

  const cambiarEstadoRegistro = async (ente: EnteRegulador) => {
    if (!ente.id) return;
    const nuevoEstado = ente.estado === 1 ? 2 : 1;
    try {
      await entesReguladoresService.cambiarEstadoEnteRegulador(ente.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarEntesReguladores();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const calcularSiguienteOrden = (): number => {
    if (listaEntesReguladores.value.length === 0) return 1;
    const ordenes = listaEntesReguladores.value.map(e => Number(e.orden) || 0);
    return Math.max(...ordenes) + 1;
  };

  return {
    listaEntesReguladores, enteReguladorActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaEntesReguladoresEstandar,
    cargarEntesReguladores, guardarEnteRegulador,
    prepararNuevoEnteRegulador, prepararEdicionEnteRegulador, confirmarEliminarEnteRegulador,
    cargarEntesReguladoresEstandar, confirmarImportacion, alternarVistaEstandar,
    cambiarEstadoRegistro
  };
}