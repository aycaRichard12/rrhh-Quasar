import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { funcionesYObligacionesService } from '../services/funcionesYObligaciones.service';
import { cargosService } from 'src/modules/cargos/services/cargos.service';
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

export function useFuncionesYObligaciones() {
  const idEmpresa = String(idempresa_md5());
  const listaFuncionesYObligaciones = ref<FuncionYObligacion[]>([]);
  const listaCargos = ref<Cargo[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  const funcionYObligacionActual = ref<FuncionYObligacion>({
    nombre: '',
    descripcion: '',
    idcargo: 0,
    cargo: '',
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarCargos = async () => {
    cargando.value = true;
    try {
      listaCargos.value = await cargosService.listarCargos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const cargarFuncionesYObligaciones = async () => {
    cargando.value = true;
    try {
      listaFuncionesYObligaciones.value = await funcionesYObligacionesService.listarFuncionesYObligaciones();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevaFuncionYObligacion = () => {
    funcionYObligacionActual.value = {
      nombre: '',
      descripcion: '',
      idcargo: 0,
      cargo: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionFuncionYObligacion = async (id: number) => {
    try {
      const respuesta = await funcionesYObligacionesService.editarFuncionYObligacion(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        funcionYObligacionActual.value = { ...respuesta.datos };
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

  const guardarFuncionYObligacion = async (datosGuardar: FuncionYObligacion) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarFunYoblig' : 'registroFunYoblig',
        idempresa: idEmpresa,
        cargo: datosGuardar.idcargo,
        nombre: datosGuardar.nombre,
        descripcion: datosGuardar.descripcion
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await funcionesYObligacionesService.guardarFuncionYObligacion(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarFuncionesYObligaciones();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarFuncionYObligacion = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await funcionesYObligacionesService.eliminarFuncionYObligacion(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarCargos();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaCargos, listaFuncionesYObligaciones, funcionYObligacionActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarFuncionesYObligaciones, cargarCargos, guardarFuncionYObligacion,
    prepararNuevaFuncionYObligacion, prepararEdicionFuncionYObligacion, confirmarEliminarFuncionYObligacion
  };
}