import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { usePaginas } from 'src/stores/permitidos';
import { getIconoMenu } from 'src/stores/paginas';

import type { MenuNodo, TabItem } from 'src/layouts/types/navigation';

export function useAppNavigation() {
  const router = useRouter();
  const route = useRoute();
  const paginasStore = usePaginas();
  const i18n = useI18n();

  // ─────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────
  const currentTab = ref<string>('');
  const subMenuSeleccionado = ref<string>('');
  const tabsVisible = ref<boolean>(false);
  const activeTabs = ref<TabItem[]>([]);

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /**
   * Busca recursivamente un nodo dentro del árbol
   */
  const buscarNodoPorCodigo = (
    nodos: MenuNodo[],
    codigoBuscado: string
  ): MenuNodo | null => {
    for (const nodo of nodos) {
      const codigoBase = nodo.codigo.split('-')[0] ?? '';

      if (codigoBase === codigoBuscado) {
        return nodo;
      }

      if (nodo.submenu && nodo.submenu.length > 0) {
        const encontrado = buscarNodoPorCodigo(
          nodo.submenu,
          codigoBuscado
        );

        if (encontrado) {
          return encontrado;
        }
      }
    }

    return null;
  };

  /**
   * Traduce el título usando i18n
   */
  const translateTitle = (
    codigo: string,
    defaultTitle: string
  ): string => {
    const codigoBase = codigo.split('-')[0] ?? '';
    const key = `navigation.${codigoBase}`;

    return i18n.te(key)
      ? i18n.t(key)
      : defaultTitle;
  };

  /**
   * Convierte un MenuNodo a TabItem
   */
  const mapNodoToTab = (nodo: MenuNodo): TabItem => {
    const codigoBase = nodo.codigo.split('-')[0] ?? nodo.codigo;

    return {
      codigo: codigoBase,
      titulo: translateTitle(
        codigoBase,
        nodo.titulo
      ),
      icono: getIconoMenu(codigoBase),
      permiso: nodo.permiso ?? '0000'
    };
  };

  // ─────────────────────────────────────────────
  // TABS
  // ─────────────────────────────────────────────

  /**
   * Carga las tabs del submenú seleccionado
   * Ahora las tabs vienen directamente desde:
   * submenu.hijo
   */
  const loadTabsForSubmenu = (submenu: MenuNodo): void => {
    if (!submenu.submenu || submenu.submenu.length === 0) {
      activeTabs.value = [];
      return;
    }
    activeTabs.value = submenu.submenu.map(mapNodoToTab);
  };

  /**
   * Verifica si el submenú tiene tabs válidas
   */
  const hasValidTabsForSubmenu = (
    submenu: MenuNodo
  ): boolean => {
    return !!submenu.submenu && submenu.submenu.length > 0;
  };

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────

  const navigateToTab = async (
    tab: TabItem
  ): Promise<void> => {
    currentTab.value = tab.codigo;

    try {
      await router.push(`/${tab.codigo}`);
    } catch (error) {
      console.error(
        'Error en la navegación:',
        error
      );
    }
  };

  /**
   * Selecciona un submenú (Nivel 2)
   * y carga sus tabs (Nivel 3)
   */
  const selectSubmenu = (
    submenu: MenuNodo
  ): void => {

    subMenuSeleccionado.value = submenu.codigo;

    loadTabsForSubmenu(submenu);

    tabsVisible.value = true;

    const firstTab = activeTabs.value[0];

    if (firstTab) {
      void navigateToTab(firstTab);
    }
  };

  // ─────────────────────────────────────────────
  // RESTAURAR NAVEGACIÓN
  // ─────────────────────────────────────────────

  const restaurarSubmenu = (): void => {
    console.log(
  'MENUS RESTAURAR',
  paginasStore.obtenerMenuPrincipal()
);
    const currentPath =
      route.path.replace(/^\//, '');

    if (
      !currentPath ||
      currentPath === 'dashboard'
    ) {
      tabsVisible.value = false;
      activeTabs.value = [];
      return;
    }

    const menus =
      paginasStore.obtenerMenuPrincipal();

    for (const menu of menus) {
      // Nivel 2
      for (const submenu of menu.submenu ?? []) {
        // Nivel 3 (tabs/páginas)
        const tienePagina = submenu.submenu?.some(
          (pagina) => {
            const codigoBase =
              pagina.codigo.split('-')[0] ?? '';

            return codigoBase === currentPath;
          }
        );

        if (tienePagina) {

          subMenuSeleccionado.value =
            submenu.codigo;

          loadTabsForSubmenu(submenu);

          tabsVisible.value = true;

          currentTab.value = currentPath;

          return;
        }
      }
    }

    tabsVisible.value = false;
    activeTabs.value = [];
  };

  // ─────────────────────────────────────────────
  // WATCH ROUTE
  // ─────────────────────────────────────────────



  watch(
  () => route.path,
  () => {
    if (!paginasStore.cargado) {
      return;
    }

    restaurarSubmenu();
  }
);

  // watch(
  //   () => route.path,
  //   () => {
  //     restaurarSubmenu();
  //   },
  //   {
  //     immediate: true
  //   }
  // );


  return {
    currentTab, subMenuSeleccionado, tabsVisible, activeTabs,
    selectSubmenu, navigateToTab, restaurarSubmenu, hasValidTabsForSubmenu, translateTitle, buscarNodoPorCodigo,
  };
}

///////Antiguo Codigo

// import { ref, watch } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
// import { usePaginas } from 'src/stores/permitidos';
// import { PAGINAS_ICONS } from 'src/stores/paginas';
// import { idusuario_md5 } from 'src/composables/funcionesGenerales';
// import { useI18n } from 'vue-i18n';

// import type { MenuNodo, TabItem, IconConfig } from 'src/layouts/types/navigation';
// import type { PaginaPermitido } from 'src/layouts/types/navigation';

// export function useAppNavigation() {
//   const router = useRouter();
//   const route = useRoute();
//   const paginasStore = usePaginas();
//   const i18n = useI18n();

//   const currentTab = ref('');
//   const subMenuSeleccionado = ref('');
//   const tabsVisible = ref(false);

//   const activeTabs = ref<TabItem[]>([]);
//   const activeTabsReportes = ref<TabItem[]>([]);

//   const loadTabsForSubmenu = (submenuCodigo: string) => {
//     const iconsMap = PAGINAS_ICONS as IconConfig;
//     const paginasDelSubmenu = PAGINAS[submenuCodigo as keyof typeof PAGINAS] || [];
//     const paginasReporte = PAGINAS_REPORTE[submenuCodigo as keyof typeof PAGINAS_REPORTE] || [];

//     // Recuperar el ID de usuario de forma dinámica
//     const usuarioId = idusuario_md5();
//     if (!usuarioId) {
//       console.warn('No se encontró ID de usuario para cargar navegación');
//       return;
//     }

//     const mapToTab = (codigo: string): TabItem | null => {
//       // Intentamos con el formato código-usuario
//       const fullCode = `${codigo}-${usuarioId}`;
//       let dataPagina = paginasStore.obtenerPagina(fullCode) as PaginaPermitido | null;

//       // Si no se encuentra, intentamos con el código base (por si acaso en prod cambia)
//       if (!dataPagina) {
//         dataPagina = paginasStore.obtenerPagina(codigo) as PaginaPermitido | null;
//       }

//       if (!dataPagina) return null;

//       const key = `navigation.${codigo}`;
//       const tituloTraducido = i18n.te(key) ? i18n.t(key) : (dataPagina.titulo || codigo);

//       return {
//         codigo: codigo,
//         titulo: tituloTraducido,
//         icono: iconsMap[codigo] || 'help_outline',
//         permiso: dataPagina.permiso
//       };
//     };

//     activeTabs.value = paginasDelSubmenu
//       .map(mapToTab)
//       .filter((t: TabItem | null): t is TabItem => t !== null);

//     activeTabsReportes.value = paginasReporte
//       .map(mapToTab)
//       .filter((t: TabItem | null): t is TabItem => t !== null);
//   };

//   const hasValidTabsForSubmenu = (submenu: MenuNodo): boolean => {
//     const parts = submenu.codigo.split('-');
//     const submenuCode = parts[0] ?? '';
//     if (!submenuCode) return false;

//     const usuarioId = idusuario_md5();
//     if (!usuarioId) return false;

//     const isAllowed = (codigo: string) => {
//       const fullCode = `${codigo}-${usuarioId}`;
//       return !!paginasStore.obtenerPagina(fullCode) || !!paginasStore.obtenerPagina(codigo);
//     };

//     return paginasDelSubmenu.some(isAllowed) || paginasReporte.some(isAllowed);
//   };

//   const navigateToTab = async (tab: TabItem) => {
//     currentTab.value = tab.codigo;
//     try {
//       await router.push(`/${tab.codigo}`);
//     } catch (error) {
//       console.error('Error en la navegación:', error);
//     }
//   };

//   const selectSubmenu = (submenu: MenuNodo) => {
//     const parts = submenu.codigo.split('-');
//     const submenuCode = parts[0] ?? '';
//     if (!submenuCode) return;

//     subMenuSeleccionado.value = submenuCode;
//     loadTabsForSubmenu(submenuCode);
//     tabsVisible.value = true;

//     const firstActiveTab = activeTabs.value[0];
//     const firstReportTab = activeTabsReportes.value[0];

//     if (firstActiveTab) {
//       void navigateToTab(firstActiveTab);
//     } else if (firstReportTab) {
//       void navigateToTab(firstReportTab);
//     }
//     // Si no hay tabs disponibles, no navegar — evita 404 cuando
//     // el código de submenú (ej. 'produccion&producto') no es una ruta válida.
//   };

//   const restaurarSubmenu = () => {
//     const currentPath = route.path.replace(/^\//, '');
//     if (!currentPath || currentPath === 'dashboard') {
//       tabsVisible.value = false;
//       return;
//     }

//     let found = false;

//     // Restaurar página de submenús normales
//     for (const [submenuCode, pages] of Object.entries(PAGINAS)) { // Usar PAGINAS en vez de paginasMap
//   if ((pages as string[]).includes(currentPath)) { // Forzamos el tipo aquí
//     // ...
//   }
// }

//     // Restaurar página de reportes
//     if (!found) {
//       for (const [submenuCode, pages] of Object.entries(PAGINAS_REPORTE)) { // Usar PAGINAS_REPORTE en vez de reportesMap
//   if ((pages as string[]).includes(currentPath)) {
//           subMenuSeleccionado.value = submenuCode;
//           loadTabsForSubmenu(submenuCode);
//           tabsVisible.value = true;
//           currentTab.value = currentPath;
//           break;
//         }
//       }
//     }
//   };

//   watch(() => route.path, () => {
//     restaurarSubmenu();
//   });

//   const translateTitle = (codigo: string, defaultTitle: string) => {
//     const baseCode = codigo.split('-')[0] ?? '';
//     const key = `navigation.${baseCode}`;
//     return i18n.te(key) ? i18n.t(key) : defaultTitle;
//   };

//   return {
//     currentTab, subMenuSeleccionado, tabsVisible, activeTabs, activeTabsReportes,
//     selectSubmenu, navigateToTab, restaurarSubmenu, hasValidTabsForSubmenu, translateTitle
//   };
// }