import { defineStore } from 'pinia'

export const usePaginas = defineStore('permitidos', {
  state: () => ({
    permitidos: [],
    usuario: null,
    menuPrincipal: [],
    permisos: {},
    todos: [],
    modulo: [],
    cargado: false
  }),

  actions: {
    initStore() {
      try {
        const storedData = localStorage.getItem('mistersofts-rrhh');
        if (!storedData) {
          this.resetStore();
          return;
        }

        const parsedData = JSON.parse(storedData);

        if (!parsedData || !Array.isArray(parsedData.menu)) {
          console.error('Estructura de datos inválida: "menu" no encontrado o no es array');
          this.resetStore();
          return;
        }

        this.modulo = parsedData.menu;
        this.modulo.forEach((seccion) => {
          if (Array.isArray(seccion.submenu)) {
            seccion.submenu.forEach((pagina) => {
              // Validar que exista codigo y permiso antes de usarlos
              if (pagina.codigo && typeof pagina.permiso === 'string') {
                this.permisos[pagina.codigo] = pagina.permiso
                  .split('')
                  .map((u) => u === '1');
              } else {
                // Si falta algún dato, asignar permisos por defecto (todos false)
                console.warn(`Página con datos incompletos:`, pagina);
                if (pagina.codigo) {
                  this.permisos[pagina.codigo] = [false, false, false, false];
                }
              }
            });
          }
        });

        this.permitidos = parsedData.menu.flatMap(m => m.submenu || []);
        this.cargado = true;
        console.log('Store inicializado con éxito');
      } catch (error) {
        console.error('Error al parsear o inicializar el store:', error);
        this.resetStore();
      }
    },

    resetStore() {
      this.permitidos = []
      this.usuario = null
      this.menuPrincipal = []
      this.permisos = {}
      this.todos = []
      this.modulo = []
      this.cargado = false
    }
  },

  getters: {
    obtenerPagina: (state) => (codigopagina) => {
      console.log(codigopagina)
      // Busca la página en el array aplanado de permitidos
      const resultado = state.permitidos.find((p) => p.codigo === codigopagina) || null
      console.log(resultado)
      return resultado
    },

    existePagina: (state) => (codigopagina) => {
      return state.todos.find((p) => p.codigo === codigopagina)
    },

    obtenerMenuPrincipal: (state) => state.menuPrincipal,

    permisoPagina: (state) => (codigopagina) => state.permisos[codigopagina] || []
  }
})
