<template>
  <q-layout view="hHh lpR fFf">
    <q-header v-if="!isHomePantalla" class="header-container">
      <div class="header-content">
        <!-- Logo Section -->
        <div class="logo-section">
          <img src="../assets/Logo_Universidad.png" alt="Universidad ESAN" class="logo-image" />
          <span class="logo-text">Vicerrectorado de investigación</span>
        </div>

        <!-- Header Actions -->
        <div class="header-actions">
          <q-btn
            v-if="buttonLabel"
            :label="buttonLabel"
            color="dark"
            size="sm"
            class="logout-btn"
            @click="handleHeaderButton"
            no-caps
          />
        </div>
      </div>
    </q-header>

    <!-- Main Page Container -->
    <q-page-container class="main-container">
      <div class="page-wrapper">
        <!-- Content Area -->
        <div class="content-area">
          <router-view />
        </div>
      </div>
    </q-page-container>
    <div class="chat">
      <ChatBot />
    </div>
  </q-layout>
</template>

<script setup>
//Linea 59 configuras en donde quieras que aparesca este Header y Footer
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import ChatBot from '../components/ChatBot.vue'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// Estado de autenticación simple (puedes mejorar esto con Vuex o Pinia)
const isAuthenticated = ref(false)

// Detectar si estamos en la página de login
const isLoginPage = computed(() => route.path === '/login')
const isHomePantalla = computed(() => route.path === '/home')

// Cambia el texto y acción del botón según el estado
const buttonLabel = computed(() => {
  if (isLoginPage.value) {
    return 'Salir'
  } else if (!isAuthenticated.value) {
    return '' // No mostrar 'Ingresar'
  } else {
    return 'Cerrar sesión'
  }
})

function handleHeaderButton() {
  if (isLoginPage.value) {
    router.push('/') // Ir a la página principal cuando presiona "Salir"
  } else if (!isAuthenticated.value) {
    router.push('/') // Ir a la página principal
  } else {
    // Cerrar sesión
    isAuthenticated.value = false
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')
    sessionStorage.clear()
    $q.notify({
      type: 'positive',
      message: 'Sesión cerrada exitosamente',
      position: 'top',
    })
    router.push('/') // Ir a la página principal
  }
}

// Simulación: cuando se pasa de login a otra página, marcar autenticado
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (oldPath === '/login' && newPath !== '/login') {
      isAuthenticated.value = true
    }
  },
)
</script>

<style scoped>
/* Layout Base */
.q-layout {
  min-height: 100vh;
}

/* Header */
.header-container {
  background-color: #d32f2f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-left: 14px;
  letter-spacing: 1px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

.header-actions {
  display: flex;
  align-items: center;
}

.logout-btn {
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  color: white;
  border-radius: 12px; /* Más rectangular (antes era 25px) */
  font-size: 1rem !important; /* Forzamos el tamaño de letra más grande */
  padding: 3px 28px; /* Padding igual, no cambia el tamaño del botón */
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.logout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #404040 0%, #2c2c2c 100%);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.logout-btn:hover::before {
  left: 100%;
}

.logout-btn:active {
  transform: translateY(0px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Main Container */
.main-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 120px); /* Ajustar según altura del header y footer */
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

.content-area {
  min-height: calc(100vh - 120px);
  background-color: #f7f7f7;
}

/* Footer */
.footer-container {
  background-color: #333;
  color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.footer-content {
  padding: 16px 24px;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-text {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content,
  .page-wrapper,
  .footer-content {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 8px 12px;
  }

  .logo-image {
    height: 32px;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logout-btn {
    font-size: 2rem !important; /* Forzamos letra grande en tablets */
    padding: 8px 16px; /* Padding igual */
    border-radius: 10px;
  }

  .footer-content {
    padding: 12px 16px;
  }

  .footer-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 8px 10px;
  }

  .logo-image {
    height: 28px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .logout-btn {
    font-size: 1.4rem !important; /* Forzamos letra grande en móviles */
    padding: 6px 12px;
    border-radius: 8px;
  }

  .footer-content {
    padding: 10px 12px;
  }

  .footer-text {
    font-size: 11px;
    line-height: 1.4;
  }
}

/* Utilidades adicionales */
.q-page {
  padding: 0;
}

/* Animaciones */
.header-container {
  transition: box-shadow 0.3s ease;
}

.logout-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:active {
  transform: translateY(0px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease;
}
</style>
