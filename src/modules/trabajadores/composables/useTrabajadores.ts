import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { trabajadoresService } from '../services/trabajadores.service';
import type { Trabajador, HistorialTrabajador } from '../types/trabajadores.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

export const useTrabajadores = () => {
  const idEmpresa = String(idempresa_md5());
  const listaTrabajadores = ref<Trabajador[]>([]);
  const listaCargos = ref<Cargo[]>([]);
    // Estados de Interfaz
  const cargando = ref<boolean>(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  // Estados de Historial
  const esVistaHistorial = ref<boolean>(false);
  const listaHistorial = ref<HistorialTrabajador[]>([]);

  const trabajadorActual = ref<Trabajador>({
    nombres: '',
    apellidos: '',
    ci: '',
    telefono: '',
    email: '',
    fechan: null, // YYYY-MM-DD
    direccion: '',
    estado: 1, // Por defecto activo
    foto: null,
    nacionalidad: 'Boliviana', // O el valor por defecto que uses
    profesion: '',
    estadot: 1,
    fecha: null,
    idcargo: '',
    cargo: '',
    salario: '',
    sexo: 1,
    estadocivil: 1,
    infcontcto: { estado: '', mensaje: '' },
    contrato: { mensaje: 'sin contrato', codigo: 101 }
  })

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarTrabajadores = async () => {
    cargando.value = true;
    try {
      listaTrabajadores.value = await trabajadoresService.listarTrabajadores();
    } catch (error) {
        console.error(error);
        notificarErrorAccion('cargar');
      } finally {
      cargando.value = false;
    }
  };

  const cargarCargos = async () => {
    cargando.value = true;
    try {
      listaCargos.value = await trabajadoresService.listarCargos();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoTrabajador = () => {
    trabajadorActual.value = {
      nombres: '',
      apellidos: '',
      ci: '',
      telefono: '',
      email: '',
      fechan: null, // YYYY-MM-DD
      direccion: '',
      estado: 1, // Por defecto activo
      foto: null,
      nacionalidad: 'Boliviana', // O el valor por defecto que uses
      profesion: '',
      estadot: 1,
      fecha: null,
      idcargo: '',
      cargo: '',
      salario: '',
      sexo: 1,
      estadocivil: 1,
      infcontcto: { estado: '', mensaje: '' },
      contrato: { mensaje: 'sin contrato', codigo: 101 }
    }
  }

  const prepararEdicionTrabajador = async (id: number) => {
    try {
      const respuesta = await trabajadoresService.editarTrabajador(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        trabajadorActual.value = { ...respuesta.datos };
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

  const guardarTrabajador = async (datosGuardar: Trabajador) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editartrabajador' : 'registrotrabajador',
        idempresa: idEmpresa,
        id: esModoEdicion.value ? datosGuardar.id : undefined,
        estadoimg: '1', // Hardcodeado según tu especificación
        nombres: datosGuardar.nombres,
        apellidos: datosGuardar.apellidos,
        sexo: datosGuardar.sexo,
        ci: datosGuardar.ci,
        telefono: datosGuardar.telefono,
        email: datosGuardar.email,
        fecha: datosGuardar.fechan ?? '', // El endpoint recibe la fecha de nacimiento como "fecha"
        direccion: datosGuardar.direccion,
        nacionalidad: datosGuardar.nacionalidad,
        profesion: datosGuardar.profesion,
        estadocivil: datosGuardar.estadocivil,
        cargo: datosGuardar.idcargo, // El endpoint espera el ID en el campo "cargo"
        estadot: datosGuardar.estadot,
        imagen: datosGuardar.foto ?? ''
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await trabajadoresService.guardarTrabajador(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarCargos();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarTrabajador = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await trabajadoresService.eliminarTrabajador(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarTrabajadores();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  // --- Lógica del Historial ---
  // const abrirHistorial = () => {
  //   // Aquí a futuro llamarías a tu servicio: await trabajadoresService.obtenerHistorial(trabajador.id)
  //   // Por ahora lo inicializamos vacío para abrir el modal
  //   listaHistorial.value = []; 
  //   esVisibleHistorial.value = true;
  // };

  // const descargarHistorialPdf = () => {
  //   $q.notify({ type: 'info', message: 'Descargando PDF...' });
  //   // Lógica futura para PDF
  // };

  return {
    listaTrabajadores, listaCargos, trabajadorActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    listaHistorial, esVistaHistorial,
    cargarTrabajadores, cargarCargos, prepararNuevoTrabajador,
    prepararEdicionTrabajador, guardarTrabajador, confirmarEliminarTrabajador,
    // abrirHistorial,
    // descargarHistorialPdf
  };
};