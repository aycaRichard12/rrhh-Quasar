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
      // CONFIGURACIONES
      { path: 'areas',            component: () => import('src/modules/areas/pages/AreasPage.vue') },
      { path: 'entesReguladores', component: () => import('src/modules/entesReguladores/pages/EntesReguladoresPage.vue') },


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
