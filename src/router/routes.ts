import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // Si entras a "/", te manda al login automáticamente
    redirect: '/auth/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard',       component: () => import('pages/IndexPage.vue') },
      { path: 'welcome',         component: () => import('pages/WelcomePage.vue') },
      // CONFIGURACION-Organizacion
      { path: 'areas',           component: () => import('src/modules/areas/pages/AreasPage.vue') },
      // CONFIGURACION-Beneficios Sociales
      { path: 'entesReguladores',component: () => import('src/modules/entesReguladores/pages/EntesReguladoresPage.vue') },
      { path: 'beneficios',      component: () => import('src/modules/beneficios/pages/BeneficiosPage.vue') },
      // CONFIGURACION-Remuneración
      { path: 'bonosEmpresa',    component: () => import('src/modules/bonosEmpresa/pages/BonosEmpresaPage.vue') },
      // GESTIÓN RECLUTAMIENTO-Admisión
      { path: 'convocatorias',   component: () => import('src/modules/convocatorias/pages/convocatoriasPage.vue') },

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
