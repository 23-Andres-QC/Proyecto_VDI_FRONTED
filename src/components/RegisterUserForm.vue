<template>
  <div>
    <q-btn label="Registrar Usuario" color="primary" @click="abrirDialogo()" />

    <q-dialog v-model="dialog" persistent>
      <q-card class="register-card">
        <!-- TÍTULO -->
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">
            {{ editando ? 'Actualizar usuario' : 'Registrar nuevo usuario' }}
          </div>
          <q-btn flat dense round icon="close" @click="cerrarDialogo" />
        </q-card-section>

        <!-- FILTROS -->
        <q-card-section class="q-gutter-md">
          <div class="row q-col-gutter-md items-center">
            <div class="col-4">
              <q-input
                filled
                ref="buscadorRef"
                v-model="filtroTexto"
                label="Buscar por nombre, DNI o categoría"
                debounce="300"
                clearable
              />
            </div>
            <div class="col-4">
              <q-select
                filled
                v-model="filtroEstado"
                :options="estadoOpciones"
                label="Filtrar por Estado"
                clearable
              />
            </div>
            <div class="col-4">
              <q-select
                filled
                v-model="filtroCategoria"
                :options="categoriasDisponibles"
                label="Filtrar por Categoría"
                clearable
              />
            </div>
          </div>

          <!-- TABLA -->
          <q-table
            :rows="profesoresFiltrados"
            :columns="columns"
            row-key="idProfesorAdmis"
            dense
            flat
            bordered
            :pagination="{ rowsPerPage: 5 }"
            :sort-method="customSort"
            no-data-label="No hay profesores disponibles"
            class="tabla-fija"
          >
            <template v-slot:body-cell-radio="props">
              <q-td :props="props">
                <q-radio
                  v-model="selectedProfesorId"
                  :val="props.row.idProfesorAdmis"
                  @update:model-value="onSeleccionarProfesor(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>

        <!-- FORMULARIO -->
        <q-card-section class="q-gutter-md">
          <q-select filled v-model="selectedRol" :options="roles" label="Rol" class="q-mb-sm" />
          <q-select filled v-model="estado" :options="estados" label="Estado" class="q-mb-sm" />

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

        <q-card-actions align="right">
          <q-btn flat label="Limpiar" color="warning" @click="limpiarFormulario" />
          <q-btn
            flat
            :label="editando ? 'Actualizar' : 'Registrar'"
            color="primary"
            @click="editando ? actualizarUsuario() : registrarUsuario()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { api } from 'src/boot/axios'

const emit = defineEmits(['usuario-registrado'])

const dialog = ref(false)
const showPassword = ref(false)
const editando = ref(false)

const roles = ['Administrador', 'Profesor']
const estados = ['Activo', 'Inactivo']

const profesores = ref([])
const selectedProfesorId = ref(null)
const selectedRol = ref(null)
const estado = ref('Activo')
const password = ref('')
const repetirPassword = ref('')

const filtroTexto = ref('')
const filtroEstado = ref(null)
const filtroCategoria = ref(null)
const categoriasDisponibles = ref([])

const buscadorRef = ref(null)

const estadoOpciones = ['Activo', 'Inactivo']

const columns = [
  { name: 'radio', label: '', field: 'radio', align: 'center' },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left', sortable: true },
  { name: 'dni', label: 'DNI', field: 'dni', align: 'left', sortable: true },
  {
    name: 'nombreyApellido',
    label: 'Nombre y Apellido',
    field: 'nombreyApellido',
    align: 'left',
    sortable: true,
  },
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left', sortable: true },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'left' },
]

// Carga de profesores
const cargarProfesores = async () => {
  try {
    const res = await api.get('/api/ProfesoresAdmis')
    profesores.value = res.data

    const categorias = [...new Set(res.data.map((p) => p.categoria).filter((c) => c !== null))]
    categoriasDisponibles.value = categorias
  } catch (err) {
    console.error('Error al cargar profesores:', err)
    profesores.value = []
  }
}

onMounted(cargarProfesores)

function abrirDialogo() {
  limpiarFormulario()
  dialog.value = true
  nextTick(() => buscadorRef.value?.focus())
}

function cerrarDialogo() {
  dialog.value = false
}

function limpiarFormulario() {
  selectedProfesorId.value = null
  selectedRol.value = null
  estado.value = 'Activo'
  password.value = ''
  repetirPassword.value = ''
  editando.value = false
  filtroTexto.value = ''
  filtroEstado.value = null
  filtroCategoria.value = null
}

// Selección de profesor
function onSeleccionarProfesor(profesor) {
  selectedProfesorId.value = profesor.idProfesorAdmis
  if (profesor.usuario) {
    selectedRol.value = profesor.usuario.rol
    estado.value = profesor.usuario.estado === 1 ? 'Activo' : 'Inactivo'
    editando.value = true
  }
}

// Computed: filtrado combinado
const profesoresFiltrados = computed(() => {
  return profesores.value.filter((p) => {
    const matchesTexto =
      !filtroTexto.value ||
      p.nombreyApellido?.toLowerCase().includes(filtroTexto.value.toLowerCase()) ||
      p.dni?.includes(filtroTexto.value) ||
      p.categoria?.toLowerCase().includes(filtroTexto.value.toLowerCase())

    const matchesEstado =
      !filtroEstado.value || p.estado?.toLowerCase() === filtroEstado.value.toLowerCase()

    const matchesCategoria = !filtroCategoria.value || p.categoria === filtroCategoria.value

    return matchesTexto && matchesEstado && matchesCategoria
  })
})

// Registro
async function registrarUsuario() {
  if (!selectedProfesorId.value || !selectedRol.value || !password.value) {
    alert('Todos los campos son obligatorios.')
    return
  }

  if (password.value !== repetirPassword.value) {
    alert('Las contraseñas no coinciden.')
    return
  }

  const profesor = profesores.value.find((p) => p.idProfesorAdmis === selectedProfesorId.value)

  try {
    await api.post('/api/usuario', {
      Id_Profesor_Admis: selectedProfesorId.value,
      Id_Rol: selectedRol.value === 'Administrador' ? 1 : 2,
      Estado: estado.value === 'Activo' ? 1 : 0,
      Contraseña: password.value,
      Correo: profesor?.correo || '',
    })
    alert('Usuario registrado correctamente')
    emit('usuario-registrado')
    cerrarDialogo()
    cargarProfesores()
  } catch (err) {
    console.error('Error al registrar:', err)
    alert('Error al registrar usuario: ' + (err.response?.data || err.message))
  }
}

// Ordenador personalizado
function customSort(rows, sortBy, descending) {
  return [...rows].sort((a, b) => {
    const valA = (a[sortBy] ?? '').toString().toLowerCase()
    const valB = (b[sortBy] ?? '').toString().toLowerCase()
    return (valA < valB ? -1 : valA > valB ? 1 : 0) * (descending ? -1 : 1)
  })
}
</script>

<style scoped>
.register-card {
  min-width: 700px;
  max-width: 95vw;
  min-height: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.tabla-fija {
  min-height: 230px;
}
</style>
