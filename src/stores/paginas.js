export const PAGINAS = Object.freeze({
  areas: ['areas'],
  cargos: ['cargos'],
  prerrequisitosdecargo: ['prerrequisitosdecargo'],
  tiposdecontratos: ['tiposdecontratos'],
  entesreguladores: ['entesreguladores'],
  funcionesyobligaciones: ['funcionesyobligaciones'],
  metodosdeevaluacion: ['metodosdeevaluacion'],
  actividadesdeevaluacion: ['actividadesdeevaluacion'],
  beneficios: ['beneficios'],
  tiposdesanciones: ['tiposdesanciones'],
  niveles: ['niveles'],
  motivosdebaja: ['motivosdebaja'],
  metodosdepago: ['metodosdepago'],
  bonosempresa: ['bonosempresa'],
  salariominimo: ['salariominimo'],
  convocatorias: ['convocatorias'],
  postulantes: ['postulantes'],
  trabajadores: ['trabajadores'],
  contrataciones: ['contrataciones'],
  permisos: ['permisos'],
  anticipos: ['anticipos'],
  vacaciones: ['vacaciones'],
  sanciones: ['sanciones'],
  memorandums: ['memorandums'],
  bajas: ['bajas'],
  actividades: ['actividades'],
  sueldosysalarios: ['sueldosysalarios'],
  aportes: ['aportes'],
  aguinaldos: ['aguinaldos'],
  reintegros: ['reintegros'],
  salarios: ['salarios'],
  aguinaldosbp: ['aguinaldosbp'],
  retroactivos: ['retroactivos'],
})

export const PAGINAS_ICONS = Object.freeze({
  configuraciones: "settings",
  reclutamiento: "person_add",
  personal: "manage_accounts",
  actividades: "school",
  planillas: "table_view",
  boletasdepago: "request_quote",


  // Módulos
  areas: "layers",
  cargos: "badge",
  prerrequisitosdecargo: "fact_check",
  tiposdecontratos: "description",
  entesreguladores: "gavel",
  funcionesyobligaciones: "assignment",
  metodosdeevaluacion: "straighten",
  actividadesdeevaluacion: "event_available",
  beneficios: "redeem",
  tiposdesanciones: "report_problem",
  niveles: "bar_chart",
  motivosdebaja: "person_remove_alt_1",
  metodosdepago: "payments",
  bonosempresa: "moped", // Representando incentivos/movilidad o 'stars'
  salariominimo: "monetization_on",
  convocatorias: "campaign",
  postulantes: "person_search",
  trabajadores: "groups",
  contrataciones: "handshake",
  permisos: "event_busy",
  anticipos: "price_check",
  vacaciones: "beach_access",
  sanciones: "warning",
  memorandums: "mail",
  bajas: "logout",
  sueldosysalarios: "account_balance_wallet",
  aportes: "savings",
  aguinaldos: "card_giftcard",
  reintegros: "keyboard_return",
  salarios: "attach_money",
  aguinaldosbp: "receipt_long",
  retroactivos: "history",
})
export const PAGINAS_SELECT = Object.freeze({
  // Reportes por submenú
  })

export const ICONOS_MENU = PAGINAS_ICONS;

export function getIconoMenu(codigo) {
  const codigoBase = codigo.split('-')[0];
  return ICONOS_MENU[codigoBase] || 'menu';
}

export const tieneAtributo = (grupo, atributo) => {
  return PAGINAS[grupo]?.includes(atributo) ?? false
}

export const obtenerGrupos = () => {
  return Object.keys(PAGINAS)
}

export const obtenerAtributos = (grupo) => {
  return PAGINAS[grupo] || []
}

export const obtenerIcono = (codigo) => {
  const prefix = codigo?.split('-')[0] || ''
  return PAGINAS_ICONS[prefix] || 'help_outline'
}
