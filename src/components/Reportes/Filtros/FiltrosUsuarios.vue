<style src="./StylessFiltrosUsuarios.css"></style>

<template>
  <div class="filtros-contenedor">

    <select v-model="estado" class="filtro-select">
      <option disabled value="">Estado</option>
      <option>Activo</option>
      <option>Inactivo</option>
    </select>

    <input v-model="fechaInicio" type="date" class="filtro-input" placeholder="Fecha inicio" />

    <input v-model="fechaFin" type="date" class="filtro-input" placeholder="Fecha fin" />

    <button class="filtro-btn" @click="buscar">Buscar</button>
  </div>
</template>

<script>
export default {
  name: 'FiltrosUsuarios',
  data() {
    return {
      estado: '',
      fechaInicio: '',
      fechaFin: ''
    }
  },
  methods: {
    buscar() {
      // Aquí va la lógica de búsqueda
      alert(
        `Tipo: $\nEstado: ${this.estado}\nInicio: ${this.fechaInicio}\nFin: ${this.fechaFin}`
      );
    }
  }
}
</script>