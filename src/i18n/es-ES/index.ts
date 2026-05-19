import navigation from './navigation';

export default {
  common: {
    actions: {
      asset: 'Activo',
      idle: 'Inactivo',
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
      required: 'Este campo es obligatorio',
      numeric: 'Debe ser numérico',
      integer: 'Debe ser entero'
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
      recordsPerPage: 'Registros por página',
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
  ///////////////////////////////////////////////////////////////////////////////////
  tables:{
    description: 'Descripción',
    status: 'Estado',
    options: 'Opciones'
  },
  areas: {
    title: 'Áreas',
    subtitle: 'Gestión de áreas y sucursales de la empresa.',
    form: {
      formNew: 'Nueva Area',
      formEdit: 'Editar Area',
      buttonRegister: 'Nueva Area',
      name: 'Area',
      branch: 'Sucursal',
      noBranch: 'Sin sucursal',
    }
  },
  entity:{
    title: 'Entes Reguladores',
    subtitle: 'Gestión de aportes y regulaciones.',
    form: {
      formNew: 'Nuevo Ente Regulador',
      formEdit: 'Editar Ente Regulador',
      buttonRegister: 'Nuevo Ente Regulador',
      buttonImport: 'Importar Estándar',
      name: 'Ente Regulador',
      percentage: 'Porcentaje',
      amount: 'Monto',
      order: 'Orden'
    },
  }
  
}
