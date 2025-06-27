<template>
  <div class="importar-revistas-bg-flotante">
    <div class="importar-revistas-panel card-style importar-revistas-flotante">
      <div class="importar-header">
        <span class="importar-titulo">Importar revistas</span>
        <q-btn flat round dense icon="close" class="cerrar-x" @click="$emit('cancelar')" />
      </div>
      <div class="importar-instruccion">Selecciona un archivo .xlsx para importar revistas</div>
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
          <h3>Visualización de revistas</h3>
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
            style="min-width: 900px"
            v-model:pagination="pagination"
            :separator="'cell'"
            :wrap-cells="true"
            :virtual-scroll="true"
            :virtual-scroll-sticky-size-start="48"
            :table-style="{ minWidth: '900px' }"
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

const archivo = ref(null)
const tabla = ref([])
const apiData = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})
const mostrarTabla = ref(false)

// Ajusta los nombres de columnas para mayor legibilidad
const columnas = [
  { name: 'ISSN', label: 'ISSN', field: 'ISSN', align: 'left' },
  { name: 'Nombre', label: 'Nombre', field: 'Nombre', align: 'left' },
  { name: 'Country', label: 'País', field: 'Country', align: 'left' },
  { name: 'Multiple', label: '¿Múltiple?', field: 'Multiple', align: 'left' },
  { name: 'CoautoriaEsan', label: 'Coautor ESAN', field: 'CoautoriaEsan', align: 'left' },
  { name: 'PosicionAutor', label: 'Posición autor', field: 'PosicionAutor', align: 'left' },
  { name: 'Jif', label: 'JIF', field: 'Jif', align: 'left' },
  { name: 'Scopus', label: 'Scopus', field: 'Scopus', align: 'left' },
  { name: 'WoSQ', label: 'WoS (Q)', field: 'WoSQ', align: 'left' },
  { name: 'WoSS', label: 'WoS (S)', field: 'WoSS', align: 'left' },
  { name: 'WoSEsci', label: 'WoS ESCI', field: 'WoSEsci', align: 'left' },
  { name: 'EsciQ', label: 'ESCI Q', field: 'EsciQ', align: 'left' },
  { name: 'Ajg4star', label: 'AJG 4*', field: 'Ajg4star', align: 'left' },
  { name: 'Ajg', label: 'AJG', field: 'Ajg', align: 'left' },
  { name: 'AjgS', label: 'AJG (S)', field: 'AjgS', align: 'left' },
  { name: 'Cnrs', label: 'CNRS', field: 'Cnrs', align: 'left' },
  { name: 'CnrsS', label: 'CNRS (S)', field: 'CnrsS', align: 'left' },
  { name: 'Abdc', label: 'ABDC', field: 'Abdc', align: 'left' },
  { name: 'AbdcS', label: 'ABDC (S)', field: 'AbdcS', align: 'left' },
  { name: 'AlMenosUnaLista', label: 'Al menos una lista', field: 'AlMenosUnaLista', align: 'left' },
  { name: 'SoloUnaLista', label: 'Solo una lista', field: 'SoloUnaLista', align: 'left' },
  { name: 'Scielo', label: 'Scielo', field: 'Scielo', align: 'left' },
  { name: 'WoSLatam', label: 'WoS Latam', field: 'WoSLatam', align: 'left' },
  { name: 'Top50', label: 'Top 50', field: 'Top50', align: 'left' },
  { name: 'N', label: 'N', field: 'N', align: 'left' },
  { name: 'BeallsList', label: 'Beall’s List', field: 'BeallsList', align: 'left' },
  { name: 'Mdpi', label: 'MDPI', field: 'Mdpi', align: 'left' },
  { name: 'Insights', label: 'Insights', field: 'Insights', align: 'left' },
  { name: 'AjgExiste', label: 'AJG existe', field: 'AjgExiste', align: 'left' },
  { name: 'CnrsExiste', label: 'CNRS existe', field: 'CnrsExiste', align: 'left' },
  { name: 'AbdcExiste', label: 'ABDC existe', field: 'AbdcExiste', align: 'left' },
  { name: 'WoSTopExiste', label: 'WoS Top existe', field: 'WoSTopExiste', align: 'left' },
  { name: 'WoSEsciExiste', label: 'WoS ESCI existe', field: 'WoSEsciExiste', align: 'left' },
  { name: 'ScopusExiste', label: 'Scopus existe', field: 'ScopusExiste', align: 'left' },
  {
    name: 'SoloScieloExiste',
    label: 'Solo Scielo existe',
    field: 'SoloScieloExiste',
    align: 'left',
  },
  { name: 'Especial216b', label: 'Especial 2.1.6b', field: 'Especial216b', align: 'left' },
  {
    name: 'LatamSinEsciExiste',
    label: 'Latam sin ESCI existe',
    field: 'LatamSinEsciExiste',
    align: 'left',
  },
  {
    name: 'EsciScieloSinScopus',
    label: 'ESCI/Scielo sin Scopus',
    field: 'EsciScieloSinScopus',
    align: 'left',
  },
  {
    name: 'MultidisciplinaryWos',
    label: 'Multidisciplinar WoS',
    field: 'MultidisciplinaryWos',
    align: 'left',
  },
  {
    name: 'MultyAlMenosUnaLista',
    label: 'Multi y al menos una lista',
    field: 'MultyAlMenosUnaLista',
    align: 'left',
  },
  {
    name: 'MultidisciplinaryScopus',
    label: 'Multidisciplinar Scopus',
    field: 'MultidisciplinaryScopus',
    align: 'left',
  },
  {
    name: 'MultidisciplinaryWosOScopys',
    label: 'Multidisciplinar WoS/Scopus',
    field: 'MultidisciplinaryWosOScopys',
    align: 'left',
  },
]

