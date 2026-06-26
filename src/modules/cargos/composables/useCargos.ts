import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { cargosService } from '../services/cargos.service';
import type { Cargo } from '../types/cargos.types';
import type { Area } from 'src/modules/areas/types/areas.types';

export function useCargos() {
  const idEmpresa = String(idempresa_md5());
  const listaCargos = ref<Cargo[]>([]);
  const listaAreas = ref<Area[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  const cargoActual = ref<Cargo>({
    cargo: '',
    salario: '',
    descripcion: '',
    idarea: ''
  });
  
  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarCargos = async () => {
    cargando.value = true;
    try {
      listaCargos.value = await cargosService.listarCargos();
      listaAreas.value = await cargosService.listarAreas();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoCargo = () => {
    cargoActual.value = {
      cargo: '',
      salario: '',
      descripcion: '',
      idarea: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionCargo = async (id: number) => {
    try {
      const respuesta = await cargosService.editarCargo(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        cargoActual.value = { ...respuesta.datos };
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

  const guardarCargo = async (datosGuardar: Cargo) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarCargo' : 'registroCargo',
        idempresa: idEmpresa,
        id: esModoEdicion.value ? datosGuardar.id : undefined,
        cargo: datosGuardar.cargo,
        salario: datosGuardar.salario,
        descripcion: datosGuardar.descripcion,
        area: datosGuardar.idarea // El payload API espera el select como "area"
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await cargosService.guardarCargo(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarCargos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarCargo = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await cargosService.eliminarCargo(id);
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
    listaCargos, listaAreas, cargoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarCargos, guardarCargo,
    prepararNuevoCargo, prepararEdicionCargo, confirmarEliminarCargo
  };
}