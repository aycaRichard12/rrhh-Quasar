import { ref, onMounted } from 'vue';
import { areasService } from '../services/areas.service';
import type { Area, Sucursal } from '../types/areas.types';

export function useAreas() {
  const ID_EMPRESA = 'd09bf41544a3365a46c9077ebb5e35c3';
  // Variables reactivas
  const areasList = ref<Area[]>([]);
  const sucursalesList = ref<Sucursal[]>([]);
  const showDialog = ref(false);
  const isEditing = ref(false);
  const formData = ref<Area>({ id: 0, nombre: '', descripcion: '', sucursal: null });

  // Funciones de obtención
  const cargarDatos = async () => {
    try {
      sucursalesList.value = await areasService.obtenerSucursales();
      const dataAreas = await areasService.obtenerAreas();
      if (dataAreas.estado !== 'error') areasList.value = dataAreas;
    } catch (error) {
      console.error(error);
    }
  };

  // Funciones para abrir el Popup
  const abrirNuevo = () => {
    formData.value = { id: 0, nombre: '', descripcion: '', sucursal: null };
    isEditing.value = false;
    showDialog.value = true;
  };

  const abrirEditar = async (row: Area) => {
    try {
      const data = await areasService.verificarArea(row.id);
      if (data.estado === "exito") {
        formData.value = {
          id: data.datos.id,
          nombre: data.datos.nombre,
          descripcion: data.datos.descripcion,
          sucursal: data.datos.idsucursal
        };
        isEditing.value = true;
        showDialog.value = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función Guardar
  const guardar = async (datosFormulario: Area) => {
  const payload = new FormData();
  
  // Usa "datosFormulario" en vez de "formData.value" en estas líneas
  payload.append('nombre', datosFormulario.nombre);
  payload.append('descripcion', datosFormulario.descripcion);

  if (datosFormulario.sucursal !== null) {
    const idParaEnviar = typeof datosFormulario.sucursal === 'object' 
      ? datosFormulario.sucursal.idsucursal || datosFormulario.sucursal.id || '' 
      : datosFormulario.sucursal;
    payload.append('sucursal', String(idParaEnviar));
  }

  if (isEditing.value) {
    payload.append('ver', 'editarArea'); 
    payload.append('id', String(datosFormulario.id));
  } else {
    payload.append('ver', 'registroAreas'); 
    payload.append('empresa', ID_EMPRESA);
  }

    try {
      await areasService.guardarArea(payload);
      showDialog.value = false;
      await cargarDatos(); // Recargamos la tabla
    } catch (error) {
      console.error(error);
    }
  };
  // Función Eliminar
  const eliminar = async (id: string | number) => {
    if (!confirm('¿Deseas eliminar esta área?')) return;
    try {
      await areasService.eliminarArea(id);
      await cargarDatos();
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(cargarDatos);

  return {
    areasList, sucursalesList, showDialog, isEditing, formData,
    abrirNuevo, abrirEditar, guardar, eliminar
  };
}