import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { trabajadoresService } from '../services/trabajadores.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { Trabajador, HistorialTrabajador } from '../types/trabajadores.types';
import type { Cargo } from 'src/modules/cargos/types/cargos.types';

export const useTrabajadores = () => {
  const $q = useQuasar();
  const { t } = useI18n();

  // Estados Reactivos
  const listaTrabajadores = ref<Trabajador[]>([]);
  const listaCargos = ref<Cargo[]>([]);
  const trabajadorActual = ref<Trabajador>({} as Trabajador);
  
  // Estados de Interfaz
  const cargando = ref<boolean>(false);
  const esModoEdicion = ref<boolean>(false);
  const esVisibleDialogo = ref<boolean>(false);
  
  // Estados de Historial
  const esVisibleHistorial = ref<boolean>(false);
  const listaHistorial = ref<HistorialTrabajador[]>([]);

  const cargarCargos = async () => {
    try {
      listaCargos.value = await trabajadoresService.listarCargos();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.error') });
    }
  };

  const cargarTrabajadores = async () => {
    cargando.value = true;
    try {
      listaTrabajadores.value = await trabajadoresService.listarTrabajadores();
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.error') });
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
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionTrabajador = async (id: number) => {
    cargando.value = true;
    try {
      const respuesta = await trabajadoresService.editarTrabajador(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        trabajadorActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.error') });
    } finally {
      cargando.value = false;
    }
  };

  const guardarTrabajador = async (datosGuardar: Trabajador) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editartrabajador' : 'registrotrabajador',
        idempresa: idempresa_md5(),
        id: datosGuardar.id ?? '',
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

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const respuesta = await trabajadoresService.guardarTrabajador(formData);

      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: respuesta.mensaje });
        esVisibleDialogo.value = false;
        void cargarTrabajadores();
      } else {
        $q.notify({ type: 'negative', message: respuesta.mensaje });
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.error') });
    }
  };

  const confirmarEliminarTrabajador = (id: number) => {
    $q.dialog({
      title: t('common.actions.delete'),
      message: t('common.messages.deleteConfirmation'),
      cancel: true,
      persistent: true
    }).onOk(() => {
      void ejecutarEliminacion(id);
    });
  };

  const ejecutarEliminacion = async (id: number) => {
    try {
      const respuesta = await trabajadoresService.eliminarTrabajador(id);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: respuesta.mensaje });
        void cargarTrabajadores();
      } else {
        $q.notify({ type: 'warning', message: respuesta.mensaje });
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('common.messages.error') });
    }
  };

  // --- Lógica del Historial ---
  const abrirHistorial = async (trabajador: Trabajador) => {
    // Aquí a futuro llamarías a tu servicio: await trabajadoresService.obtenerHistorial(trabajador.id)
    // Por ahora lo inicializamos vacío para abrir el modal
    listaHistorial.value = []; 
    esVisibleHistorial.value = true;
  };

  const descargarHistorialPdf = () => {
    $q.notify({ type: 'info', message: 'Descargando PDF...' });
    // Lógica futura para PDF
  };

  return {
    listaTrabajadores,
    listaCargos,
    trabajadorActual,
    cargando,
    esModoEdicion,
    esVisibleDialogo,
    esVisibleHistorial,
    listaHistorial,
    cargarTrabajadores,
    cargarCargos,
    prepararNuevoTrabajador,
    prepararEdicionTrabajador,
    guardarTrabajador,
    confirmarEliminarTrabajador,
    abrirHistorial,
    descargarHistorialPdf
  };
};