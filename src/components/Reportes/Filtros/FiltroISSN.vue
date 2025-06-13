<style src="./StylessFiltroISSN.css"></style>

<template>
  <div class="filtro-issn-contenedor">
    <select v-model="tipoCalificacion" class="filtro-issn-select">
      <option disabled value="">Tipo de calificación</option>
      <option>SCOPUS</option>
      <option>WOS</option>
      <option>Publindex</option>
      <option>Otra</option>
    </select>

    <select v-model="caracteristica" class="filtro-issn-select">
      <option disabled value="">Características</option>
      <option>Q1</option>
      <option>Q2</option>
      <option>Q3</option>
      <option>Q4</option>
      <option>No indexada</option>
    </select>

    <input v-model="fechaInicio" type="date" class="filtro-issn-input" />

    <input v-model="fechaFin" type="date" class="filtro-issn-input" />

    <button class="filtro-issn-btn" @click="buscar">Buscar</button>
  </div>
</template>

<script>
export default {
  name: 'FiltroISSN',
  data() {
    return {
      tipoCalificacion: '',
      caracteristica: '',
      fechaInicio: '',
      fechaFin: ''
    }
  },
  methods: {
    buscar() {
      alert(
        `Tipo de calificación: ${this.tipoCalificacion}\nCaracterísticas: ${this.caracteristica}\nFecha inicio: ${this.fechaInicio}\nFecha fin: ${this.fechaFin}`
      );
    }
  }
}
</script>