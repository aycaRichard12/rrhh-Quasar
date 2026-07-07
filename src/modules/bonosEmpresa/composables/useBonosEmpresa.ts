import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { bonosEmpresaService } from '../services/bonosEmpresa.service';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

export function useBonosEmpresa() {
  const idEmpresa = String(idempresa_md5());
  const listaBonosEmpresa = ref<BonoEmpresa[]>([]);

  const cargando = ref<boolean>(false);
  const filtroBusqueda = ref<string>('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const esVistaEstandar = ref(false);
  const listaBonosEmpresaEstandar = ref<BonoEmpresa[]>([]);

  const bonoEmpresaActual = ref<BonoEmpresa>({
    nombre: '',
    tipo: 1,
    cantidad: 0,
    orden: 0,
    destino: 1,
    descripcion: '',
    estado: 1,
    fecha: '',
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida, confirmarImportacionPredefinida } = useNotificaciones();

  const calcularSiguienteOrden = (): number => {
    if (listaBonosEmpresa.value.length === 0) return 1;
    const ordenes = listaBonosEmpresa.value.map(b => Number(b.orden) || 0);
    return Math.max(...ordenes) + 1;
  };

  const cargarBonosEmpresa = async () => {
    cargando.value = true;
    try {
      listaBonosEmpresa.value = await bonosEmpresaService.listarBonosEmpresa();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoBonoEmpresa = () => {
    bonoEmpresaActual.value = {
      nombre: '',
      tipo: 1,
      cantidad: 0,
      orden: calcularSiguienteOrden(),
      destino: 1,
      descripcion: '',
      estado: 1,
      fecha: ''
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBonoEmpresa = async (id: number) => {
    try {
      const respuesta = await bonosEmpresaService.editarBonoEmpresa(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        bonoEmpresaActual.value = { ...respuesta.datos };
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

  const guardarBonoEmpresa = async (datosGuardar: BonoEmpresa) => {
    try {
      const payload = {
        ver : esModoEdicion.value ? 'editarbonosempresa' : 'registrobonosempresa',
        idempresa :idEmpresa,
        id : datosGuardar.id,
        ...datosGuardar
      };
      const datosFormulario = prepararDatosFormulario(payload)
      const respuesta = await bonosEmpresaService.guardarBonoEmpresa(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarBonosEmpresa();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error){
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarBonoEmpresa = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await bonosEmpresaService.eliminarBonoEmpresa(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarBonosEmpresa();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  const cargarBonosEmpresaEstandar = async () => {
    cargando.value = true;
    try {
      listaBonosEmpresaEstandar.value = await bonosEmpresaService.listarBonosEmpresaEstandar();
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
        ver : 'remplazarocopiardatosBonosEmpresa',
        idempresa : idEmpresa,
        datos : JSON.stringify(listaBonosEmpresaEstandar.value),
        tipo : tipoAccion === 'reemplazar' ? '1' : '2'
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await bonosEmpresaService.guardarBonoEmpresa(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('importar');
        alternarVistaEstandar();
        void cargarBonosEmpresa();
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

  const cambiarEstadoBonoEmpresa = async (bonoEmpresa: BonoEmpresa) => {
    if (!bonoEmpresa.id) return;
    const nuevoEstado = bonoEmpresa.estado == 1 ? 2 : 1;
    try {
      await bonosEmpresaService.cambiarEstadoBonoEmpresa(bonoEmpresa.id, nuevoEstado);
      notificarExitoAccion('guardar');
      void cargarBonosEmpresa();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  return {
    listaBonosEmpresa, bonoEmpresaActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    esVistaEstandar, listaBonosEmpresaEstandar, 
    cargarBonosEmpresa, guardarBonoEmpresa,
    prepararNuevoBonoEmpresa, prepararEdicionBonoEmpresa, confirmarEliminarBonoEmpresa,
    alternarVistaEstandar, cargarBonosEmpresaEstandar, confirmarImportacion,
    cambiarEstadoBonoEmpresa
  };
}