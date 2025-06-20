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
        <Tablausuarios ref="tablaRef" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'Profesores Importados'" class="tabla-profesores">
        <TablaProfesores ref="tablaRef" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'revistas'">
        <div v-if="tipoRevistaSeleccionado === 'ISSN'" class="tabla-issn">
          <TablaISSN ref="tablaRef" @update:filtrados="actualizarTabla" />
        </div>
        <div v-else-if="tipoRevistaSeleccionado === 'Lista Cerrada'" class="tabla-lista-cerrada">
          <TablaListCerrada ref="tablaRef" @update:filtrados="actualizarTabla" />
        </div>
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
  console.log('Datos filtrados recibidos:', filtrados)
  // Convert Vue Proxy to plain JavaScript array
  tablaActual.value = JSON.parse(JSON.stringify(filtrados))
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
  width: 850px;
  height: 750px;
  border: 2px solid black;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.header-reportes-min {
  top: 100px;
}

/* Independent positioning for tables */
.tabla-usuarios {
  position: absolute;
  top: 400px;
  left: 510px;
}

.tabla-profesores {
  position: absolute;
  top: 440px;
  left: 420px;
}

.tabla-issn {
  position: absolute;
  top: 440px;
  left: 5px;
}

.tabla-lista-cerrada {
  position: absolute;
  top: 440px;
  left: 510px;
}
</style>
