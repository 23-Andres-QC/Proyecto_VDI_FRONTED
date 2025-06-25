<template>
  <q-layout view="hHh lpR fFf">
    <q-header v-if="!isHomePantalla" class="header-container">
      <div class="header-content">
        <!-- Logo Section -->
        <div class="logo-section">
          <img src="../assets/Logo_Universidad.png" alt="Universidad ESAN" class="logo-image" />
          <span class="logo-text">Universidad ESAN</span>
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
    router.back() // Volver a la página anterior
  } else if (!isAuthenticated.value) {
    router.push('/login') // Ir a login
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
    router.push('/login')
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
  background-color: #333;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  padding: 8px 16px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.logout-btn:hover {
  background-color: #555;
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
  background-color: #f5f5f5;
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

  .logout-btn {
    font-size: 12px;
    padding: 6px 12px;
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

  .logout-btn {
    font-size: 11px;
    padding: 5px 10px;
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
  transition: all 0.2s ease;
}

.logout-btn:active {
  transform: translateY(1px);
}
</style>
