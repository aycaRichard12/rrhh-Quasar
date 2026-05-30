import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { areasService } from 'src/modules/areas/services/areas.service';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';

const listaAreas      = ref<Area[]>([]);
const listaSucursales = ref<Sucursal[]>([]);
const esVisibleDialogo= ref<boolean>(false);
const esModoEdicion   = ref<boolean>(false);
const filtroBusqueda = ref<string>('');

const areaActual      = ref<Area>({
  nombre: '', descripcion: '', idsucursal: ''
});

export function useAreas() {
  
  const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();

  const cargarAreasSucursales = async () => {
    try {
      listaAreas.value = await areasService.listarAreas();
      listaSucursales.value = await areasService.listarSucursales();
    } catch (error) {
      console.error('Error al cargar áreas o sucursales:', error);
      notificarError('Error al cargar los datos o conexión a internet desactivada');    }
  };

  const prepararNuevaArea = () => {
    areaActual.value = {
      nombre: '', descripcion: '', idsucursal: ''
    }
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionArea = async (id: string) => {
    try{
      const respuesta = await areasService.editarArea(id);
      if (respuesta.estado === 'exito' && respuesta.datos){
        areaActual.value = { ...respuesta.datos, idsucursal: (respuesta.datos.idsucursal ?? respuesta.datos.sucursal?.idsucursal ?? '')};        
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
        console.error(error);
        notificarError('Error al obtener datos del area');
    }
  };
  const guardarArea = async (datosGuardar: Area) => {
    try {
      const payload = {
        ver        : esModoEdicion.value ? 'editarArea' : 'registroAreas',
        idempresa  : idempresa_md5(),
        id         : datosGuardar.id,
        nombre     : datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        sucursal   : datosGuardar.idsucursal
        };

        // La utilidad crea, llena y retorna el FormData en un solo paso
        const datosFormulario = prepararDatosFormulario(payload);
        const respuesta = await areasService.guardarArea(datosFormulario);

      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con éxito');
        esVisibleDialogo.value = false;
        void cargarAreasSucursales();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarError('Error al procesar la solicitud');
    }
  };

  const confirmarEliminarArea = (id: string) => {
    confirmarAccion(
      '¿Está Seguro?', 
      'No podrá recuperar este registro.', 
      async () => {
        try {
          const respuesta = await areasService.eliminarArea(id);
          if (respuesta.estado === 'exito') {
            notificarExito(respuesta.mensaje);
            void cargarAreasSucursales();
          }
        } catch (error) {
          console.error(error);
          notificarError('Error al eliminar el registro');
        }
      }
    );
  };

  return {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, areaActual,
    filtroBusqueda,
    cargarAreasSucursales, prepararNuevaArea, prepararEdicionArea, guardarArea, confirmarEliminarArea
  };
}