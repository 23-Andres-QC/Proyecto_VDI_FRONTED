const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }, // <- esta es la página por defecto
      { path: 'reset-password', component: () => import('pages/ChangePasswordForm.vue') },
      { path: 'usuarios', component: () => import('pages/RegisterPage.vue') },
    ],
  },
]

export default routes
