<template>
  <div class="contenedor-reporte">
    <div class="tipo-contenedor-horizontal">
      <!-- Buttons for selecting tabs -->
      <button
        :class="['tipo-btn', { active: selectedTab === 'Usuarios' }]"
        @click="cambiarTab('Usuarios')"
        type="button"
      >
        <span v-if="selectedTab === 'Usuarios'" class="checkmark">✔</span>
        Usuarios
      </button>
      <button
        :class="['tipo-btn', { active: selectedTab === 'Profesores Importados' }]"
        @click="cambiarTab('Profesores Importados')"
        type="button"
      >
        Profesores Importados
      </button>
      <select
        v-model="Revista"
        @change="cambiarTab('revistas')"
        :class="['tipo-btn', { active: selectedTab === 'revistas' }]"
      >
        <option disabled value="">Revista</option>
        <option value="ISSN">ISSN</option>
        <option value="Lista Cerrada">Lista Cerrada</option>
      </select>
    </div>

    <div class="exportar-contenedor compacto-exportar reducido">
      <select id="formato" class="filtro-issn-select" v-model="formato" required>
        <option value="" disabled selected>Formato</option>
        <option value="PDF">PDF</option>
        <option value="Excel">Excel</option>
      </select>
      <textarea
        id="descripcion"
        class="filtro-profesores-expandable-scroll"
        v-model="descripcion"
        placeholder="Escribe una descripción..."
        required
      ></textarea>
      <input
        id="correos"
        class="filtro-profesores-input"
        v-model="correos"
        type="text"
        placeholder="Ej: correo@dominio.com, otro@dominio.com"
        required
      />
      <button @click="enviarFormulario">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportesTipo',
  data() {
    return {
      selectedTab: 'Usuarios',
      Revista: '',
      datosTabla: [],
      columnasTabla: [],
      formato: '',
      descripcion: '',
      correos: '',
    }
  },
  methods: {
    cambiarTab(tab) {
      this.selectedTab = tab
      if (tab === 'revistas') {
        this.$emit('mostrar-reporte', tab, this.Revista)
      } else {
        this.$emit('mostrar-reporte', tab)
        this.Revista = ''
      }
    },
    enviarFormulario() {
      if (!this.descripcion || !this.correos) {
        alert('Por favor complete todos los campos antes de enviar.')
        return
      }

      const confirmacion = window.confirm('¿Está seguro de que desea exportar los datos?')
      if (!confirmacion) return

      this.$emit('enviar-reporte', {
        formato: this.formato,
        descripcion: this.descripcion,
        correos: this.correos,
      })
    },
  },
}
</script>

<style src="./StylessTipo.css"></style>
