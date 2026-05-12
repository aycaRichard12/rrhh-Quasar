import { ref, onMounted } from 'vue';
import { areasService } from 'src/modules/areas/services/areas.service';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { useI18n } from 'vue-i18n';

export function useAreas() {
  // 1. Configuraciones Globales del Composable
  const idEmpresa = String(idempresa_md5());
  const { t } = useI18n();

  // 2. Variables Reactivas
  const esModoEdicion    = ref(false);
  const esVisibleDialogo = ref(false);
  const listaAreas       = ref<Area[]>([]);
  const listaSucursales  = ref<Sucursal[]>([]);
  const datosFormulario  = ref<Area>({ id: 0, nombre: '', descripcion: '', sucursal: null });

  // 3. Funciones de Obtención
  const cargarDatos = async () => {
    try {
      listaSucursales.value = await areasService.obtenerSucursales();
      const dataAreas = await areasService.obtenerAreas();
      if (dataAreas.estado !== 'error') {
        listaAreas.value = dataAreas;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 4. Funciones de Interfaz (Apertura de Modales)
  const nuevaArea = () => {
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
    datosFormulario.value = { id: 0, nombre: '', descripcion: '', sucursal: null };
  };

  const editarArea = async (row: Area) => {
    try {
      const data = await areasService.verificarArea(row.id);
      if (data.estado === 'exito') {
        datosFormulario.value = {
          id: data.datos.id,
          nombre: data.datos.nombre,
          descripcion: data.datos.descripcion,
          sucursal: data.datos.idsucursal
        };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 5. Función de Guardado (POST)
  const guardarArea = async (datosFormulario: Area) => {
    const payload = new FormData();
    
    payload.append('nombre', datosFormulario.nombre);
    payload.append('descripcion', datosFormulario.descripcion);

    if (datosFormulario.sucursal !== null) {
      const idParaEnviar = typeof datosFormulario.sucursal === 'object' 
        ? datosFormulario.sucursal.idsucursal || datosFormulario.sucursal.id || '' 
        : datosFormulario.sucursal;
      payload.append('sucursal', String(idParaEnviar));
    }

    if (esModoEdicion.value) {
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
      console.error(error);
    }
  };

  const eliminarArea = async (id: string | number) => {
    if (!confirm(t('common.actions.delete'))) return;
    
    try {
      await areasService.eliminarArea(id);
      await cargarDatos();
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(cargarDatos);

  return {
    listaAreas, listaSucursales, esVisibleDialogo, esModoEdicion, datosFormulario,
    nuevaArea, editarArea, guardarArea, eliminarArea
  };
}