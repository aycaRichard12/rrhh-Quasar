import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';
import { areasService } from 'src/modules/areas/services/areas.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar} from 'quasar';

export function useAreas() {
  // 1. Configuraciones Globales del Composable
  const idEmpresa = String(idempresa_md5());
  const { t }     = useI18n();
  const $q        = useQuasar();
  // 2. Variables Reactivas
  const esModoEdicion    = ref(false);
  const esVisibleDialogo = ref(false);
  const listaAreas       = ref<Area[]>([]);
  const listaSucursales  = ref<Sucursal[]>([]);
  const datosFormulario  = ref<Area>({ id: undefined, nombre: '', descripcion: '', sucursal: null});

  // 3. Funciones de Obtención
  const cargarDatos = async () => {
    try {
      listaSucursales.value = await areasService.obtenerSucursales();
      const dataAreas = await areasService.obtenerAreas();
      if (Array.isArray(dataAreas)) {
        listaAreas.value = dataAreas;
      }
    } catch (error) {
      console.error('Error al cargar datos de áreas:', error);
    }
  };

  // 4. Funciones de Interfaz (Apertura de Modales)
  const nuevaArea = () => {
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
    datosFormulario.value = { id: undefined, nombre: '', descripcion: '', sucursal: null};
  };

  const editarArea = async (row: Area) => {
      if (!row.id) {
        console.error('El área seleccionado no tiene un ID válido');
        return;
      }
      try {
        const data = await areasService.verificarArea(row.id.toString());
        
        if (data.estado ==='exito' && data.datos){
          datosFormulario.value = {
            id:          data.datos.id,
            nombre:      data.datos.nombre,
            descripcion: data.datos.descripcion,
            sucursal:    data.datos.sucursal
          };
          esModoEdicion.value    = true;
          esVisibleDialogo.value = true;
          }
      } catch (error) {
          console.error('Error al editar área:', error);
        } 
  };

  const guardarArea = async (datosFormulario: Area) => {
    const payload = new FormData();
    
    payload.append('nombre', datosFormulario.nombre);
    payload.append('descripcion', datosFormulario.descripcion);

    if (datosFormulario.sucursal !== null && datosFormulario.sucursal !== undefined) {
      const idParaEnviar = typeof datosFormulario.sucursal === 'object' 
        ? datosFormulario.sucursal.idsucursal
        : datosFormulario.sucursal;
      payload.append('sucursal', String(idParaEnviar));
    }

    if (esModoEdicion.value && datosFormulario.id) {
      payload.append('ver', 'editarArea'); 
      payload.append('id', String(datosFormulario.id));
    } else {
      payload.append('ver', 'registroAreas'); 
      payload.append('empresa', idEmpresa);
    }

    try {
      await areasService.guardarArea(payload);
      esVisibleDialogo.value = false;
      await cargarDatos(); 
    } catch (error) {
      console.error('Error al guardar área:', error);
    }
  };

  const eliminarArea = (id: string | number) => {
    $q.dialog({
      title: t('cambio¿Está Seguro?'), 
      message: t('cambioNo podrá recuperar el registro del Área'),
      ok: { color: 'negative', label: t('cambioEliminar') },
      cancel: { color: 'primary', label: t('formBtn.cancel'), flat: true }
    }).onOk(() => {
      areasService.eliminarArea(id)
        .then(() => {
          $q.notify({ type: 'positive', message: t('cambioEliminación exitosa') });
          void cargarDatos();
        })
        .catch(error => {
          console.error(error);
          $q.notify({ type: 'negative', message: t('cambioError al eliminar') });
        });
    });
  };

  onMounted(cargarDatos);

  return {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, datosFormulario,
    nuevaArea, editarArea, guardarArea, eliminarArea, cargarDatos
  };
}