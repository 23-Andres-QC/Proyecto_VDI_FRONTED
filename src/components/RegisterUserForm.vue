<template>
  <div>
    <q-btn label="Registrar Usuario" color="primary" @click="abrirDialogo" />

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 800px; max-width: 95vw">
        <!-- Cabecera del diálogo -->
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">Registrar nuevo usuario</div>
          <q-btn flat dense round icon="close" @click="cerrarDialogo" />
        </q-card-section>

        <!-- Contenido del formulario -->
        <q-card-section class="q-gutter-md">
          <!-- Tabla de profesores -->
          <q-table
            title="Seleccione un Profesor"
            :rows="profesores"
            :columns="columns"
            row-key="id_Profesor_Admis"
            selection="single"
            v-model:selected="selectedProfesorRow"
            dense
            flat
            bordered
            :pagination="{ rowsPerPage: 5 }"
            @selection="onSeleccionarProfesor"
          >
            <template v-slot:body-cell-select="props">
              <q-td :props="props">
                <q-radio v-model="selectedProfesorId" :val="props.row.id_Profesor_Admis" />
              </q-td>
            </template>
          </q-table>

          <!-- Rol y Estado -->
          <q-select filled v-model="selectedRol" :options="roles" label="Rol" class="q-mb-sm" />
          <q-select filled v-model="estado" :options="estados" label="Estado" class="q-mb-sm" />

          <!-- Contraseñas -->
          <q-input
            filled
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            class="q-mb-sm"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            filled
            v-model="repetirPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Repetir Contraseña"
            class="q-mb-sm"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-card-section>

        <!-- Botones -->
        <q-card-actions align="right">
          <q-btn flat label="Limpiar" color="warning" @click="limpiarFormulario" />
          <q-btn flat label="Registrar" color="primary" @click="registrarUsuario" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const dialog = ref(false)
const showPassword = ref(false)

const profesores = ref([])
const selectedProfesorId = ref(null)
const selectedProfesorRow = ref([])
const selectedRol = ref(null)
const estado = ref('Activo')
const password = ref('')
const repetirPassword = ref('')

const roles = ['Administrador', 'Profesor']
const estados = ['Activo', 'Inactivo']

const columns = [
  { name: 'select', label: '', field: 'select', align: 'center' },
  { name: 'dni', label: 'DNI', field: 'dni', align: 'left' },
  { name: 'nombreyApellido', label: 'Nombre y Apellido', field: 'nombreyApellido', align: 'left' },
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left' },
]

const abrirDialogo = () => {
  limpiarFormulario()
  dialog.value = true
}

const cerrarDialogo = () => {
  dialog.value = false
}

const limpiarFormulario = () => {
  selectedProfesorId.value = null
  selectedProfesorRow.value = []
  selectedRol.value = null
  estado.value = 'Activo'
  password.value = ''
  repetirPassword.value = ''
}

const onSeleccionarProfesor = () => {
  if (selectedProfesorRow.value.length > 0) {
    selectedProfesorId.value = selectedProfesorRow.value[0].id_Profesor_Admis
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5009/api/ProfesoresAdmis')
    profesores.value = res.data
  } catch (err) {
    console.error('Error al cargar profesores:', err)
  }
})

const registrarUsuario = async () => {
  if (!selectedProfesorId.value || !selectedRol.value || !password.value) {
    alert('Todos los campos son obligatorios.')
    return
  }

  if (password.value !== repetirPassword.value) {
    alert('Las contraseñas no coinciden.')
    return
  }

  try {
    await axios.post('http://localhost:5009/api/usuarios', {
      idProfesorAdmis: selectedProfesorId.value,
      correo: selectedProfesorRow.value[0].correo || '',
      contraseña: password.value,
      idRol: selectedRol.value === 'Administrador' ? 1 : 2,
      estado: estado.value === 'Activo' ? 1 : 0,
    })

    alert('Usuario registrado correctamente')
    cerrarDialogo()
  } catch (err) {
    console.error('Error al registrar usuario:', err)
    alert('No se pudo registrar usuario. Verifica la API o los campos.')
  }
}
</script>
