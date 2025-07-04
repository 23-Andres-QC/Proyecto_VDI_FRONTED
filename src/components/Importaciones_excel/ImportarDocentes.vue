<template>
  <div class="importar-revistas-bg-flotante">
    <div
      class="importar-revistas-panel card-style importar-revistas-flotante importar-docentes-zoom"
    >
      <div class="importar-header">
        <span class="importar-titulo">Importar docentes</span>
        <q-btn flat round dense icon="close" class="cerrar-x" @click="$emit('cancelar')" />
      </div>
      <div class="importar-instruccion">Selecciona un archivo .xlsx para importar docentes</div>
      <div class="importar-form-row">
        <q-file
          filled
          v-model="archivo"
          label="Seleccionar archivo"
          accept=".xlsx, .xls"
          @update:model-value="onFileChange"
          class="importar-file"
          :prepend-icon="'insert_drive_file'"
          color="primary"
          text-color="dark"
        />
        <q-btn
          class="importar-btn importar-btn-main acciones-btn"
          label="IMPORTAR"
          icon="cloud_upload"
          @click="importarExcel"
          :disable="!archivo || cargandoImport"
        />
        <q-spinner
          v-if="cargandoImport"
          color="primary"
          size="28px"
          class="spinner-inline-importar"
        />
      </div>
      <div v-if="cargandoPreview" class="preview-loading-row">
        <q-spinner color="primary" size="28px" class="spinner-inline-importar" />
        <span class="preview-cargando-text">Cargando previsualización...</span>
      </div>
      <div v-else-if="tabla && tabla.length > 0" class="tabla-container">
        <div class="visualizacion-header">
          <h3>Visualización de docentes</h3>
        </div>
        <div class="tabla-scroll-docentes-forzada">
          <q-table
            :rows="tabla"
            :columns="columnas"
            row-key="dni"
            dense
            flat
            :pagination="pagination"
            :rows-per-page-options="[5, 10, 20, 50, 100, 200, 500, 1000]"
            class="tabla-excel zebra-table"
            style="min-width: 900px; min-width: 1000px; width: 100%"
            v-model:pagination="pagination"
            :separator="'cell'"
            :wrap-cells="true"
            :virtual-scroll="true"
            :virtual-scroll-sticky-size-start="48"
            :table-style="{ minWidth: '1000px', maxHeight: '260px', overflow: 'auto' }"
          />
        </div>
        <div class="acciones-previa acciones-docentes-fijas">
          <q-btn
            color="negative"
            label="CANCELAR"
            icon="close"
            @click="cancelarImportacion"
            class="cancelar-btn acciones-btn"
          />
          <q-btn
            class="importar-btn importar-btn-main acciones-btn"
            label="IMPORTAR"
            color="primary"
            icon="check_circle"
            @click="importarExcel"
            :disable="!tabla || !tabla.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

const emit = defineEmits(['cancelar', 'importacionCompleta'])

const archivo = ref(null)
const tabla = ref([])
const apiData = ref([])
const categorias = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})
const cargandoImport = ref(false)
const cargandoPreview = ref(false)

const columnas = [
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left' },
  { name: 'nombreyApellido', label: 'Trabajador', field: 'nombreyApellido', align: 'left' },
  { name: 'dni', label: 'N° Doc', field: 'dni', align: 'left' },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left' },
]

// Cargar categorías al montar el componente
onMounted(async () => {
  await cargarCategorias()
})

async function cargarCategorias() {
  try {
    const response = await api.get('/api/categorias/all')
    categorias.value = response.data
  } catch (error) {
    console.error('Error cargando categorías:', error)
    Notify.create({
      type: 'negative',
      message: 'Error al cargar las categorías',
      position: 'top',
    })
  }
}

// Función para obtener el ID de categoría basado en la descripción
function obtenerIdCategoria(descripcionCategoria) {
  const categoria = categorias.value.find(
    (cat) => cat.descripcion.toLowerCase() === descripcionCategoria.toLowerCase(),
  )
  return categoria ? categoria.idCategoria : null
}

// Función para crear nuevas categorías
async function crearCategoriasNuevas(categoriasUnicas) {
  const nuevasCategorias = []
  for (const descripcion of categoriasUnicas) {
    if (!obtenerIdCategoria(descripcion)) {
      try {
        await api.post('/api/categorias', {
          descripcion: descripcion,
          estado: 1,
        })
        nuevasCategorias.push(descripcion)
      } catch (error) {
        console.error(`Error creando categoría ${descripcion}:`, error)
        throw new Error(`No se pudo crear la categoría: ${descripcion}`)
      }
    }
  }

  if (nuevasCategorias.length > 0) {
    Notify.create({
      type: 'positive',
      message: `Se crearon ${nuevasCategorias.length} nuevas categorías`,
      position: 'top',
    })
  }

  // Recargar las categorías para obtener los nuevos IDs
  await cargarCategorias()
  return nuevasCategorias
}

