<style src="./StylessTipo.css"></style>

<template>
  <div class="ventana-contenedor mejor-tipo">
    <div class="tabs-container tabs-centrado">
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

<style scoped>
.mejor-tipo {
  background: #f8fafc;
  border: 2px solid #2196f3;
  border-radius: 10px;
  padding: 8px 18px 8px 18px;
  margin: 0;
  box-shadow: 0 2px 8px rgba(33,150,243,0.07);
  max-width: 100%;
}
.tabs-centrado {
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.tabs-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 0;
}
.tab-btn {
  padding: 6px 18px;
  font-size: 1rem;
  border-radius: 8px;
}
</style>
