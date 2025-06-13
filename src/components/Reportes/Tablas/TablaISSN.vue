<style src="./StylessTabla.css"></style>

<template>
  <div class="filtro-issn-contenedor tabla-issn-contenedor">
    <div class="tabla-scroll">
      <table class="tabla-issn">
        <thead>
          <tr>
            <th>ISSN</th>
            <th>Nombre</th>
            <th>SCOPUS</th>
            <th>WoS (Q)</th>
            <th>WoS (S)</th>
            <th>WoS ESCi</th>
            <th>ESCI Q</th>
            <th>AJG=4*</th>
            <th>AJG</th>
            <th>AJG (S)</th>
            <th>CNRS</th>
            <th>CNRS (S)</th>
            <th>ABDC</th>
            <th>ABDC (S)</th>
            <th>Al menos en una lista</th>
            <th>Solo en una lista</th>
            <th>Scielo</th>
            <th>WoS LATAM</th>
            <th>TOP50</th>
            <th>N</th>
            <th>BEALL'S LIST</th>
            <th>MDPI</th>
            <th>INSIGHTS</th>
            <th>AJG Existe</th>
            <th>CNRS Existe</th>
            <th>ABDC Existe</th>
            <th>WoS top Existe</th>
            <th>WoS ESCI Existe</th>
            <th>Scopus Existe</th>
            <th>Solo Scielo Existe</th>
            <th>2.1.6B especial</th>
            <th>Latam sin ESCI Existe</th>
            <th>ESCI/scielo sin Scupus</th>
            <th>Múltiple</th>
            <th>Multidisciplinary WOS</th>
            <th>Coautoria ESAN</th>
            <th>Posición del autor</th>
            <th>JIF</th>
            <th>Country</th>
            <th>Multy y al menos una lista</th>
            <th>Multidisciplinary SCOPUS</th>
            <th>Multidisciplinary WOS O SCOPYS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="revista in revistas" :key="revista.issn + revista.nombre">
            <td>{{ revista.issn }}</td>
            <td>{{ revista.nombre }}</td>
            <td>{{ revista.scopus }}</td>
            <td>{{ revista.woSQ }}</td>
            <td>{{ revista.woSS }}</td>
            <td>{{ revista.woSEsci }}</td>
            <td>{{ revista.esciQ }}</td>
            <td>{{ revista.ajg4star }}</td>
            <td>{{ revista.ajg }}</td>
            <td>{{ revista.ajgS }}</td>
            <td>{{ revista.cnrs }}</td>
            <td>{{ revista.cnrsS }}</td>
            <td>{{ revista.abdc }}</td>
            <td>{{ revista.abdcS }}</td>
            <td>{{ revista.alMenosUnaLista }}</td>
            <td>{{ revista.soloUnaLista }}</td>
            <td>{{ revista.scielo }}</td>
            <td>{{ revista.woSLatam }}</td>
            <td>{{ revista.top50 }}</td>
            <td>{{ revista.n }}</td>
            <td>{{ revista.beallsList }}</td>
            <td>{{ revista.mdpi }}</td>
            <td>{{ revista.insights }}</td>
            <td>{{ revista.ajgExiste }}</td>
            <td>{{ revista.cnrsExiste }}</td>
            <td>{{ revista.abdcExiste }}</td>
            <td>{{ revista.woSTopExiste }}</td>
            <td>{{ revista.woSEsciExiste }}</td>
            <td>{{ revista.scopusExiste }}</td>
            <td>{{ revista.soloScieloExiste }}</td>
            <td>{{ revista.especial216b }}</td>
            <td>{{ revista.latamSinEsciExiste }}</td>
            <td>{{ revista.esciScieloSinScopus }}</td>
            <td>{{ revista.multiple }}</td>
            <td>{{ revista.multidisciplinaryWos }}</td>
            <td>{{ revista.coautoriaEsan }}</td>
            <td>{{ revista.posicionAutor }}</td>
            <td>{{ revista.jif }}</td>
            <td>{{ revista.country }}</td>
            <td>{{ revista.multyAlMenosUnaLista }}</td>
            <td>{{ revista.multidisciplinaryScopus }}</td>
            <td>{{ revista.multidisciplinaryWosOScopys }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaISSN',
  data() {
    return {
      revistas: []
    }
  },
  mounted() {
    fetch('http://localhost:5009/api/Revista') // pon aquí tu endpoint real
      .then(response => response.json())
      .then(data => {
        this.revistas = data;
      })
      .catch(error => {
        console.error('Error al obtener revistas:', error);
      });
  }
}
</script>
