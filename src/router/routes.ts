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

//____________________________ CONFIGURACION ___________________________________________________________________________

// Organizacion
      { path: 'areas', component: () => import('src/modules/areas/pages/AreasPage.vue') },
      { path: 'cargos', component: () => import('src/modules/cargos/pages/CargosPage.vue') },
      { path: 'prerrequisitosdecargo', component: () => import('src/modules/prerrequisitosCargo/pages/PrerrequisitosCargoPage.vue') },
// Beneficios Sociales
      { path: 'entesreguladores',component: () => import('src/modules/entesReguladores/pages/EntesReguladoresPage.vue') },
      { path: 'beneficios', component: () => import('src/modules/beneficios/pages/BeneficiosPage.vue') },
// Valoración
      { path: 'metodosdeevaluacion', component: () => import('src/modules/metodosdeevaluacion/pages/MetodosDeEvaluacionPage.vue') },
// Sanciones
      { path: 'niveles', component: () => import('src/modules/niveles/pages/NivelesPage.vue') },
// Remuneración
      { path: 'metodosdepago', component: () => import('src/modules/metodosdepago/pages/MetodosDePagoPage.vue') },
      { path: 'bonosEmpresa', component: () => import('src/modules/bonosEmpresa/pages/BonosEmpresaPage.vue') },

//____________________________ GESTIÓN RECLUTAMIENTO ___________________________________________________________________

// Admisión
      { path: 'convocatorias', component: () => import('src/modules/convocatorias/pages/convocatoriasPage.vue') },

//____________________________ TRABAJADOR ______________________________________________________________________________

// Personal
      { path: 'trabajadores', component: () => import('src/modules/trabajadores/pages/TrabajadoresPage.vue') },
// Novedades
      { path: 'permisos', component: () => import('src/modules/permisos/pages/PermisosPage.vue') },
// Procesos Laborales
      { path: 'sanciones', component: () => import('src/modules/sanciones/pages/SancionesPage.vue') },

//____________________________ GESTIÓN DE CAPACITACIÓN _________________________________________________________________

//Evento

//____________________________ GESTIÓN SALARIAL ________________________________________________________________________


//Planillas
      { path: 'sueldosysalarios', component: () => import('src/modules/sueldosysalarios/pages/SueldosYSalariosPage.vue') },
//Boletas
      { path: 'salarios', component: () => import('src/modules/salarios/pages/SalariosPage.vue') },
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