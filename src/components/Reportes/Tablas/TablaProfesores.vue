<style src="./StylessTabla.css"></style>

<template>
  <div class="filtro-issn-contenedor tabla-issn-contenedor">
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
          <tr v-for="profesor in profesores" :key="profesor.idProfesorAdmis">
            <td>{{ profesor.correo }}</td>
            <td>{{ profesor.nombreyApellido }}</td>
            <td>{{ profesor.dni }}</td>
            <td>{{ profesor.categoria }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaProfesores',
  data() {
    return {
      profesores: []
    }
  },
  mounted() {
    fetch('http://localhost:5009/api/ProfesoresAdmis') // pon aquí tu endpoint real
      .then(response => response.json())
      .then(data => {
        this.profesores = data;
      })
      .catch(error => {
        console.error('Error al obtener profesores:', error);
      });
  }
}
</script>
