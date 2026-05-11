import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { areasService } from 'src/modules/areas/services/areas.service';
import type { Area, Sucursal } from 'src/modules/areas/types/areas.types';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';

export function useAreas() {
  // 1. Configuraciones Globales del Composable
  const idEmpresa = String(idempresa_md5());
  const { t } = useI18n();

  // 2. Variables Reactivas (Nombres en español y semánticos)
  const areasLista = ref<Area[]>([]);
  const sucursalesLista = ref<Sucursal[]>([]);
  const mostrarDialogo = ref(false);
  const esEdicion = ref(false);
  const formData = ref<Area>({ id: 0, nombre: '', descripcion: '', sucursal: null });

  // 3. Funciones de Obtención
  const cargarDatos = async () => {
    try {
      sucursalesLista.value = await areasService.obtenerSucursales();
      const dataAreas = await areasService.obtenerAreas();
      if (dataAreas.estado !== 'error') {
        areasLista.value = dataAreas;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 4. Funciones de Interfaz (Apertura de Modales)
  const nuevaArea = () => {
    formData.value = { id: 0, nombre: '', descripcion: '', sucursal: null };
    esEdicion.value = false;
    mostrarDialogo.value = true;
  };

  const editarArea = async (row: Area) => {
    try {
      const data = await areasService.verificarArea(row.id);
      if (data.estado === 'exito') {
        formData.value = {
          id: data.datos.id,
          nombre: data.datos.nombre,
          descripcion: data.datos.descripcion,
          sucursal: data.datos.idsucursal
        };
        esEdicion.value = true;
        mostrarDialogo.value = true;
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

    if (esEdicion.value) {
      payload.append('ver', 'editarArea'); 
      payload.append('id', String(datosFormulario.id));
    } else {
      payload.append('ver', 'registroAreas'); 
      // Aquí inyectamos el ID de la empresa dinámico para registros nuevos
      payload.append('empresa', idEmpresa);
    }

    try {
      await areasService.guardarArea(payload);
      mostrarDialogo.value = false;
      await cargarDatos(); 
    } catch (error) {
      console.error(error);
    }
  };

  // 6. Función de Eliminación
  const eliminarArea = async (id: string | number) => {
    if (!confirm(t('common.actions.delete'))) return;
    
    try {
      await areasService.eliminarArea(id);
      await cargarDatos();
    } catch (error) {
      console.error(error);
    }
  };

  // 7. Ciclo de Vida
  onMounted(cargarDatos);

  // 8. El "Escaparate" (Exportación)
  return {
    areasLista, 
    sucursalesLista, 
    mostrarDialogo, 
    esEdicion, 
    formData,
    nuevaArea, 
    editarArea, 
    guardarArea, 
    eliminarArea
  };
}