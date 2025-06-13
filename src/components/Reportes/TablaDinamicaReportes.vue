<template>
  <div class="contenedor-reportes-principal">
    <div class="contenedor-reportes-vertical">
      <div class="contenedor-header-reportes ancho-tabla">
        <div class="contenedor-tabs-centrado">
          <ReportesTipo class="header-reportes-min" @mostrar-reporte="cambiarReporte" />
        </div>
        <div class="contenedor-exportar-centrado">
          <ExportarReportes class="header-reportes-min" :datosTabla="tablaActual" :columnasTabla="columnasActuales" />
        </div>
      </div>
      <div class="contenido-reporte ancho-tabla tabla-menos-abajo">
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
.contenedor-reportes-principal {
  width: 100%;
  max-width: 900px;
  margin: 12px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(33, 150, 243, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07);
  padding: 18px 8px 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contenedor-reportes-vertical {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  align-items: center;
  margin-top: 0;
  padding: 0 0;
}
.ancho-tabla {
  width: 100%;
  max-width: 800px;
  min-width: 320px;
  margin: 0 auto;
  box-sizing: border-box;
}
.contenedor-header-reportes {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  max-width: 800px;
}
.contenedor-tabs-centrado {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}
.contenedor-exportar-centrado {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}
.contenido-reporte {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tabla-menos-abajo {
  margin-top: 4px;
}

@media (max-width: 850px) {
  .contenedor-reportes-vertical,
  .ancho-tabla,
  .contenedor-header-reportes {
    max-width: 98vw;
    min-width: 0;
  }
}
</style>
