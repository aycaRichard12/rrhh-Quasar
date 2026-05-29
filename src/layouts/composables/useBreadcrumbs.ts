import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useAuthStore } from 'src/stores/auth-store';
import { usePaginas } from 'src/stores/permitidos';

import { idusuario_md5 } from 'src/composables/funcionesGenerales';

import { useI18n } from 'vue-i18n';

import type { PaginaPermitido } from 'src/layouts/types/navigation';

export interface Breadcrumb {
  label: string;
  active?: boolean;
}

interface ParentTitlesResult {
  menuTitle: string;
  submenuTitle: string;
  menuCode: string;
  submenuCode: string;
}

export function useBreadcrumbs() {
  const route = useRoute();

  const authStore = useAuthStore();

  const paginasStore = usePaginas();

  const i18n = useI18n();

  const translate = (codigo: string, defaultTitle: string): string => {
    const baseCode = codigo.split('-')[0] ?? '';

    const key = `navigation.${baseCode}`;

    return i18n.te(key)
      ? i18n.t(key)
      : defaultTitle;
  };

  /**
   * Limpia títulos heredados tipo:
   * AAA-BBB-TITULO
   */
  const formatTitle = (title: string): string => {
    if (!title) return '';

    const parts = title.split('-');

    return parts.length >= 3
      ? (parts[2] ?? title)
      : title;
  };

  /**
   * Busca jerarquía:
   * Menú Principal -> Submenú -> Página
   */
  const findParentTitles = (path: string): ParentTitlesResult => {
    for (const menu of authStore.userMenu) {

      for (const submenu of menu.submenu || []) {

        for (const pagina of submenu.submenu || []) {

          const codigoPagina =
            pagina.codigo.split('-')[0] ?? '';

          if (codigoPagina === path) {

            return {
              menuTitle: menu.titulo,
              submenuTitle: submenu.titulo,

              menuCode:
                menu.codigo.split('-')[0] ?? '',

              submenuCode:
                submenu.codigo.split('-')[0] ?? '',
            };
          }
        }
      }
    }

    return {
      menuTitle: '',
      submenuTitle: '',
      menuCode: '',
      submenuCode: '',
    };
  };

  const breadcrumbs = computed<Breadcrumb[]>(() => {

    const currentPath =
      route.path.replace(/^\//, '');

    if (
      !currentPath ||
      currentPath === 'dashboard'
    ) {
      return [];
    }

    const crumbs: Breadcrumb[] = [];

    const usuarioId = idusuario_md5();

    const fullCode =
      `${currentPath}-${usuarioId}`;

    /**
     * 1. Obtener jerarquía del menú real
     */
    const {
      menuTitle,
      submenuTitle,
      menuCode,
      submenuCode,
    } = findParentTitles(currentPath);

    if (menuTitle) {
      crumbs.push({
        label: translate(menuCode, menuTitle),
      });
    }

    if (submenuTitle) {
      crumbs.push({
        label: translate(
          submenuCode,
          submenuTitle
        ),
      });
    }

    /**
     * 2. Obtener título de página actual
     */
    let dataPagina = (
      paginasStore.obtenerPagina(fullCode)
    )  as PaginaPermitido | null;

    if (!dataPagina) {
      dataPagina = (
        paginasStore.obtenerPagina(currentPath)
      )  as PaginaPermitido | null;
    }

    let pageLabel = '';

    if (dataPagina?.titulo) {

      pageLabel = translate(
        currentPath,
        formatTitle(dataPagina.titulo)
      );

    } else if (route.meta?.title) {

      pageLabel =
        i18n.t(route.meta.title as string);

    } else {

      pageLabel = translate(
        currentPath,
        currentPath.charAt(0).toUpperCase() +
        currentPath.slice(1)
      );
    }

    crumbs.push({
      label: pageLabel,
      active: true,
    });

    return crumbs;
  });

  return {
    breadcrumbs,
  };
}

///////Antiguo Codigo

// import { computed } from 'vue';
// import { useRoute } from 'vue-router';
// import { useAuthStore } from 'src/stores/auth-store';
// import { usePaginas } from 'src/stores/permitidos';
// import { idusuario_md5 } from 'src/composables/funcionesGenerales';
// import { useI18n } from 'vue-i18n';

// export interface Breadcrumb {
//   label: string;
//   active?: boolean;
// }

// interface PaginaData {
//   titulo: string;
//   codigo: string;
//   permiso: string;
// }

// export function useBreadcrumbs() {
//   const route = useRoute();
//   const authStore = useAuthStore();
//   const paginasStore = usePaginas();
//   const i18n = useI18n();

//   const translate = (codigo: string, defaultTitle: string) => {
//     const baseCode = codigo.split('-')[0] ?? '';
//     const key = `navigation.${baseCode}`;
//     return i18n.te(key) ? i18n.t(key) : defaultTitle;
//   };

//   /**
//    * Cleans the title by removing prefixes if it follows the AAA-BBB-TITLE pattern
//    */
//   const formatTitle = (title: string): string => {
//     if (!title) return '';
//     const parts = title.split('-');
//     return parts.length >= 3 ? (parts[2] ?? title) : title;
//   };

//   /**
//    * Finds the parent menu and group titles for the current path
//    */
//   const findParentTitles = (path: string) => {
//     let menuTitle = '';
//     let groupTitle = '';
//     let menuCode = '';
//     let groupCode = '';

//     for (const menu of authStore.userMenu) {
//       for (const sub of menu.hijo || []) {
//         const subBase = sub.codigo.split('-')[0] || '';
//         // @ts-expect-error - PAGINAS import check
//         const groupPages = PAGINAS[subBase] || [];
        
//         if (groupPages.includes(path)) {
//           menuTitle = menu.titulo;
//           groupTitle = sub.titulo;
//           menuCode = menu.codigo.split('-')[0] || '';
//           groupCode = subBase;
//           break;
//         }
//       }
//       if (menuTitle) break;
//     }

//     return { menuTitle, groupTitle, menuCode, groupCode };
//   };

//   const breadcrumbs = computed<Breadcrumb[]>(() => {
//     const currentPath = route.path.replace(/^\//, '');
//     if (!currentPath || currentPath === 'dashboard') return [];

//     const crumbs: Breadcrumb[] = [];
//     const usuarioId = idusuario_md5();
//     const fullCode = `${currentPath}-${usuarioId}`;
    
//     // 1. Get Hierarchy from Menu Configuration
//     const { menuTitle, groupTitle, menuCode, groupCode } = findParentTitles(currentPath);

//     if (menuTitle) crumbs.push({ label: translate(menuCode, menuTitle) });
//     if (groupTitle) crumbs.push({ label: translate(groupCode, groupTitle) });

//     // 2. Get Current Page Title
//     const dataPagina = paginasStore.obtenerPagina(fullCode) as PaginaData | null;
//     let pageLabel = '';

//     if (dataPagina?.titulo) {
//       pageLabel = translate(currentPath, formatTitle(dataPagina.titulo));
//     } else if (route.meta?.title) {
//       pageLabel = i18n.t(route.meta.title as string);
//     } else {
//       pageLabel = translate(currentPath, currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
//     }

//     crumbs.push({ label: pageLabel, active: true });
//     return crumbs;
//   });

//   return {
//     breadcrumbs
//   };
// }
