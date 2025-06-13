<template>
  <div class="users-table-container">
    <!-- Search Section -->
    <div class="search-section">
      <div class="search-input-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="BUSCAR"
          class="search-input"
          @keyup.enter="performSearch"
        />
        <button class="search-btn" @click="performSearch">Buscar</button>
      </div>
    </div>

    <!-- Table Container -->
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr class="table-header">
            <th class="header-cell">N°</th>
            <th class="header-cell">Categoría</th>
            <th class="header-cell">DNI</th>
            <th class="header-cell">Nombre y Apellido</th>
            <th class="header-cell">Correo</th>
            <th class="header-cell">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in filteredUsers"
            :key="user.id"
            class="table-row"
            :class="{ 'even-row': index % 2 === 1 }"
          >
            <td class="table-cell">{{ index + 1 }}</td>
            <td class="table-cell">{{ user.categoria }}</td>
            <td class="table-cell">{{ user.dni }}</td>
            <td class="table-cell">{{ user.nombreApellido }}</td>
            <td class="table-cell">
              <a :href="`mailto:${user.correo}`" class="email-link">
                {{ user.correo }}
              </a>
            </td>
            <td class="table-cell">
              <span
                class="status-badge"
                :class="{
                  'status-active': user.estado === 'Activo',
                  'status-inactive': user.estado === 'Inactivo',
                }"
              >
                {{ user.estado }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty rows for visual consistency -->
      <div class="empty-rows" v-if="filteredUsers.length < 10">
        <div v-for="n in 10 - filteredUsers.length" :key="`empty-${n}`" class="empty-row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'UsersTable',
  setup() {
    const searchQuery = ref('')

    const users = ref([
      {
        id: 1,
        categoria: 'Docente',
        dni: '123456789',
        nombreApellido: 'de la casa javier eraud peres',
        correo: '231000562@ue.edu.pe',
        estado: 'Inactivo',
      },
      {
        id: 2,
        categoria: 'patroclo',
        dni: '876543214',
        nombreApellido: 'pedro del gallo marzano',
        correo: 'dsdsdsdsdsds@ue.edu.pe',
        estado: 'Activo',
      },
    ])

    const filteredUsers = computed(() => {
      if (!searchQuery.value) {
        return users.value
      }

      const query = searchQuery.value.toLowerCase()
      return users.value.filter(
        (user) =>
          user.categoria.toLowerCase().includes(query) ||
          user.dni.includes(query) ||
          user.nombreApellido.toLowerCase().includes(query) ||
          user.correo.toLowerCase().includes(query) ||
          user.estado.toLowerCase().includes(query),
      )
    })

    const performSearch = () => {
      // Aquí puedes agregar lógica adicional para la búsqueda
      console.log('Buscando:', searchQuery.value)
    }

    const addUser = (newUser) => {
      users.value.push({
        ...newUser,
        id: users.value.length + 1,
      })
    }

    const updateUser = (userId, updatedData) => {
      const index = users.value.findIndex((user) => user.id === userId)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updatedData }
      }
    }

    const deleteUser = (userId) => {
      users.value = users.value.filter((user) => user.id !== userId)
    }

    return {
      searchQuery,
      users,
      filteredUsers,
      performSearch,
      addUser,
      updateUser,
      deleteUser,
    }
  },
})
</script>

<style scoped>
.users-table-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Search Section */
.search-section {
  margin-bottom: 20px;
}

.search-input-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #666;
}

.search-btn {
  padding: 8px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #555;
}

/* Table Container */
.table-container {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

/* Table Header */
.table-header {
  background-color: #e57373;
  color: black;
}

.header-cell {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border-right: 1px solid #c62828;
  font-size: 13px;
}

.header-cell:last-child {
  border-right: none;
}

/* Table Body */
.table-row {
  border-bottom: 1px solid #e0e0e0;
}

.table-row:hover {
  background-color: #f9f9f9;
}

.even-row {
  background-color: #fafafa;
}

.table-cell {
  padding: 8px 12px;
  border-right: 1px solid #e0e0e0;
  font-size: 12px;
  vertical-align: middle;
}

.table-cell:last-child {
  border-right: none;
}

/* Email Link */
.email-link {
  color: #1976d2;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}

/* Status Badge */
.status-badge {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
}

.status-active {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.status-inactive {
  background-color: #ffcdd2;
  color: #c62828;
}

/* Empty Rows */
.empty-rows {
  background-color: white;
}

.empty-row {
  height: 32px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
}

.empty-row:nth-child(even) {
  background-color: #fafafa;
}

/* Responsive */
@media (max-width: 768px) {
  .users-table-container {
    padding: 15px;
    overflow-x: auto;
  }

  .search-input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    margin-bottom: 10px;
  }

  .users-table {
    min-width: 700px;
  }

  .header-cell,
  .table-cell {
    padding: 6px 8px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .users-table-container {
    padding: 10px;
  }

  .header-cell,
  .table-cell {
    padding: 4px 6px;
    font-size: 10px;
  }
}
</style>
