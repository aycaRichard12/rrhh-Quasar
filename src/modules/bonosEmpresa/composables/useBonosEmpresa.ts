import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { bonosEmpresaService } from '../services/bonosEmpresa.service';
import type { BonoEmpresa } from '../types/bonosEmpresa.types';

const listaBonosEmpresa = ref<BonoEmpresa[]>([]);
const listaBonosEstandar = ref<BonoEmpresa[]>([]);
const esVisibleDialogo = ref(false);
const esVisibleEstandar = ref(false);
const esModoEdicion = ref(false);

const bonoEmpresaActual = ref<BonoEmpresa>({
  nombre: '',
  descripcion: '',
  tipo: '1',
  cantidad: '0',
  orden: '',
  destino: '1'
});

export function useBonosEmpresa() {
  const $q = useQuasar();

  const cargarBonosEmpresa = async () => {
    try {
      listaBonosEmpresa.value = await bonosEmpresaService.obtenerBonosEmpresa();
    } catch (error) {
      console.error(error); // ESLint Fix: Usar la variable error
      $q.notify({ type: 'negative', message: 'Error al cargar los bonos de empresa' });
    }
  };

  const cargarBonosEstandar = async () => {
    try {
      listaBonosEstandar.value = await bonosEmpresaService.obtenerBonosEstandar();
      esVisibleEstandar.value = true;
    } catch (error) {
      console.error(error); // ESLint Fix
      $q.notify({ type: 'negative', message: 'Error al cargar el estándar de bonos' });
    }
  };

  const prepararNuevoBonoEmpresa = () => {
    bonoEmpresaActual.value = {
      nombre: '',
      descripcion: '',
      tipo: '1',
      cantidad: '0',
      orden: '',
      destino: '1'
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionBonoEmpresa = async (id: string | number) => {
    try {
      const respuesta = await bonosEmpresaService.obtenerBonoEmpresaPorId(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        bonoEmpresaActual.value = { ...respuesta.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error); // ESLint Fix
      $q.notify({ type: 'negative', message: 'Error al obtener datos del bono' });
    }
  };

  const guardarBonoEmpresa = async (datosGuardar: BonoEmpresa) => {
    try {
      const formData = new FormData();
      formData.append('ver', esModoEdicion.value ? 'editarbonosempresa' : 'registrobonosempresa');
      formData.append('idempresa', 'd09bf41544a3365a46c9077ebb5e35c3');
      
      if (esModoEdicion.value && datosGuardar.id) {
        formData.append('id', String(datosGuardar.id));
      }
      
      formData.append('nombre', String(datosGuardar.nombre));
      formData.append('descripcion', String(datosGuardar.descripcion));
      formData.append('tipo', String(datosGuardar.tipo));
      formData.append('cantidad', String(datosGuardar.cantidad));
      formData.append('orden', String(datosGuardar.orden));
      formData.append('destino', String(datosGuardar.destino));

      const respuesta = await bonosEmpresaService.guardarBonoEmpresa(formData);
      
      if (respuesta.estado === 'exito') {
        $q.notify({ type: 'positive', message: esModoEdicion.value ? 'Registro actualizado con éxito' : 'Registro creado con éxito' });
        esVisibleDialogo.value = false;
        void cargarBonosEmpresa();
      } else {
        $q.notify({ type: 'warning', message: respuesta.mensaje });
      }
    } catch (error) {
      console.error(error); // ESLint Fix
      $q.notify({ type: 'negative', message: 'Error al procesar la solicitud' });
    }
  };

  const confirmarEliminarBonoEmpresa = (id: string | number) => {
    $q.dialog({
      title: 'Confirmación',
      message: '¿Está seguro? No podrá recuperar el registro de este bono de empresa.',
      cancel: true,
      persistent: true
    }).onOk(() => { // ESLint Fix: Quitamos el async de aquí
      
      // Creamos la función asíncrona por dentro
      const ejecutarEliminacion = async () => {
        try {
          const respuesta = await bonosEmpresaService.eliminarBonoEmpresa(id);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: respuesta.mensaje });
            void cargarBonosEmpresa();
          }
        } catch (error) {
          console.error(error); // ESLint Fix
          $q.notify({ type: 'negative', message: 'Error al eliminar el registro' });
        }
      };

      // La ejecutamos protegiéndola con el void
      void ejecutarEliminacion();
    });
  };

  const cambiarEstadoBonoEmpresa = async (id: string | number, estadoActual: string | number) => {
    try {
      const nuevoEstado = String(estadoActual) === '1' ? '2' : '1';
      const respuesta = await bonosEmpresaService.editarEstadoBonoEmpresa(id, nuevoEstado);
      if (respuesta.estado === 'exito') {
        void cargarBonosEmpresa();
      }
    } catch (error) {
      console.error(error); // ESLint Fix
      $q.notify({ type: 'negative', message: 'Error al cambiar el estado' });
    }
  };

  const procesarImportacion = (tipoImportacion: number) => {
    const textoAccion = tipoImportacion === 1 
      ? 'reemplazará todos sus datos actuales' 
      : 'agregará los datos';
      
    $q.dialog({
      title: '¿Está seguro?',
      message: `Esta acción ${textoAccion}.`,
      cancel: true,
      persistent: true
    }).onOk(() => { // ESLint Fix: Quitamos el async de aquí
      
      // Creamos la función asíncrona por dentro
      const ejecutarImportacion = async () => {
        try {
          const formData = new FormData();
          formData.append('ver', 'remplazarocopiardatosBonosEmpresa');
          formData.append('idempresa', 'd09bf41544a3365a46c9077ebb5e35c3');
          formData.append('datos', JSON.stringify(listaBonosEstandar.value));
          formData.append('tipo', String(tipoImportacion));

          const respuesta = await bonosEmpresaService.procesarImportacionEstandar(formData);
          if (respuesta.estado === 'exito') {
            $q.notify({ type: 'positive', message: 'Proceso completado con éxito' });
            esVisibleEstandar.value = false;
            void cargarBonosEmpresa();
          }
        } catch (error) {
          console.error(error); // ESLint Fix
          $q.notify({ type: 'negative', message: 'Error en la importación' });
        }
      };

      // La ejecutamos protegiéndola con el void
      void ejecutarImportacion();
    });
  };

  return {
    listaBonosEmpresa,
    listaBonosEstandar,
    esVisibleDialogo,
    esVisibleEstandar,
    esModoEdicion,
    bonoEmpresaActual,
    cargarBonosEmpresa,
    cargarBonosEstandar,
    prepararNuevoBonoEmpresa,
    prepararEdicionBonoEmpresa,
    guardarBonoEmpresa,
    confirmarEliminarBonoEmpresa,
    cambiarEstadoBonoEmpresa,
    procesarImportacion
  };
}