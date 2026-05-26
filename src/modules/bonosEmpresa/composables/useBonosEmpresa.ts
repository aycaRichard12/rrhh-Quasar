import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { bonosEmpresaService } from '../services/bonosEmpresa.service';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const listaBonosEmpresa = ref<BonoEmpresa[]>([]);
const listaBonosEmpresaEstandar = ref<BonoEmpresa[]>([]);
const esModoEdicion = ref(false);
const esVistaEstandar = ref(false);
const esVisibleDialogo = ref(false);

const bonoEmpresaActual = ref<BonoEmpresa>({
  nombre: '', descripcion: '', tipo: '1', cantidad: '0', orden: '', destino: '1'
});

export function useBonosEmpresa() {
  const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
  const idEmpresa = String(idempresa_md5());

  const cargarBonosEmpresa = async () => {
    try {
      listaBonosEmpresa.value = await bonosEmpresaService.listarBonosEmpresa();
    } catch (error) {
      console.error('Error al cargar bonos beneficio:', error);
      notificarError('Error al cargar los datos o conexión a internet desactivada');
    }
  };

  const cargarBonosEmpresaEstandar = async () => {
    try {
      listaBonosEmpresaEstandar.value = await bonosEmpresaService.listarBonosEmpresaEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error('Error al cargar bonos empresa estándar:', error);
      notificarError('Error al cargar los datos o conexión a internet desactivada');
    }
  };

  const prepararNuevoBonoEmpresa = () => {
    bonoEmpresaActual.value = {
      nombre: '', descripcion: '', tipo: '1', cantidad: '0', orden: '', destino: '1'
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBonoEmpresa = async (id: string) => {
    try {
      const respuesta = await bonosEmpresaService.editarBonoEmpresa(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        bonoEmpresaActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarError('Error al obtener datos del bono empresa');
    }
  };

  const guardarBonoEmpresa = async (datosGuardar: BonoEmpresa) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarbonosempresa' : 'registrobonosempresa',
        idempresa :idEmpresa,
        id : esModoEdicion.value ? datosGuardar.id : undefined,
        nombre : datosGuardar.nombre,
        descripcion : datosGuardar.descripcion,
        tipo : datosGuardar.tipo,
        cantidad : datosGuardar.cantidad,
        orden : datosGuardar.orden,
        destino : datosGuardar.destino,
      };
      const datosFormulario = prepararDatosFormulario(payload)
      const respuesta = await bonosEmpresaService.guardarBonoEmpresa(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con éxito');
        esVisibleDialogo.value = false;
        void cargarBonosEmpresa();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarError('Error al procesar la solicitud');
    }
  };

  const confirmarEliminarBonoEmpresa = (id: string) => {
    confirmarAccion('¿Está Seguro?', 'No podrá recuperar este registro.', async () => {
      try {
        const respuesta = await bonosEmpresaService.eliminarBonoEmpresa(id);
        if (respuesta.estado === 'exito') {
          notificarExito(respuesta.mensaje);
          void cargarBonosEmpresa();
        }
      } catch (error) {
        console.error(error);
        notificarError('Error al eliminar el registro');
      }
    });
  };

  const cambiarEstadoBonoEmpresa = async (bonoEmpresa: BonoEmpresa) => {
    if (!bonoEmpresa.id) return;
    const nuevoEstado = bonoEmpresa.estado == '1' ? '2' : '1';
    try {
      await bonosEmpresaService.cambiarEstadoBonoEmpresa(bonoEmpresa.id, nuevoEstado);
      notificarExito('Estado actualizado correctamente');
      void cargarBonosEmpresa();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      notificarError('Error al cambiar el estado del registro');
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'agregar') => {
    const mensaje = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?'
      : 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?';
    confirmarAccion('Confirmar Importación', mensaje, () => {
      void procesarImportacion(tipoAccion);
    });
  };
  
  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'agregar') => {
    try {
      const payload = {
        ver : 'remplazarocopiardatosBonosEmpresa',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaBonosEmpresaEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await bonosEmpresaService.guardarBonoEmpresa(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExito('Catálogo procesado correctamente');
        alternarVistaEstandar();
        void cargarBonosEmpresa();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error('Error procesando importación:', error);
      notificarError('Error al procesar el catálogo');
    }
  };
  
  const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
  };

  return {
    listaBonosEmpresa, listaBonosEmpresaEstandar, esVisibleDialogo, esModoEdicion, bonoEmpresaActual, esVistaEstandar, 
    cargarBonosEmpresa, cargarBonosEmpresaEstandar, prepararNuevoBonoEmpresa, prepararEdicionBonoEmpresa, guardarBonoEmpresa, confirmarEliminarBonoEmpresa, cambiarEstadoBonoEmpresa, confirmarImportacion, alternarVistaEstandar
  };
}