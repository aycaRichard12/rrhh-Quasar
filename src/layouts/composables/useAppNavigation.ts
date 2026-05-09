import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePaginas } from 'src/stores/permitidos';
import { PAGINAS, PAGINAS_ICONS, PAGINAS_SELECT } from 'src/stores/paginas';
import { idusuario_md5 } from 'src/composables/funcionesGenerales';
import { useI18n } from 'vue-i18n';

//

import type { 
  SubmenuItem, 
  TabItem, 
  PaginasConfig, 
  IconConfig, 
  PaginaPermitido 
} from 'src/layouts/types/navigation';

export function useAppNavigation() {
  const router = useRouter();
  const route = useRoute();
  const paginasStore = usePaginas();
  const i18n = useI18n();

  const currentTab = ref('');
  const subMenuSeleccionado = ref('');
  const tabsVisible = ref(false);

  const activeTabs = ref<TabItem[]>([]);
  const activeTabsReportes = ref<TabItem[]>([]);

  const loadTabsForSubmenu = (submenuCodigo: string) => {
    const paginasMap = PAGINAS as PaginasConfig;
    const reportesMap = PAGINAS_SELECT as PaginasConfig;
    const iconsMap = PAGINAS_ICONS as IconConfig;

    const paginasDelSubmenu = paginasMap[submenuCodigo] || [];
    const paginasReporte = reportesMap[submenuCodigo] || [];

    // Recuperar el ID de usuario de forma dinámica
    const usuarioId = idusuario_md5();
    if (!usuarioId) {
      console.warn('No se encontró ID de usuario para cargar navegación');
      return;
    }

    const mapToTab = (codigo: string): TabItem | null => {
      // Intentamos con el formato código-usuario
      const fullCode = `${codigo}-${usuarioId}`;
      let dataPagina = paginasStore.obtenerPagina(fullCode) as PaginaPermitido | null;

      // Si no se encuentra, intentamos con el código base (por si acaso en prod cambia)
      if (!dataPagina) {
        dataPagina = paginasStore.obtenerPagina(codigo) as PaginaPermitido | null;
      }

      if (!dataPagina) return null;

      const key = `navigation.${codigo}`;
      const tituloTraducido = i18n.te(key) ? i18n.t(key) : (dataPagina.titulo || codigo);

      return {
        codigo: codigo,
        titulo: tituloTraducido,
        icono: iconsMap[codigo] || 'help_outline',
        permiso: dataPagina.permiso
      };
    };

    activeTabs.value = paginasDelSubmenu
      .map(mapToTab)
      .filter((t): t is TabItem => t !== null);

    activeTabsReportes.value = paginasReporte
      .map(mapToTab)
      .filter((t): t is TabItem => t !== null);
  };

  const hasValidTabsForSubmenu = (submenu: SubmenuItem): boolean => {
    const parts = submenu.codigo.split('-');
    const submenuCode = parts[0] ?? '';
    if (!submenuCode) return false;

    const paginasMap = PAGINAS as PaginasConfig;
    const reportesMap = PAGINAS_SELECT as PaginasConfig;
    
    const paginasDelSubmenu = paginasMap[submenuCode] || [];
    const paginasReporte = reportesMap[submenuCode] || [];

    const usuarioId = idusuario_md5();
    if (!usuarioId) return false;

    const isAllowed = (codigo: string) => {
      const fullCode = `${codigo}-${usuarioId}`;
      return !!paginasStore.obtenerPagina(fullCode) || !!paginasStore.obtenerPagina(codigo);
    };

    return paginasDelSubmenu.some(isAllowed) || paginasReporte.some(isAllowed);
  };

  const navigateToTab = async (tab: TabItem) => {
    currentTab.value = tab.codigo;
    try {
      await router.push(`/${tab.codigo}`);
    } catch (error) {
      console.error('Error en la navegación:', error);
    }
  };

  const selectSubmenu = (submenu: SubmenuItem) => {
    const parts = submenu.codigo.split('-');
    const submenuCode = parts[0] ?? '';
    if (!submenuCode) return;

    subMenuSeleccionado.value = submenuCode;
    loadTabsForSubmenu(submenuCode);
    tabsVisible.value = true;

    const firstActiveTab = activeTabs.value[0];
    const firstReportTab = activeTabsReportes.value[0];

    if (firstActiveTab) {
      void navigateToTab(firstActiveTab);
    } else if (firstReportTab) {
      void navigateToTab(firstReportTab);
    }
    // Si no hay tabs disponibles, no navegar — evita 404 cuando
    // el código de submenú (ej. 'produccion&producto') no es una ruta válida.
  };

  const restaurarSubmenu = () => {
    const currentPath = route.path.replace(/^\//, '');
    if (!currentPath || currentPath === 'dashboard') {
      tabsVisible.value = false;
      return;
    }

    const paginasMap = PAGINAS as PaginasConfig;
    const reportesMap = PAGINAS_SELECT as PaginasConfig;

    let found = false;

    // Restaurar página de submenús normales
    for (const [submenuCode, pages] of Object.entries(paginasMap)) {
      if (pages.includes(currentPath)) {
        // Siempre recargar las tabs del submenú para asegurarnos
        // de que `activeTabs` esté poblado (evita situaciones
        // donde `subMenuSeleccionado` ya estaba y no se recargaban).
        subMenuSeleccionado.value = submenuCode;
        loadTabsForSubmenu(submenuCode);
        tabsVisible.value = true;
        currentTab.value = currentPath;
        found = true;
        break;
      }
    }

    // Restaurar página de reportes
    if (!found) {
      for (const [submenuCode, pages] of Object.entries(reportesMap)) {
        if (pages.includes(currentPath)) {
          subMenuSeleccionado.value = submenuCode;
          loadTabsForSubmenu(submenuCode);
          tabsVisible.value = true;
          currentTab.value = currentPath;
          break;
        }
      }
    }
  };

  watch(() => route.path, () => {
    restaurarSubmenu();
  });

  const translateTitle = (codigo: string, defaultTitle: string) => {
    const baseCode = codigo.split('-')[0] ?? '';
    const key = `navigation.${baseCode}`;
    return i18n.te(key) ? i18n.t(key) : defaultTitle;
  };

  return {
    currentTab,
    subMenuSeleccionado,
    tabsVisible,
    activeTabs,
    activeTabsReportes,
    selectSubmenu,
    navigateToTab,
    restaurarSubmenu,
    hasValidTabsForSubmenu,
    translateTitle
  };
}
