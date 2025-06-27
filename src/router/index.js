import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// Simulación de función de autenticación (reemplaza por tu lógica real)
function isAuthenticated() {
  // Por ejemplo, revisa si hay un token en localStorage
  return !!localStorage.getItem('token')
}

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Guard de navegación para proteger rutas bajo /log
  Router.beforeEach((to, from, next) => {
    // Permitir siempre el acceso a HomePantalla
    if (to.path === '/') {
      next()
      // Permitir acceso a login
    } else if (to.path === '/login') {
      next()
      // Proteger rutas bajo /log excepto login
    } else if (to.path.startsWith('/log')) {
      if (!isAuthenticated()) {
        next('/login')
      } else if (localStorage.getItem('estado') !== '1') {
        // Mostrar banner negro flotante si el usuario está inhabilitado
        window.showInhabilitadoBanner && window.showInhabilitadoBanner()
        setTimeout(() => {
          next('/')
        }, 3000)
      } else {
        next()
      }
    } else {
      next()
    }
  })

  return Router
})
