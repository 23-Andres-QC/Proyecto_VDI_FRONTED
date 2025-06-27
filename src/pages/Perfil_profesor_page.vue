<template>
  <div class="professor-dashboard">
    <!-- Header profesional -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-title">
          <h3>Panel de Profesor</h3>
          <p>Gestión de Investigación y Publicaciones</p>
        </div>
        <div class="header-actions">
          <q-btn icon="notifications" flat round color="primary" class="notification-btn">
            <q-badge color="red" floating>3</q-badge>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <!-- Sidebar de perfil -->
      <div class="sidebar-container">
        <div class="profile-sidebar">
          <PerfilProfesor
            @menu-button-clicked="handleMenuButtonClicked"
            class="profile-component"
          />
        </div>
      </div>

      <!-- Área de contenido principal -->
      <div class="main-content">
        <div class="content-wrapper">
          <!-- Breadcrumb Navigation -->
          <div class="breadcrumb-section">
            <q-breadcrumbs class="custom-breadcrumbs">
              <q-breadcrumbs-el label="Inicio" icon="home" />
              <q-breadcrumbs-el :label="getCurrentSectionName()" />
            </q-breadcrumbs>
          </div>

          <!-- Content Area -->
          <div class="content-area">
            <transition name="fade" mode="out-in">
              <VisualizacionSoloRevistas
                v-if="mostrarComponente === 'revista'"
                key="revista"
                class="content-component"
              />
              <VisualizacionSoloListaCerrada
                v-else-if="mostrarComponente === 'listaCerrada'"
                key="listaCerrada"
                class="content-component"
              />
              <ListaProfesores
                v-else-if="mostrarComponente === 'lista'"
                key="lista"
                class="content-component"
              />
              <div
                v-else-if="mostrarComponente === 'preguntas'"
                key="preguntas"
                class="content-component centered-content"
              >
                <varios class="centered-component" />
              </div>
              <ConsultarListaCerrada
                v-else-if="mostrarComponente === 'consultarListaCerrada'"
                key="consultarListaCerrada"
                class="content-component"
              />
              <ConsultarRevistas
                v-else-if="mostrarComponente === 'consultarRevistas'"
                key="consultarRevistas"
                class="content-component"
              />
              <!-- Default content -->
              <div v-else key="default" class="content-component welcome-content">
                <div class="welcome-card">
                  <q-icon name="science" size="64px" color="primary" />
                  <h4>Bienvenido al Panel de Investigación</h4>
                  <p>Seleccione una opción del menú lateral para comenzar</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PerfilProfesor from 'components/Perfil_Profesor.vue'
import ConsultarListaCerrada from 'src/components/Reportes/ConsultarListaCerrada.vue'
import ConsultarRevistas from 'src/components/Reportes/ConsultarRevistas.vue'
//import VisualizacionSoloRevistas from 'components/VisualizacionSoloRevistas.vue'
//import VisualizacionSoloListaCerrada from 'components/VisualizacionSoloListaCerrada.vue'
//import ListaProfesores from 'components/Lista_profesores.vue'

const mostrarComponente = ref('consultarRevistas')

// Computed para obtener el nombre de la sección actual
const getCurrentSectionName = computed(() => {
  const sectionMap = {
    revista: 'Visualización de Revistas',
    listaCerrada: 'Lista Cerrada',
    lista: 'Lista de Profesores',
    preguntas: 'Preguntas Frecuentes',
    consultarListaCerrada: 'Consultar Lista Cerrada',
    consultarRevistas: 'Consultar Revistas',
  }
  return sectionMap[mostrarComponente.value] || 'Dashboard'
})

function handleMenuButtonClicked(menuItem) {
  console.log('Menu item clicked:', menuItem)

  if (menuItem.id === 1) {
    mostrarComponente.value = 'consultarListaCerrada'
  } else if (menuItem.id === 2) {
    mostrarComponente.value = 'consultarRevistas'
  } else {
    mostrarComponente.value = 'consultarRevistas'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

/* Variables CSS para un diseño profesional */
:root {
  --primary-red: #dc2626;
  --primary-red-dark: #b91c1c;
  --primary-red-light: #ef4444;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  --border-radius: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 20px;
}

/* Contenedor principal del dashboard */
.professor-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
  font-family: 'Inter', sans-serif;
}

/* Header del dashboard */
.dashboard-header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.02em;
}

.header-title p {
  font-size: 0.95rem;
  color: var(--gray-600);
  margin: 0;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-btn {
  position: relative;
}

/* Contenido principal del dashboard */
.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  min-height: calc(100vh - 120px);
}

/* Sidebar del perfil */
.sidebar-container {
  flex: 0 0 300px;
}

.profile-sidebar {
  background: white;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  position: sticky;
  top: 140px;
  height: fit-content;
  min-height: 500px;
}

.profile-component {
  width: 100%;
  height: 100%;
}

/* Área de contenido principal */
.main-content {
  flex: 1;
  min-width: 0;
}

.content-wrapper {
  background: white;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  min-height: 600px;
}

/* Breadcrumb section */
.breadcrumb-section {
  padding: 1.5rem 2rem 1rem;
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}

.custom-breadcrumbs {
  font-weight: 500;
}

.custom-breadcrumbs .q-breadcrumbs__el {
  color: var(--gray-600);
  font-size: 0.9rem;
}

.custom-breadcrumbs .q-breadcrumbs__el--last {
  color: var(--primary-red);
  font-weight: 600;
}

/* Área de contenido */
.content-area {
  padding: 2rem;
  min-height: 500px;
}

.content-component {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
}

.centered-component {
  width: 70%;
  max-width: 800px;
}

/* Welcome content */
.welcome-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-card {
  text-align: center;
  padding: 3rem;
  border: 2px dashed var(--gray-300);
  border-radius: var(--border-radius-lg);
  background: var(--gray-50);
  max-width: 400px;
}

.welcome-card h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-800);
  margin: 1rem 0 0.5rem 0;
}

.welcome-card p {
  color: var(--gray-600);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.6;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive design */
@media (max-width: 1024px) {
  .dashboard-content {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar-container {
    flex: none;
  }

  .profile-sidebar {
    position: static;
    min-height: auto;
  }

  .header-content {
    padding: 1rem;
  }

  .header-title h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    gap: 1rem;
  }

  .content-area {
    padding: 1rem;
  }

  .breadcrumb-section {
    padding: 1rem;
  }

  .centered-component {
    width: 100%;
  }

  .welcome-card {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-actions {
    align-self: flex-end;
  }

  .content-wrapper {
    border-radius: var(--border-radius);
  }

  .profile-sidebar {
    border-radius: var(--border-radius);
  }
}

/* Estilos adicionales para mejorar la integración */
.profile-component,
.content-component {
  border-radius: inherit;
}

/* Animaciones sutiles */
.profile-sidebar,
.content-wrapper {
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.profile-sidebar:hover,
.content-wrapper:hover {
  box-shadow: var(--shadow-xl);
}

/* Loading states */
.content-component {
  position: relative;
}

.content-component::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
  pointer-events: none;
  opacity: 0;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
