import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { salarioMinimoService } from '../services/salarioMinimo.service';
import type { SalarioMinimo } from '../types/salarioMinimo.types';

export function useSalarioMinimo() {
  const idEmpresa = String(idempresa_md5());
  const listaSalariosMinimos = ref<SalarioMinimo[]>([]);
  
  const cargando = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  const esVistaEstandar = ref<boolean>(false);
  const listaSalariosMinimosEstandar = ref<SalarioMinimo[]>([]);

  const salarioMinimoActual = ref<SalarioMinimo>({
    anio: 0,
    monto: 0,
    estado: 1,
    observacion: '',
		porcentaje: 0,

  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida, confirmarImportacionPredefinida } = useNotificaciones();

  const cargarSalariosMinimos = async () => {
    cargando.value = true;
    try {
      listaSalariosMinimos.value = await salarioMinimoService.listarSalariosMinimos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoSalarioMinimo = () => {
    salarioMinimoActual.value = {
      anio: 0,
			monto: 0,
			estado: 1,
      observacion: '',
      porcentaje: 0,
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionSalarioMinimo = async (id: number) => {
    try {
      const respuesta = await salarioMinimoService.editarSalarioMinimo(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        salarioMinimoActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarSalarioMinimo = async (datosGuardar: SalarioMinimo) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarsalariominimo' : 'registrosalariominimo',
        idempresa : idEmpresa,
        ...datosGuardar
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await salarioMinimoService.guardarSalarioMinimo(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarSalariosMinimos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarSalarioMinimo = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await salarioMinimoService.eliminarSalarioMinimo(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarSalariosMinimos();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cargarSalariosMinimosEstandar = async () => {
    cargando.value = true;
    try {
      listaSalariosMinimosEstandar.value = await salarioMinimoService.listarSalariosMinimosEstandar();
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
        ver : 'remplazarocopiardatosEntesReguladores',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaSalariosMinimosEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await salarioMinimoService.guardarSalarioMinimo(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarSalariosMinimos();
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

  const cambiarEstadoRegistro = async (item: SalarioMinimo) => {
    if (!item.id) return;
    const nuevoEstado = item.estado === 1 ? 2 : 1;
    try {
      await salarioMinimoService.cambiarEstadoSalarioMinimo(item.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarSalariosMinimos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaSalariosMinimos, salarioMinimoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaSalariosMinimosEstandar,
    cargarSalariosMinimos, guardarSalarioMinimo,
    prepararNuevoSalarioMinimo, prepararEdicionSalarioMinimo, confirmarEliminarSalarioMinimo,
    alternarVistaEstandar, cargarSalariosMinimosEstandar, confirmarImportacion,
    cambiarEstadoRegistro
  };
}