import { title } from 'process';
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
      search: 'Buscar cualquier palabra...',
      apply: 'Aplicar',
      clear: 'Limpiar',
      download: 'Descargar',
      close: 'Cerrar',
      confirm: 'Confirmar',
      deactivate: 'Desactivar',
      activate: 'Activar',
      add: 'Añadir',
      update: 'Actualizar',
      report: 'Generar Reporte',
      active: 'Activo'
    },
    filter: {
      sortAsc: 'Ordenar de menor a mayor',
      sortDesc: 'Ordenar de mayor a menor',
      values: 'Valores',
      conditions: 'Condiciones',
      selectAll: 'Seleccionar todo',
      conditionsInfo: 'Configure condiciones avanzadas aquí'
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
      synchronizing: 'Sincronizando',
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
  forms:{
    add: 'Agregar',
    back: 'Volver',
    replace: 'Reemplazar',
    standar: 'Importar Estándar',
  },
  tables:{
    amount: 'Cantidad',
    amount2: 'Monto',
    date: 'Fecha',
    description: 'Descripción',
    observation: 'Observación',
    destination: 'Destino',
    options: 'Opciones',
    order: 'Orden',
    status: 'Estado',
    type: 'Tipo',
  },
  person:{
    photo: 'Foto',
    name: 'Nombres',
    lastname: 'Apellidos',
    ci: 'C.I.',
    phone: 'Teléfono',
    email: 'Correo',
    cargo: 'Cargo',
    status: 'Estado',
    history: 'Historial',
    birthDate: 'Fecha Nac.',
    address: 'Dirección',
    nationality: 'Nacionalidad',
    profession: 'Profesión',
    gender: 'Sexo',
    civilStatus: 'Estado Civil',
    male: 'Masculino',
    female: 'Femenino',
    single: 'Soltero(a)',
    married: 'Casado(a)',
    divorced: 'Divorciado(a)',
    widowed: 'Viudo(a)',
    freeUnion: 'Unión Libre',
  },
  date:{
    start: 'Inicio',
    end: 'Final',
    registration: "Fecha de Registro"
  },
//CONFIGURACIONES_________________________________________________________________________________
  //------------ORGANIZACIÓN---------------
  areas: {
    title: 'Áreas',
    subtitle: 'Gestión de áreas y sucursales de la empresa.',
    name: 'Área',
    new: 'Nueva Área',
    edit: 'Editar Área',
    branch: 'Sucursal',
  },
  cargos: {
    title: 'Cargos',
    subtitle: 'Gestión de cargos, salarios y vinculación con áreas de la empresa.',
    name: 'Cargo',
    new: 'Nuevo Cargo',
    edit: 'Editar Cargo',
    salary: 'Salario',
  },
  prerrequisitos: {
    title: 'Prerrequisitos de Cargo',
    subtitle: 'Gestión de condiciones o requisitos indispensables por cargo.',
    name: 'Prerrequisito',
    new: 'Nuevo Prerrequisito',
    edit: 'Editar Prerrequisito',
  },
  tiposdecontratos:{
    title: 'Tipos de Contrato',
    subtitle: 'Gestión de contrataciones',
    name: 'Contrato',
    new: 'Nuevo Tipo de Contrato',
    edit: 'Editar Tipo de Contrato',
    nature:'Naturaleza',
    observation:'Obervación'
  },
  funcionesyobligaciones:{
    title:'Funciones y Obligaciones',
    subtitle: 'Gestión de deberes del Personal',
    name: 'Funcion / Obligación',
    new:'Nueva Funcion / Obligación',
    edit: 'Editar Funcion / Obligación',
  },
  firmas:{
    title: 'Firmas',
    subtitle: 'Gestion de firmas de representantes',
    name: 'Firma',
    new: 'Nueva Firma',
    edit: 'Editar Firma',
    role: 'Cargo Administrativo',
  },
  //---------BENEFICIOS SOCIALES-----------------
  beneficios:{
    title: 'Beneficios',
    subtitle: 'Gestión de beneficios e indemnizaciones del personal.',
    name: 'Beneficio',
    new: 'Nuevo Beneficio',
    edit: 'Editar Beneficio',
  },
  entesreguladores:{
    title: 'Entes Reguladores',
    subtitle: 'Gestión de aportes y regulaciones.',
    name: 'Ente Regulador',
    new: 'Nuevo Ente Regulador',
    edit: 'Editar Ente Regulador',
    percentage: 'Porcentaje',
  },
  //--------VALORACION----------------
  metodosdeevaluacion:{
    title: 'Métodos de Evaluación',
    subtitle: 'Gestiona los métodos para calificar el desempeño.',
    name: 'Método',
    new: 'Nuevo Método de Evaluación',
    edit: 'Editar Método de Evaluación',
    rating: 'Calificación Máxima',
    range:{
      title: 'Rangos de ',
      subtitle:'Gestiona los niveles de calificación',
      name:'Rango de Evaluacion',
      new: 'Nuevo Rango de Evaluación',
      edit: 'Editar Rango de Evaluación',
      criteria: 'Criterio/Rango',
      score: 'Puntaje',
      manage: 'Gestionar Rangos',
    }
  },
  actividadesdeevaluacion: {
    title: 'Actividades de Evaluación',
    subtitle: 'Gestión de actividades para evaluar el desempeño.',
    name: 'Actividad',
    new: 'Nueva Actividad',
    edit: 'Editar Actividad',
  },
  tiposdesanciones: {
    title: 'Tipos de Sanciones',
    subtitle: 'Gestión de tipos de sanciones y su gravedad.',
    name: 'Tipo de Sanción',
    new: 'Nuevo Tipo de Sanción',
    edit: 'Editar Tipo de Sanción',
  },
  //--------SANCIONES----------------
  niveles: {
    title: 'Niveles de Gravedad',
    subtitle: 'Gestión de niveles de gravedad para sanciones.',
    name: 'Nivel',
    new: 'Nuevo Nivel',
    edit: 'Editar Nivel',
  },
  
  motivosdebaja: {
    title: 'Motivos de Baja',
    subtitle: 'Gestión de motivos de baja de personal.',
    name: 'Motivo',
    new: 'Nuevo Motivo de Baja',
    edit: 'Editar Motivo',
    type: 'Tipo'
  },
  bajas: {
    title: 'Bajas',
    subtitle: 'Gestion de bajas',
    name: 'Baja',
    new: 'Nueva Baja',
    edit: 'Editar Baja',
  },
  //--------REMUNERACION----------------
  metodosdepago: {
    title
  },
  bonosempresa: {
    title
  },
  salariominimo: {
    title
  },
//GESTION DE RECLUTAMIENTO_________________________________________________________________________________
  //------------ADMISION---------------
//TRABAJADOR_________________________________________________________________________________
  //------------PERSONAL---------------
  trabajadores: {
    title: 'Trabajadores',
    subtitle: 'Gestión de personal y su historial en la empresa.',
    name: 'Trabajador',
    new: 'Nuevo Trabajador',
    edit: 'Editar Trabajador',
    historyTitle: 'Historial de ',
    historySubtitle: 'Registro de eventos y cambios del trabajador.',
    selectCivilStatus: 'Seleccione Estado Civil',
    selectStatus: 'Seleccione Estado',
    uploadPhoto: 'Subir Foto',
  }
  //------------NOVEDADES---------------
  //------------PROCESOS LABORALES---------------
}