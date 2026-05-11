import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import type { Menu, Submenu, UserResponse } from 'src/types/auth';

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // ─── Guardia global de autenticación ────────────────────────────────────────
  // Bloquea el acceso a cualquier ruta protegida si no hay sesión activa.
  // Esto impide que el botón "←" del navegador regrese a páginas internas
  // después de cerrar sesión, ya que el token ya no existe en localStorage.
  Router.beforeEach((to) => {
    const isPublic = to.path.startsWith('/auth');
    const authDataString = localStorage.getItem('mistersofts-rrhh');
    const hasSession = !!authDataString;

    if (!isPublic && !hasSession) {
      // Sin sesión → siempre al login
      return { name: 'login' };
    }

      if (authDataString) {
      let hasDashboard = false;
      try {
        const authData = JSON.parse(authDataString) as UserResponse;
        if (authData && authData.menu) {
          // Busca "dashboard" tanto en el código de nivel superior como en cualquier submenú
          hasDashboard = authData.menu.some((m: Menu) => 
            m.codigo === 'dashboard' || 
            (m.submenu && m.submenu.some((s: Submenu) => s.codigo && s.codigo.includes('dashboard')))
          );
        }
      } catch (e) {
        console.error('Error parsing auth data', e);
      }

      // Si intenta entrar al dashboard pero no tiene permiso
      if (to.path === '/dashboard' && !hasDashboard) {
        return { path: '/welcome' };
      }

      // Si entra a la raíz, redirigir según permiso
      if (to.path === '/' && !isPublic) {
        return { path: hasDashboard ? '/dashboard' : '/welcome' };
      }

      if (isPublic) {
        // Ya logueado → no puede entrar al login u otra ruta pública
        return { path: hasDashboard ? '/dashboard' : '/welcome' };
      }
    }
  });

  return Router;
});

