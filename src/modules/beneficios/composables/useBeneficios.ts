import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { beneficiosService } from '../services/beneficios.service';
import type { Beneficio } from '../types/beneficios.types';

const listaBeneficios        = ref<Beneficio[]>([]);
const listaBeneficiosEstandar= ref<Beneficio[]>([]);
const esVisibleDialogo       = ref<boolean>(false);
const esModoEdicion          = ref<boolean>(false);
const esVistaEstandar        = ref<boolean>(false);

const beneficioActual        = ref<Beneficio>({
  nombre: '', descripcion: '', tipo: '1', cantidad: '', orden: '', destino: '1'
});

export function useBeneficios() {

  const { notificarExito, notificarError, notificarAdvertencia, confirmarAccion } = useNotificaciones();
  const idEmpresa = String(idempresa_md5());


  const cargarBeneficios = async () => {
    try {
      listaBeneficios.value = await beneficiosService.listarBeneficios();
    } catch (error) {
      console.error('Error al cargar beneficios:', error);
      notificarError('Error al cargar los datos o conexión a internet desactivada');
    }
  };

  const cargarBeneficiosEstandar = async () => {
    try {
      listaBeneficiosEstandar.value = await beneficiosService.listarBeneficiosEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error('Error al cargar beneficios estándar:', error);
      notificarError('Error al cargar los datos o conexión a internet desactivada');
    }
  };

  const prepararNuevoBeneficio = () => {
    beneficioActual.value = {
      nombre: '', descripcion: '', tipo: '1', cantidad: '', orden: '', destino: '1'
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBeneficio = async (id: string) => {
    try {
      const respuesta = await beneficiosService.editarBeneficio(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        beneficioActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarError('Error al obtener datos del beneficio');
    }
  };

  const guardarBeneficio = async (datosGuardar: Beneficio) => {
    try {
      const payload = {
        ver        : esModoEdicion.value ? 'editarbeneficio' : 'registrobeneficio',
        idempresa  : idEmpresa,
        id         : esModoEdicion.value ? datosGuardar.id : undefined, 
        nombre     : datosGuardar.nombre,
        descripcion: datosGuardar.descripcion,
        tipo       : datosGuardar.tipo,
        cantidad   : datosGuardar.cantidad,
        orden      : datosGuardar.orden,
        destino    : datosGuardar.destino
      };
      const datosFormulario = prepararDatosFormulario(payload)
      const respuesta = await beneficiosService.guardarBeneficio(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExito(esModoEdicion.value ? 'Registro Actualizado con éxito' : 'Registro creado con éxito');
        esVisibleDialogo.value = false;
        void cargarBeneficios();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarError('Error al procesar la solicitud');
    }
  };

  const confirmarEliminarBeneficio = (id: string) => {
    confirmarAccion('¿Está Seguro?', 'No podrá recuperar este registro.', async () => {
      try {
        const respuesta = await beneficiosService.eliminarBeneficio(id);
        if (respuesta.estado === 'exito') {
          notificarExito(respuesta.mensaje);
          void cargarBeneficios();
        }
      } catch (error) {
        console.error(error);
        notificarError('Error al eliminar el registro');
      }
    });
  };

  const cambiarEstadoRegistro = async (beneficio: Beneficio) => {
    if (!beneficio.id) return;
    const nuevoEstado = beneficio.estado == '1' ? '2' : '1'; 
    try {
      await beneficiosService.cambiarEstadoBeneficio(beneficio.id, nuevoEstado);
      notificarExito('Estado actualizado correctamente');
      void cargarBeneficios();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      notificarError('Error al cambiar el estado del registro');
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'anadir') => {
    const mensaje = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos actuales por los del catálogo estándar. ¿Desea continuar?'
      : 'Esta acción agregará los datos del catálogo estándar a su tabla actual. ¿Desea continuar?';

    confirmarAccion('Confirmar Importación', mensaje, () => {
      void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'anadir') => {
    try {
      const payload = {
        ver      : 'remplazarocopiardatosbeneficios',
        idempresa: idEmpresa,
        datos    : JSON.stringify(listaBeneficiosEstandar.value),
        tipo     : tipoAccion === 'reemplazar' ? '1' : '2'
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await beneficiosService.guardarBeneficio(datosFormulario);
      
      if (respuesta.estado === 'exito') {
        notificarExito('Catálogo procesado correctamente');
        alternarVistaEstandar();
        void cargarBeneficios();
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
    listaBeneficios, listaBeneficiosEstandar, esVisibleDialogo, esModoEdicion, beneficioActual, esVistaEstandar,
    cargarBeneficios,cargarBeneficiosEstandar, prepararNuevoBeneficio, prepararEdicionBeneficio, guardarBeneficio, confirmarEliminarBeneficio, cambiarEstadoRegistro, confirmarImportacion, alternarVistaEstandar
  };
}