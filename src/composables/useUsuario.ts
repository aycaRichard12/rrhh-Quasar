import { ref } from 'vue';
import { usuarioService } from 'src/services/usuario.service';
import { useNotificaciones } from 'src/composables/useNotificaciones';
import type { Usuario } from 'src/types/usuario.types';

export function useUsuarios() {
  const listaUsuarios = ref<Usuario[]>([]);
  const cargandoUsuarios = ref(false);
  
  const { notificarErrorAccion } = useNotificaciones();

  const cargarUsuarios = async (): Promise<void> => {
    cargandoUsuarios.value = true;
    try {
      listaUsuarios.value = await usuarioService.listarUsuarios();
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargandoUsuarios.value = false;
    }
  };

  return {
    listaUsuarios, cargandoUsuarios,
    cargarUsuarios
  };
}