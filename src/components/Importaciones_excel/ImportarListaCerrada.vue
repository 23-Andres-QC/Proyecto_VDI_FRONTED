<template>
  <div class="importar-revistas-bg">
    <div class="importar-revistas-panel card-style">
      <div class="importar-header">
        <h2>Importar lista cerrada</h2>
      </div>
      <div class="importar-instruccion">Selecciona un archivo .xlsx para importar lista cerrada</div>
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
          <h3>Visualización de lista cerrada</h3>
        </div>
        <div class="tabla-scroll zebra-table tabla-scroll-center">
          <div style="min-width: 1100px;">
            <q-table
              :rows="tabla"
              :columns="columnas"
              row-key="ISSN"
              dense
              flat
              :rows-per-page="20"
              class="tabla-excel zebra-table"
              style="min-width: 1100px; width: 1100px; display: block;"
              v-model:pagination="pagination"
              :separator="'cell'"
              :wrap-cells="true"
              :virtual-scroll="false"
              :table-style="{ minWidth: '1100px', width: '1100px', display: 'block' }"
              :table-colstyle="
                (col) =>
                  col.name === 'ISSN'
                    ? 'position: sticky; left: 0; background: #bde3f7; z-index: 3;'
                    : ''
              "
            />
          </div>
        </div>
        <div class="acciones-previa">
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
const pagination = ref({ rowsPerPage: 20 })

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
  const reader = new FileReader()
  reader.onload = (e) => {
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
      'Categoria2': ['Categoria2', 'Categoría 2', 'Categoria 2', 'Categoría2'],
      'IncentivoUSD': ['IncentivoUSD', 'Incentivo (USD)', 'Incentivo USD', 'Incentivo'],
      'WoS_Q': ['WoS_Q', 'WoS (Q)', 'WoS Q', 'WOS Q', 'WOS_Q'],
      'ESCI_Q': ['ESCI_Q', 'ESCI Q', 'ESCIQ'],
      'WoS_LATAM': ['WoS_LATAM', 'WoS LATAM', 'WOS LATAM', 'WOS_LATAM'],
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
          if (headerMapEquivalentes[apiField].some(eq => eq.toLowerCase() === key.toLowerCase())) {
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
        const idx = headerMap[col.name] !== undefined ? headerMap[col.name] : headerMap[col.label] !== undefined ? headerMap[col.label] : undefined
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
        const idx = headerMap[apiField] !== undefined ? headerMap[apiField] : headerMap[columnasAdaptadas.find(c => c.name === apiField)?.label] !== undefined ? headerMap[columnasAdaptadas.find(c => c.name === apiField)?.label] : undefined
        let val = idx !== undefined ? rowArr[idx] : ''
        if (val === '' || val === undefined) val = null
        if (apiField === 'Puntaje' && val !== null) {
          val = isNaN(Number(val)) ? null : Number(val)
        }
        if (apiField === 'IncentivoUSD' && val !== null) {
          val = isNaN(Number(val)) ? null : Number(val)
        }
        obj[apiField] = val
      })
      return obj
    })
  }
  reader.readAsArrayBuffer(file)
}

async function importarExcel() {
  if (!tabla.value.length) return
  try {
    await api.post(
      '/api/Revista?idUsuario=3&tipoRevista=LCD',
      apiData.value.length ? apiData.value : tabla.value,
    )
    Notify.create({ type: 'positive', message: 'Importación completada' })
  } catch (e) {
    console.error('Error importando lista cerrada:', e)
    Notify.create({ type: 'negative', message: 'Error en la importación' })
  }
}

function cancelarImportacion() {
  archivo.value = null
  tabla.value = []
}
</script>

