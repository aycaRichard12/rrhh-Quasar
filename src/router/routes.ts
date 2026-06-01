import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // Si entras a "/", te manda al login automáticamente
    redirect: '/auth/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: 'welcome', component: () => import('pages/WelcomePage.vue') },
//____________| CONFIGURACION |_________________________________________________________________________________________
//Organizacion
      { path: 'areas'                , component: () => import('./modules/areas/pages/AreasPage.vue') },
      { path: 'cargos'               , component: () => import('./modules/cargos/pages/CargosPage.vue') },
      { path: 'prerrequisitosdecargo', component: () => import('./modules/prerrequisitoscargo/pages/PrerrequisitosCargoPage.vue') },
      { path: 'tiposdecargo'         , component: () => import('./modules/tiposdecargo/pages/TiposDeCargoPage.vue') },
//Beneficios Sociales
      { path: 'entesreguladores'     , component: () => import('./modules/entesreguladores/pages/EntesReguladoresPage.vue') },
      { path: 'beneficios'           , component: () => import('./modules/beneficios/pages/BeneficiosPage.vue') },
//Valoración
      { path: 'metodosdeevaluacion'  , component: () => import('./modules/metodosdeevaluacion/pages/MetodosDeEvaluacionPage.vue') },
//Sanciones
      { path: 'niveles'              , component: () => import('./modules/niveles/pages/NivelesPage.vue') },
//Remuneración
      { path: 'metodosdepago'        , component: () => import('./modules/metodosdepago/pages/MetodosDePagoPage.vue') },
      { path: 'bonosEmpresa'         , component: () => import('./modules/bonosempresa/pages/BonosEmpresaPage.vue') },
//____________| GESTIÓN RECLUTAMIENTO |_________________________________________________________________________________
// Admisión
      { path: 'convocatorias'        , component: () => import('./modules/convocatorias/pages/convocatoriasPage.vue') },
//____________| TRABAJADOR |____________________________________________________________________________________________
// Personal
      { path: 'trabajadores'         , component: () => import('./modules/trabajadores/pages/TrabajadoresPage.vue') },
// Novedades
      { path: 'permisos'             , component: () => import('./modules/permisos/pages/PermisosPage.vue') },
// Procesos Laborales
      { path: 'sanciones'            , component: () => import('./modules/sanciones/pages/SancionesPage.vue') },
//____________| GESTIÓN DE CAPACITACIÓN |_______________________________________________________________________________
//Evento
//____________| GESTIÓN SALARIAL |______________________________________________________________________________________
//Planillas
      { path: 'sueldosysalarios'     , component: () => import('./modules/sueldosysalarios/pages/SueldosYSalariosPage.vue') },
//Boletas
      { path: 'salarios'             , component: () => import('./modules/salarios/pages/SalariosPage.vue') },
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'), // Asegúrate que el archivo se llame así
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;