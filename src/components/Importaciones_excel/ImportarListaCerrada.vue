<template>
  <div class="importar-revistas-bg-flotante">
    <div class="importar-revistas-panel card-style importar-revistas-flotante">
      <div class="importar-header">
        <span class="importar-titulo">Importar lista cerrada</span>
        <q-btn flat round dense icon="close" class="cerrar-x" @click="$emit('cancelar')" />
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
        if (val === '' || val === undefined) val = null

        // Validación específica para AJG y CNRS
        if (['AJG', 'CNRS'].includes(apiField) && val !== null) {
          val = isNaN(Number(val)) ? val : String(val)
        }

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
      '/api/Revista?idUsuario=5&tipoRevista=LCD',
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
.tabla-scroll {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
}
.acciones-previa {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
