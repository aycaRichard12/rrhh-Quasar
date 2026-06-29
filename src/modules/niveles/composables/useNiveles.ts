import { ref } from 'vue';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { nivelesService } from '../services/niveles.service';
import type { NivelDeGravedad } from '../types/niveles.types';

export function useNiveles() {
  const idEmpresa = String(idempresa_md5());
  const listaNiveles = ref<NivelDeGravedad[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

  const nivelActual = ref<NivelDeGravedad>({
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
      const respuesta = await nivelesService.editarNivelDeGravedad(id);
      if (respuesta.estado === 'exito' && respuesta.datos) {
        nivelActual.value = { ...respuesta.datos };
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

  const guardarNivel = async (datos: NivelDeGravedad) => {
    try {
      const payload = {
        ver: esModoEdicion.value ? 'editarNiveles' : 'registroNiveles',
        idempresa: idEmpresa,
        id: datos.id,
        nombre: datos.nombre,
        pos: datos.pos
      };
      const datosFormulario = prepararDatosFormulario(payload);
      const respuesta = await nivelesService.guardarNivelDeGravedad(datosFormulario);
      if (respuesta.estado === 'exito') {
        notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarNiveles();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
  };

  const confirmarEliminarNivel = (id: number) => {
    confirmarEliminacionPredefinida(async () => {
      try {
        const respuesta = await nivelesService.eliminarNivelDeGravedad(id);
        if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarNiveles();
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
    listaNiveles, nivelActual,
    cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
    cargarNiveles, guardarNivel,
    prepararNuevoNivel, prepararEdicionNivel, confirmarEliminarNivel
  };
}