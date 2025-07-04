<template>
  <div class="importar-revistas-bg-flotante">
    <div
      class="importar-revistas-panel card-style importar-revistas-flotante"
      :class="{ expanded: tabla && tabla.length > 0 }"
    >
      <div class="importar-header">
        <span class="importar-titulo">Importar lista cerrada</span>
        <q-btn
          flat
          round
          dense
          icon="close"
          class="cerrar-x"
          @click="$emit('cancelar')"
          :disable="loadingExcel || loadingImport"
        />
      </div>
      <div class="importar-instruccion">
        Selecciona un archivo .xlsx para importar lista cerrada
      </div>
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
          :disable="loadingExcel || loadingImport"
        />
        <q-btn
          class="importar-btn importar-btn-main acciones-btn"
          label="IMPORTAR"
          icon="cloud_upload"
          @click="importarExcel"
          :loading="loadingImport"
          :disable="!archivo || loadingExcel || loadingImport"
        >
          <template v-slot:loading>
            <q-spinner-dots color="white" />
          </template>
        </q-btn>
      </div>
      <div v-if="loadingExcel" class="text-center q-pa-md">
        <q-spinner-dots color="primary" size="40" />
        <div class="text-body1 q-mt-md">Procesando archivo Excel...</div>
      </div>
      <div
        v-if="tabla && tabla.length > 0"
        class="tabla-container"
        :class="{ visible: tabla && tabla.length > 0 }"
      >
        <div class="visualizacion-header">
          <h3>Visualización de lista cerrada</h3>
        </div>
        <div class="tabla-scroll zebra-table">
          <q-table
            :rows="tabla"
            :columns="columnas"
            row-key="ISSN"
            dense
            flat
            :pagination="pagination"
            :rows-per-page-options="[5, 10, 20, 50, 100, 200, 500, 1000]"
            class="tabla-excel zebra-table"
            style="min-width: 1100px"
            v-model:pagination="pagination"
            :separator="'cell'"
            :wrap-cells="true"
            :virtual-scroll="true"
            :virtual-scroll-sticky-size-start="48"
            :table-style="{ minWidth: '1100px' }"
            :table-colstyle="
              (col) =>
                col.name === 'ISSN'
                  ? 'position: sticky; left: 0; background: #bde3f7; z-index: 3;'
                  : ''
            "
          />
        </div>
        <div class="acciones-previa">
          <q-btn
            color="negative"
            label="CANCELAR"
            icon="close"
            @click="cancelarImportacion"
            class="cancelar-btn acciones-btn"
            :disable="loadingImport"
          />
          <q-btn
            class="importar-btn importar-btn-main acciones-btn"
            label="IMPORTAR"
            color="primary"
            icon="check_circle"
            @click="importarExcel"
            :loading="loadingImport"
            :disable="!tabla || !tabla.length || loadingImport"
          >
            <template v-slot:loading>
              <q-spinner-dots color="white" />
            </template>
          </q-btn>
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
const loadingExcel = ref(false)
const loadingImport = ref(false)
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})

const columnas = [
  { name: 'ISSN', label: 'ISSN', field: 'ISSN', align: 'left' },
  { name: 'ISSN2', label: 'ISSN2', field: 'ISSN2', align: 'left' },
  { name: 'ISSN3', label: 'ISSN3', field: 'ISSN3', align: 'left' },
  { name: 'Nombre', label: 'Nombre', field: 'Nombre', align: 'left' },
  { name: 'Categoria2', label: 'Categoría', field: 'Categoria2', align: 'left' },
  { name: 'Puntaje', label: 'Puntaje', field: 'Puntaje', align: 'left' },
  { name: 'IncentivoUSD', label: 'Incentivo USD', field: 'IncentivoUSD', align: 'left' },
  { name: 'SCOPUS', label: 'SCOPUS', field: 'SCOPUS', align: 'left' },
  { name: 'WoS_Q', label: 'WoS Q', field: 'WoS_Q', align: 'left' },
  { name: 'ESCI_Q', label: 'ESCI Q', field: 'ESCI_Q', align: 'left' },
  { name: 'AJG', label: 'AJG', field: 'AJG', align: 'left' },
  { name: 'CNRS', label: 'CNRS', field: 'CNRS', align: 'left' },
  { name: 'ABDC', label: 'ABDC', field: 'ABDC', align: 'left' },
  { name: 'WoS_LATAM', label: 'WoS LATAM', field: 'WoS_LATAM', align: 'left' },
]

