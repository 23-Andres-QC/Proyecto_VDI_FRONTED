<template>
  <div class="exportar-contenedor compacto-exportar">
    <form @submit.prevent="enviarFormulario" class="exportar-form-flex exportar-form-row exportar-form-center">
      <div class="exportar-form-col exportar-form-inline">
        <label class="exportar-label" for="formato">Formato</label>
        <select
          id="formato"
          class="exportar-select-min"
          v-model="formato"
          required
        >
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
        </select>
      </div>
      <div class="exportar-form-col exportar-form-inline">
        <label class="exportar-label" for="descripcion">Descripción</label>
        <input
          id="descripcion"
          class="exportar-select-min exportar-desplegable"
          v-model="descripcion"
          type="text"
          placeholder="Escribe una descripción..."
          required
        />
      </div>
      <div class="exportar-form-col exportar-form-inline">
        <label class="exportar-label" for="correos">Correo(s) de envío</label>
        <input
          id="correos"
          class="exportar-select-min exportar-desplegable"
          v-model="correos"
          type="text"
          placeholder="Ej: correo@dominio.com, otro@dominio.com"
          required
        />
      </div>
      <div class="exportar-form-col exportar-btn-col exportar-form-inline">
        <label class="exportar-label" style="opacity:0;">Enviar</label>
        <button class="exportar-btn" type="submit">Enviar</button>
      </div>
    </form>
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
      formato: 'PDF',
      descripcion: '',
      correos: '',
    }
  },
  methods: {
    async enviarFormulario() {
      if (!this.descripcion || !this.correos) return;
      if (this.formato === 'Excel') {
        exportarExcel(this.datosTabla, this.columnasTabla, 'reporte');
      } else {
        exportarPDF(this.datosTabla, this.columnasTabla, 'reporte');
      }
      // Permitir múltiples correos separados por coma
      const correosLimpios = this.correos.split(',').map(c => c.trim()).filter(Boolean).join(';');
      setTimeout(() => {
        window.location.href = `mailto:${correosLimpios}?subject=Reporte&body=Adjunto el reporte generado (${this.formato}).`;
      }, 500);
      this.descripcion = '';
      this.correos = '';
    }
  }
}
</script>

<style src="./StylessExportar.css"></style>