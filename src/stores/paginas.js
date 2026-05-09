export const PAGINAS = Object.freeze({
  general: Object.freeze([
    'controldivisa',
    'controlunidadmedida',
    'controlunidadtiempo'
  ]),
  'produccion&producto': Object.freeze([
    'controlrubro',
    'controlcategoriaproducto',
    'controlcaracteristicasproducto'
  ]),
  'equipamiento': Object.freeze([
    'controlseccion',
    'controltipomaquina',

  ]),
  'insumos&material': Object.freeze([
    'controltipomaterial',
    'controlempaques',
    'controlcaracteristicascualificables',
    'controlestadoproductoterminado',

  ]),
  'contingencias': Object.freeze([
    'controlcontingencias',
    'controlrecusoscontingencias',
  ]),
  'stockmateriaprima': Object.freeze([
    'stockmateriaprima',
    'pormaterial',
    'porcompra',
    'InsumosInventario',
    'InsumosMerma',

  ]),

  'generarlistacompra': Object.freeze([
    'generarlistacompra',
  ]),
  'registrarcompra': Object.freeze([
    'registrarcompra',
  ]),
  'maquina': Object.freeze([
    'maquina',
  ]),

  'controlcalidadcompra': Object.freeze([
    'controlcalidadcompra',
  ]),
  'despacharmateriales': Object.freeze([
    'despacharmateriales',
  ]),


  'devoluciones': Object.freeze([
    'controldevolucioncompras',
    'controldevolucionproduccion',
  ]),
  'etapasproduccion': Object.freeze([
    'controletapasdeproduccion',
    'controlgrupoparaetapas',
    'controlgrupoproductos',
    'controluniretapasengrupos',
    'controletapasmaquina',
    'controletapatrabajador',
  ]),
  'producto': Object.freeze([
    'controlregistrarProducto',
    'controlconservarproducto',

  ]),


  'listaordenproduccion': Object.freeze([
    'listaordenproduccion',
  ]),
  'solicitudesproductos': Object.freeze([
    'solicitudesproductos',
  ]),

  'controlproduccion': Object.freeze([
    'controlproduccion',
  ]),

  'gastosgenerales': Object.freeze([
    'gastosgenerales',
  ]),
  'produccionlote': Object.freeze([
    'produccionlote',
  ]),
  'proveedores': Object.freeze([
    'proveedores',
    'controlproveedormaterial',
    'controlmaterialproveedor',
  ]),
  'material': Object.freeze([
    'material',
  ]),



})

export const PAGINAS_ICONS = Object.freeze({
  // Íconos para los submenús de Configuración General
  controldevolucioncompras: 'assignment_return',
  controldevolucionproduccion: 'undo',
  controldivisa: 'payments',
  controlunidadmedida: 'straighten',
  controlunidadtiempo: 'timer',

  controltipomaterial: 'category',        // tipo de material
  controlempaques: 'inventory_2',         // empaques / packaging
  controlcaracteristicascualificables: 'tune',  // características configurables
  controlestadoproductoterminado: 'task_alt',    // estado del producto terminado

  //contingencias
  controlcontingencias: 'warning',
  controlrecusoscontingencias: 'inventory_2',


  // Íconos para los submenús de Configuración de Producto
  controlrubro: 'category',
  controlcategoriaproducto: 'fact_check',
  controlcaracteristicasproducto: 'straighten',
  controlseccion: 'apartment',
  controltipomaquina: 'build',

  stockmateriaprima: 'inventory',
  pormaterial: 'bar_chart',
  porcompra: 'shopping_cart',
  InsumosInventario: 'category',
  InsumosMerma: 'category',
  generarlistacompra: 'shopping_cart_checkout',
  registrarcompra: 'add_shopping_cart',
  controlcalidadcompra: 'fact_check',
  despacharmateriales: 'local_shipping',
  listaordenproduccion: 'assignment',
  solicitudesproductos: 'task_alt',
  maquina: 'build',

  controletapasdeproduccion: 'precision_manufacturing',
  controlgrupoparaetapas: 'account_tree',
  controlgrupoproductos: 'inventory_2',
  controluniretapasengrupos: 'merge_type',
  controletapasmaquina: 'settings',
  controletapatrabajador: 'groups',
  controlproduccion: 'monitor_heart',
  gastosgenerales: 'payments',
  produccionlote: 'analytics',
  controlregistrarProducto: 'card_giftcard',
  controlconservarproducto: 'ac_unit',
  proveedores: 'group',
  controlproveedormaterial: 'inventory_2',
  controlmaterialproveedor: 'badge',
  material: 'layers',



})
export const PAGINAS_SELECT = Object.freeze({
  registrarventa: Object.freeze([
    'reportedeventas',
    'reportedecotizacionesocultas',
    'reporteproductosvendidosindividual',
    'kardex',
  ]),
  cuentasporcobrar: Object.freeze([
    'reportecuentasporcobrarocultas',
    'reportecuentasxpagarxperiodo',
  ]),
  contingencias: Object.freeze(['reportedeextravios', 'reportedemermas']),
  gestioncompra: Object.freeze([
    'reporteproductoscomprados',
    'reportedecompras',
    'reportestockdeproductosindividual',
    'reporteproveedorcompras',
    'reporteproductoproveedorcompras',
  ]),
  inventarioexterno: Object.freeze([
    'reportedecaducidaddeproductos',
    'reporteinventarioexterior',
    'indicesrotacion',
  ]),
  campanas: Object.freeze([
    'reportedecampanas',
    'reportedeventasporcampanas',
    'reporteVentasCampana',
  ]),
  gestioncampanas: Object.freeze([
    'reportedecampanas',
    'reportedeventasporcampanas',
    'reporteVentasCampana',
  ]),
})


export const ICONOS_MENU = Object.freeze({
  configuracion: 'settings',
  administracion: 'admin_panel_settings',
  almaceninsumos: 'inventory',
  planeacionproduccion: 'factory',
  almacenproductos: 'warehouse',
  calendario: 'calendar_month',
  inicio: 'dashboard',


  general: 'tune',
  'produccion&producto': 'category',
  equipamiento: 'precision_manufacturing',
  'insumos&material': 'inventory_2',
  contingencias: 'warning',
  maquina: 'build',
  devoluciones: 'assignment_return',
  etapasproduccion: 'timeline',
  producto: 'inventory_2',
  proveedores: 'group',
  material: 'layers',
  trabajador: 'badge',
  contingenciasejecucion: 'report_problem',
  stockmateriaprima: 'list_alt',
  generarlistacompra: 'shopping_cart_checkout',
  registrarcompra: 'add_shopping_cart',
  controlcalidadcompra: 'fact_check',
  despacharmateriales: 'local_shipping',
  listaordenproduccion: 'assignment',
  solicitudesproductos: 'task_alt',
  controlproduccion: 'monitor_heart',
  gastosgenerales: 'payments',
  produccionlote: 'analytics',
  stockproductos: 'inventory',
  controlcalidadproduccion: 'verified',
  despacharproductos: 'outbox',
  mantenimiento: 'construction',
  limpieza: 'cleaning_services',
  notificaciones: 'notifications',
  dashboard: 'dashboard',
});

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
