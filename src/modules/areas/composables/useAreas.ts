import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { areasService } from 'src/modules/areas/services/areas.service';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';

export function useAreas() {

  const listaAreas = ref<Area[]>([]);
  const listaSucursales = ref<Sucursal[]>([]);
  const idEmpresa = String(idempresa_md5());
  const esVisibleDialogo = ref<boolean>(false);
  const esModoEdicion = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');
  const cargando = ref<boolean>(false);

  const areaActual = ref<Area>({
    nombre: '',
    descripcion: '',
    sucursal: {
      idsucursal: 0,
      nombre: '',
      region: '',
      idregion: 0
    }
  });

  const { notificarAdvertencia, notificarErrorAccion, notificarExitoAccion, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarAreas = async () => {
    cargando.value = true;
    try {
      listaAreas.value = await areasService.listarAreas();
      listaSucursales.value = await areasService.listarSucursales();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevaArea = () => {
    areaActual.value = {
      nombre: '',
      descripcion: '',
      sucursal: {
        idsucursal: 0,
        nombre: '',
        region: '',
        idregion: 0
      }
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionArea = async (id: number) => {
    try{
      const respuesta = await areasService.editarArea(id);
      if (respuesta.estado === 'exito' && respuesta.datos){
        areaActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
        console.error(error);
        notificarErrorAccion('cargar');
    }
  };

  const guardarArea = async (datosGuardar: Area) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarArea' : 'registroAreas',
        idempresa : idEmpresa,
        id: datosGuardar.id,
        nombre: datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        idsucursal: datosGuardar.sucursal.idsucursal
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await areasService.guardarArea(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarAreas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarArea = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await areasService.eliminarArea(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarAreas();
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
    listaAreas, listaSucursales, areaActual, esModoEdicion, filtroBusqueda,
    esVisibleDialogo, cargando,
    cargarAreas, prepararNuevaArea, guardarArea,
    prepararEdicionArea, confirmarEliminarArea
  };
}