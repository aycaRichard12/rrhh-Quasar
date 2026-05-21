import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { areasService } from 'src/modules/areas/services/areas.service';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';

const listaAreas      = ref<Area[]>([]);
const listaSucursales = ref<Sucursal[]>([]);
const esVisibleDialogo= ref<boolean>(false);
const esModoEdicion   = ref<boolean>(false);

const areaActual = ref<Area>({
  nombre: '', descripcion: '', idsucursal: null
});

export function useAreas() {
  const $q = useQuasar();

  const cargarAreasSucursales = async () => {
    try {
      listaAreas.value = await areasService.listarAreas();
      listaSucursales.value = await areasService.listarSucursales();
    } catch (error) {
      console.error('Error al cargar áreas o sucursales:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar los datos o conexión internet desactivada' });
    }
  };

  const prepararNuevaArea = () => {
    areaActual.value = {
      nombre: '', descripcion: '', idsucursal: null
    }
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionArea = async (id: string | number) => {
    try{
      const respuesta = await areasService.editarArea(id);
      if (respuesta.estado === 'exito' && respuesta.datos){
        areaActual.value = { ...respuesta.datos, idsucursal: String(respuesta.datos.idsucursal ?? respuesta.datos.sucursal?.idsucursal ?? '')};        
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
        console.error(error);
        $q.notify({ type: 'negative', message: 'Error al obtener datos del area' });
    }
  };

  const guardarArea = async (datosGuardar: Area) => {
    try {
      const formData = new FormData();
      const idEmpresa = String(idempresa_md5());
      formData.append('ver', esModoEdicion.value ? 'editarArea' : 'registroAreas');
      formData.append('idempresa', idEmpresa);

      if (esModoEdicion.value && datosGuardar.id) {
        formData.append('id', String(datosGuardar.id))
      }

      formData.append('nombre', String(datosGuardar.nombre));
      formData.append('descripcion', String(datosGuardar.descripcion));
      formData.append('sucursal', String(datosGuardar.idsucursal));

      const respuesta = await areasService.guardarArea(formData);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: esModoEdicion.value ? 'Registro Actualizado con éxito':'Registro creado con exito'});
        esVisibleDialogo.value = false;
        void cargarAreasSucursales();
      } else {
        $q.notify({ type: 'warning', message: respuesta.mensaje })
      }
    } catch (error){
      console.error(error);
      $q.notify({ type: 'negative', message: 'Error al procesar la solicitud' });
    }
  };

  const confirmarEliminarArea = (id: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar este registro.',
      cancel: { color: 'primary', label: 'Cancelar', flat: true },
      persistent: true,
    }).onOk(() => {
      
      const ejecutarEliminacion = async () => {
        try {
          const respuesta = await areasService.eliminarArea(id);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: respuesta.mensaje });
            void cargarAreasSucursales();
          }
        } catch (error) {
          console.error(error);
          $q.notify({ type: 'negative', message: 'Error al eliminar el registro' });
        }
      };
      void ejecutarEliminacion();
    });
  };

  return {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, areaActual,
    cargarAreasSucursales, prepararNuevaArea, prepararEdicionArea, guardarArea, confirmarEliminarArea
  };
}