function onFileChange(file) {
  if (!file) return
  // --- Declarar headerAdapt antes de cualquier uso ---
  const headerAdapt = {
    scopus: 'Scopus',
    'wos(q)': 'WoSQ',
    'wos(s)': 'WoSS',
    'wos esci': 'WoSEsci',
    'esci q': 'EsciQ',
    'ajg=4*': 'Ajg4star',
    ajg: 'Ajg',
    'ajg(s)': 'AjgS',
    cnrs: 'Cnrs',
    'cnrs(s)': 'CnrsS',
    abdc: 'Abdc',
    'abdc(s)': 'AbdcS',
    'al menos en una lista': 'AlMenosUnaLista',
    'solo en una lista': 'SoloUnaLista',
    scielo: 'Scielo',
    'wos latam': 'WoSLatam',
    top50: 'Top50',
    n: 'N',
    "beall's list": 'BeallsList',
    mdpi: 'Mdpi',
    insights: 'Insights',
    'ajg existe': 'AjgExiste',
    'cnrs existe': 'CnrsExiste',
    'abdc existe': 'AbdcExiste',
    'wos top existe': 'WoSTopExiste',
    'wos esci existe': 'WoSEsciExiste',
    'scopus existe': 'ScopusExiste',
    'solo scielo existe': 'SoloScieloExiste',
    '2.1.6b especial': 'Especial216b',
    'latam sin esci existe': 'LatamSinEsciExiste',
    'esci/scielo sin scupus': 'EsciScieloSinScopus',
    múltiple: 'Multiple',
    'multidisciplinary wos': 'MultidisciplinaryWos',
    'coautoria esan': 'CoautoriaEsan',
    'posición del autor': 'PosicionAutor',
    jif: 'Jif',
    country: 'Country',
    'multy y al menos una lista': 'MultyAlMenosUnaLista',
    'multidisciplinary scopus': 'MultidisciplinaryScopus',
    'multidisciplinary wos o scopys': 'MultidisciplinaryWosOScopys',
    issn: 'ISSN',
    nombre: 'Nombre',
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    // Obtener los datos como matriz (incluyendo encabezados y filas)
    const allRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
    if (!allRows.length) return
    const excelHeaders = allRows[0].map((h) => (typeof h === 'string' ? h.trim() : h))
    const dataRows = allRows.slice(1)
    // Filtrar filas vacías antes de procesar
    const filteredRows = dataRows.filter(
      (rowArr) =>
        Array.isArray(rowArr) &&
        rowArr.some((cell) => cell !== '' && cell !== undefined && cell !== null),
    )
    // Adaptar los encabezados del Excel a los nombres de la API para la tabla previa
    // --- ARREGLO: Normalizar los nombres de columnas para WoS (Q) y WoS (S) ---
    const columnasAdaptadas = excelHeaders.map((col) => {
      let key = col.trim().toLowerCase()
      // Normalización especial para WoS (Q) y WoS (S)
      if (key === 'wos (q)' || key === 'wos(q)') key = 'wos(q)'
      if (key === 'wos (s)' || key === 'wos(s)') key = 'wos(s)'
      const adaptKey = headerAdapt[key] || col.trim()
      return {
        name: adaptKey,
        label: adaptKey,
        field: adaptKey,
        align: 'left',
      }
    })
    columnas.value = columnasAdaptadas
    // --- Vista previa: mostrar los datos originales del Excel con los encabezados adaptados ---
    // Este bloque genera la tabla de previa visualización que ves en pantalla
    tabla.value = filteredRows.map((rowArr) => {
      const obj = {}
      columnasAdaptadas.forEach((col, idx) => {
        obj[col.name] = rowArr[idx] !== undefined ? rowArr[idx] : ''
      })
      return obj
    })
    // --- Fin de la generación de la previa visualización ---
    mostrarTabla.value = true // Mostrar la tabla automáticamente al cargar archivo
    // --- Nuevo: Mapeo por nombre flexible y adaptación de encabezados personalizados ---
    // Lista de campos esperados por la API en orden (según tu JSON ejemplo)
    // --- Mapeo por nombre flexible y adaptación de encabezados personalizados para la API ---
    // Este bloque toma los datos de la tabla previa y los mapea a los campos esperados por la API
    // usando el headerMap generado a partir de los encabezados del Excel adaptados
    const apiFields = [
      'ISSN',
      'Nombre',
      'Scopus',
      'WoSQ',
      'WoSS',
      'WoSEsci',
      'EsciQ',
      'Ajg4star',
      'Ajg',
      'AjgS',
      'Cnrs',
      'CnrsS',
      'Abdc',
      'AbdcS',
      'AlMenosUnaLista',
      'SoloUnaLista',
      'Scielo',
      'WoSLatam',
      'Top50',
      'N',
      'BeallsList',
      'Mdpi',
      'Insights',
      'AjgExiste',
      'CnrsExiste',
      'AbdcExiste',
      'WoSTopExiste',
      'WoSEsciExiste',
      'ScopusExiste',
      'SoloScieloExiste',
      'Especial216b',
      'LatamSinEsciExiste',
      'EsciScieloSinScopus',
      'Multiple',
      'MultidisciplinaryWos',
      'CoautoriaEsan',
      'PosicionAutor',
      'Jif',
      'Country',
      'MultyAlMenosUnaLista',
      'MultidisciplinaryScopus',
      'MultidisciplinaryWosOScopys',
    ]
    // Crear un diccionario de encabezados del Excel para buscar por nombre flexible y adaptar
    const headerMap = {}
    excelHeaders.forEach((h, idx) => {
      if (typeof h === 'string') {
        let key = h.trim().toLowerCase().replace(/\s+/g, '')
        // Normalización especial para WoS (Q) y WoS (S)
        if (key === 'wos(q)' || key === 'wos(q)') key = 'wos(q)'
        if (key === 'wos(s)' || key === 'wos(s)') key = 'wos(s)'
        const adaptKey = headerAdapt[h.trim().toLowerCase()] || headerAdapt[key] || h.trim()
        headerMap[adaptKey.toLowerCase().replace(/\s+/g, '')] = idx
      }
    })
    apiData.value = filteredRows.map((rowArr) => {
      const obj = {}
      apiFields.forEach((apiField) => {
        const key = apiField.toLowerCase().replace(/\s+/g, '')
        const idx = headerMap[key]
        let val = idx !== undefined ? rowArr[idx] : ''
        // --- Conversión automática según tipo de campo en la base de datos ---
        const stringFields = [
          'WoSQ',
          'WoSEsci',
          'EsciQ',
          'Ajg4star',
          'Ajg',
          'Cnrs',
          'Abdc',
          'AlMenosUnaLista',
          'SoloUnaLista',
          'Scielo',
          'WoSLatam',
          'Top50',
          'BeallsList',
          'Mdpi',
          'Insights',
          'CoautoriaEsan',
          'PosicionAutor',
          'Country',
          'Nombre',
          'ISSN',
        ]
        const floatFields = ['Jif']
        const intFields = [
          'WoSS',
          'AjgS',
          'CnrsS',
          'AbdcS',
          'N',
          'AjgExiste',
          'CnrsExiste',
          'AbdcExiste',
          'WoSTopExiste',
          'WoSEsciExiste',
          'ScopusExiste',
          'SoloScieloExiste',
          'Especial216b',
          'LatamSinEsciExiste',
          'EsciScieloSinScopus',
          'MultyAlMenosUnaLista',
          'MultidisciplinaryWos',
          'MultidisciplinaryScopus',
          'MultidisciplinaryWosOScopys',
          'Multiple',
        ]
        // Convertir todos los campos vacíos a null
        if (val === '' || val === undefined) val = null
        // Si es campo string, forzar a string si no es null
        if (stringFields.includes(apiField) && val !== null) {
          val = String(val)
        }
        // Si es campo float, forzar a number (o null)
        if (floatFields.includes(apiField) && val !== null) {
          val = isNaN(Number(val)) ? null : Number(val)
        }
        // Si es campo int, forzar a number si es posible, si no null
        if (intFields.includes(apiField) && val !== null) {
          val = isNaN(Number(val)) ? null : Number(val)
        }
        obj[apiField] = val
      })
      return obj
    })
    // --- Fin del mapeo para importación a la API ---
    // DEBUG: Mostrar en consola lo que se está leyendo y mapeando
    console.log('allRows', allRows)
    console.log('excelHeaders', excelHeaders)
    console.log('filteredRows', filteredRows)
    console.log('apiData', apiData.value)
  }
  reader.readAsArrayBuffer(file)
}

