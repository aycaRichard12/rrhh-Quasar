import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MenuNodo } from 'src/layouts/types/navigation';
import type { UserResponse } from 'src/types/auth';

export const usePaginas = defineStore('permitidos', () => {
  // --- ESTADO (STATE) ---
  const permitidos = ref<MenuNodo[]>([]);
  const permisos = ref<Record<string, boolean[]>>({});
  const modulo = ref<MenuNodo[]>([]);
  const cargado = ref<boolean>(false);

  // --- ACCIONES (ACTIONS) ---
  const resetStore = () => {
    permitidos.value = [];
    permisos.value = {};
    modulo.value = [];
    cargado.value = false;
  };

  const initStore = () => {
    try {
      const storedData = localStorage.getItem('mistersofts-rrhh');
      if (!storedData) {
        resetStore();
        return;
      }

      const parsedData = JSON.parse(storedData) as UserResponse;

      if (!parsedData || !Array.isArray(parsedData.menu)) {
        console.error('Estructura de datos inválida: "menu" no encontrado o no es array');
        resetStore();
        return;
      }

      modulo.value = parsedData.menu;
      
      const listaPlana: MenuNodo[] = [];
      const nuevosPermisos: Record<string, boolean[]> = {};

      // Función recursiva que viaja por los 3 niveles del menú
      const aplanarNodos = (nodos: MenuNodo[]) => {
        for (const nodo of nodos) {
          // Extraemos y guardamos los permisos del nodo actual
          if (nodo.codigo && typeof nodo.permiso === 'string') {
            nuevosPermisos[nodo.codigo] = nodo.permiso.split('').map(u => u === '1');
          } else if (nodo.codigo) {
            nuevosPermisos[nodo.codigo] = [false, false, false, false];
          }

          // Guardamos el nodo en nuestra lista plana (flatten)
          listaPlana.push(nodo);

          // Si este nodo tiene hijos, volvemos a llamar a la función (Recursividad)
          if (nodo.submenu && Array.isArray(nodo.submenu) && nodo.submenu.length > 0) {
            aplanarNodos(nodo.submenu);
          }
        }
      };

      // Iniciamos la extracción recursiva desde la raíz
      aplanarNodos(parsedData.menu);

      permitidos.value = listaPlana;
      permisos.value = nuevosPermisos;
      cargado.value = true;
      
      console.log('Store inicializado con éxito (3 Niveles Aplanados)');
    } catch (error) {
      console.error('Error al parsear o inicializar el store:', error);
      resetStore();
    }
  };

  // --- GETTERS ---
  // Ahora la búsqueda es super rápida porque 'permitidos' ya está aplanado
  const obtenerPagina = (codigopagina: string): MenuNodo | null => {
    return permitidos.value.find((p) => p.codigo === codigopagina) || null;
  };

  const existePagina = (codigopagina: string): boolean => {
    return !!obtenerPagina(codigopagina);
  };

  const obtenerMenuPrincipal = (): MenuNodo[] => {
    return modulo.value;
  };

  const permisoPagina = (codigopagina: string): boolean[] => {
    return permisos.value[codigopagina] || [false, false, false, false];
  };

  return {
    permitidos, permisos, modulo, cargado,
    initStore, resetStore, obtenerPagina, existePagina, obtenerMenuPrincipal, permisoPagina
  };
});


// /Antiguo Codigo

// import { defineStore } from 'pinia'

// export const usePaginas = defineStore('permitidos', {
//   state: () => ({
//     permitidos: [],
//     usuario: null,
//     menuPrincipal: [],
//     permisos: {},
//     todos: [],
//     modulo: [],
//     cargado: false
//   }),

//   actions: {
//     initStore() {
//       try {
//         const storedData = localStorage.getItem('mistersofts-rrhh');
//         if (!storedData) {
//           this.resetStore();
//           return;
//         }

//         const parsedData = JSON.parse(storedData);

//         if (!parsedData || !Array.isArray(parsedData.menu)) {
//           console.error('Estructura de datos inválida: "menu" no encontrado o no es array');
//           this.resetStore();
//           return;
//         }

//         this.modulo = parsedData.menu;
//         this.modulo.forEach((seccion) => {
//           if (Array.isArray(seccion.submenu)) {
//             seccion.submenu.forEach((pagina) => {
//               // Validar que exista codigo y permiso antes de usarlos
//               if (pagina.codigo && typeof pagina.permiso === 'string') {
//                 this.permisos[pagina.codigo] = pagina.permiso
//                   .split('')
//                   .map((u) => u === '1');
//               } else {
//                 // Si falta algún dato, asignar permisos por defecto (todos false)
//                 console.warn(`Página con datos incompletos:`, pagina);
//                 if (pagina.codigo) {
//                   this.permisos[pagina.codigo] = [false, false, false, false];
//                 }
//               }
//             });
//           }
//         });

//         this.permitidos = parsedData.menu.flatMap(m => m.submenu || []);
//         this.cargado = true;
//         console.log('Store inicializado con éxito');
//       } catch (error) {
//         console.error('Error al parsear o inicializar el store:', error);
//         this.resetStore();
//       }
//     },

//     resetStore() {
//       this.permitidos = []
//       this.usuario = null
//       this.menuPrincipal = []
//       this.permisos = {}
//       this.todos = []
//       this.modulo = []
//       this.cargado = false
//     }
//   },

//   getters: {
//     obtenerPagina: (state) => (codigopagina) => {
//       console.log(codigopagina)
//       // Busca la página en el array aplanado de permitidos
//       const resultado = state.permitidos.find((p) => p.codigo === codigopagina) || null
//       console.log(resultado)
//       return resultado
//     },

//     existePagina: (state) => (codigopagina) => {
//       return state.todos.find((p) => p.codigo === codigopagina)
//     },

//     obtenerMenuPrincipal: (state) => state.menuPrincipal,

//     permisoPagina: (state) => (codigopagina) => state.permisos[codigopagina] || []
//   }
// })
