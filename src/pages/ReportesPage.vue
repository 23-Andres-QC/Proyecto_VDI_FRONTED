<template>
  <!-- Layout en fila completo -->
  <div class="layout-contenido">
    <!-- Columna izquierda (controles) -->
    <div class="columna-controles">
      <ReportesTipo @mostrar-reporte="cambiarReporte"/>
      <ExportarReportes/>
    </div>

    <!-- Columna derecha (contenido reporte) -->
    <div class="contenido-reporte">
      <div v-if="reporteSeleccionado === 'Usuarios'">
        <FiltrosUsuarios/>
        <Tablausuarios/>
      </div>

      <div v-else-if="reporteSeleccionado === 'Profesores Importados'">
        <FiltrosProfesores/>
        <TablaProfesores/>
      </div>

      <div v-else-if="reporteSeleccionado === 'revistas'">
        <div v-if="tipoRevistaSeleccionado === 'ISSN'">
          <FiltroISSN/>
          <TablaISSN/>
        </div>
        <div v-else-if="tipoRevistaSeleccionado === 'Lista Cerrada'">
          <FiltrosListaCerrada/>
          <TablaListCerrada/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportesTipo from 'components/Reportes/ReportesTipo.vue'
import ExportarReportes from 'components/Reportes/ExportarReportes.vue'
import FiltroISSN from 'components/Reportes/Filtros/FiltroISSN.vue'
import FiltrosListaCerrada from 'components/Reportes/Filtros/FiltrosListaCerrada.vue'
import FiltrosProfesores from 'components/Reportes/Filtros/FiltrosProfesores.vue'
import FiltrosUsuarios from 'components/Reportes/Filtros/FiltrosUsuarios.vue'
import TablaISSN from 'components/Reportes/Tablas/TablaISSN.vue'
import TablaListCerrada from 'components/Reportes/Tablas/TablaListCerrada.vue'
import TablaProfesores from 'components/Reportes/Tablas/TablaProfesores.vue'
import Tablausuarios from 'components/Reportes/Tablas/Tablausuarios.vue'

export default {
  name: 'PaginaTablas',
  components: {
    ReportesTipo,
    ExportarReportes,
    FiltroISSN,
    FiltrosListaCerrada,
    FiltrosProfesores,
    FiltrosUsuarios,
    TablaISSN,
    TablaListCerrada,
    TablaProfesores,
    Tablausuarios
  },
  data() {
    return {
      reporteSeleccionado: 'Usuarios',
      tipoRevistaSeleccionado: ''
    }
  },
  methods: {
    cambiarReporte(nuevoReporte, tipoRevista = '') {
      this.reporteSeleccionado = nuevoReporte;
      if (nuevoReporte === 'revistas') {
        this.tipoRevistaSeleccionado = tipoRevista;
      } else {
        this.tipoRevistaSeleccionado = '';
      }
    }
  }
}
</script>

<style scoped>
.layout-contenido {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px; /* espacio entre columnas */
  margin-top: 20px;
  padding: 0 40px;
}

.columna-controles {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 250px;
}

.contenido-reporte {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1000px; /* puedes ajustar el ancho de la tabla + filtros */
  flex-grow: 1;
}
</style>
