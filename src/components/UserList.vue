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
      />
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const search = ref('')
const usuarios = ref([])

const columns = [
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left', sortable: true },
  { name: 'trabajador', label: 'Trabajador', field: 'trabajador', align: 'left', sortable: true },
  { name: 'documento', label: 'N° DOC', field: 'documento', align: 'left', sortable: true },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left', sortable: true },
]

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5009/api/usuarios')
    usuarios.value = res.data
  } catch (err) {
    console.error('Error al cargar usuarios:', err)
  }
})

const usuariosFiltrados = computed(() => {
  if (!search.value) return usuarios.value
  const term = search.value.toLowerCase()
  return usuarios.value.filter(
    (u) =>
      (u.correo ?? '').toLowerCase().includes(term) ||
      (u.trabajador ?? '').toLowerCase().includes(term) ||
      String(u.documento ?? '').includes(term),
  )
})
</script>

<style scoped>
.q-table {
  max-height: 400px;
  overflow-y: auto;
}
</style>
