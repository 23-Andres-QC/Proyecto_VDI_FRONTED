<template>
  <div class="lista-usuarios-container">
    <div class="header-section">
      <div class="search-section">
        <q-input
          v-model="search"
          dense
          outlined
          placeholder="Buscar por nombre, correo o documento"
          class="search-input"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="buttons-section">
        <q-btn
          color="primary"
          icon="refresh"
          label="Actualizar"
          class="action-button"
          @click="cargarUsuarios"
        />
      </div>
    </div>

    <div class="table-container">
      <q-table
        :rows="usuariosFiltrados"
        :columns="columns"
        row-key="idUsuario"
        :pagination="pagination"
        flat
        bordered
        class="usuarios-table"
        binary-state-sort
        hide-pagination
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-red-7 header-column"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="correo" :props="props">
              {{ props.row.correo }}
            </q-td>
            <q-td key="nombreyApellido" :props="props">
              {{ props.row.nombreyApellido }}
            </q-td>
            <q-td key="dni" :props="props">
              {{ props.row.dni }}
            </q-td>
            <q-td key="categoria" :props="props">
              <q-chip
                :color="props.row.categoria !== '-' ? 'primary' : 'grey'"
                text-color="white"
                dense
                class="categoria-chip"
              >
                {{ props.row.categoria }}
              </q-chip>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center q-gutter-sm q-pa-lg text-grey-7">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>No se encontraron usuarios</span>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'

export default {
  name: 'UserList',
  setup() {
    const usuarios = ref([])
    const search = ref('')
    const pagination = ref({
      sortBy: 'nombreyApellido',
      descending: false,
      page: 1,
      rowsPerPage: 0
    })

    const columns = [
      {
        name: 'correo',
        label: 'Correo',
        field: 'correo',
        align: 'left',
        sortable: true,
      },
      {
        name: 'nombreyApellido',
        label: 'Nombre y Apellido',
        field: 'nombreyApellido',
        align: 'left',
        sortable: true,
      },
      {
        name: 'dni',
        label: 'DNI',
        field: 'dni',
        align: 'left',
        sortable: true,
      },
      {
        name: 'categoria',
        label: 'Categoría',
        field: 'categoria',
        align: 'center',
        sortable: true,
      },
    ]

    const usuariosFiltrados = computed(() => {
      if (!search.value) return usuarios.value
      const term = search.value.toLowerCase()
      return usuarios.value.filter(
        (u) =>
          (u.correo ?? '').toLowerCase().includes(term) ||
          (u.nombreyApellido ?? '').toLowerCase().includes(term) ||
          String(u.dni ?? '').includes(term),
      )
    })

    async function cargarUsuarios() {
      try {
        const res = await api.get('/api/usuario')
        usuarios.value = res.data.map((u) => ({
          idUsuario: u.idUsuario,
          correo: u.correo,
          nombreyApellido: u.nombreyApellido,
          dni: u.dni ?? '-',
          categoria: u.categoria ?? '-',
        }))
      } catch (err) {
        console.error('Error al cargar usuarios:', err)
      }
    }

    onMounted(cargarUsuarios)

    return {
      usuarios,
      search,
      pagination,
      columns,
      usuariosFiltrados,
      cargarUsuarios,
    }
  },
}
</script>

<style scoped>
.lista-usuarios-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 16px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-section {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
}

.buttons-section {
  display: flex;
  gap: 10px;
}

.action-button {
  font-weight: 500;
}

.table-container {
  border-radius: 8px;
  overflow: hidden;
  height: 400px;  /* Altura fija para mostrar ~7 filas */
}

.usuarios-table {
  width: 100%;
  height: 100%;
}

:deep(.q-table__container) {
  height: 100%;
}

:deep(.q-table__middle) {
  max-height: calc(100% - 50px);
  overflow-y: auto;
}

/* Mantener el encabezado fijo */
:deep(.q-table thead) {
  position: sticky;
  top: 0;
  z-index: 1;
}

:deep(.q-table th) {
  font-weight: 600;
  font-size: 0.875rem;
  background: #e53935 !important;
  color: white !important;
}

.header-column {
  background-color: #e53935 !important; /* Rojo */
  color: white !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(.q-table td) {
  font-size: 0.875rem;
}

:deep(.q-table--bordered) {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.categoria-chip {
  font-size: 0.8rem;
  padding: 2px 8px;
}

:deep(.q-table__bottom) {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
