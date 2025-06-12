<template>
  <div class="user-management-page row justify-around items-start q-pa-lg">
    <!-- Registro de Usuarios -->
    <q-card class="register-section column q-pa-md">
      <h5 class="section-title">Registrar usuarios</h5>

      <div class="section-box">
        <q-chip class="section-label" color="black" text-color="white">Profesores</q-chip>
        <q-input filled v-model="form.email" label="Correo" class="q-mb-sm input-white" />
        <q-input
          filled
          v-model="form.professorId"
          label="Id Profesores"
          class="q-mb-md input-white"
        />
      </div>

      <div class="section-box">
        <q-chip class="section-label" color="black" text-color="white">Rol</q-chip>
        <q-input filled v-model="form.roleId" label="Id Rol" class="q-mb-md input-white" />
      </div>

      <div class="section-box">
        <q-input filled v-model="form.state" label="Estado" class="q-mb-sm input-white" />
        <q-input
          filled
          :type="showPwd ? 'text' : 'password'"
          v-model="form.password"
          label="Contraseña"
          class="q-mb-md input-white"
        >
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility' : 'visibility_off'"
              @click="showPwd = !showPwd"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>

      <div class="row justify-around q-mt-md">
        <q-btn label="Limpiar" color="black" @click="clearForm" />
        <q-btn label="Actualizar" color="black" />
        <q-btn label="Registrar" color="black" />
      </div>
    </q-card>

    <!-- Visualización de Usuarios -->
    <q-card class="table-section column q-pa-md">
      <h5 class="section-title">Visualización usuarios</h5>
      <div class="row items-center q-mb-sm">
        <q-input
          filled
          v-model="search"
          placeholder="BUSCAR"
          class="input-search input-white q-mr-sm"
        />
        <q-btn label="Buscar" color="black" />
      </div>

      <q-table
        dense
        flat
        :rows="filteredUsers"
        :columns="columns"
        row-key="email"
        hide-bottom
        class="user-table"
      />
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
  email: '',
  professorId: '',
  roleId: '',
  state: '',
  password: '',
})

const showPwd = ref(false)
const search = ref('')

const users = ref([
  {
    email: 'rabad@esan.edu.pe',
    name: 'ABAD FERNÁNDEZ GUSTAVO ADOLFO',
    doc: '44390171',
    category: 'PROFESOR TIEMPO PARCIAL',
  },
  {
    email: 'navedae@esan.edu.pe',
    name: 'AVEDO RIQUELME MANUEL',
    doc: '40022007',
    category: 'PROFESOR POSTGRADO',
  },
  // Agrega más datos mock según sea necesario
])

const columns = [
  { name: 'email', label: 'Correos', field: 'email' },
  { name: 'name', label: 'Trabajador', field: 'name' },
  { name: 'doc', label: 'Nº Doc', field: 'doc' },
  { name: 'category', label: 'Categoría', field: 'category' },
]

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter((user) =>
    Object.values(user).some((val) => val.toLowerCase().includes(search.value.toLowerCase())),
  )
})

function clearForm() {
  form.value = { email: '', professorId: '', roleId: '', state: '', password: '' }
}
</script>

<style scoped>
.user-management-page {
  background: linear-gradient(to right, #f25a5a, #918d8d);
  min-height: 100vh;
  gap: 20px;
}

.register-section,
.table-section {
  background-color: #d3d3d3;
  width: 45%;
  border-radius: 10px;
}

.section-title {
  background-color: red;
  color: black;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
}

.section-box {
  margin-bottom: 16px;
}

.section-label {
  margin-bottom: 8px;
}

.input-white input {
  background-color: white !important;
}

.input-search input {
  font-weight: bold;
}

.user-table {
  max-height: 500px;
  overflow-y: auto;
}
</style>
