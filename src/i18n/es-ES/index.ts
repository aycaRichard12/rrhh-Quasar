import navigation from './navigation';

export default {
  common: {
    actions: {
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      saveChanges: 'Guardar Cambios',
      register: 'Registrar',
      reload: 'Recargar',
      search: 'Buscar',
      apply: 'Aplicar',
      clear: 'Limpiar',
      download: 'Descargar',
      close: 'Cerrar',
      confirm: 'Confirmar',
      deactivate: 'Desactivar',
      activate: 'Activar',
      add: 'Añadir',
      update: 'Actualizar',
      report: 'Generar Reporte'
    },
    notifications: {
      failed: 'Acción fallida',
      success: 'Acción exitosa',
    },
    labels: {
      actions: 'Acciones',
      detail: 'Detalle',
      mainMenu: 'MENÚ PRINCIPAL',
      reports: 'Reportes',
      account: 'Cuenta',
    },
    rules: {
      required: 'Este campo es obligatorio'
    },
    messages: {
      noData: 'No hay registros',
      loading: 'Cargando',
      unknown: 'Desconocido',
      items: 'elemento(s)',
      downloadSuccess: 'Archivo descargado correctamente',
      all: 'Todo',
      noSection: 'Sin sección',
      noResults: 'Sin resultados para "{query}"',
      more: 'Más opciones',
      generatingReport: 'Generando reporte...',
      reportGenerated: 'Reporte generado correctamente',
    },
    report: {
      page: 'Página',
      of: 'de',
      dateTime: 'Fecha hora reporte',
      responsible: 'DATOS DEL ENCARGADO',
      from: 'Desde',
      to: 'Hasta',
      searchCriteria: 'Criterios de búsqueda',
      filtersApplied: 'Filtros aplicados',
      search: 'Búsqueda',
      type: 'Tipo',
      all: 'Todo',
      totalRecords: 'Total registros',
      valid: 'Vigente',
      expired: 'Caducado',
      expiring: 'Próx. a Vencer',
    },
    dialogs: {
      deleteTitle: 'Confirmar Eliminación',
    },
    timeUnits: {
      seconds: 'Segundos',
      minutes: 'Minutos',
      hours: 'Horas',
      days: 'Días',
      weeks: 'Semanas',
      months: 'Meses',
      years: 'Años',
    }
  },
  errors: {
    fetchData: 'Error al cargar los datos del servidor',
    saveData: 'Error al guardar los datos',
    deleteData: 'Error al eliminar el registro',
    reportError: 'Error al generar el reporte PDF',
  },
  navigation,
  welcome: {
    title: '¡Bienvenido a Gestión RRHH!',
    subtitle: 'Selecciona una opción del menú lateral para gestionar el talento humano.',
  },
  formBtn: {
    registration: 'Nuevo Registro',
    save: 'Guardar',
    cancel: 'Cancelar',
  },
  areas: {
    title: 'Áreas',
    subtitle: 'Descripcion $$$$$$$',
    form: {
      area: 'Area*',
      description: 'Descripción*',
      branch: 'Sucursal*',
      noBranch: 'Sin sucursal',
    },
    table: {
      title: 'Gestión de Áreas',
      index: 'N°',
      name: 'Área',
      description: 'Descripción',
      branch: 'Sucursal',
      options: 'Opciones',
      recordsPerPage: "Registros por página:",
      of: "de",
    }
  },
};