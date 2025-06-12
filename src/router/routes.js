const routes = [
  // Rutas de la aplicación
  // Ruta principal
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/HomePantalla.vue') }, // Sin la barra inicial
    ],
  },
  //Rutas de autenticación
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

// Rutas adicionales
  { path: '/chat', component: () => import('components/ChatBot.vue') },
]

export default routes
