import type { IconConfig } from 'src/layouts/types/navigation';

export const PAGINAS_ICONS: Readonly<IconConfig> = Object.freeze({
  // Nivel 1 (Menú Principal)
  configuraciones: 'sym_o_settings_account_box',
  gestiondereclutamiento: 'sym_o_group_search',
  trabajador: 'engineering',
  gestiondecapacitacion: 'sym_o_account_child_invert',
  gestionsalarial: 'sym_o_universal_currency_alt',

  // Nivel 2 (Sub Menús)
  organizacion: 'corporate_fare',
  beneficiossociales: 'redeem',
  valoracion: 'assessment',
  sanciones_submenu: 'gavel',
  remuneracion: 'payments',
//___________________________
  admision: 'how_to_reg',
//___________________________
  personal: 'manage_accounts',
  novedades: 'new_releases',
  procesoslaborales: 'work_history',
//___________________________
  evento: 'event',
//___________________________
  planillas: 'table_view',
  boletas: 'request_quote',

  // Nivel 3 (Tabs / Páginas)
  areas: 'layers',
  cargos: 'badge',
  prerrequisitosdecargo: 'fact_check',
  tiposdecontratos: 'description',
  funcionesyobligaciones: 'assignment',
//___________________________
  entesreguladores: 'gavel',
  beneficios: 'redeem',
//___________________________
  metodosdeevaluacion: 'straighten',
  actividadesdeevaluacion: 'event_available',
  tiposdesanciones: 'report_problem',
//___________________________
  niveles: 'bar_chart',
  motivosdebaja: 'person_remove_alt_1',
  bajas: 'logout',
//___________________________
  metodosdepago: 'payments',
  bonosempresa: 'moped',
  salariominimo: 'monetization_on',
//___________________________
  convocatorias: 'campaign',
  postulantes: 'person_search',
  actividades: 'school', // Entrenamiento & Capacitación
//___________________________
  trabajadores: 'groups',
  contrataciones: 'handshake',
//___________________________
  permisos: 'event_busy',
  anticipos: 'price_check',
  vacaciones: 'beach_access',
//___________________________
  sanciones: 'warning',
  memorandums: 'mail',
//___________________________
  sueldosysalarios: 'account_balance_wallet',
  aportes: 'savings',
  aguinaldos: 'card_giftcard',
  reintegros: 'keyboard_return',
//___________________________
  salarios: 'attach_money',
  aguinaldosbp: 'receipt_long',
  retroactivos: 'history',
//___________________________
  reclutamiento: 'person_add'  //////falta ubicar
});

export function getIconoMenu(codigo: string): string {
  if (!codigo) return 'menu';
  
  // Limpiamos el código por si trae el hash del usuario (ej: areas-7f39f8...)
  const codigoBase = codigo.split('-')[0] ?? 'menu';
  
  // Retornamos el icono mapeado, o un icono por defecto ('help_outline' o 'menu')
  return PAGINAS_ICONS[codigoBase] || 'label_important';
}

//////Antiguo Codigo


// export const PAGINAS = Object.freeze({
//   organizacion: ['areas', 'cargos', 'prerrequisitosdecargo', 'tiposdecontratos', 'funcionesyobligaciones'],
//   beneficiossociales: ['entesreguladores', 'beneficios'],
//   valoracion: ['metodosdeevaluacion', 'actividadesdeevaluacion', 'tiposdesanciones'],
//   sanciones: ['niveles', 'motivosdebaja', 'bajas'],
//   remuneracion: ['metodosdepago', 'bonosempresa', 'salariominimo'],
//   admision:['convocatorias', 'postulantes', 'evaluacionadmision'],
//   personal:['trabajadores', 'contrataciones'],
//   novedades:['permisos', 'anticipos', 'vacaciones'],
//   procesoslaborales:['sanciones', 'memorandums'],
//   evento:['actividades'],
//   planillas:['sueldosysalarios', 'aportes', 'aguinaldosbp', 'reintegros'],
//   boletas:['salarios', 'aguinaldos', 'retroactivos'],