function onFileChange(file) {
  if (!file) return
  loadingExcel.value = true
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const allRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
      if (!allRows.length) return
      const excelHeaders = allRows[0].map((h) => (typeof h === 'string' ? h.trim() : h))
      const dataRows = allRows.slice(1)
      const filteredRows = dataRows.filter(
        (rowArr) =>
          Array.isArray(rowArr) &&
          rowArr.some((cell) => cell !== '' && cell !== undefined && cell !== null),
      )
      // Mapeo forzado de encabezados equivalentes
      const headerMapEquivalentes = {
        Categoria2: ['Categoria2', 'Categoría 2', 'Categoria 2', 'Categoría2'],
        IncentivoUSD: ['IncentivoUSD', 'Incentivo (USD)', 'Incentivo USD', 'Incentivo'],
        WoS_Q: ['WoS_Q', 'WoS (Q)', 'WoS Q', 'WOS Q', 'WOS_Q'],
        ESCI_Q: ['ESCI_Q', 'ESCI Q', 'ESCIQ'],
        WoS_LATAM: ['WoS_LATAM', 'WoS LATAM', 'WOS LATAM', 'WOS_LATAM'],
        // ...otros campos si es necesario...
      }
      // Generar un headerMap flexible
      const headerMap = {}
      excelHeaders.forEach((h, idx) => {
        if (typeof h === 'string') {
          let key = h.trim()
          // Buscar equivalencia
          let found = false
          for (const apiField in headerMapEquivalentes) {
            if (
              headerMapEquivalentes[apiField].some((eq) => eq.toLowerCase() === key.toLowerCase())
            ) {
              headerMap[apiField] = idx
              found = true
              break
            }
          }
          if (!found) headerMap[key] = idx
        }
      })
      // Columnas adaptadas para la tabla visual
      const columnasAdaptadas = [
        { name: 'ISSN', label: 'ISSN', field: 'ISSN', align: 'left' },
        { name: 'ISSN2', label: 'ISSN2', field: 'ISSN2', align: 'left' },
        { name: 'ISSN3', label: 'ISSN3', field: 'ISSN3', align: 'left' },
        { name: 'Nombre', label: 'Nombre', field: 'Nombre', align: 'left' },
        { name: 'Categoria2', label: 'Categoría 2', field: 'Categoria2', align: 'left' },
        { name: 'Puntaje', label: 'Puntaje', field: 'Puntaje', align: 'left' },
        { name: 'IncentivoUSD', label: 'Incentivo (USD)', field: 'IncentivoUSD', align: 'left' },
        { name: 'SCOPUS', label: 'SCOPUS', field: 'SCOPUS', align: 'left' },
        { name: 'WoS_Q', label: 'WoS (Q)', field: 'WoS_Q', align: 'left' },
        { name: 'ESCI_Q', label: 'ESCI Q', field: 'ESCI_Q', align: 'left' },
        { name: 'AJG', label: 'AJG', field: 'AJG', align: 'left' },
        { name: 'CNRS', label: 'CNRS', field: 'CNRS', align: 'left' },
        { name: 'ABDC', label: 'ABDC', field: 'ABDC', align: 'left' },
        { name: 'WoS_LATAM', label: 'WoS LATAM', field: 'WoS_LATAM', align: 'left' },
      ]
      columnas.value = columnasAdaptadas
      tabla.value = filteredRows.map((rowArr) => {
        const obj = {}
        columnasAdaptadas.forEach((col) => {
          const idx =
            headerMap[col.name] !== undefined
              ? headerMap[col.name]
              : headerMap[col.label] !== undefined
                ? headerMap[col.label]
                : undefined
          obj[col.name] = idx !== undefined ? rowArr[idx] : ''
        })
        return obj
      })
      // Mapeo para la API
      const apiFields = [
        'ISSN',
        'ISSN2',
        'ISSN3',
        'Nombre',
        'Categoria2',
        'Puntaje',
        'IncentivoUSD',
        'SCOPUS',
        'WoS_Q',
        'ESCI_Q',
        'AJG',
        'CNRS',
        'ABDC',
        'WoS_LATAM',
      ]
      apiData.value = filteredRows.map((rowArr) => {
        const obj = {}
        apiFields.forEach((apiField) => {
          const idx =
            headerMap[apiField] !== undefined
              ? headerMap[apiField]
              : headerMap[columnasAdaptadas.find((c) => c.name === apiField)?.label] !== undefined
                ? headerMap[columnasAdaptadas.find((c) => c.name === apiField)?.label]
                : undefined
          let val = idx !== undefined ? rowArr[idx] : ''
          // --- Conversión automática según tipo de campo en la base de datos ---
          const stringFields = [
            'ISSN',
            'ISSN2',
            'ISSN3',
            'Nombre',
            'Categoria2',
            'SCOPUS',
            'WoS_Q',
            'ESCI_Q',
            'AJG',
            'CNRS',
            'ABDC',
            'WoS_LATAM',
          ]
          const floatFields = ['Puntaje']
          const intFields = ['IncentivoUSD']
          if (val === '' || val === undefined) val = null
          if (stringFields.includes(apiField) && val !== null) {
            val = String(val)
          }
          if (floatFields.includes(apiField) && val !== null) {
            val = isNaN(Number(val)) ? null : Number(val)
          }
          if (intFields.includes(apiField) && val !== null) {
            val = isNaN(Number(val)) ? null : Number(val)
          }
          obj[apiField] = val
        })
        return obj
      })
    } catch (error) {
      console.error('Error al procesar el archivo:', error)
      Notify.create({
        type: 'negative',
        message: 'Error al procesar el archivo Excel',
      })
      tabla.value = []
      apiData.value = []
    } finally {
      loadingExcel.value = false
    }
  }
  reader.onerror = () => {
    Notify.create({
      type: 'negative',
      message: 'Error al leer el archivo',
    })
    loadingExcel.value = false
  }
  reader.readAsArrayBuffer(file)
}

