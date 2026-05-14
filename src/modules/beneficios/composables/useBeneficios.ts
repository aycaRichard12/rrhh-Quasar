import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { 
  obtenerBeneficios, 
  obtenerBeneficiosEstandar, 
  guardarBeneficio, 
  eliminarBeneficio, 
  cambiarEstadoBeneficio,
  ejecutarAccionEstandar 
} from '../services/beneficios.service';
import type { Beneficio, BeneficioEstandar } from '../types/beneficios.types';

// 🌟 ESTADO GLOBAL COMPARTIDO: Todo lo que está fuera de la función es compartido por los componentes
const listaBeneficios = ref<Beneficio[]>([]);
const listaBeneficiosEstandar = ref<BeneficioEstandar[]>([]);
const esCargando = ref<boolean>(false);
const esVisibleDialogo = ref<boolean>(false);
const esModoEdicion = ref<boolean>(false);
const esVistaEstandar = ref<boolean>(false);

const beneficioActual = ref<Beneficio>({
  nombre: '',
  descripcion: '',
  tipo: '1',
  cantidad: '',
  orden: '',
  destino: ''
});

// Este es el ID que usa el sistema antiguo por defecto (Luego lo sacaremos de tu AuthStore)
const idEmpresa = 'd09bf41544a3365a46c9077ebb5e35c3';

export function useBeneficios() {
  const $q = useQuasar();

  const cargarBeneficios = async () => {
    esCargando.value = true;
    try {
      // 🌟 CORRECCIÓN: Le pasamos el idEmpresa en lugar del tokenApp
      const respuesta = await obtenerBeneficios(idEmpresa);
      listaBeneficios.value = respuesta;
    } catch {
      $q.notify({ type: 'negative', message: 'Error al cargar los beneficios.' });
    } finally {
      esCargando.value = false;
    }
  };

  const cargarBeneficiosEstandar = async () => {
    esCargando.value = true;
    try {
      const respuesta = await obtenerBeneficiosEstandar();
      listaBeneficiosEstandar.value = respuesta;
    } catch {
      $q.notify({ type: 'negative', message: 'Error al cargar beneficios estándar.' });
    } finally {
      esCargando.value = false;
    }
  };

  const alternarVistaEstandar = () => {
    esVistaEstandar.value = !esVistaEstandar.value;
    if (esVistaEstandar.value && listaBeneficiosEstandar.value.length === 0) {
      void cargarBeneficiosEstandar();
    }
  };

  const abrirDialogoNuevo = () => {
    beneficioActual.value = {
      nombre: '',
      descripcion: '',
      tipo: '1',
      cantidad: '',
      orden: '',
      destino: '1' // Corregido: 1 es Planilla en el código antiguo
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const abrirDialogoEditar = (beneficio: Beneficio) => {
    beneficioActual.value = { ...beneficio };
    esModoEdicion.value = true;
    esVisibleDialogo.value = true;
  };

  const procesarGuardado = async () => {
    esCargando.value = true;
    try {
      const datosFormulario = new FormData();
      datosFormulario.append('ver', 'registrobeneficio'); // El código antiguo exige esto
      datosFormulario.append('idempresa', idEmpresa);

      if (esModoEdicion.value && beneficioActual.value.id) {
        datosFormulario.set('ver', 'editarbeneficio');
        datosFormulario.append('id', beneficioActual.value.id);
      }

      Object.entries(beneficioActual.value).forEach(([clave, valor]) => {
        if (valor !== undefined && valor !== null && clave !== 'id') {
          datosFormulario.append(clave, valor.toString());
        }
      });

      const respuesta = await guardarBeneficio(datosFormulario);

      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Registro guardado exitosamente.' });
        esVisibleDialogo.value = false;
        void cargarBeneficios();
      } else {
        $q.notify({ type: 'negative', message: respuesta.mensaje || 'Error al guardar.' });
      }
    } catch {
      $q.notify({ type: 'negative', message: 'Error de comunicación con el servidor.' });
    } finally {
      esCargando.value = false;
    }
  };

  const confirmarEliminacion = (idBeneficio: string) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar el registro del Beneficio.',
      persistent: true,
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', flat: true, label: 'Cancelar' }
    }).onOk(() => {
      void ejecutarEliminacion(idBeneficio);
    });
  };

  const ejecutarEliminacion = async (idBeneficio: string) => {
    esCargando.value = true;
    try {
      const respuesta = await eliminarBeneficio(idBeneficio);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Beneficio eliminado.' });
        void cargarBeneficios();
      } else {
        $q.notify({ type: 'negative', message: respuesta.mensaje });
      }
    } catch {
      $q.notify({ type: 'negative', message: 'Error al eliminar el registro.' });
    } finally {
      esCargando.value = false;
    }
  };

  const cambiarEstadoRegistro = async (beneficio: Beneficio) => {
    if (!beneficio.id) return;
    esCargando.value = true;
    const nuevoEstado = beneficio.estado === '1' ? '2' : '1'; 
    try {
      const respuesta = await cambiarEstadoBeneficio(beneficio.id, nuevoEstado);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Estado actualizado correctamente.' });
        void cargarBeneficios();
      }
    } catch {
      $q.notify({ type: 'negative', message: 'Error al cambiar el estado.' });
    } finally {
      esCargando.value = false;
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'anadir') => {
    const mensajeDialogo = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos de la tabla de beneficios por el template.'
      : 'Esta acción agregará los datos del template a la tabla de beneficios.';

    $q.dialog({
      title: '¿Está seguro?',
      message: mensajeDialogo,
      persistent: true,
      ok: { color: 'primary', label: 'Sí' },
      cancel: { color: 'negative', flat: true, label: 'Cancelar' }
    }).onOk(() => {
      void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'anadir') => {
    esCargando.value = true;
    try {
      // Pasamos los datos que requiere el backend antiguo
      const respuesta = await ejecutarAccionEstandar(tipoAccion, listaBeneficiosEstandar.value, idEmpresa);
      
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Plantilla procesada correctamente.' });
        alternarVistaEstandar();
        void cargarBeneficios();
      } else {
        $q.notify({ type: 'negative', message: respuesta.mensaje || 'Error al procesar la plantilla.' });
      }
    } catch {
      $q.notify({ type: 'negative', message: 'Error de red al procesar los beneficios estándar.' });
    } finally {
      esCargando.value = false;
    }
  };

  // Solo cargar datos si la lista está vacía para evitar que cada componente haga un fetch repetido
  onMounted(() => {
    if (listaBeneficios.value.length === 0) {
      void cargarBeneficios();
    }
  });

  return {
    listaBeneficios,
    listaBeneficiosEstandar,
    esCargando,
    esVisibleDialogo,
    esModoEdicion,
    esVistaEstandar,
    beneficioActual,
    abrirDialogoNuevo,
    abrirDialogoEditar,
    procesarGuardado,
    confirmarEliminacion,
    cambiarEstadoRegistro,
    alternarVistaEstandar,
    confirmarImportacion
  };
}