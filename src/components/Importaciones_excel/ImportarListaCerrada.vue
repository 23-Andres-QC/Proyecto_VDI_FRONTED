<template>
  <div class="importar-revistas-bg-flotante">
    <div
      class="importar-revistas-panel card-style importar-revistas-flotante"
      :class="{ expanded: tabla && tabla.length > 0 }"
    >
      <!-- Header mejorado con diseño formal -->
      <div class="importar-header-formal">
        <div class="header-content">
          <q-icon name="list_alt" size="32px" class="header-icon" />
          <div class="header-text">
            <h2 class="importar-titulo-formal">Importación de Lista Cerrada</h2>
            <p class="header-subtitle">Sistema de Gestión de Revistas Indexadas</p>
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          class="cerrar-x-formal"
          @click="$emit('cancelar')"
          :disable="loadingExcel || loadingImport"
        />
      </div>

      <!-- Sección de instrucciones mejorada -->
      <div class="importar-instruccion-formal">
        <q-icon name="info" class="instruccion-icon" />
        <div class="instruccion-text">
          <p class="instruccion-principal">
            Seleccione un archivo Excel (.xlsx) para importar la lista cerrada de revistas
          </p>
          <p class="instruccion-detalle">
            El archivo debe contener las columnas requeridas según el formato estándar institucional
          </p>
        </div>
      </div>
      <!-- Formulario de carga mejorado -->
      <div class="importar-form-section">
        <div class="form-card">
          <div class="form-header">
            <q-icon name="upload_file" class="form-icon" />
            <span class="form-title">Selección de Archivo</span>
          </div>
          <div class="importar-form-row-formal">
            <q-file
              filled
              v-model="archivo"
              label="Seleccionar archivo Excel"
              accept=".xlsx, .xls"
              @update:model-value="onFileChange"
              class="importar-file-formal"
              :prepend-icon="'insert_drive_file'"
              color="primary"
              text-color="dark"
              :disable="loadingExcel || loadingImport"
              outlined
              hint="Formatos soportados: .xlsx, .xls"
            />
          </div>
        </div>
      </div>
      <!-- Estado de carga mejorado para Excel -->
      <div v-if="loadingExcel" class="loading-section-excel">
        <div class="loading-card-excel">
          <div class="loading-animation">
            <q-spinner-orbit color="primary" size="80px" />
            <div class="loading-dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
          <div class="loading-text">
            <h3><q-icon name="description" /> Procesando Archivo Excel</h3>
            <p>Analizando estructura y validando contenido...</p>
            <div class="loading-progress">
              <q-linear-progress indeterminate color="primary" size="4px" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de visualización mejorada -->
      <div
        v-if="tabla && tabla.length > 0"
        class="tabla-container-formal"
        :class="{ visible: tabla && tabla.length > 0 }"
      >
        <div class="visualizacion-header-formal">
          <div class="header-info">
            <q-icon name="table_view" size="28px" class="table-icon" />
            <div class="header-details">
              <h3 class="table-title">Visualización de Lista Cerrada</h3>
              <p class="table-subtitle">{{ tabla.length }} registro(s) cargado(s) para revisión</p>
            </div>
          </div>
          <q-chip color="primary" text-color="white" icon="info">
            Total: {{ tabla.length }} revistas
          </q-chip>
        </div>

        <!-- Controles de columnas -->
        <div class="controles-columnas">
          <div class="controles-info">
            <q-icon name="view_column" color="primary" />
            <span
              >Mostrando {{ columnasParaMostrar.length }} de {{ columnas.length }} columnas</span
            >
          </div>
          <div class="controles-botones">
            <q-btn
              v-if="!mostrarTodasColumnas && columnasVisibles > 8"
              @click="mostrarMenosColumnas"
              size="sm"
              outline
              color="primary"
              icon="remove"
              label="Menos columnas"
            />
            <q-btn
              v-if="!mostrarTodasColumnas && columnasVisibles < columnas.length"
              @click="mostrarMasColumnas"
              size="sm"
              outline
              color="primary"
              icon="add"
              label="Más columnas"
            />
            <q-btn
              @click="toggleTodasColumnas"
              size="sm"
              :outline="!mostrarTodasColumnas"
              :unelevated="mostrarTodasColumnas"
              color="primary"
              :icon="mostrarTodasColumnas ? 'visibility_off' : 'visibility'"
              :label="mostrarTodasColumnas ? 'Ocultar columnas' : 'Mostrar todas'"
            />
          </div>
        </div>

        <!-- Tabla con controles de paginación integrados -->
        <div class="tabla-con-paginacion-contenedor-seguro">
          <div class="tabla-con-paginacion">
            <div class="tabla-scroll-formal">
              <q-table
                :rows="filasParaMostrar"
                :columns="columnasParaMostrar"
                row-key="ISSN"
                dense
                flat
                class="tabla-excel-formal"
                style="min-width: 1100px"
                :separator="'cell'"
                :wrap-cells="true"
                :table-style="{ minWidth: '1100px' }"
                :loading="loadingExcel"
                hide-pagination
                :pagination="{ rowsPerPage: 0 }"
                :rows-per-page-options="[0]"
                virtual-scroll-slice-size="100"
                :virtual-scroll="false"
                :table-colstyle="
                  (col) =>
                    col.name === 'ISSN'
                      ? 'position: sticky; left: 0; background: #f8f9fa; z-index: 3; border-right: 2px solid #dee2e6;'
                      : ''
                "
              >
                <template v-slot:no-data>
                  <div class="full-width row flex-center text-primary q-gutter-sm">
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span>No hay datos para mostrar</span>
                  </div>
                </template>
              </q-table>
            </div>

            <!-- Controles de paginación en la parte inferior -->
            <div class="controles-paginacion-bottom">
              <div class="info-registros">
                <q-icon name="info" color="primary" size="sm" />
                <span class="texto-info">{{ tabla.length }} registros</span>
              </div>

              <div class="controles-centro">
                <div class="selector-container-interno">
                  <span class="label-mostrar">Mostrar:</span>
                  <div class="selector-wrapper">
                    <q-btn-dropdown
                      v-model="dropdownAbierto"
                      :label="selectorFilas.toString()"
                      dense
                      no-caps
                      flat
                      class="selector-btn-custom"
                      color="primary"
                      dropdown-icon="expand_more"
                      auto-close
                      anchor="bottom middle"
                      self="top middle"
                      :offset="[0, 4]"
                      fit
                    >
                      <q-list dense class="lista-opciones-custom">
                        <q-item
                          v-for="opcion in opcionesFilasPorPagina"
                          :key="opcion"
                          clickable
                          @click="cambiarFilasPorPagina(opcion)"
                          :class="{ 'opcion-activa': selectorFilas === opcion }"
                          class="item-opcion-custom"
                        >
                          <q-item-section>
                            <span class="texto-opcion">{{ opcion }}</span>
                          </q-item-section>
                          <q-item-section side v-if="selectorFilas === opcion">
                            <q-icon name="check" color="primary" size="sm" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </div>
                  <span class="label-mostrar">filas</span>
                </div>
              </div>

              <div v-if="selectorFilas !== 'Todas'" class="navegacion-paginas">
                <q-btn
                  :disable="pagination.page <= 1"
                  @click="pagination.page = 1"
                  icon="first_page"
                  flat
                  dense
                  size="sm"
                  color="primary"
                  class="nav-btn"
                />
                <q-btn
                  :disable="pagination.page <= 1"
                  @click="pagination.page--"
                  icon="chevron_left"
                  flat
                  dense
                  size="sm"
                  color="primary"
                  class="nav-btn"
                />
                <span class="pagina-info">
                  {{ pagination.page }} / {{ Math.ceil(tabla.length / Number(selectorFilas)) }}
                </span>
                <q-btn
                  :disable="pagination.page >= Math.ceil(tabla.length / Number(selectorFilas))"
                  @click="pagination.page++"
                  icon="chevron_right"
                  flat
                  dense
                  size="sm"
                  color="primary"
                  class="nav-btn"
                />
                <q-btn
                  :disable="pagination.page >= Math.ceil(tabla.length / Number(selectorFilas))"
                  @click="pagination.page = Math.ceil(tabla.length / Number(selectorFilas))"
                  icon="last_page"
                  flat
                  dense
                  size="sm"
                  color="primary"
                  class="nav-btn"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones mejoradas -->
        <div class="acciones-previa-formal">
          <div class="acciones-info">
            <q-icon name="warning" color="amber" />
            <span>Revise los datos antes de confirmar la importación</span>
          </div>
          <div class="acciones-botones">
            <q-btn
              color="negative"
              label="CANCELAR"
              icon="close"
              @click="cancelarImportacion"
              class="cancelar-btn-formal"
              :disable="loadingImport"
              outline
              size="md"
            />
            <q-btn
              class="importar-btn-final-formal"
              label="CONFIRMAR IMPORTACIÓN"
              color="primary"
              icon="check_circle"
              @click="importarExcel"
              :loading="loadingImport"
              :disable="!tabla || !tabla.length"
              unelevated
              size="md"
            >
              <template v-slot:loading>
                <q-spinner-hourglass color="white" />
              </template>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import * as XLSX from 'xlsx'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