// /////////////ORGANIZACION
//   areas: ['areas'], ////////////////////////////////////1
//   cargos: ['cargos'], //////////////////////////////////2
//   prerrequisitosdecargo: ['prerrequisitosdecargo'], ////3
//   tiposdecontratos: ['tiposdecontratos'], //////////////4
//   funcionesyobligaciones: ['funcionesyobligaciones'], //5
// /////////////BENEFICIOS SOCIALES
//   entesreguladores: ['entesreguladores'], //1
//   beneficios: ['beneficios'], //////////////2
// /////////////VALORACION
//   metodosdeevaluacion: ['metodosdeevaluacion'], ///////////1
//   actividadesdeevaluacion: ['actividadesdeevaluacion'], ///2
//   tiposdesanciones: ['tiposdesanciones'], /////////////////3
// /////////////SANCIONES
//   niveles: ['niveles'], //////////////1
//   motivosdebaja: ['motivosdebaja'], //2
//   bajas: ['bajas'], //////////////////3
// /////////////REMUNERACION
//   metodosdepago: ['metodosdepago'], //1
//   bonosempresa: ['bonosempresa'], ////2
//   salariominimo: ['salariominimo'], //3
// /////////////ADMISION
//   convocatorias: ['convocatorias'], //1
//   postulantes: ['postulantes'], //////2
// /////////////PERSONAL
//   trabajadores: ['trabajadores'], //////1
//   contrataciones: ['contrataciones'], //2
// /////////////NOVEDADES
//   permisos: ['permisos'], //////1
//   anticipos: ['anticipos'], ////2
//   vacaciones: ['vacaciones'], //3
// /////////////PROCESOS LABORALES
//   sancion: ['sanciones'], //////1 ///////     sanciones -> sancion
//   memorandums: ['memorandums'], //2
// /////////////EVENTO

// /////////////PLANILLAS
//   sueldosysalarios: ['sueldosysalarios'], //1
//   aportes: ['aportes'], ////////////////////2
//   aguinaldosbp: ['aguinaldosbp'], //////////3
//   reintegros: ['reintegros'], //////////////4
// /////////////BOLETAS
//   salarios: ['salarios'], //////////1
//   aguinaldos: ['aguinaldos'], //////2
//   retroactivos: ['retroactivos'], //3


//   actividades: ['actividades'],
// })

// export const PAGINAS_ICONS = Object.freeze({
//   configuraciones: "settings",
//   reclutamiento: "person_add",
//   personal: "manage_accounts",
//   actividades: "school",
//   planillas: "table_view",
//   boletasdepago: "request_quote",


//   // Módulos
//   areas: "layers",
//   cargos: "badge",
//   prerrequisitosdecargo: "fact_check",
//   tiposdecontratos: "description",
//   entesreguladores: "gavel",
//   funcionesyobligaciones: "assignment",
//   metodosdeevaluacion: "straighten",
//   actividadesdeevaluacion: "event_available",
//   beneficios: "redeem",
//   tiposdesanciones: "report_problem",
//   niveles: "bar_chart",
//   motivosdebaja: "person_remove_alt_1",
//   metodosdepago: "payments",
//   bonosempresa: "moped", // Representando incentivos/movilidad o 'stars'
//   salariominimo: "monetization_on",
//   convocatorias: "campaign",
//   postulantes: "person_search",
//   trabajadores: "groups",
//   contrataciones: "handshake",
//   permisos: "event_busy",
//   anticipos: "price_check",
//   vacaciones: "beach_access",
//   sanciones: "warning",
//   memorandums: "mail",
//   bajas: "logout",
//   sueldosysalarios: "account_balance_wallet",
//   aportes: "savings",
//   aguinaldos: "card_giftcard",
//   reintegros: "keyboard_return",
//   salarios: "attach_money",
//   aguinaldosbp: "receipt_long",
//   retroactivos: "history",
// })
// export const PAGINAS_SELECT = Object.freeze({
//   // Reportes por submenú
//   })

// export const ICONOS_MENU = PAGINAS_ICONS;

// export function getIconoMenu(codigo) {
//   const codigoBase = codigo.split('-')[0];
//   return ICONOS_MENU[codigoBase] || 'menu';
// }

// export const tieneAtributo = (grupo, atributo) => {
//   return PAGINAS[grupo]?.includes(atributo) ?? false
// }

// export const obtenerGrupos = () => {
//   return Object.keys(PAGINAS)
// }

// export const obtenerAtributos = (grupo) => {
//   return PAGINAS[grupo] || []
// }

// export const obtenerIcono = (codigo) => {
//   const prefix = codigo?.split('-')[0] || ''
//   return PAGINAS_ICONS[prefix] || 'help_outline'
// }
