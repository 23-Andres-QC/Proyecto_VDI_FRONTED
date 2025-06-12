<style src="./StylessTipo.css"></style>

<template>
  <div class="ventana-contenedor">
    <div class="tabs-container">
      <!-- Botón Usuarios -->
      <button
        :class="['tab-btn', { active: selectedTab === 'Usuarios' }]"
        @click="cambiarTab('Usuarios')"
        type="button"
      >
        <span v-if="selectedTab === 'Usuarios'" class="checkmark">✔</span>
        Usuarios
      </button>

      <!-- Botón Profesores Importados -->
      <button
        :class="['tab-btn', { active: selectedTab === 'Profesores Importados' }]"
        @click="cambiarTab('Profesores Importados')"
        type="button"
      >
        <span v-if="selectedTab === 'Profesores Importados'" class="checkmark">✔</span>
        Profesores Importados
      </button>

      <!-- Combo box para seleccionar tipo de revista (como tab) -->
      <select
        v-model="Revista"
        @change="cambiarTab('revistas')"
        :class="['tab-btn', { active: selectedTab === 'revistas' }]"
      >
        <option disabled value="">Revista</option>
        <option value="ISSN">ISSN</option>
        <option value="Lista Cerrada">Lista Cerrada</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportesTipo',
  data() {
    return {
      selectedTab: 'Usuarios', // tab actual
      Revista: '' // opción del combo de revistas
    };
  },
  methods: {
    cambiarTab(tab) {
      this.selectedTab = tab;
      // Emitir el tab actual y si es revistas también el tipo
      if (tab === 'revistas') {
        this.$emit('mostrar-reporte', tab, this.Revista);
      } else {
        this.$emit('mostrar-reporte', tab);
        // Reiniciar Revista si cambia de tab
        this.Revista = '';
      }
    }
  }
};
</script>
