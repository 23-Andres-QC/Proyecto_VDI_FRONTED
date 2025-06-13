<style src="./StylessExportar.css"></style>

<template>
  <div class="exportar-contenedor">
    <!-- Buscar Gmail -->
    <input
      class="exportar-search"
      type="search"
      placeholder="Buscar Gmail..."
      v-model="buscarGmail"
    />

    <div class="exportar-tabs">
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
      <form @submit.prevent="enviarFormulario">
        <label class="exportar-label" for="formato">Formato</label>
        <select
          id="formato"
          class="exportar-select"
          v-model="formato"
          required
        >
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
        </select>

        <label class="exportar-label" for="gmail">Gmail</label>
        <input
          id="gmail"
          class="exportar-input"
          v-model="gmail"
          type="email"
          autocomplete="off"
          required
        />

        <label class="exportar-label" for="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          class="exportar-textarea"
          v-model="descripcion"
          required
        ></textarea>

        <button class="exportar-btn" type="submit">Enviar</button>
      </form>
    </div>
    <div v-else-if="selectedTab === 'Ver'" style="margin-top: 32px; text-align: right;">
      <button class="exportar-btn" @click="verAccion">Ver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExportarReportes',
  data() {
    return {
      selectedTab: 'Formato',
      buscarGmail: '',
      formato: 'PDF',
      gmail: '',
      descripcion: ''
    }
  },
  methods: {
    enviarFormulario() {
      // Lógica para enviar el formulario
      alert(`Gmail: ${this.gmail}\nDescripción: ${this.descripcion}\nFormato: ${this.formato}`);
      this.gmail = '';
      this.descripcion = '';
    },
    verAccion() {
      // Lógica para el botón Ver
      alert('Ver acción ejecutada');
    }
  }
}
</script>