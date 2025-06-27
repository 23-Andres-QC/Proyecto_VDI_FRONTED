<template>
  <div>
    <q-btn label="Registrar Usuario" color="primary" @click="dialog = true" />

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 700px; max-width: 95vw">
        <!-- Cabecera -->
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">Registrar nuevo usuario</div>
          <q-btn flat dense round icon="close" @click="dialog = false" />
        </q-card-section>

        <!-- Cuerpo del formulario -->
        <q-card-section class="q-gutter-md">
          <!-- Lista de Profesores como select -->
          <q-select
            filled
            v-model="selectedProfesor"
            :options="profesores"
            label="Profesor"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            class="q-mb-sm"
          />

          <!-- ComboBox de Rol -->
          <q-select filled v-model="selectedRol" :options="roles" label="Rol" class="q-mb-sm" />

          <!-- Estado -->
          <q-select filled v-model="estado" :options="estados" label="Estado" class="q-mb-sm" />

          <!-- Contraseña -->
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

          <!-- Repetir contraseña -->
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
import { api } from 'boot/axios'

const dialog = ref(false)
const showPassword = ref(false)

const profesores = ref([])
const roles = ['Administrador', 'Profesor']
const estados = ['Activo', 'Inactivo']

const selectedProfesor = ref(null)
const selectedRol = ref(null)
const estado = ref('Activo')
const password = ref('')
const repetirPassword = ref('')

onMounted(async () => {
  try {
    const res = await api.get('/api/ProfesoresAdmis')
    profesores.value = res.data.map((p) => ({
      label: p.nombreyApellido,
      value: p.idProfesorAdmis,
    }))
  } catch (err) {
    console.error('Error al cargar profesores:', err)
    if (err.response?.status === 404) {
      console.warn('El endpoint de profesores no está disponible')
    } else if (err.response?.status === 401) {
      console.error('Sesión expirada. Por favor, inicia sesión nuevamente.')
    } else {
      console.error('Error de conexión con el servidor')
    }
    // Agregar datos de ejemplo para desarrollo
    profesores.value = [
      { label: 'Dr. Juan Pérez García (Ejemplo)', value: 1 },
      { label: 'Dra. María González López (Ejemplo)', value: 2 },
      { label: 'Dr. Carlos Rodríguez Sánchez (Ejemplo)', value: 3 },
    ]
  }
})

function limpiarFormulario() {
  selectedProfesor.value = null
  selectedRol.value = null
  estado.value = 'Activo'
  password.value = ''
  repetirPassword.value = ''
}

async function registrarUsuario() {
  if (!selectedProfesor.value || !selectedRol.value || !password.value) {
    alert('Todos los campos son obligatorios.')
    return
  }

  if (password.value !== repetirPassword.value) {
    alert('Las contraseñas no coinciden.')
    return
  }

  try {
    await api.post('/api/usuarios', {
      idProfesorAdmis: selectedProfesor.value,
      Id_Rol: selectedRol.value === 'Administrador' ? 1 : 2,
      Estado: estado.value === 'Activo' ? 1 : 0,
      Contraseña: password.value,
      Correo: '', // Puedes agregar un campo correo si se requiere
      FechaCreacion: new Date(),
      FechaModificacion: new Date(),
    })

    alert('Usuario registrado correctamente')
    dialog.value = false
    limpiarFormulario()
  } catch (err) {
    console.error('Error al registrar:', err)
    if (err.response?.status === 404) {
      alert(
        'El endpoint para registrar usuarios no está disponible en el backend. Por favor, contacte al administrador del sistema.',
      )
    } else {
      alert('Error al registrar usuario: ' + (err.message || 'Error desconocido'))
    }
  }
}
</script>
