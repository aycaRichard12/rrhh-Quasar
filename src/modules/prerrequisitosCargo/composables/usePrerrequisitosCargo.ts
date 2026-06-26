import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { prerrequisitosCargoService } from '../services/prerrequisitosCargo.service';
import type { PrerrequisitoCargo } from '../types/prerrequisitosCargo.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

export function usePrerrequisitosCargo() {
  const idEmpresa = String(idempresa_md5());
  const listaPrerrequisitos = ref<PrerrequisitoCargo[]>([]);
  const listaCargos = ref<Cargo[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);

  const prerrequisitoActual = ref<PrerrequisitoCargo>({
    nombre: '',
    descripcion: '',
    idcargo: 0 
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();
  

  const cargarPrerrequisitos = async () => {
    cargando.value = true;
    try {
      listaPrerrequisitos.value = await prerrequisitosCargoService.listarPrerrequisitos();
      listaCargos.value = await prerrequisitosCargoService.listarCargos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoPrerrequisito = () => {
    prerrequisitoActual.value = { nombre: '', descripcion: '', idcargo: 0 };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionPrerrequisito = async (id: number) => {
    try {
      const respuesta = await prerrequisitosCargoService.editarPrerrequisito(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        prerrequisitoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarPrerrequisito = async (datosGuardar: PrerrequisitoCargo) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarPrerrequisito' : 'registroPrerrequisito',
        idempresa: idEmpresa,
        id: esModoEdicion.value ? datosGuardar.id : undefined,
        nombre: datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        idcargo: datosGuardar.idcargo
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await prerrequisitosCargoService.guardarPrerrequisito(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarPrerrequisitos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarPrerrequisito = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await prerrequisitosCargoService.eliminarPrerrequisito(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarPrerrequisitos();
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
    listaPrerrequisitos, listaCargos, prerrequisitoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarPrerrequisitos, prepararNuevoPrerrequisito,
    prepararEdicionPrerrequisito, guardarPrerrequisito, confirmarEliminarPrerrequisito
  };
}