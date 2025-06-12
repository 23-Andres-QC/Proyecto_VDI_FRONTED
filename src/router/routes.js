const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

  { path: '/chat', component: () => import('components/ChatBot.vue') },

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
]

export default routes
