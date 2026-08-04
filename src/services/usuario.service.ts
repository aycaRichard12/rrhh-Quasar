import { api } from 'src/boot/axios';
import { idempresa_md5 } from 'src/composables/funcionesGenerales';
import type { Usuario } from "src/types/usuario.types";

const sanearUsuario = (item: Usuario): Usuario => ({
  ...item,
  id: Number(item.id)
})

export const usuarioService = {
  async listarUsuarios(): Promise<Usuario[]> {
    const { data } = await api.get(`/listar_usuarios/${idempresa_md5()}`);
    return Array.isArray(data) ? data.map(sanearUsuario) : [];
  }
}