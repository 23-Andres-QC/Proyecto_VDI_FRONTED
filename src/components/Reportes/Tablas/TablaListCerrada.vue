<style src="./StylessTabla.css"></style>

<template>
  <div class="filtro-issn-contenedor tabla-issn-contenedor">
    <div class="tabla-scroll">
      <table class="tabla-issn">
        <thead>
          <tr>
            <th>ISSN</th>
            <th>ISSN2</th>
            <th>ISSN3</th>
            <th>Nombre</th>
            <th>Categoría 2</th>
            <th>Puntaje</th>
            <th>Incentivo (USD)</th>
            <th>SCOPUS</th>
            <th>WoS (Q)</th>
            <th>ESCI Q</th>
            <th>AJG</th>
            <th>CNRS</th>
            <th>ABDC</th>
            <th>WoS LATAM</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="revista in revistas" :key="revista.issn + revista.nombre">
            <td>{{ revista.issn }}</td>
            <td>{{ revista.issN2 }}</td>
            <td>{{ revista.issN3 }}</td>
            <td>{{ revista.nombre }}</td>
            <td>{{ revista.categoria2 }}</td>
            <td>{{ revista.puntaje }}</td>
            <td>{{ revista.incentivoUSD }}</td>
            <td>{{ revista.scopus }}</td>
            <td>{{ revista.woS_Q }}</td>
            <td>{{ revista.escI_Q }}</td>
            <td>{{ revista.ajg }}</td>
            <td>{{ revista.cnrs }}</td>
            <td>{{ revista.abdc }}</td>
            <td>{{ revista.woS_LATAM }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaListCerrada',
  data() {
    return {
      revistas: []
    }
  },
  mounted() {
    fetch('http://localhost:5009/api/Revista/lcd') // pon aquí tu endpoint real
      .then(response => response.json())
      .then(data => {
        this.revistas = data;
      })
      .catch(error => {
        console.error('Error al obtener lista cerrada:', error);
      });

  }
}
</script>
