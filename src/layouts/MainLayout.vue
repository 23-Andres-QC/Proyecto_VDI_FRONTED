<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header class="header-container">
      <div class="header-content">
        <!-- Logo Section -->
        <div class="logo-section">
          <img src="../assets/Logo_Universidad.png" alt="Universidad ESAN" class="logo-image" />
          <span class="logo-text">Universidad ESAN</span>
        </div>

        <!-- Header Actions -->
        <div class="header-actions">
          <q-btn
            color="dark"
            label="Cerrar sesión"
            size="sm"
            class="logout-btn"
            @click="handleLogout"
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

    <!-- Footer -->
    <q-footer class="footer-container">
      <div class="footer-content">
        <p class="footer-text">© Universidad ESAN | Alonso de Molina 1652, Surco, Lima, Perú</p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $router = useRouter()
    const $q = useQuasar()

    const handleLogout = () => {
      // Mostrar diálogo de confirmación
      $q.dialog({
        title: 'Cerrar Sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        cancel: true,
        persistent: true,
        ok: {
          label: 'Sí, cerrar sesión',
          color: 'negative',
        },
      }).onOk(() => {
        // Lógica de logout
        performLogout()
      })
    }

    const performLogout = () => {
      try {
        // Limpiar datos de sesión
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_data')
        sessionStorage.clear()

        // Mostrar notificación
        $q.notify({
          type: 'positive',
          message: 'Sesión cerrada exitosamente',
          position: 'top',
        })

        // Redirigir al login
        $router.push('/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        $q.notify({
          type: 'negative',
          message: 'Error al cerrar sesión',
          position: 'top',
        })
      }
    }

    return {
      handleLogout,
    }
  },
})
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
