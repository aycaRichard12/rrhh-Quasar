import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { beneficiosService } from '../services/beneficios.service';
import type { Beneficio } from '../types/beneficios.types';

export function useBeneficios() {
  const listaBeneficios = ref<Beneficio[]>([]);
  const cargando = ref<boolean>(false);
  const idEmpresa = String(idempresa_md5());
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');
  const listaBeneficiosEstandar = ref<Beneficio[]>([]);
  const esVistaEstandar = ref<boolean>(false);

  const beneficioActual = ref<Beneficio>({
    nombre: '',
    descripcion: '',
    tipo: 1,
    cantidad: 0,
    orden: 1,
    destino: 1,
    estado: 1
  });

  const { 
    notificarAdvertencia, notificarErrorAccion, notificarExitoAccion,
    confirmarEliminacionPredefinida, confirmarImportacionPredefinida
  } = useNotificaciones();

  const cargarBeneficios = async () => {
    cargando.value = true;
    try {
      listaBeneficios.value = await beneficiosService.listarBeneficios();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const calcularSiguienteOrden = (): number => {
    if (listaBeneficios.value.length === 0) return 1;
    const ordenes = listaBeneficios.value.map(b => Number(b.orden) || 0);
    return Math.max(...ordenes) + 1;
  };

  const prepararNuevoBeneficio = () => {
    beneficioActual.value = {
      nombre: '',
      descripcion: '',
      tipo: 1,
      cantidad: 0,
      orden: calcularSiguienteOrden(),
      destino: 1,
      estado: 1
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBeneficio = async (id: number) => {
    try {
      const respuesta = await beneficiosService.editarBeneficio(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        beneficioActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarBeneficio = async (datosGuardar: Beneficio) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarbeneficio' : 'registrobeneficio',
        idempresa : idEmpresa,
        ...datosGuardar
      };
      
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await beneficiosService.guardarBeneficio(datosFormulario);
      
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarBeneficios();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarBeneficio = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await beneficiosService.eliminarBeneficio(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarBeneficios();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cargarBeneficiosEstandar = async () => {
    cargando.value = true;
    try {
      listaBeneficiosEstandar.value = await beneficiosService.listarBeneficiosEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'agregar') => {
    confirmarImportacionPredefinida(tipoAccion, () => {
      void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'agregar') => {
    try {
      const payload = {
        ver : 'remplazarocopiardatosbeneficios',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaBeneficiosEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };

      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await beneficiosService.guardarBeneficio(datosFormulario);
      
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarBeneficios();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('importar');
    }
  };

  const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
  };

  const cambiarEstadoRegistro = async (beneficio: Beneficio) => {
    if (!beneficio.id) return;
    const nuevoEstado = beneficio.estado === 1 ? 2 : 1;
    try {
      await beneficiosService.cambiarEstadoBeneficio(beneficio.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarBeneficios();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaBeneficios, beneficioActual, esModoEdicion, filtroBusqueda, cargando,
    esVisibleDialogo, listaBeneficiosEstandar, esVistaEstandar,
    cargarBeneficios, prepararNuevoBeneficio, guardarBeneficio,
    prepararEdicionBeneficio, confirmarEliminarBeneficio,
    cargarBeneficiosEstandar, confirmarImportacion, alternarVistaEstandar, cambiarEstadoRegistro
  };
}