<style scoped>
.importar-revistas-bg {
  /* Fondo degradado más suave */
  background: linear-gradient(135deg, #fbecec 0%, #e4b1ab 100%);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', Arial, 'Open Sans', sans-serif;
}
.card-style {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 1.5px 8px rgba(228, 177, 171, 0.10);
  padding: 2.5rem 2.8rem 2.5rem 2.8rem;
  max-width: 1500px;
  width: 99vw;
  margin: 2.2rem auto 2.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.importar-header,
.visualizacion-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.importar-header h2,
.visualizacion-header h3 {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.importar-instruccion {
  color: #222;
  font-size: 1.15rem;
  margin-bottom: 2.2rem;
  text-align: center;
  width: 100%;
  font-weight: 500;
}
.importar-form-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2.5rem;
  gap: 1.7rem;
}
.importar-file {
  background: #fff;
  border-radius: 14px;
  font-size: 1.1rem;
  min-width: 320px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  margin-top: 0.5rem;
}
.importar-btn-main,
.importar-btn {
  background: #111;
  color: #fff;
  font-size: 1.15rem;
  font-weight: bold;
  padding: 0.9rem 2.5rem;
  border-radius: 14px;
  min-width: 170px;
  transition: background 0.2s, box-shadow 0.2s, filter 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}
.importar-btn-main:hover,
.importar-btn:hover {
  background: #333;
  filter: brightness(0.92);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}
.visualizacion-header h3 {
  background: #e53935;
  color: #fff;
  padding: 0.9rem 0.5rem 0.9rem 0.5rem;
  text-align: center;
  border-radius: 10px 10px 0 0;
  margin-bottom: 1.1rem;
  font-size: 1.45rem;
  font-weight: bold;
  width: 100%;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-bottom: 3px solid #f5f5f5;
}
.tabla-container {
  background: transparent;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 2.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tabla-scroll {
  min-width: 1200px;
  max-width: 1400px;
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  overflow-y: auto;
  max-height: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.tabla-scroll-center {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  max-width: 100%;
  display: flex;
  justify-content: center;
}
.tabla-excel {
  background: #e3f6ff;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 500;
  min-width: 1200px;
  color: #222;
  font-family: 'Roboto', Arial, 'Open Sans', sans-serif;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.tabla-excel thead tr {
  background: #1565c0;
  color: #fff;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 2;
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-bottom: 5px solid #e53935;
}
.tabla-excel th {
  background: #1565c0 !important;
  color: #fff !important;
  font-weight: 900 !important;
  font-size: 1.25rem !important;
  padding: 1.1rem 1.6rem !important;
  text-shadow: 0 2px 6px rgba(0,0,0,0.10);
  border-bottom: 5px solid #e53935;
  box-shadow: 0 2px 8px rgba(13,71,161,0.10);
  letter-spacing: 1.5px;
}
.tabla-excel td {
  padding: 1.1rem 1.6rem;
  text-align: center !important;
  min-width: 120px !important;
}
.tabla-excel tbody tr:nth-child(even) {
  background: #e3f0fa;
}
.tabla-excel tbody tr:nth-child(odd) {
  background: #e3f6ff;
}
.acciones-previa {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-top: 3.5rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  background: transparent;
  position: relative;
  z-index: 1;
}
.acciones-btn {
  min-width: 170px;
  max-width: 220px;
  width: 100%;
  font-size: 1.15rem;
  font-weight: bold;
  border-radius: 14px;
  padding: 1rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
}
.cancelar-btn {
  background: #b71c1c;
  color: #fff;
  border-radius: 14px;
  transition: background 0.2s, box-shadow 0.2s, filter 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
}
.cancelar-btn:hover {
  background: #f44336;
  filter: brightness(0.92);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}
.tabla-excel th:nth-child(1), .tabla-excel td:nth-child(1) { min-width: 90px !important; }
.tabla-excel th:nth-child(2), .tabla-excel td:nth-child(2) { min-width: 90px !important; }
.tabla-excel th:nth-child(3), .tabla-excel td:nth-child(3) { min-width: 90px !important; }
.tabla-excel th:nth-child(4), .tabla-excel td:nth-child(4) { min-width: 220px !important; }
.tabla-excel th:nth-child(5), .tabla-excel td:nth-child(5) { min-width: 140px !important; }
.tabla-excel th:nth-child(6), .tabla-excel td:nth-child(6) { min-width: 90px !important; }
.tabla-excel th:nth-child(7), .tabla-excel td:nth-child(7) { min-width: 120px !important; }
.tabla-excel th:nth-child(8), .tabla-excel td:nth-child(8) { min-width: 90px !important; }
.tabla-excel th:nth-child(9), .tabla-excel td:nth-child(9) { min-width: 90px !important; }
.tabla-excel th:nth-child(10), .tabla-excel td:nth-child(10) { min-width: 90px !important; }
.tabla-excel th:nth-child(11), .tabla-excel td:nth-child(11) { min-width: 90px !important; }
.tabla-excel th:nth-child(12), .tabla-excel td:nth-child(12) { min-width: 90px !important; }
.tabla-excel th:nth-child(13), .tabla-excel td:nth-child(13) { min-width: 90px !important; }
.tabla-excel th:nth-child(14), .tabla-excel td:nth-child(14) { min-width: 110px !important; }
@media (max-width: 900px) {
  .acciones-previa {
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 2.2rem;
    width: 100%;
  }
}
</style>
