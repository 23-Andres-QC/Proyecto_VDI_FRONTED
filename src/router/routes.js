const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  { path: '/chat', component: () => import('components/ChatBot.vue') },

  { path: '/p', component: () => import('components/Preguntas_Frecuentes.vue') },

  { path: '/perfil-a', component: () => import('components/Perfil_Administrador.vue') },

  { path: '/perfil-p', component: () => import('components/Perfil_Profesor.vue') },

  { path: '/lst-p', component: () => import('components/Lista_profesores.vue') }
]

export default routes