const archivo = ref(null)
const tabla = ref([])
const apiData = ref([])
const loadingExcel = ref(false)
const loadingImport = ref(false)
const dropdownAbierto = ref(false)
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})
const mostrarTodasColumnas = ref(false)
const columnasVisibles = ref(8) // Mostrar solo las primeras 8 columnas inicialmente para lista cerrada
const mostrarTodasFilas = ref(false) // Ref separado para la opción "Todas"
const selectorFilas = ref(20) // Usar número directamente en lugar de string

// Opciones dinámicas para el selector de filas
const opcionesFilasPorPagina = computed(() => {
  const opciones = []

  // Opciones básicas siempre disponibles
  const opcionesBase = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100]

  // Agregar opciones adicionales basadas en el número total de registros
  if (tabla.value && tabla.value.length > 0) {
    const totalRegistros = tabla.value.length
    console.log('📊 Generando opciones dinámicas para', totalRegistros, 'registros')

    // Agregar opciones hasta el 50% del total
    const mitad = Math.floor(totalRegistros / 2)
    if (mitad > 100 && mitad <= 500) {
      opciones.push(...opcionesBase, 150, 200, 250, 300, Math.floor(mitad))
    } else if (mitad > 500) {
      opciones.push(...opcionesBase, 150, 200, 250, 300, 400, 500, Math.floor(mitad))
    } else {
      opciones.push(...opcionesBase)
    }

    // Remover duplicados y ordenar
    const opcionesUnicas = [...new Set(opciones)].sort((a, b) => a - b)

    // Agregar "Todas" al final
    opcionesUnicas.push('Todas')

    console.log('📊 Opciones disponibles:', opcionesUnicas)
    return opcionesUnicas
  }

  // Si no hay datos, mostrar opciones básicas
  const opcionesDefault = [...opcionesBase, 'Todas']
  console.log('📊 Opciones por defecto:', opcionesDefault)
  return opcionesDefault
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

// Propiedades computadas para columnas visibles
const columnasParaMostrar = computed(() => {
  if (mostrarTodasColumnas.value) {
    return columnas
  }
  return columnas.slice(0, columnasVisibles.value)
})

// Propiedades computadas para filas visibles (paginación simplificada)
const filasParaMostrar = computed(() => {
  console.log('🔄 Calculando filas a mostrar...')
  console.log('🔍 Estado actual:', {
    selectorFilas: selectorFilas.value,
    paginaActual: pagination.value.page,
    totalTabla: tabla.value?.length || 0,
  })

  if (!tabla.value || tabla.value.length === 0) {
    console.log('❌ No hay datos en tabla')
    return []
  }

  const totalFilas = tabla.value.length
  console.log('📊 Total filas disponibles:', totalFilas)

  // Si selecciona "Todas", mostrar todas las filas
  if (selectorFilas.value === 'Todas') {
    console.log('✅ Mostrando TODAS las filas:', totalFilas)
    return tabla.value
  }

  // Convertir selector a número (ahora ya es número o 'Todas')
  // VERIFICACIÓN CRÍTICA: Asegurar que el selector sea un número válido
  let filasPorPagina
  if (typeof selectorFilas.value === 'number') {
    filasPorPagina = selectorFilas.value
  } else if (typeof selectorFilas.value === 'string' && !isNaN(Number(selectorFilas.value))) {
    filasPorPagina = Number(selectorFilas.value)
  } else {
    console.warn('⚠️ Valor de selector inválido, usando 20 por defecto:', selectorFilas.value)
    filasPorPagina = 20
  }

  const paginaActual = pagination.value.page || 1

  console.log('📋 PARÁMETROS FINALES:', {
    filasPorPagina,
    paginaActual,
    totalFilas,
    valorOriginalSelector: selectorFilas.value,
  })

  // Calcular índices
  const inicio = (paginaActual - 1) * filasPorPagina
  const fin = inicio + filasPorPagina

  console.log('🔢 CÁLCULO DE ÍNDICES:', {
    inicio,
    fin,
    formula: `(${paginaActual} - 1) * ${filasPorPagina} = ${inicio}`,
  })

  const filasResultado = tabla.value.slice(inicio, fin)

  console.log('✅ === RESULTADO FINAL ===')
  console.log('✅ Filas calculadas:', {
    inicio,
    fin,
    filasEnResultado: filasResultado.length,
    esperadas: filasPorPagina,
    primeraFila: filasResultado[0]?.ISSN || 'Sin datos',
    ultimaFila: filasResultado[filasResultado.length - 1]?.ISSN || 'Sin datos',
  })

  // VERIFICACIÓN DE SEGURIDAD
  if (filasResultado.length !== filasPorPagina && fin <= totalFilas) {
    console.error('🚨 ERROR: Las filas calculadas no coinciden con las esperadas!')
    console.error('🚨 Esperadas:', filasPorPagina, 'Calculadas:', filasResultado.length)
  }

  return filasResultado
})

// Funciones para manejar la visualización de columnas
function mostrarMasColumnas() {
  if (columnasVisibles.value < columnas.length) {
    columnasVisibles.value = Math.min(columnasVisibles.value + 5, columnas.length)
  }
}

function mostrarMenosColumnas() {
  if (columnasVisibles.value > 8) {
    columnasVisibles.value = Math.max(columnasVisibles.value - 5, 8)
  }
}

function toggleTodasColumnas() {
  mostrarTodasColumnas.value = !mostrarTodasColumnas.value
}

// Función para cambiar el número de filas por página
function cambiarFilasPorPagina(valor) {
  console.log('🔧 Cambiando filas por página a:', valor)
  pagination.value.page = 1 // Resetear a la primera página
  selectorFilas.value = valor
  dropdownAbierto.value = false // Cerrar el dropdown
}

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

      // Actualizar la paginación con el número total de filas
      pagination.value.rowsNumber = tabla.value.length
      pagination.value.page = 1 // Resetear a la primera página

      // Resetear los controles de paginación
      selectorFilas.value = 20
      mostrarTodasFilas.value = false

      console.log('Datos cargados Lista Cerrada:', {
        totalFilas: tabla.value.length,
        paginacion: pagination.value,
        selectorFilas: selectorFilas.value,
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
  apiData.value = []
  // Resetear controles de paginación
  selectorFilas.value = 20
  mostrarTodasFilas.value = false
  pagination.value.page = 1
  dropdownAbierto.value = false
}

onMounted(() => {
  // Componente listo
})

// Watch para detectar cambios en el selector de filas
watch(
  () => selectorFilas.value,
  (newValue, oldValue) => {
    console.log('🔧 Selector cambió de:', oldValue, 'a:', newValue)
    console.log('🔧 Tipo de valor:', typeof newValue)
    pagination.value.page = 1
    console.log('🔧 Página resetada a 1')
  },
  { immediate: true },
)

// Watch adicional para monitorear cambios en la tabla
watch(
  () => tabla.value,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      console.log('📊 Tabla actualizada con', newValue.length, 'filas')
      pagination.value.page = 1
      console.log('📊 Página resetada a 1 por nueva tabla')
    }
  },
  { immediate: true },
)

