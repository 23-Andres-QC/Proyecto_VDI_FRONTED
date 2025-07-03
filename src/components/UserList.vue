<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md shadow-2" style="background: white; border-radius: 20px">
      <!-- Buscador -->
      <q-input
        filled
        v-model="search"
        label="Buscar por nombre, correo o documento"
        class="q-mb-md"
        debounce="300"
        clearable
      />

      <!-- Tabla de usuarios -->
      <q-table
        :rows="usuariosFiltrados"
        :columns="columns"
        row-key="idUsuario"
        flat
        bordered
        dense
        no-data-label="No se encontraron usuarios"
      />
    </q-card>
  </div>
</template>

<!-- UserList.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const usuarios = ref([])
const search = ref('')

async function cargarUsuarios() {
  try {
    const res = await axios.get('http://localhost:5009/api/usuario')
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
defineExpose({ cargarUsuarios }) // Para ser llamado desde RegisterUserForm.vue

const usuariosFiltrados = computed(() => {
  if (!search.value) return usuarios.value
  const term = search.value.toLowerCase()
  return usuarios.value.filter(
    (u) =>
      (u.correo ?? '').toLowerCase().includes(term) ||
      (u.nombreyApellido ?? '').toLowerCase().includes(term) ||
      String(u.documento ?? '').includes(term),
  )
})

const columns = [
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left', sortable: true },
  {
    name: 'nombreyApellido',
    label: 'Trabajador',
    field: 'nombreyApellido',
    align: 'left',
    sortable: true,
  },
  { name: 'dni', label: 'DNI', field: 'dni', align: 'left', sortable: true },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left', sortable: true },
]
</script>
