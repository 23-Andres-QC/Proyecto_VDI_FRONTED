<template>
  <div class="user-profile-sidebar">
    <!-- User Profile Card -->
    <div class="profile-card">
      <div class="profile-image-container">
        <img :src="userProfile.avatar" :alt="userProfile.fullName" class="profile-image" />
      </div>
      <div class="profile-info">
        <h3 class="user-full-name">{{ userProfile.fullName }}</h3>
        <p class="user-additional-name">{{ userProfile.additionalName }}</p>
      </div>
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
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'UserProfileSidebar',
  emits: ['menu-selected'],
  setup(props, { emit }) {
    const userProfile = ref({
      fullName: localStorage.getItem('nombreyApellido'),
      
      avatar: '/src/assets/Logo_Universidad.png', // Ruta de la imagen del usuario
    })

    const menuItems = ref([
      { id: 1, label: 'Consulta ISSN', active: true }, // ISSN starts as active
      { id: 2, label: 'Consulta lista cerrada', active: false },
    ])

    // Emitir automáticamente el evento para mostrar 'Consulta ISSN' al montar
    onMounted(() => {
      emit('menu-selected', menuItems.value[0])
    })

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

    const updateUserProfile = (newProfile) => {
      userProfile.value = { ...userProfile.value, ...newProfile }
    }

    return {
      userProfile,
      menuItems,
      selectMenuItem,
      updateUserProfile,
      handleButtonClick,
    }
  },
})
</script>

<style scoped>
.user-profile-sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
}

/* Profile Card */
.profile-card {
  background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
  border-radius: 12px;
  padding: 30px 20px 25px 20px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.profile-image-container {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-info {
  text-align: center;
}

.user-full-name {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
  line-height: 1.2;
}

.user-additional-name {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
}

/* Navigation Menu */
.navigation-menu {
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 15px;
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
  .user-profile-sidebar {
    width: 100%;
  }

  .profile-card {
    padding: 20px 15px;
  }

  .profile-image {
    width: 80px;
    height: 80px;
  }

  .user-full-name {
    font-size: 16px;
  }

  .user-additional-name {
    font-size: 14px;
  }

  .navigation-menu {
    padding: 12px;
  }

  .menu-btn {
    padding: 12px 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 15px 10px;
  }

  .profile-image {
    width: 60px;
    height: 60px;
  }

  .user-full-name {
    font-size: 14px;
  }

  .user-additional-name {
    font-size: 12px;
  }

  .navigation-menu {
    padding: 10px;
    gap: 6px;
  }

  .menu-btn {
    padding: 10px 12px;
    font-size: 12px;
  }
}
</style>