async function importarExcel() {
  if (!tabla.value.length) return
  loadingImport.value = true
  try {
    await api.post(
      `/api/Revista?idUsuario=${localStorage.getItem('idUsuario')}&tipoRevista=LCD`,
      apiData.value.length ? apiData.value : tabla.value,
    )
    Notify.create({ type: 'positive', message: 'Importación completada' })
    cancelarImportacion()
  } catch (e) {
    console.error('Error importando lista cerrada:', e)
    Notify.create({ type: 'negative', message: 'Error en la importación' })
  } finally {
    loadingImport.value = false
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
  padding: 1.5rem 2rem;
  max-width: 1500px;
  width: 95vw;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 200px;
  transition: all 0.3s ease;
}

.importar-revistas-flotante.expanded {
  height: 90vh;
}

.importar-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.importar-titulo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #b71c1c;
}

.importar-instruccion {
  margin-bottom: 1.5rem;
  color: #444;
  font-size: 1.1rem;
}

.importar-form-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.importar-file {
  max-width: 400px;
}

.tabla-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.tabla-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.visualizacion-header {
  padding: 0.5rem 0;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 2;
}

.visualizacion-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #444;
}

.tabla-scroll {
  flex: 1;
  overflow: auto;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0.5rem 0;
  max-height: calc(90vh - 250px);
}

.acciones-previa {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 0;
  margin-top: 0.5rem;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.acciones-btn {
  min-width: 120px;
}

.cerrar-x {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

/* Ajustes para la tabla */
:deep(.q-table__container) {
  height: 100%;
}

:deep(.q-table__middle) {
  max-height: none !important;
}

:deep(.q-table thead) {
  background: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 1;
}

:deep(.q-table tbody td) {
  height: 32px;
  padding: 4px 8px;
}
</style>
