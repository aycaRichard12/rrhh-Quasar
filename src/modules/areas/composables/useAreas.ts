import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { areasService } from 'src/modules/areas/services/areas.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';

const listaAreas      = ref<Area[]>([]);
const listaSucursales = ref<Sucursal[]>([]);
const cargando        = ref<boolean>(false);
const esVisibleDialogo= ref<boolean>(false);
const esModoEdicion   = ref<boolean>(false);

const areaActual = ref<Area>({
  nombre: '', descripcion: '', idsucursal: null
});

export function useAreas() {
  const $q = useQuasar();

  const cargarAreasSucursales = async () => {
    cargando.value = true;
    try {
      listaAreas.value = await areasService.listarAreas();
      listaSucursales.value = await areasService.listarSucursales();
    } catch (error: unknown) {
      console.error('Error al cargar áreas o sucursales:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar los datos' });
    } finally {
      cargando.value = false;
    }
  };

  const abrirDialogoNuevo = () => {
    areaActual.value = { nombre: '', descripcion: '', idsucursal: null };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const abrirDialogoEditar = async (area: Area) => { 
  if (!area.id) return;
  cargando.value = true;
  try {
    const respuesta = await areasService.actualizarArea(area.id);
    if (respuesta.estado === 'exito' && respuesta.datos) {
      const datosApi = respuesta.datos;
        // Filtramos el ID plano para que el select de Quasar lo lea perfecto
        const sucursalId = datosApi.sucursal ? (datosApi.sucursal.idsucursal || datosApi.sucursal.id) : datosApi.idsucursal;
        
        areaActual.value = { 
          ...datosApi, 
          idsucursal: sucursalId || null 
        };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
  } catch (error: unknown) {
      console.error('Error al obtener area:', error);
      $q.notify({type: 'negative', message: 'Error al obtener datos.' });
    } finally {
      cargando.value = false;
    }
  };

  const procesarGuardado = async (datosFormulario: Area) => {
  cargando.value = true;
  try {
    const payload = new FormData();
    const idEmpresa = String(idempresa_md5());

    payload.append('ver', esModoEdicion.value? 'editarArea' : 'registroArea');
    payload.append('idempresa', idEmpresa);

    if (esModoEdicion.value && datosFormulario.id) {
      payload.append('id', String(datosFormulario.id));
    }

    Object.entries(datosFormulario).forEach(([clave, valor]) => {
      // Excluimos "id" y el objeto complejo "sucursal", solo enviamos datos planos
        if (valor !== undefined && valor !== null && clave !== 'id' && clave !== 'sucursal') {
          payload.append(clave, String(valor));
        }
      });

    const respuesta = await areasService.guardarArea(payload);
    if (respuesta.estado === 'exito') {
      $q.notify({ type: 'positive', message: 'Área guardada exitosamente.' });
      esVisibleDialogo.value = false;
      void cargarAreasSucursales();
    }
  } catch (error: unknown) {
    console.error('Error al guardar area:', error);
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
      cargando.value = true;
      areasService.eliminarArea(idArea)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Area Eliminada.' });
          void cargarAreasSucursales
        })
        .catch((error: unknown) => {
          console.error('Error al eliminar area', error);
          $q.notify({ type: 'neagtive', message: 'Error al eliminar area. ' });
        })
        .finally(() => {cargando.value = false; });
    });
  };

  onMounted(() => {
    if (listaAreas.value.length === 0) void cargarAreasSucursales();
    });

  return {
    listaAreas, listaSucursales, cargando, esVisibleDialogo, esModoEdicion, areaActual,
    abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion
  };
}