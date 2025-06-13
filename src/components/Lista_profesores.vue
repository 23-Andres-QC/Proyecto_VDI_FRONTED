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
            <th class="header-cell">Editar</th>
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
            <td class="table-cell">
              <template v-if="editRowId === user.id">
                <select v-model="editRow.idCateg" class="edit-input">
                  <option v-for="cat in categorias" :key="cat.idCategoria" :value="cat.idCategoria">
                    {{ cat.descripcion }}
                  </option>
                </select>
              </template>
              <template v-else>
                {{ user.categoria }}
              </template>
            </td>
            <td class="table-cell">
              <template v-if="editRowId === user.id">
                <input v-model="editRow.dni" class="edit-input" />
              </template>
              <template v-else>
                {{ user.dni }}
              </template>
            </td>
            <td class="table-cell">
              <template v-if="editRowId === user.id">
                <input v-model="editRow.nombreyApellido" class="edit-input" />
              </template>
              <template v-else>
                {{ user.nombreyApellido }}
              </template>
            </td>
            <td class="table-cell">
              <template v-if="editRowId === user.id">
                <input v-model="editRow.correo" class="edit-input" />
              </template>
              <template v-else>
                <a :href="`mailto:${user.correo}`" class="email-link">
                  {{ user.correo }}
                </a>
              </template>
            </td>
            <td class="table-cell">
              <template v-if="editRowId === user.id">
                <button class="status-toggle-btn" @click="toggleEstado()">
                  {{ editRow.estado }}
                </button>
              </template>
              <template v-else>
                <span
                  class="status-badge"
                  :class="{
                    'status-active': user.estado === 'Activo',
                    'status-inactive': user.estado === 'Inactivo',
                  }"
                >
                  {{ user.estado }}
                </span>
              </template>
            </td>
            <td class="table-cell">
              <button class="edit-btn" @click="startEdit(user)" v-if="editRowId !== user.id">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1976d2"
                    d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  />
                </svg>
              </button>
              <button class="edit-btn" @click="saveEdit(user.id)" v-else>Guardar</button>
              <button class="edit-btn" @click="cancelEdit()" v-if="editRowId === user.id">
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { api } from 'src/boot/axios.js'

export default defineComponent({
  name: 'UsersTable',
  setup() {
    const searchQuery = ref('')
    const users = ref([])
    const editRowId = ref(null)
    const editRow = ref({})
    const categorias = ref([])

    // Obtener datos de la API al montar el componente
    onMounted(async () => {
      try {
        const profesoresRes = await api.get('/api/ProfesoresAdmis')
        users.value = profesoresRes.data.map((prof) => ({
          id: prof.idProfesorAdmis,
          idCateg: prof.idCateg,
          categoria: prof.categoria,
          dni: prof.dni,
          nombreyApellido: prof.nombreyApellido,
          correo: prof.correo,
          estado: prof.estado,
        }))
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    })

    const loadCategorias = async () => {
      try {
        const categoriasRes = await api.get('/api/categorias/all')
        categorias.value = categoriasRes.data.filter((cat) => cat.estado === 1)
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    }

    const filteredUsers = computed(() => {
      if (!searchQuery.value) {
        return users.value
      }
      const query = searchQuery.value.toLowerCase()
      return users.value.filter(
        (user) =>
          (user.categoria && user.categoria.toLowerCase().includes(query)) ||
          (user.dni && String(user.dni).includes(query)) ||
          (user.nombreyApellido && user.nombreyApellido.toLowerCase().includes(query)) ||
          (user.correo && user.correo.toLowerCase().includes(query)) ||
          (user.estado && user.estado.toLowerCase().includes(query)),
      )
    })

    const performSearch = () => {
      // Aquí puedes agregar lógica adicional para la búsqueda
      console.log('Buscando:', searchQuery.value)
    }

    // Obtener la descripción de la categoría por id
    const getCategoriaDescripcion = (idCategoria) => {
      const cat = categorias.value.find((c) => c.idCategoria == idCategoria)
      return cat ? cat.descripcion : ''
    }

    const startEdit = async (user) => {
      await loadCategorias()
      editRowId.value = user.id
      // Si la categoría no existe en el listado (por ejemplo, si el estado es inactivo y la categoría está inactiva), agregarla temporalmente
      const catExists = categorias.value.some((cat) => cat.idCategoria === user.idCateg)
      if (!catExists && user.idCateg && user.categoria) {
        categorias.value = [
          { idCategoria: user.idCateg, descripcion: user.categoria, estado: 0 },
          ...categorias.value,
        ]
      }
      editRow.value = { ...user, idCateg: user.idCateg }
    }

    const cancelEdit = () => {
      editRowId.value = null
      editRow.value = {}
    }

    const saveEdit = async (userId) => {
      const idx = users.value.findIndex((u) => u.id === userId)
      if (idx !== -1) {
        // Usar el idCategoria seleccionado o el actual si no se cambió
        const idCategoria = editRow.value.idCateg || users.value[idx].idCateg
        // Usar el nombreyApellido editado o el actual si no se cambió
        const nombreyApellido = editRow.value.nombreyApellido || users.value[idx].nombreyApellido
        const payload = {
          idProfesorAdmis: userId,
          idCategoria: idCategoria,
          dni: editRow.value.dni,
          nombreyApellido: nombreyApellido,
          correo: editRow.value.correo,
          estado: editRow.value.estado,
        }
        try {
          await api.put('/api/ProfesoresAdmis', payload)
          // Actualizar localmente la fila con el nombre correcto de la categoría
          users.value[idx] = {
            ...editRow.value,
            idCateg: idCategoria,
            nombreyApellido: nombreyApellido,
            categoria:
              categorias.value.find((cat) => cat.idCategoria === idCategoria)?.descripcion ||
              users.value[idx].categoria,
          }
        } catch (error) {
          console.error('Error al actualizar profesor:', error)
        }
      }
      editRowId.value = null
      editRow.value = {}
    }

    const toggleEstado = () => {
      editRow.value.estado = editRow.value.estado === 'Activo' ? 'Inactivo' : 'Activo'
    }

    return {
      searchQuery,
      users,
      filteredUsers,
      performSearch,
      editRowId,
      editRow,
      categorias,
      getCategoriaDescripcion,
      startEdit,
      cancelEdit,
      saveEdit,
      toggleEstado,
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

/* Edit Button */
.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  margin: 0 2px;
  vertical-align: middle;
}

.edit-btn svg {
  vertical-align: middle;
}

/* Edit Input */
.edit-input {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid #bbb;
  border-radius: 3px;
  font-size: 12px;
}

/* Status Toggle Button */
.status-toggle-btn {
  padding: 2px 10px;
  border-radius: 3px;
  border: 1px solid #1976d2;
  background: #e3f2fd;
  color: #1976d2;
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
}

.status-toggle-btn:hover {
  background: #bbdefb;
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
