import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { tiposDeContratosService } from '../services/tiposDeContratos.service';
import type { TipoDeContrato } from '../types/tiposDeContratos.types';

export function useTiposDeContratos() {
  const idEmpresa = String(idempresa_md5());
  const listaTiposDeContratos = ref<TipoDeContrato[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);

  const esVistaEstandar = ref<boolean>(false);
  const listaTiposDeContratosEstandar = ref<TipoDeContrato[]>([]);
  
  const tipoDeContratoActual = ref<TipoDeContrato>({
    nombre: '',
    observacion: '',
    naturaleza: ''
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida, confirmarImportacionPredefinida } = useNotificaciones();

  const cargarTiposDeContratos = async () => {
    cargando.value = true;
    try {
      listaTiposDeContratos.value = await tiposDeContratosService.listarTiposDeContratos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoTipoDeContrato = () => {
    tipoDeContratoActual.value = {
      nombre: '',
      observacion: '',
      naturaleza: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionTipoDeContrato = async (id: number) => {
    try {
      const respuesta = await tiposDeContratosService.editarTipoDeContrato(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        tipoDeContratoActual.value = { ...respuesta.datos };
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

  const guardarTipoDeContrato = async (datosGuardar: TipoDeContrato) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarTipocontrato' : 'registroTipocontrato',
        idempresa: idEmpresa,
        ...datosGuardar
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await tiposDeContratosService.guardarTipoDeContrato(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarTiposDeContratos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarTipoDeContrato = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await tiposDeContratosService.eliminarTipoDeContrato(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarTiposDeContratos();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cargarTiposDeContratosEstandar = async () => {
    try {
      listaTiposDeContratosEstandar.value = await tiposDeContratosService.listarTiposDeContratosEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
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
        ver : 'remplazarocopiardatostipodecontrato',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaTiposDeContratosEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await tiposDeContratosService.guardarTipoDeContrato(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarTiposDeContratos();
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

  return {
    listaTiposDeContratos, tipoDeContratoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaTiposDeContratosEstandar,
    cargarTiposDeContratos, guardarTipoDeContrato,
    prepararNuevoTipoDeContrato, prepararEdicionTipoDeContrato, confirmarEliminarTipoDeContrato,
    cargarTiposDeContratosEstandar, confirmarImportacion, alternarVistaEstandar
  };
}