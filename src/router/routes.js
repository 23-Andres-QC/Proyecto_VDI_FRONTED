const routes = [
  // Rutas de la aplicación
  // Ruta principal
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }, // <- esta es la página por defecto
      { path: 'reset-password', component: () => import('pages/ChangePasswordForm.vue') },
       { path: 'home', component: () => import('pages/HomePantalla.vue') }, // Sin la barra inicial
      { path: 'usuarios', component: () => import('pages/RegisterPage.vue') },
    ],
  },
      { path: 'perfil-p', component: () => import('pages/Perfil_profesor_page.vue') },
      { path: 'perfil-a', component: () => import('pages/Perfil_administrador_page.vue') },

    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

// Rutas adicionales
  { path: '/chat', component: () => import('components/ChatBot.vue') },

  { path: '/Revista', component: () => import('pages/RevistaPage.vue') },
  { path: '/ListaCerrada', component: () => import('pages/ListaCerradaPage.vue') },


  { path: '/p', component: () => import('components/Preguntas_Frecuentes.vue') },
  { path: '/TipoReporte', component: () => import('components/Reportes/ReportesTipo.vue') },
  { path: '/ExportarReporte', component: () => import('components/Reportes/ExportarReportes.vue') },
  { path: '/Filtro1', component: () => import('components/Reportes/Filtros/FiltroISSN.vue') },
  { path: '/Filtro2', component: () => import('components/Reportes/Filtros/FiltrosListaCerrada.vue') },
  { path: '/Filtro3', component: () => import('components/Reportes/Filtros/FiltrosProfesores.vue') },
  { path: '/Filtro4', component: () => import('components/Reportes/Filtros/FiltrosUsuarios.vue') },
  { path: '/Tabla1', component: () => import('components/Reportes/Tablas/TablaISSN.vue') },
  { path: '/Tabla2', component: () => import('components/Reportes/Tablas/TablaListCerrada.vue') },
  { path: '/Tabla3', component: () => import('components/Reportes/Tablas/TablaProfesores.vue') },
  { path: '/Tabla4', component: () => import('components/Reportes/Tablas/Tablausuarios.vue') },
  { path: '/Reportes', component: () => import('pages/ReportesPage.vue') },
  { path: '/perfil-a', component: () => import('components/Perfil_Administrador.vue') },

  { path: '/perfil-p', component: () => import('components/Perfil_Profesor.vue') },

  { path: '/lst-p', component: () => import('components/Lista_profesores.vue') }
]

export default routes
