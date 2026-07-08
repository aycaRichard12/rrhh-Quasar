import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { motivosDeBajaService } from '../services/motivosDeBaja.service';
import type { MotivoDeBaja } from '../types/motivosDeBaja.types';

export function useMotivosDeBaja() {
  const idEmpresa = String(idempresa_md5());
  const listaMotivos = ref<MotivoDeBaja[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const motivoActual = ref<MotivoDeBaja>({
    nombre: '',
    tipo: 1,
    descripcion: ''
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarMotivosDeBaja = async () => {
    cargando.value = true;
    try {
      listaMotivos.value = await motivosDeBajaService.listarMotivosDeBaja();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoMotivo = () => {
    motivoActual.value = {
      nombre: '',
      tipo: 1,
      descripcion: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionMotivo = async (id: number) => {
    try {
      const respuesta = await motivosDeBajaService.editarMotivoDeBaja(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        motivoActual.value = { ...respuesta.datos };
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

  const guardarMotivo = async (datosGuardar: MotivoDeBaja) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarmotivobaja' : 'registromotivobaja',
        idempresa: idEmpresa,
        id: datosGuardar.id,
        nombre: datosGuardar.nombre,
        tipo: datosGuardar.tipo,
        descripcion: datosGuardar.descripcion
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await motivosDeBajaService.guardarMotivoDeBaja(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarMotivosDeBaja();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarMotivo = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await motivosDeBajaService.eliminarMotivoDeBaja(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarMotivosDeBaja();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaMotivos, motivoActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarMotivosDeBaja, guardarMotivo,
    prepararNuevoMotivo, prepararEdicionMotivo, confirmarEliminarMotivo
  };
}