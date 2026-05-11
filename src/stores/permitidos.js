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
        const storedData = localStorage.getItem('mistersofts-rrhh')
        if (!storedData) {
          this.resetStore()
          return
        }

        const parsedData = JSON.parse(storedData)

        // Verificamos que el objeto tenga la propiedad 'menu' y que sea un array
        if (!parsedData || !Array.isArray(parsedData.menu)) {
          console.error('Estructura de datos inválida: "menu" no encontrado o no es array')
          this.resetStore()
          return
        }

        // Asignamos los datos al estado
        this.modulo = parsedData.menu
        this.modulo.forEach((seccion) => {
          if (Array.isArray(seccion.submenu)) {
            seccion.submenu.forEach((pagina) => {
              this.permisos[pagina.codigo] = pagina.permiso
                .split('') // convierte '1111' en ['1', '1', '1', '1']
                .map((u) => u === '1') // convierte cada '1' en true, '0' en false
            })
          }
        })
        // Aplanamos los submenus para facilitar la búsqueda en 'permitidos'
        this.permitidos = parsedData.menu.flatMap(m => m.submenu || [])
        
        this.cargado = true
        console.log('Store inicializado con éxito')
        
      } catch (error) {
        console.error('Error al parsear o inicializar el store:', error)
        this.resetStore()
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