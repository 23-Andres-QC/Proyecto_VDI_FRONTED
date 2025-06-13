<style src="./StylessFiltrosProfesores.css"></style>

<template>
  <div class="filtros-profesores-contenedor">
    <select v-model="tipoProfesor" class="filtro-profesores-select">
      <option disabled value="">Tipo profesores</option>
      <option>Contratado</option>
      <option>Planta</option>
      <option>Invitado</option>
    </select>

    <select v-model="categoria" class="filtro-profesores-select">
      <option disabled value="">Categoría</option>
      <option>Auxiliar</option>
      <option>Asistente</option>
      <option>Asociado</option>
      <option>Titular</option>
    </select>

    <input v-model="fechaInicio" type="date" class="filtro-profesores-input" />

    <input v-model="fechaFin" type="date" class="filtro-profesores-input" />

    <button class="filtro-profesores-btn" @click="buscar">Buscar</button>
  </div>
</template>

<script>
export default {
  name: 'FiltrosProfesores',
  data() {
    return {
      tipoProfesor: '',
      categoria: '',
      fechaInicio: '',
      fechaFin: ''
    }
  },
  methods: {
    buscar() {
      alert(
        `Tipo: ${this.tipoProfesor}\nCategoría: ${this.categoria}\nInicio: ${this.fechaInicio}\nFin: ${this.fechaFin}`
      );
    }
  }
}
</script>