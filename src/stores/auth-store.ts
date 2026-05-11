import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api_auth from 'src/services/auth';
import type { UserResponse, LoginPayload, Menu } from 'src/types/auth';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  // Inicializamos recuperando de localStorage para persistencia tras F5
  const user = ref<UserResponse | null>(
    JSON.parse(localStorage.getItem('mistersofts-rrhh') || 'null')
  );

  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const loading = ref<boolean>(false);

  // CORRECCIÓN: Definición correcta de tipos para refs reactivas
  const id_empresa_md5 = ref<string | null>(localStorage.getItem('id_empresa_md5'));
  const id_usuario_md5 = ref<string | null>(localStorage.getItem('id_usuario_md5'));

  // --- GETTERS ---
  const isLogged = computed(() => !!token.value && !!user.value);

  const userMenu = computed((): Menu[] => user.value?.menu || []);

  const getSubmenuPermissions = (codigoSubmenu: string) => {
    return userMenu.value
      .flatMap(m => m.submenu || [])
      .find(s => s && s.codigo === codigoSubmenu)?.permiso || '0000';
  };

  // --- ACTIONS ---
  async function login(credentials: Omit<LoginPayload, 'action' | 'modulo'>) {
    loading.value = true;
    console.log(credentials)
    try {

      const payload: LoginPayload = {
        ...credentials,
        action: 'login',
        modulo: 'rrhh'
      };
      console.log(payload)

      // 1. Petición al servicio de autenticación
      const { data } = await api_auth.post<UserResponse[]>('', payload);
      console.log(data)
      const userData = data?.[0];

      if (userData && userData.ok === 'success') {
        // --- SETEO DE ESTADO ---
        user.value = userData;
        token.value = userData.factura.token;
        console.log(userData)
        // CORRECCIÓN: Asignación lógica de IDs (MD5)
        id_usuario_md5.value = userData.idusuario; // Suponiendo que este es el MD5 del user
        id_empresa_md5.value = userData.empresa.idempresa; // MD5 de la empresa

        // --- PERSISTENCIA ---
        localStorage.setItem('mistersofts-rrhh', JSON.stringify(userData));
        localStorage.setItem('auth_token', token.value || '');
        localStorage.setItem('id_empresa_md5', id_empresa_md5.value || '');
        localStorage.setItem('id_usuario_md5', id_usuario_md5.value || '');

        return { success: true };
      }

      throw new Error('Credenciales incorrectas o respuesta inválida');

    } catch (error: unknown) {
      let errorMessage = 'Error de conexión';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }

      console.error('Login Error:', errorMessage);

      return {
        success: false,
        message: errorMessage
      };
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    id_usuario_md5.value = null;
    id_empresa_md5.value = null;

    localStorage.removeItem('mistersofts-rrhh');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('id_empresa_md5');
    localStorage.removeItem('id_usuario_md5');
  }

  return {
    user,
    token,
    loading,
    id_empresa_md5,
    id_usuario_md5,
    isLogged,
    userMenu,
    login,
    logout,
    getSubmenuPermissions
  };
});
