<template>
  <div class="tipo-contenedor-horizontal">
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
      <span v-if="selectedTab === 'Profesores Importados'" class="checkmark">✔</span>
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
</template>

<script>
export default {
  name: 'ReportesTipo',
  data() {
    return {
      selectedTab: 'Usuarios',
      Revista: '',
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
  },
}
</script>

<style src="./StylessTipo.css"></style>
