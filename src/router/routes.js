const routes = [
  // Rutas de la aplicación
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/reset-password', component: () => import('pages/ChangePasswordForm.vue') },
      { path: '', component: () => import('pages/HomePantalla.vue') },
      { path: '/usuarios', component: () => import('pages/RegisterPage.vue') },
      { path: '/perfil-p', component: () => import('pages/Perfil_profesor_page.vue') },
      { path: '/perfil-a', component: () => import('pages/Perfil_Administrador_page.vue') },
      { path: '/importar-docentes', component: () => import('pages/ImportarDocentesPage.vue') },
      { path: '/chat', component: () => import('components/ChatBot.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  { path: '/casa', component: () => import('pages/HomePantalla.vue') },

  // {
  // path: '/:catchAll(.*)*',   component: () => import('pages/ErrorNotFound.vue'),  },
  //{ path: '/casa', component: () => import('pages/HomePantalla.vue') },

  /*
  // Rutas adicionales
  { path: '/chat', component: () => import('components/ChatBot.vue') },
  { path: '/Revista', component: () => import('pages/RevistaPage.vue') },
  { path: '/ListaCerrada', component: () => import('pages/ListaCerradaPage.vue') },
  {
    path: '/ListaCerradaCon',
    component: () => import('src/components/Reportes/Tablas/TablaListCerradaCon.vue'),
  },
  { path: '/p', component: () => import('components/Preguntas_Frecuentes.vue') },
  { path: '/TipoReporte', component: () => import('components/Reportes/ReportesTipo.vue') },
  { path: '/ExportarReporte', component: () => import('components/Reportes/ExportarReportes.vue') },
  { path: '/Tabla1', component: () => import('components/Reportes/Tablas/TablaISSN.vue') },
  { path: '/Tabla2', component: () => import('components/Reportes/Tablas/TablaListCerrada.vue') },
  { path: '/Tabla3', component: () => import('components/Reportes/Tablas/TablaProfesores.vue') },
  { path: '/Tabla4', component: () => import('components/Reportes/Tablas/Tablausuarios.vue') },
  { path: '/Reportes', component: () => import('components/Reportes/TablaDinamicaReportes.vue') },
  { path: '/perfil-a', component: () => import('components/Perfil_Administrador.vue') },
  { path: '/perfil-p', component: () => import('components/Perfil_Profesor.vue') },
  { path: '/lst-p', component: () => import('components/Lista_profesores.vue') },
  { path: '/conrev', component: () => import('src/components/Reportes/ConsultarRevistas.vue') },
  {
    path: '/conlist',
    component: () => import('src/components/Reportes/ConsultarListaCerrada.vue'),
  },
  {
    path: '/visualizacion-revistas',
    component: () => import('components/VisualizacionSoloRevistas.vue'),
  },
  {
    path: '/visualizacion-lista-cerrada',
    component: () => import('components/VisualizacionSoloListaCerrada.vue'),
  },
  */
]

export default routes
