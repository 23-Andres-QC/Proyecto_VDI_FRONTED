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
          :disable="!archivo"
        />
      </div>
      <div v-if="tabla && tabla.length > 0" class="tabla-container">
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
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

const archivo = ref(null)
const tabla = ref([])
const apiData = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})

const columnas = [
  { name: 'correo', label: 'Correo', field: 'correo', align: 'left' },
  { name: 'nombreyApellido', label: 'Trabajador', field: 'nombreyApellido', align: 'left' },
  { name: 'dni', label: 'N° Doc', field: 'dni', align: 'left' },
  { name: 'categoria', label: 'Categoría', field: 'categoria', align: 'left' },
]

function onFileChange(file) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const allRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
    if (!allRows.length) return
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
    // Preparar datos para la API (simulación, la lógica real de categoría debe estar en backend)
    apiData.value = tabla.value.map((row) => ({
      idCategoria: null, // El backend debe resolver esto
      dni: row.dni,
      nombreyApellido: row.nombreyApellido,
      correo: row.correo,
      estado: 1,
      categoria: row.categoria, // Se envía para que el backend la resuelva
    }))
  }
  reader.readAsArrayBuffer(file)
}

async function importarExcel() {
  if (!tabla.value.length) return
  try {
    await api.post('/api/ProfesoresAdmis/importar', apiData.value)
    Notify.create({ type: 'positive', message: 'Importación completada' })
  } catch (e) {
    console.error('Error importando docentes:', e)
    Notify.create({ type: 'negative', message: 'Error en la importación' })
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
</style>