// Watch para monitorear las filas que se muestran
watch(
  () => filasParaMostrar.value,
  (newValue) => {
    console.log('👀 Filas para mostrar actualizadas:', newValue.length, 'filas')
    console.log('👀 Primera fila:', newValue[0]?.ISSN || 'Sin datos')
    console.log('👀 Última fila:', newValue[newValue.length - 1]?.ISSN || 'Sin datos')
  },
  { immediate: true },
)
</script>

<style scoped>
/* === ESTILOS FORMALES MEJORADOS PARA LISTA CERRADA === */
/* Estilos base formales */
.importar-revistas-bg-flotante {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.15), rgba(33, 150, 243, 0.1)) !important;
  backdrop-filter: blur(8px) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  isolation: isolate !important;
  contain: layout style paint !important;
}

.importar-revistas-flotante {
  background: #ffffff !important;
  border-radius: 16px !important;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15) !important;
  width: 95% !important;
  max-width: 1500px !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
  border: 1px solid #e3f2fd !important;
  padding: 0 !important;
  position: relative !important;
  isolation: isolate !important;
  contain: layout style paint !important;
}

/* Header formal */
.importar-header-formal {
  background: linear-gradient(135deg, #1976d2, #1565c0) !important;
  color: white !important;
  padding: 24px 32px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-radius: 16px 16px 0 0 !important;
  position: relative !important;
}

.header-content {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.header-icon {
  color: #e3f2fd !important;
}

.header-text {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.importar-titulo-formal {
  margin: 0 !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

.header-subtitle {
  margin: 0 !important;
  font-size: 14px !important;
  opacity: 0.9 !important;
  font-weight: 400 !important;
}

.cerrar-x-formal {
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

.cerrar-x-formal:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.05) !important;
}

/* Sección de instrucciones formal */
.importar-instruccion-formal {
  background: #f8f9fa !important;
  border: 1px solid #e9ecef !important;
  border-radius: 12px !important;
  padding: 20px !important;
  margin: 24px 32px !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 16px !important;
}

.instruccion-icon {
  color: #1976d2 !important;
  font-size: 24px !important;
  margin-top: 2px !important;
}

.instruccion-text {
  flex: 1 !important;
}

.instruccion-principal {
  margin: 0 0 8px 0 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
}

.instruccion-detalle {
  margin: 0 !important;
  font-size: 14px !important;
  color: #6c757d !important;
  line-height: 1.5 !important;
}

/* Formulario formal */
.importar-form-section {
  padding: 0 32px 24px 32px !important;
}

.form-card {
  background: #ffffff !important;
  border: 2px solid #e3f2fd !important;
  border-radius: 12px !important;
  padding: 24px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.form-header {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  margin-bottom: 20px !important;
  padding-bottom: 12px !important;
  border-bottom: 2px solid #f5f5f5 !important;
}

.form-icon {
  color: #1976d2 !important;
  font-size: 24px !important;
}

.form-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
}

.importar-form-row-formal {
  display: flex !important;
  gap: 20px !important;
  align-items: flex-end !important;
  flex-wrap: wrap !important;
}

.importar-file-formal {
  flex: 1 !important;
  min-width: 300px !important;
}

.importar-btn-formal {
  min-width: 200px !important;
  height: 56px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

/* Estado de carga formal */
.loading-section {
  padding: 40px 32px !important;
  display: flex !important;
  justify-content: center !important;
}

.loading-card {
  background: #f8f9fa !important;
  border-radius: 12px !important;
  padding: 40px !important;
  text-align: center !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  max-width: 400px !important;
}

.loading-text h4 {
  margin: 20px 0 8px 0 !important;
  color: #1565c0 !important;
  font-weight: 600 !important;
}

.loading-text p {
  margin: 0 !important;
  color: #6c757d !important;
  font-size: 14px !important;
}

/* Tabla formal */
.tabla-container-formal {
  padding: 0 32px 32px 32px !important;
}

.tabla-con-paginacion-contenedor-seguro {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  z-index: 1 !important;
  isolation: isolate !important;
}

.tabla-con-paginacion-contenedor {
  position: relative !important;
  overflow: visible !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.tabla-con-paginacion {
  position: relative !important;
  overflow: hidden !important;
}

.visualizacion-header-formal {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 20px 0 !important;
  border-bottom: 2px solid #e3f2fd !important;
  margin-bottom: 20px !important;
}

.header-info {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
}

.table-icon {
  color: #1976d2 !important;
}

.header-details {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.table-title {
  margin: 0 !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
}

.table-subtitle {
  margin: 0 !important;
  font-size: 14px !important;
  color: #6c757d !important;
}

.tabla-scroll-formal {
  overflow: hidden !important;
  background: #ffffff !important;
}

.tabla-excel-formal {
  background: #ffffff !important;
}

.tabla-excel-formal .q-table__top {
  background: #f8f9fa !important;
  border-bottom: 2px solid #e3f2fd !important;
}

.tabla-excel-formal .q-table thead th {
  background: #1976d2 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  padding: 16px 12px !important;
  border-bottom: 2px solid #1565c0 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.2) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

.tabla-excel-formal .q-table tbody td {
  padding: 12px !important;
  border-bottom: 1px solid #e9ecef !important;
  border-right: 1px solid #e9ecef !important;
  font-size: 13px !important;
  text-align: center !important;
}

.tabla-excel-formal .q-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.tabla-excel-formal .q-table tbody tr:hover {
  background: #e3f2fd !important;
}

/* Mejoras en tabla para mostrar todas las filas */
.tabla-excel-formal .q-table__container {
  border-radius: 12px !important;
  overflow: hidden !important;
}

.tabla-excel-formal .q-table__middle {
  max-height: none !important;
  min-height: 70vh !important;
  overflow-y: visible !important;
}

/* Acciones formales */
.acciones-previa-formal {
  margin-top: 24px !important;
  padding: 20px !important;
  background: #f8f9fa !important;
  border-radius: 12px !important;
  border: 1px solid #e9ecef !important;
}

.acciones-info {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 16px !important;
  font-size: 14px !important;
  color: #856404 !important;
}

.acciones-botones {
  display: flex !important;
  justify-content: center !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
}

.cancelar-btn-formal,
.importar-btn-final-formal {
  min-width: 180px !important;
  height: 48px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}

.importar-btn-final-formal {
  background: linear-gradient(135deg, #4caf50, #45a049) !important;
}

/* Responsive para Lista Cerrada */
@media (max-width: 768px) {
  .importar-revistas-flotante {
    width: 98% !important;
    max-height: 95vh !important;
  }

  .importar-header-formal {
    padding: 16px 20px !important;
  }

  .importar-titulo-formal {
    font-size: 20px !important;
  }

  .importar-instruccion-formal,
  .importar-form-section,
  .tabla-container-formal {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .importar-form-row-formal {
    flex-direction: column !important;
    gap: 16px !important;
  }

  .importar-file-formal {
    min-width: 100% !important;
  }

  .acciones-botones {
    flex-direction: column !important;
  }
}

/* Estado de carga mejorado para Excel */
.loading-section-excel {
  padding: 60px 32px !important;
  display: flex !important;
  justify-content: center !important;
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd) !important;
  margin: 24px 32px !important;
  border-radius: 16px !important;
  border: 2px solid #e3f2fd !important;
}

.loading-card-excel {
  background: #ffffff !important;
  border-radius: 20px !important;
  padding: 60px 40px !important;
  text-align: center !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
  max-width: 500px !important;
  width: 100% !important;
  border: 3px solid #e3f2fd !important;
}

.loading-animation {
  position: relative !important;
  margin-bottom: 30px !important;
}

.loading-dots {
  display: flex !important;
  justify-content: center !important;
  gap: 8px !important;
  margin-top: 20px !important;
}

.dot {
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  background: #1976d2 !important;
  animation: loading-pulse 1.5s infinite ease-in-out !important;
}

.dot:nth-child(2) {
  animation-delay: 0.3s !important;
}

.dot:nth-child(3) {
  animation-delay: 0.6s !important;
}

@keyframes loading-pulse {
  0%,
  80%,
  100% {
    transform: scale(0.8) !important;
    opacity: 0.5 !important;
  }
  40% {
    transform: scale(1.2) !important;
    opacity: 1 !important;
  }
}

.loading-progress {
  margin-top: 20px !important;
  padding: 0 20px !important;
}

.loading-text h3 {
  margin: 0 0 12px 0 !important;
  color: #1565c0 !important;
  font-weight: 700 !important;
  font-size: 22px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
}

/* Controles de columnas */
.controles-columnas {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 16px 20px !important;
  background: linear-gradient(135deg, #e3f2fd, #f8f9fa) !important;
  border: 2px solid #e3f2fd !important;
  border-radius: 12px !important;
  margin-bottom: 20px !important;
}

.controles-info {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
  font-size: 14px !important;
}

.controles-botones {
  display: flex !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
}

/* Paginación personalizada */
.paginacion-personalizada {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 16px 20px !important;
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd) !important;
  border: 2px solid #e3f2fd !important;
  border-radius: 12px !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

.paginacion-info {
  font-weight: 600 !important;
  color: #1565c0 !important;
  font-size: 14px !important;
}

.paginacion-controles {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

.paginacion-pagina {
  font-weight: 600 !important;
  color: #1565c0 !important;
  font-size: 14px !important;
  margin: 0 8px !important;
}

.todas-las-filas {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-weight: 700 !important;
  color: #1565c0 !important;
}

/* === ESTILOS PARA TABLA CON PAGINACIÓN === */
.tabla-con-paginacion {
  border: 2px solid #e3f2fd !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  background: #ffffff !important;
}

.tabla-scroll-formal {
  overflow: hidden !important;
  background: #ffffff !important;
}

.controles-paginacion-bottom {
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd) !important;
  border-top: 2px solid #e3f2fd !important;
  padding: 12px 20px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: nowrap !important;
  gap: 16px !important;
  position: relative !important;
  border-radius: 0 0 12px 12px !important;
  height: 50px !important;
  overflow: visible !important;
  box-sizing: border-box !important;
}

.info-registros {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: #1565c0 !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  flex-shrink: 0 !important;
}

.texto-info {
  white-space: nowrap !important;
}

.controles-centro {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex: 1 !important;
  position: relative !important;
  z-index: 1000 !important;
}

.selector-container-interno {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #ffffff !important;
  padding: 6px 12px !important;
  border-radius: 20px !important;
  border: 2px solid #e3f2fd !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  position: relative !important;
  z-index: 1001 !important;
}

.label-mostrar {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
  white-space: nowrap !important;
}

.selector-wrapper {
  position: relative !important;
  z-index: 1002 !important;
}

.selector-btn-custom {
  background: transparent !important;
  border: none !important;
  padding: 2px 8px !important;
  min-height: 24px !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  color: #1976d2 !important;
  font-size: 14px !important;
  min-width: 50px !important;
}

.selector-btn-custom:hover {
  background: rgba(25, 118, 210, 0.1) !important;
}

.lista-opciones-custom {
  background: #ffffff !important;
  border: 2px solid #e3f2fd !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  max-height: 200px !important;
  overflow-y: auto !important;
  min-width: 80px !important;
  position: absolute !important;
  z-index: 10000 !important;
  top: 100% !important;
  left: 0 !important;
  right: 0 !important;
  margin-top: 4px !important;
  contain: layout style paint !important;
}

.item-opcion-custom {
  padding: 8px 12px !important;
  border-radius: 8px !important;
  margin: 4px 6px !important;
  transition: all 0.2s ease !important;
}

.item-opcion-custom:hover {
  background: #e3f2fd !important;
}

.opcion-activa {
  background: #1976d2 !important;
  color: white !important;
}

.opcion-activa:hover {
  background: #1565c0 !important;
}

.texto-opcion {
  font-weight: 600 !important;
  font-size: 14px !important;
}

.navegacion-paginas {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  padding: 4px 8px !important;
  border-radius: 16px !important;
  border: 1px solid #e3f2fd !important;
}

.nav-btn {
  min-width: 32px !important;
  height: 32px !important;
}

.pagina-info {
  font-weight: 600 !important;
  color: #1565c0 !important;
  font-size: 12px !important;
  padding: 4px 8px !important;
  background: rgba(25, 118, 210, 0.1) !important;
  border-radius: 10px !important;
  margin: 0 2px !important;
  white-space: nowrap !important;
}

/* Responsive para controles bottom */
@media (max-width: 768px) {
  .controles-paginacion-bottom {
    flex-direction: column !important;
    height: auto !important;
    padding: 16px !important;
    gap: 12px !important;
  }

  .info-registros {
    justify-content: center !important;
    order: 1 !important;
  }

  .controles-centro {
    order: 2 !important;
  }

  .navegacion-paginas {
    order: 3 !important;
    justify-content: center !important;
  }
}

/* Estilos adicionales para el dropdown del selector compacto */
.selector-filas-compacto .q-menu {
  z-index: 9999 !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  border: 2px solid #e3f2fd !important;
  max-height: 200px !important;
  overflow-y: auto !important;
}

.selector-filas-compacto .q-item {
  padding: 8px 16px !important;
  border-radius: 8px !important;
  margin: 4px 8px !important;
  font-weight: 600 !important;
  color: #1565c0 !important;
}

.selector-filas-compacto .q-item:hover {
  background: #e3f2fd !important;
  color: #1976d2 !important;
}

.selector-filas-compacto .q-item--active {
  background: #1976d2 !important;
  color: white !important;
}
</style>
