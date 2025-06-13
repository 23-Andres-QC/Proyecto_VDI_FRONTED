<style src="./StylessTabla.css"></style>

<template>
  <div class="contenedor-reporte">
    <div class="filtros-profesores-contenedor filtro-reporte">
      <select v-model="tipoProfesor" class="filtro-profesores-select">
        <option disabled value="">Tipo profesores</option>
        <option v-for="tipo in tiposProfesor" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
      <input v-model="busqueda" type="text" class="filtro-profesores-input" placeholder="Buscar en la tabla..." />
    </div>
    <div class="tabla-issn-contenedor">
      <div class="tabla-scroll">
        <table class="tabla-issn">
          <thead>
            <tr>
              <th>Correos</th>
              <th>Trabajador</th>
              <th>N° Doc</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="profesor in profesoresFiltrados" :key="profesor.idProfesorAdmis">
              <td>{{ profesor.correo }}</td>
              <td>{{ profesor.nombreyApellido }}</td>
              <td>{{ profesor.dni }}</td>
              <td>{{ profesor.categoria }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaProfesores',
  data() {
    return {
      profesores: [],
      tipoProfesor: '',
      tiposProfesor: [],
      busqueda: ''
    }
  },
  computed: {
    profesoresFiltrados() {
      if (!this.busqueda && !this.tipoProfesor) return this.profesores;
      const texto = this.busqueda.toLowerCase();
      return this.profesores.filter(profesor => {
        const coincideTipo = this.tipoProfesor ? profesor.categoria === this.tipoProfesor : true;
        // Filtra por cualquier campo, incluyendo números
        const coincideBusqueda = this.busqueda
          ? Object.values(profesor).some(val =>
              val !== null && val !== undefined && String(val).toLowerCase().includes(texto)
            )
          : true;
        return coincideTipo && coincideBusqueda;
      });
    }
  },
  mounted() {
    fetch('http://localhost:5009/api/ProfesoresAdmis')
      .then(response => response.json())
      .then(data => {
        this.profesores = data;
      })
      .catch(error => {
        console.error('Error al obtener profesores:', error);
      });
    fetch('http://localhost:5009/api/categorias/descripciones')
      .then(response => response.json())
      .then(data => {
        this.tiposProfesor = data;
      })
      .catch(error => {
        console.error('Error al obtener tipos de profesor:', error);
      });
  }
}
</script>
