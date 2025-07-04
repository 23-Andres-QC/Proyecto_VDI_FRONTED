<template>
  <div class="user-sidebar">
    <!-- User Profile Section -->
    <div class="user-profile">
      <div class="avatar-container">
        <img :src="userProfile.avatar" :alt="userProfile.name" class="user-avatar" />
      </div>
      <h3 class="user-name">{{ userProfile.name }}</h3>
    </div>

    <!-- Navigation Menu -->
    <div class="navigation-menu">
      <button
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        class="menu-btn"
        :class="{ active: menuItem.active }"
        @click="handleButtonClick(menuItem)"
      >
        {{ menuItem.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UserSidebar',
  emits: ['menu-selected', 'menu-button-clicked'],
  setup(props, { emit }) {
    const userProfile = ref({
      name: localStorage.getItem('nombreyApellido'),
      avatar: '/src/assets/Home_imagenes/admin.png',
    })

    const menuItems = ref([
      { id: 1, label: 'Administración usuarios', active: false },
      { id: 2, label: 'Gestión de Revistas', active: false },
      { id: 3, label: 'Gestión de Listas Cerradas', active: false },
      { id: 4, label: 'Gestión de Docentes', active: false },
      { id: 5, label: 'Generar reportes', active: false },
      { id: 6, label: 'Preguntas frecuentes', active: false },
    ])

    const selectMenuItem = (id) => {
      // Desactivar todos los elementos
      menuItems.value.forEach((item) => {
        item.active = item.id === id
      })

      // Emitir evento para comunicar la selección al componente padre
      const selectedItem = menuItems.value.find((item) => item.id === id)
      emit('menu-selected', selectedItem)
    }

    const handleButtonClick = (menuItem) => {
      selectMenuItem(menuItem.id)
      // Emitir evento personalizado con el objeto del menú
      emit('menu-button-clicked', menuItem)
    }

    return {
      userProfile,
      menuItems,
      selectMenuItem,
      handleButtonClick,
    }
  },
})
</script>

<style scoped>
.user-sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: transparent;
}

/* User Profile Section */
.user-profile {
  background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.avatar-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
}

/* Navigation Menu */
.navigation-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-btn {
  width: 100%;
  padding: 14px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.menu-btn:hover {
  background-color: #444;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-btn:active {
  transform: translateY(0);
}

.menu-btn.active {
  background-color: #1976d2;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-sidebar {
    width: 100%;
  }

  .user-profile {
    padding: 20px;
    margin-bottom: 15px;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
  }

  .user-name {
    font-size: 16px;
  }

  .menu-btn {
    padding: 12px 16px;
    font-size: 13px;
  }

  .navigation-menu {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .user-profile {
    padding: 15px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
  }

  .user-name {
    font-size: 14px;
  }

  .menu-btn {
    padding: 10px 12px;
    font-size: 12px;
  }
}
</style>
