<style src="./StylesFiltroLisCerrada.css"></style>
<template>
  <div class="filtros-container">
    <select v-model="tipoCaracteristica" class="combo-box">
      <option disabled value="">Tipo de característica</option>
      <option v-for="tipo in tiposCaracteristica" :key="tipo" :value="tipo">
        {{ tipo }}
      </option>
    </select>

    <select v-model="puntuacion" class="combo-box">
      <option disabled value="">Puntuación</option>
      <option v-for="punt in puntuaciones" :key="punt" :value="punt">
        {{ punt }}
      </option>
    </select>

    <select v-model="estado" class="combo-box">
      <option disabled value="">Estado</option>
      <option v-for="est in estados" :key="est" :value="est">
        {{ est }}
      </option>
    </select>

    <input type="date" v-model="fechaInicio" class="date-picker" placeholder="Fecha inicio" />
    <input type="date" v-model="fechaFin" class="date-picker" placeholder="Fecha fin" />

    <button @click="buscar" class="btn-buscar">Buscar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipoCaracteristica: '',
      puntuacion: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
      tiposCaracteristica: ['Tipo A', 'Tipo B', 'Tipo C'],
      puntuaciones: ['1', '2', '3', '4', '5'],
      estados: ['Activo', 'Inactivo', 'Pendiente']
    };
  },
  methods: {
    buscar() {
      console.log('Buscando con:', {
        tipoCaracteristica: this.tipoCaracteristica,
        puntuacion: this.puntuacion,
        estado: this.estado,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
      });
      // Aquí puedes emitir un evento o hacer la consulta
    }
  }
};
</script>

<style scoped src="./StylessFiltrosUsuarios.css"></style>