function onFileChange(file) {
  if (!file) return
  cargandoPreview.value = true
  const minTime = new Promise((resolve) => setTimeout(resolve, 1000))
  const reader = new FileReader()
  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const allRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
    if (!allRows.length) {
      await minTime
      cargandoPreview.value = false
      return
    }
    const excelHeaders = allRows[0].map((h) => (typeof h === 'string' ? h.trim().toLowerCase() : h))
    const dataRows = allRows.slice(1)
    const filteredRows = dataRows.filter(
      (rowArr) =>
        Array.isArray(rowArr) &&
        rowArr.some((cell) => cell !== '' && cell !== undefined && cell !== null),
    )
    // Mapear columnas del excel a los campos esperados
    const headerMap = {
      correo: excelHeaders.findIndex((h) => h.includes('correo')),
      nombreyApellido: excelHeaders.findIndex((h) => h.includes('trabajador')),
      dni: excelHeaders.findIndex((h) => h.includes('doc')),
      categoria: excelHeaders.findIndex((h) => h.includes('categoria')),
    }
    // Vista previa para la tabla
    tabla.value = filteredRows.map((rowArr) => ({
      correo: rowArr[headerMap.correo] || '',
      nombreyApellido: rowArr[headerMap.nombreyApellido] || '',
      dni: rowArr[headerMap.dni] || '',
      categoria: rowArr[headerMap.categoria] || '',
    }))
    // Preparar datos para la API según el formato ProfesoresAdmisCreateDTO
    apiData.value = tabla.value.map((row) => {
      const idCategoria = obtenerIdCategoria(row.categoria)
      if (!idCategoria) {
        console.warn(`Categoría no encontrada: ${row.categoria}`)
      }
      return {
        idCategoria: idCategoria,
        dni: row.dni,
        nombreyApellido: row.nombreyApellido,
        correo: row.correo,
        estado: 1,
      }
    })
    await minTime
    cargandoPreview.value = false
  }
  reader.readAsArrayBuffer(file)
}

async function importarExcel() {
  if (!tabla.value.length) return

  cargandoImport.value = true
  const minTime = new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Obtener categorías únicas del Excel y filtrar las que no existen
    const categoriasUnicas = [...new Set(tabla.value.map((row) => row.categoria))]
    const categoriasNoExistentes = categoriasUnicas.filter((cat) => !obtenerIdCategoria(cat))

    if (categoriasNoExistentes.length > 0) {
      // Mostrar las categorías que se van a crear
      Notify.create({
        type: 'info',
        message: `Se crearán las siguientes categorías: ${categoriasNoExistentes.join(', ')}`,
        position: 'top',
        timeout: 3000,
      })

      // Crear las categorías nuevas
      await crearCategoriasNuevas(categoriasUnicas)
    }

    // Preparar los datos de docentes con los IDs de categoría actualizados
    const docentesData = tabla.value.map((row) => {
      const idCategoria = obtenerIdCategoria(row.categoria)
      if (!idCategoria) {
        throw new Error(`No se pudo obtener el ID para la categoría: ${row.categoria}`)
      }
      return {
        idCategoria: idCategoria,
        dni: row.dni,
        nombreyApellido: row.nombreyApellido,
        correo: row.correo,
        estado: 1,
      }
    })

    // Importar docentes
    const response = await api.post('/api/profesoresadmis', docentesData)
    await minTime

    if (response.status === 200) {
      Notify.create({
        type: 'positive',
        message: 'Importación completada exitosamente',
        position: 'top',
      })
      archivo.value = null
      tabla.value = []
      emit('importacionCompleta')
    }
  } catch (error) {
    console.error('Error en el proceso de importación:', error)
    let errorMessage = 'Error en la importación'
    if (error.message && error.message.includes('categoría')) {
      errorMessage = error.message
    } else if (error.response) {
      if (error.response.status === 405) {
        errorMessage = 'El método de importación no está permitido'
      } else if (error.response.status === 400) {
        errorMessage = 'Datos inválidos en el archivo'
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
    }
    Notify.create({
      type: 'negative',
      message: errorMessage,
      position: 'top',
    })
  } finally {
    cargandoImport.value = false
  }
}

function cancelarImportacion() {
  archivo.value = null
  tabla.value = []
}
</script>

<style scoped>
.importar-revistas-bg-flotante {
  background: rgba(0, 0, 0, 0.18);
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', Arial, 'Open Sans', sans-serif;
}
.importar-revistas-flotante {
  background: #fff;
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.18),
    0 1.5px 8px rgba(228, 177, 171, 0.1);
  padding: 2.5rem 2.8rem 2.5rem 2.8rem;
  max-width: 1500px;
  width: 99vw;
  margin: 2.2rem auto 2.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
.cerrar-x {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
}
.importar-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.importar-titulo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #b71c1c;
}
.importar-instruccion {
  margin-bottom: 1.2rem;
  color: #444;
  font-size: 1.1rem;
}
.importar-form-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  justify-content: center;
}
.tabla-container {
  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.tabla-scroll-docentes-forzada {
  overflow-x: auto !important;
  overflow-y: auto !important;
  max-height: 260px !important;
  min-width: 0;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.acciones-previa {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.importar-docentes-zoom {
  font-size: 0.92rem;
  max-width: 1200px;
  width: 98vw;
}
.acciones-docentes-fijas {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background: #fff;
  z-index: 2;
}
.spinner-inline-importar {
  margin-left: 0.5rem;
}
.preview-loading-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  min-height: 60px;
  font-size: 1.1em;
  color: #1976d2;
  font-weight: 500;
}
.preview-cargando-text {
  margin-left: 0.2rem;
}
</style>
