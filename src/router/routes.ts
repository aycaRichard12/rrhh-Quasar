import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // Si entras a "/", te manda al login automáticamente
    redirect: '/auth/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard'              ,component: () => import('pages/IndexPage.vue') },
      { path: 'welcome'                ,component: () => import('pages/WelcomePage.vue') },
//____________| CONFIGURACION |_________________________________________________________________________________________
//Organizacion
      { path: 'areas'                  ,component: () => import('src/modules/areas/pages/AreasPage.vue') },
      { path: 'cargos'                 ,component: () => import('src/modules/cargos/pages/CargosPage.vue') },
      { path: 'prerrequisitosdecargo'  ,component: () => import('src/modules/prerrequisitoscargo/pages/PrerrequisitosCargoPage.vue') },
      { path: 'tiposdecontratos'       ,component: () => import('src/modules/tiposdecontratos/pages/TiposDeContratosPage.vue') },
      { path: 'funcionesyobligaciones' ,component: () => import('src/modules/funcionesyobligaciones/pages/FuncionesYObligacionesPage.vue') },
      { path: 'firmas'                 ,component: () => import('src/modules/firmas/pages/FirmasPage.vue')},
//Beneficios Sociales
      { path: 'entesreguladores'       ,component: () => import('src/modules/entesreguladores/pages/EntesReguladoresPage.vue') },
      { path: 'beneficios'             ,component: () => import('src/modules/beneficios/pages/BeneficiosPage.vue') },
//Valoración
      { path: 'metodosdeevaluacion'    ,component: () => import('src/modules/metodosdeevaluacion/pages/MetodosDeEvaluacionPage.vue') },
      { path: 'actividadesdeevaluacion',component: () => import('src/modules/actividadesdeevaluacion/pages/ActividadesDeEvaluacionPage.vue') },
      { path: 'tiposdesanciones'       ,component: () => import('src/modules/tiposdesanciones/pages/TiposDeSancionesPage.vue') },
//Sanciones
      { path: 'niveles'                ,component: () => import('src/modules/niveles/pages/NivelesPage.vue') },
      { path: 'motivosdebaja'          ,component: () => import('src/modules/motivosdebaja/pages/MotivosDeBajaPage.vue') },
      { path: 'bajas'                  ,component: () => import('src/modules/bajas/pages/BajasPage.vue') },
//Remuneración
      { path: 'metodosdepago'          ,component: () => import('src/modules/metodosdepago/pages/MetodosDePagoPage.vue') },
      { path: 'bonosEmpresa'           ,component: () => import('src/modules/bonosempresa/pages/BonosEmpresaPage.vue') },
      { path: 'salariominimo'          ,component: () => import('src/modules/salariominimo/pages/SalarioMinimoPage.vue') },
//____________| GESTIÓN RECLUTAMIENTO |_________________________________________________________________________________
// Admisión
      { path: 'convocatorias'          ,component: () => import('src/modules/convocatorias/pages/convocatoriasPage.vue') },


//____________| TRABAJADOR |____________________________________________________________________________________________
// Personal
      { path: 'trabajadores'           ,component: () => import('src/modules/trabajadores/pages/TrabajadoresPage.vue') },

// Novedades
      { path: 'permisos'               ,component: () => import('src/modules/permisos/pages/PermisosPage.vue') },


// Procesos Laborales
      { path: 'sanciones'              ,component: () => import('src/modules/sanciones/pages/SancionesPage.vue') },

//____________| GESTIÓN DE CAPACITACIÓN |_______________________________________________________________________________
//Evento

//____________| GESTIÓN SALARIAL |______________________________________________________________________________________
//Planillas
      { path: 'sueldosysalarios'       ,component: () => import('src/modules/sueldosysalarios/pages/SueldosYSalariosPage.vue') },



//Boletas
      { path: 'salarios'               ,component: () => import('src/modules/salarios/pages/SalariosPage.vue') },

      
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