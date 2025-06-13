<style src="./StylessExportar.css"></style>

<template>
  <div class="exportar-contenedor compacto-exportar">
    <div class="exportar-tabs-min">
      <button
        :class="['exportar-tab-btn', { active: selectedTab === 'Formato' }]"
        @click="selectedTab = 'Formato'"
        type="button"
      >
        Formato
      </button>
      <button
        :class="['exportar-tab-btn', { active: selectedTab === 'Ver' }]"
        @click="selectedTab = 'Ver'"
        type="button"
      >
        Ver
      </button>
    </div>
    <div v-if="selectedTab === 'Formato'">
      <form @submit.prevent="enviarFormulario" class="exportar-form-linea">
        <select
          id="formato"
          class="exportar-select-min"
          v-model="formato"
          required
        >
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
        </select>
        <select
          id="descripcion"
          class="exportar-select-min exportar-desplegable"
          v-model="descripcion"
          required
        >
          <option disabled value="">Selecciona descripción...</option>
          <option v-for="op in descripciones" :key="op" :value="op">{{ op }}</option>
        </select>
        <button class="exportar-btn-min" type="submit">Enviar</button>
      </form>
    </div>
    <div v-else-if="selectedTab === 'Ver'" style="margin-top: 8px; text-align: right;">
      <button class="exportar-btn-min" @click="verAccion">Ver</button>
    </div>
  </div>
</template>

<script>
import { exportarExcel, exportarPDF } from './exportarUtils';
export default {
  name: 'ExportarReportes',
  props: {
    datosTabla: {
      type: Array,
      default: () => []
    },
    columnasTabla: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedTab: 'Formato',
      formato: 'PDF',
      descripcion: '',
      descripciones: [
        'Reporte de usuarios filtrados',
        'Reporte de profesores importados',
        'Reporte de revistas ISSN',
        'Reporte de revistas Lista Cerrada',
        'Otro (especificar en el correo)'
      ]
    }
  },
  methods: {
    async enviarFormulario() {
      if (!this.descripcion) return;
      if (this.formato === 'Excel') {
        exportarExcel(this.datosTabla, this.columnasTabla, 'reporte');
      } else {
        exportarPDF(this.datosTabla, this.columnasTabla, 'reporte');
      }
      setTimeout(() => {
        window.location.href = `mailto:22200144@ue.edu.pe?subject=Reporte&body=Adjunto el reporte generado (${this.formato}).`;
      }, 500);
      this.descripcion = '';
    },
    verAccion() {
      alert('Ver acción ejecutada');
    }
  }
}
</script>

<style scoped>
.compacto-exportar {
  background: #f8fafc;
  border: 2px solid #2196f3;
  border-radius: 10px;
  padding: 6px 10px 6px 10px;
  margin: 0;
  box-shadow: 0 2px 8px rgba(33,150,243,0.07);
  max-width: 100%;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.exportar-tabs-min {
  display: flex;
  background: #f6f0f7;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  margin-bottom: 4px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.exportar-tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 6px 0;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-bottom: 2px solid transparent;
  font-size: 0.98rem;
}
.exportar-tab-btn.active {
  color: #4b2e83;
  border-bottom: 2px solid #4b2e83;
  background: #fff;
}
.exportar-form-linea {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 100%;
}
.exportar-select-min {
  border: 1.2px solid #2196f3;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.98rem;
  background: #fff;
  box-sizing: border-box;
  min-width: 90px;
  max-width: 180px;
}
.exportar-desplegable {
  min-width: 180px;
  max-width: 320px;
}
.exportar-btn-min {
  padding: 6px 18px;
  font-size: 1rem;
  border-radius: 8px;
  background: linear-gradient(90deg, #2196f3 0%, #e91e63 100%);
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-left: 8px;
}
.exportar-btn-min:hover {
  background: linear-gradient(90deg, #1976d2 0%, #ad1457 100%);
  transform: translateY(-2px) scale(1.04);
}
</style>