async function importarExcel() {
  if (!tabla.value.length) return
  try {
    console.log('Datos enviados al backend:', apiData.value.length ? apiData.value : tabla.value)
    await api.post(
      '/api/Revista?idUsuario=6&tipoRevista=SCI',
      apiData.value.length ? apiData.value : tabla.value,
    )
    $q.notify({ type: 'positive', message: 'Importación completada' })
  } catch (e) {
    console.error('Error importando revistas:', e)
    $q.notify({ type: 'negative', message: 'Error en la importación' })
  }
}

function cancelarImportacion() {
  archivo.value = null
  tabla.value = []
  mostrarTabla.value = false
}
</script>

<style scoped>
.importar-revistas-bg {
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
}
.importar-revistas-bg-flotante {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.18);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2.5vh;
  overflow-y: auto;
}
.importar-revistas-flotante {
  max-width: 1800px;
  width: 98vw;
  min-width: 1200px;
  min-height: 180px;
  height: auto;
  margin: 0 auto 2.5vh auto;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  background: #fff;
  position: relative;
  padding: 1.1rem 1.5rem 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: visible;
  overflow-x: hidden;
}
.importar-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
}
.importar-titulo {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  background: #e53935;
  border-radius: 16px;
  padding: 1.2rem 2.5rem;
  width: auto;
  min-width: 320px;
  text-align: center;
  margin: 0 auto;
  display: block;
}
.cerrar-x {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  background: #e53935;
  z-index: 2;
  transition: background 0.2s;
}
.cerrar-x:hover {
  background: #b71c1c;
}
.visualizacion-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.visualizacion-header h3 {
  background: #e53935;
  color: #fff;
  padding: 0.9rem 0.5rem 0.5rem 0.5rem;
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
.importar-btn,
.cancelar-btn {
  font-size: 1.08rem;
  font-weight: bold;
  padding: 0.7rem 1.8rem;
  border-radius: 12px;
  min-width: 140px;
  min-height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}
.importar-btn-main,
.importar-btn {
  background: #1976d2;
  color: #fff;
}
.cancelar-btn {
  background: #c62828;
  color: #fff;
}
.importar-btn-main:hover,
.importar-btn:hover,
.cancelar-btn:hover {
  filter: brightness(0.93);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}
.tabla-container {
  background: transparent;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto 2.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}
.tabla-scroll {
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: auto;
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.tabla-excel {
  min-width: 2100px;
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
  background: #e53935 !important;
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
  background: #e53935 !important;
  color: #fff !important;
  font-weight: 900 !important;
  font-size: 1.15rem !important;
  padding: 1.1rem 1.6rem !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  letter-spacing: 1.5px;
  white-space: normal !important;
  word-break: break-word !important;
  min-width: 120px !important;
  max-width: 200px !important;
}
.tabla-excel td {
  padding: 1.1rem 1.6rem;
  text-align: center !important;
  min-width: 120px !important;
  max-width: 200px !important;
  background: #fff !important;
  border-bottom: 1.5px solid #e0e0e0;
  border-right: 1.5px solid #e0e0e0;
  white-space: normal !important;
  word-break: break-word !important;
}
.tabla-excel tbody tr:nth-child(even) {
  background: #f9f9f9 !important;
}
.tabla-excel tbody tr:nth-child(odd) {
  background: #fff !important;
}

/* Anchos personalizados para columnas principales (ajustar según columnas de revistas) */
.tabla-excel th:nth-child(1),
.tabla-excel td:nth-child(1) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(2),
.tabla-excel td:nth-child(2) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(3),
.tabla-excel td:nth-child(3) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(4),
.tabla-excel td:nth-child(4) {
  min-width: 220px !important;
}
.tabla-excel th:nth-child(5),
.tabla-excel td:nth-child(5) {
  min-width: 140px !important;
}
.tabla-excel th:nth-child(6),
.tabla-excel td:nth-child(6) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(7),
.tabla-excel td:nth-child(7) {
  min-width: 120px !important;
}
.tabla-excel th:nth-child(8),
.tabla-excel td:nth-child(8) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(9),
.tabla-excel td:nth-child(9) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(10),
.tabla-excel td:nth-child(10) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(11),
.tabla-excel td:nth-child(11) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(12),
.tabla-excel td:nth-child(12) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(13),
.tabla-excel td:nth-child(13) {
  min-width: 90px !important;
}
.tabla-excel th:nth-child(14),
.tabla-excel td:nth-child(14) {
  min-width: 110px !important;
}
.acciones-previa {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 10;
  padding-bottom: 1.2rem;
}
@media (max-width: 900px) {
  .acciones-previa {
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 2.2rem;
    width: 100%;
  }
}
@media (max-width: 1800px) {
  .importar-revistas-flotante {
    min-width: 900px;
    max-width: 100vw;
    padding: 1rem 0.5rem 2.5rem 0.5rem;
  }
  .tabla-scroll {
    min-width: 800px;
    padding: 0.5rem;
  }
}
@media (max-width: 1100px) {
  .importar-revistas-flotante {
    min-width: 0;
    width: 100vw;
    max-width: 100vw;
    padding: 0.5rem 0.2rem 2.5rem 0.2rem;
  }
  .tabla-scroll {
    min-width: 0;
    padding: 0.2rem;
  }
}
</style>
