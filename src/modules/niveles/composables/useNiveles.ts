import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import { nivelesService } from '../services/niveles.service';
import type { NivelesDeGravedad } from '../types/niveles.types';

export function useNiveles() {
  const idEmpresa = String(idempresa_md5());
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const cargando = ref(false);

  const listaNiveles = ref<NivelesDeGravedad[]>([]);
  const esVisibleDialogo = ref(false);

  const nivelActual = ref<NivelesDeGravedad>({
    nombre: '',
    pos: 0
  });

  const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

  const cargarNiveles = async () => {
    cargando.value = true;
    try {
      listaNiveles.value = await nivelesService.listarNivelesDeGravedad();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
  };

  const prepararNuevoNivel = () => {
    nivelActual.value = {
      nombre: '',
      pos: (listaNiveles.value.length + 1)
    };
    esModoEdicion.value = false;
    esVisibleDialogo.value = true;
  };

  const prepararEdicionNivel = async (id: number) => {
    try {
      const resp = await nivelesService.editarNivelDeGravedad(id);
      if (resp.estado === 'exito' && resp.datos) {
        nivelActual.value = { ...resp.datos };
        esModoEdicion.value = true;
        esVisibleDialogo.value = true;
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
  };

  const guardarNivel = async (datos: NivelesDeGravedad) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarNiveles' : 'registroNiveles',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        pos: datos.pos
      };
      const formData = prepararDatosFormulario(payload);
      const resp = await nivelesService.guardarNivelDeGravedad(formData);
      if (resp.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarNiveles();
      } else {
        notificarAdvertencia(resp.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarNivel = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const resp = await nivelesService.eliminarNivelDeGravedad(id);
        if (resp.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarNiveles();
        } else {
          notificarAdvertencia(resp.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
    });
  };

  return {
    listaNiveles,
    cargando,
    filtroBusqueda,
    esVisibleDialogo,
    esModoEdicion,
    nivelActual,
    cargarNiveles,
    prepararNuevoNivel,
    prepararEdicionNivel,
    guardarNivel,
    confirmarEliminarNivel
  };
}
