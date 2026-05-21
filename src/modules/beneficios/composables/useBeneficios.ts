import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { beneficiosService } from '../services/beneficios.service';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
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
  const $q = useQuasar();

  const cargarBeneficios = async () => {
    try {
      listaBeneficios.value = await beneficiosService.listarBeneficios();
    } catch (error) {
      console.error('Error al cargar beneficios:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar los beneficios.' });
    }
  };

  const cargarBeneficiosEstandar = async () => {
    try {
      listaBeneficiosEstandar.value = await beneficiosService.listarBeneficiosEstandar();
      esVistaEstandar.value = true;
    } catch (error) {
      console.error('Error al cargar beneficios estándar:', error);
      $q.notify({ type: 'negative', message: 'Error al cargar beneficios estándar.' });
    }
  };

  const prepararNuevoBeneficio = () => {
    beneficioActual.value = {
      nombre: '', descripcion: '', tipo: '1', cantidad: '', orden: '', destino: '1'
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBeneficio = async (id: string | number) => {
      try {
      const respuesta = await beneficiosService.editarBeneficio(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        beneficioActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error('Error al obtener beneficio:', error);
      $q.notify({ type: 'negative', message: 'Error al obtener datos.' });
    }
  };

  const procesarGuardado = async (datosFormulario: Beneficio) => {
    cargando.value = true;
    try {
      const payload = new FormData();
      const idEmpresa = String(idempresa_md5());
      
      payload.append('ver', esModoEdicion.value ? 'editarBeneficio' : 'registroBeneficio');
      payload.append('idempresa', idEmpresa);

      if (esModoEdicion.value && datosFormulario.id) {
        payload.append('id', String(datosFormulario.id));
      }

      Object.entries(datosFormulario).forEach(([clave, valor]) => {
        if (valor !== undefined && valor !== null && clave !== 'id') {
          payload.append(clave, String(valor));
        }
      });

      const respuesta = await beneficiosService.guardarBeneficio(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Registro guardado exitosamente.' });
        esVisibleDialogo.value = false;
        void cargarBeneficios();
      }
    } catch (error: unknown) {
      console.error('Error al guardar beneficio:', error);
      $q.notify({ type: 'negative', message: 'Error de comunicación.' });
    } finally {
      cargando.value = false;
    }
  };

  const confirmarEliminacion = (idBeneficio: string | number) => {
    $q.dialog({
      title: '¿Está Seguro?',
      message: 'No podrá recuperar este registro.',
      persistent: true,
      ok: { color: 'negative', label: 'Eliminar' },
      cancel: { color: 'primary', label: 'Cancelar', flat: true }
    }).onOk(() => {
      cargando.value = true;
      beneficiosService.eliminarBeneficio(idBeneficio)
        .then(() => {
          $q.notify({ type: 'positive', message: 'Beneficio eliminado.' });
          void cargarBeneficios();
        })
        .catch((error: unknown) => {
          console.error('Error al eliminar beneficio:', error);
          $q.notify({ type: 'negative', message: 'Error al eliminar beneficio.' });
        })
        .finally(() => { cargando.value = false; });
    });
  };

  const cambiarEstadoRegistro = async (beneficio: Beneficio) => {
    if (!beneficio.id) return;
    cargando.value = true;
    const nuevoEstado = beneficio.estado == '1' ? '2' : '1'; 
    try {
      await beneficiosService.cambiarEstadoBeneficio(beneficio.id, nuevoEstado);
      $q.notify({ type: 'positive', message: 'Estado actualizado.' });
      void cargarBeneficios();
    } catch (error: unknown) {
      console.error('Error al cambiar estado:', error);
      $q.notify({ type: 'negative', message: 'Error al cambiar estado.' });
    } finally {
      cargando.value = false;
    }
  };

  const confirmarImportacion = (tipoAccion: 'reemplazar' | 'anadir') => {
    const mensaje = tipoAccion === 'reemplazar'
      ? 'Esta acción reemplazará todos sus datos por el template.'
      : 'Esta acción agregará los datos del template a la tabla actual.';

    $q.dialog({
      title: '¿Está seguro?', message: mensaje, persistent: true,
      ok: { color: 'primary', label: 'Proceder' }, cancel: { color: 'negative', flat: true, label: 'Cancelar' }
    }).onOk(() => {
        void procesarImportacion(tipoAccion);
    });
  };

  const procesarImportacion = async (tipoAccion: 'reemplazar' | 'anadir') => {
    cargando.value = true;
    try {
      const payload = new FormData();
      const idEmpresa = String(idempresa_md5());
      
      payload.append('ver', 'remplazarocopiardatosbeneficios');
      payload.append('idempresa', idEmpresa);
      payload.append('datos', JSON.stringify(listaBeneficiosEstandar.value));
      payload.append('tipo', tipoAccion === 'reemplazar' ? '1' : '2');

      const respuesta = await beneficiosService.guardarBeneficio(payload);
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: 'Catálogo procesado correctamente.' });
        alternarVistaEstandar();
        void cargarBeneficios();
      }
    } catch (error: unknown) {
      console.error('Error procesando importación:', error);
      $q.notify({ type: 'negative', message: 'Error al procesar catálogo.' });
    } finally {
      cargando.value = false;
    }
  };

  onMounted(() => {
    if (listaBeneficios.value.length === 0) void cargarBeneficios();
  });

  return {
    listaBeneficios, listaBeneficiosEstandar, cargando, esVisibleDialogo, esModoEdicion, beneficioActual, esVistaEstandar,
    abrirDialogoNuevo, abrirDialogoEditar, procesarGuardado, confirmarEliminacion, cambiarEstadoRegistro, alternarVistaEstandar, confirmarImportacion
  };
}