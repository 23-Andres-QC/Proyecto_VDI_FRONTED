<template>
  <div class="contenedor-reportes-vertical">
    <div class="contenedor-header-reportes ancho-tabla">
      <ReportesTipo class="header-reportes-min ancho-tabla" @mostrar-reporte="cambiarReporte" />
      <ExportarReportes class="header-reportes-min ancho-tabla"
        :datosTabla="tablaActual"
        :columnasTabla="columnasActuales"
      />
    </div>
    <div class="contenido-reporte ancho-tabla">
      <div v-if="reporteSeleccionado === 'Usuarios'">
        <Tablausuarios ref="tablaRef" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'Profesores Importados'">
        <TablaProfesores ref="tablaRef" @update:filtrados="actualizarTabla" />
      </div>
      <div v-else-if="reporteSeleccionado === 'revistas'">
        <div v-if="tipoRevistaSeleccionado === 'ISSN'">
          <TablaISSN ref="tablaRef" @update:filtrados="actualizarTabla" />
        </div>
        <div v-else-if="tipoRevistaSeleccionado === 'Lista Cerrada'">
          <TablaListCerrada ref="tablaRef" @update:filtrados="actualizarTabla" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReportesTipo from 'components/Reportes/ReportesTipo.vue'
import ExportarReportes from 'components/Reportes/ExportarReportes.vue'
import TablaISSN from 'components/Reportes/Tablas/TablaISSN.vue'
import TablaListCerrada from 'components/Reportes/Tablas/TablaListCerrada.vue'
import TablaProfesores from 'components/Reportes/Tablas/TablaProfesores.vue'
import Tablausuarios from 'components/Reportes/Tablas/Tablausuarios.vue'

const reporteSeleccionado = ref('Usuarios')
const tipoRevistaSeleccionado = ref('')
const tablaActual = ref([])
const columnasActuales = ref([])

function cambiarReporte(nuevoReporte, tipoRevista = '') {
  reporteSeleccionado.value = nuevoReporte
  if (nuevoReporte === 'revistas') {
    tipoRevistaSeleccionado.value = tipoRevista
  } else {
    tipoRevistaSeleccionado.value = ''
  }
  tablaActual.value = []
  columnasActuales.value = []
}

function actualizarTabla(filtrados, columnas) {
  tablaActual.value = filtrados
  columnasActuales.value = columnas
}
</script>

<style scoped>
.contenedor-reportes-vertical {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  padding: 0 0;
}
.ancho-tabla {
  width: 100%;
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}
.contenedor-header-reportes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: stretch;
}
.header-reportes-min {
  min-height: 32px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.contenido-reporte {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
