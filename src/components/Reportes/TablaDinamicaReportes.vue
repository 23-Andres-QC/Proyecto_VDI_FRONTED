<template>
  <div class="contenedor-reportes">
    <div class="Tipo">
      <ReportesTipo
        class="header-reportes-min"
        @mostrar-reporte="cambiarReporte"
        @enviar-reporte="manejarEnvio"
      />
      <!-- Reduced height -->
    </div>
    <div class="contenido-reporte ancho-tabla tabla-menos-abajo" style="gap: 10px">
      <div v-if="reporteSeleccionado === 'Usuarios'" class="tabla-usuarios">
        <Tablausuarios ref="tablaRefUsuarios" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'Profesores Importados'" class="tabla-profesores">
        <TablaProfesores ref="tablaRefProfesores" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'ISSN'" class="tabla-issn">
        <TablaISSN ref="tablaRefISSN" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'Lista Cerrada'" class="tabla-lista-cerrada">
        <TablaListCerrada ref="tablaRefListaCerrada" @update:filtrados="actualizarTabla" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReportesTipo from 'components/Reportes/ReportesTipo.vue'
import TablaISSN from 'components/Reportes/Tablas/TablaISSN.vue'
import TablaListCerrada from 'components/Reportes/Tablas/TablaListCerrada.vue'
import TablaProfesores from 'components/Reportes/Tablas/TablaProfesores.vue'
import Tablausuarios from 'components/Reportes/Tablas/Tablausuarios.vue'
import { exportarExcelPorTipo } from './exportarUtils.js'

const reporteSeleccionado = ref('Usuarios')
const tipoRevistaSeleccionado = ref('')
const tablaActual = ref([])

const tablaRefUsuarios = ref(null)
const tablaRefProfesores = ref(null)
const tablaRefISSN = ref(null)
const tablaRefListaCerrada = ref(null)

function cambiarReporte(nuevoReporte, tipoRevista = '') {
  reporteSeleccionado.value = nuevoReporte
  if (nuevoReporte === 'revistas') {
    tipoRevistaSeleccionado.value = tipoRevista
  } else {
    tipoRevistaSeleccionado.value = ''
  }
  tablaActual.value = []
}

function actualizarTabla(filtrados) {
  // Asegurarse de que los datos sean un array, aunque vengan como string JSON
  let datos = filtrados
  if (typeof filtrados === 'string') {
    try {
      datos = JSON.parse(filtrados)
    } catch {
      datos = []
    }
  }
  console.log('Datos filtrados recibidos:', datos)

  // Si los datos filtrados están vacíos, verificar si hay datos iniciales
  if (!Array.isArray(datos) || datos.length === 0) {
    console.warn('No se recibieron datos filtrados, verificando datos iniciales...')
    const tablaRef =
      reporteSeleccionado.value === 'Usuarios'
        ? tablaRefUsuarios.value
        : reporteSeleccionado.value === 'Profesores Importados'
          ? tablaRefProfesores.value
          : tipoRevistaSeleccionado.value === 'ISSN'
            ? tablaRefISSN.value
            : tablaRefListaCerrada.value
    tablaActual.value = tablaRef?.revistas || []
  } else {
    // Convert Vue Proxy a un array de JavaScript
    tablaActual.value = JSON.parse(JSON.stringify(datos))
  }
}

async function manejarEnvio({ formato, correos }) {
  console.log('Datos para exportar:', tablaActual.value)

  // Validar que los datos sean un array válido
  const datosExportar =
    Array.isArray(tablaActual.value) && tablaActual.value.length > 0
      ? JSON.parse(JSON.stringify(tablaActual.value))
      : [{ mensaje: 'No hay datos disponibles para exportar.' }]

  const fechaActual = new Date().toISOString().split('T')[0]
  const nombreReporte = `${reporteSeleccionado.value}_${fechaActual}`

  if (formato === 'Excel') {
    await exportarExcelPorTipo(
      datosExportar,
      reporteSeleccionado.value,
      formato,
      correos,
      nombreReporte,
    )
  } else {
    alert('Formato no soportado para exportación.')
  }
}
</script>

<style scoped>
.contenedor-reportes {
  position: relative;
  width: 700px;
  height: 750px;
  border: 2px solid black;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.header-reportes-min {
  top: 80px;
}

/* Independent positioning for tables */
.tabla-usuarios {
  position: absolute;
  top: 170px;
  left: 20px;
}

.tabla-profesores {
  position: absolute;
  top: 170px;
  left: 20px;
}

.tabla-issn {
  position: absolute;
  top: 160px;
  left: 10px;
}

.tabla-lista-cerrada {
  position: absolute;
  top: 160px;
  left: 10px;
}
</style>
