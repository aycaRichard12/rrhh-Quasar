import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { areasService } from 'src/modules/areas/services/areas.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';

// ESTADO GLOBAL COMPARTIDO
const listaAreas = ref<Area[]>([]);
const listaSucursales = ref<Sucursal[]>([]);
const cargando = ref<boolean>(false);
const esVisibleDialogo = ref<boolean>(false);
const esModoEdicion = ref<boolean>(false);

const areaActual = ref<Area>({
  nombre: '',
  descripcion: '',
  sucursal: null
});

export function useAreas() {
  const $q = useQuasar();

  const cargarAreas = async () => {
    cargando.value = true;
    try {
      const [dataAreas, dataSucursales] = await Promise.all([
        areasService.listarAreas(),
        areasService.listarSucursales()
      ]);
      listaAreas.value = Array.isArray(dataAreas) ? dataAreas : [];
      listaSucursales.value = Array.isArray(dataSucursales) ? dataSucursales : [];
    } catch (error: unknown) {
      console.error('Error al cargar áreas o sucursales:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar los datos de áreas.' });
    } finally {
      cargando.value = false;
    }
  };

  const abrirDialogoNuevo = () => {
    areaActual.value = { nombre: '', descripcion: '', sucursal: null };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const abrirDialogoEditar = async (area: Area) => {
    if (!area.id) return;
    cargando.value = true;
    try {
      const respuesta = await areasService.actualizarArea(area.id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        areaActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error: unknown) {
      console.error('Error al obtener área:', error);
      $q.notify({ type: 'negative', message: 'Error al obtener datos del área.' });
    } finally {
      cargando.value = false;
    }
  };

  // REFACTORIZADO: Ahora recibe datosFormulario tipo 'Area'
  const procesarGuardado = async (datosFormulario: Area) => {
    cargando.value = true;
    try {
      const payload = new FormData();
      const idEmpresa = String(idempresa_md5());

      payload.append('nombre', datosFormulario.nombre);
      payload.append('descripcion', datosFormulario.descripcion);

      if (datosFormulario.sucursal) {
        payload.append('sucursal', String(datosFormulario.sucursal.idsucursal));
      }

      if (esModoEdicion.value && datosFormulario.id) {
        payload.append('ver', 'editarArea'); 
        payload.append('id', String(datosFormulario.id));
      } else {
        payload.append('ver', 'registroAreas'); 
        payload.append('empresa', idEmpresa); 
      }

      const respuesta = await areasService.guardarArea(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Área guardada exitosamente.' });
        esVisibleDialogo.value = false;
        void cargarAreas(); 
      } else {
        $q.notify({ type: 'negative', message: respuesta.mensaje || 'Error al guardar.' });
      }
    } catch (error: unknown) {
      console.error('Error al guardar área:', error);
      $q.notify({ type: 'negative', message: 'Error de comunicación con el servidor.' });
    } finally {
      cargando.value = false;
    }
  };

  const confirmarEliminacion = (idArea: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?', 
      message: 'No podrá recuperar el registro del Área.',
      persistent: true,
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', label: 'Cancelar', flat: true }
    }).onOk(() => {
      void ejecutarEliminacion(idArea);
    });
  };

  const ejecutarEliminacion = async (idArea: string | number) => {
    cargando.value = true;
    try {
      const respuesta = await areasService.eliminarArea(idArea);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Eliminación exitosa.' });
        void cargarAreas();
      }
    } catch (error: unknown) {
      console.error('Error al eliminar área:', error);
      $q.notify({ type: 'negative', message: 'Error al eliminar el área.' });
    } finally {
      cargando.value = false;
    }
  };

  onMounted(() => {
    if (listaAreas.value.length === 0) void cargarAreas();
  });

  return {
    listaAreas, listaSucursales, cargando, esVisibleDialogo, esModoEdicion, areaActual,
    abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion, 
    alternarVistaEstandar: () => {} 
  };
}