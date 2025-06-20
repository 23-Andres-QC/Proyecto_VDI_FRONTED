<style src="./StylessTabla.css"></style>

<template>
  <div class="contenedor-reporte">
    <div class="filtro-issn-contenedor filtro-reporte">
      <select v-model="tipoCalificacion" class="filtro-issn-select">
        <option disabled value="">Tipo de calificación</option>
        <option v-for="tipo in tiposCalificacion" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
      <select v-model="calificacion" class="filtro-issn-select" :disabled="!tipoCalificacion">
        <option disabled value="">Calificación</option>
        <option v-for="item in calificaciones" :key="item" :value="item">{{ item }}</option>
      </select>

      <input
        v-model="busqueda"
        type="text"
        class="filtro-issn-input"
        placeholder="Buscar por ISSN o nombre"
      />
      <button class="filtro-issn-btn" @click="limpiarFiltros">Limpiar</button>
    </div>
    <div class="tabla-issn-contenedor">
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
            <tr v-for="revista in revistasFiltradas" :key="revista.issn + revista.nombre">
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
  </div>
</template>

<script>
export default {
  name: 'TablaISSN',
  data() {
    return {
      revistas: [],
      tipoCalificacion: '',
      tiposCalificacion: [],
      calificacion: '',
      calificaciones: [],
      busqueda: '',
      datosFiltrados: [],
    }
  },
  watch: {
    tipoCalificacion(newVal) {
      this.calificacion = ''
      if (newVal) {
        fetch(`http://localhost:5009/api/Revista/distinct-metadatos/${encodeURIComponent(newVal)}`)
          .then((response) => response.json())
          .then((data) => {
            this.calificaciones = data
          })
          .catch((error) => {
            this.calificaciones = []
            console.error('Error al obtener calificaciones:', error)
          })
      } else {
        this.calificaciones = []
      }
    },
    revistasFiltradas: {
      handler() {
        this.datosFiltrados = this.revistasFiltradas.map((revista) => ({
          issn: revista.issn,
          nombre: revista.nombre,
          scopus: revista.scopus,
          woSQ: revista.woSQ,
          woSS: revista.woSS,
          woSEsci: revista.woSEsci,
          esciQ: revista.esciQ,
          ajg4star: revista.ajg4star,
          ajg: revista.ajg,
          ajgS: revista.ajgS,
          cnrs: revista.cnrs,
          cnrsS: revista.cnrsS,
          abdc: revista.abdc,
          abdcS: revista.abdcS,
          alMenosUnaLista: revista.alMenosUnaLista,
          soloUnaLista: revista.soloUnaLista,
          scielo: revista.scielo,
          woSLatam: revista.woSLatam,
          top50: revista.top50,
        }))
        this.emitirFiltrados() // Emitir los datos filtrados cada vez que cambien
      },
      deep: true,
    },
  },
  computed: {
    revistasFiltradas() {
      return this.revistas.filter((revista) => {
        let coincideColumna = true
        if (this.tipoCalificacion && this.calificacion) {
          // Buscar la columna ignorando mayúsculas, minúsculas y guiones bajos
          const columna = Object.keys(revista).find(
            (key) =>
              key.replace(/[_\s]/g, '').toLowerCase() ===
              this.tipoCalificacion.replace(/[_\s]/g, '').toLowerCase(),
          )

          if (!columna) return false
          const valorColumna = revista[columna]
          coincideColumna =
            String(valorColumna).trim().toLowerCase() ===
            String(this.calificacion).trim().toLowerCase()
        }

        // Buscar solo por ISSN o nombre
        const texto = this.busqueda.toLowerCase()
        const coincideBusqueda = this.busqueda
          ? String(revista.issn).toLowerCase().includes(texto) ||
            String(revista.nombre).toLowerCase().includes(texto)
          : true

        return coincideColumna && coincideBusqueda
      })
    },
  },
  methods: {
    emitirFiltrados() {
      const datosJSON = JSON.stringify(this.listaFiltrada);
      console.log('Datos emitidos como JSON:', datosJSON);
      this.$emit('update:filtrados', datosJSON);
    },
    limpiarFiltros() {
      this.tipoCalificacion = ''
      this.calificacion = ''
      this.busqueda = ''
    },
  },
  mounted() {
    fetch('http://localhost:5009/api/Revista')
      .then((response) => response.json())
      .then((data) => {
        this.revistas = data
      })
      .catch((error) => {
        console.error('Error al obtener revistas:', error)
      })

    fetch('http://localhost:5009/api/Revista/columnas-metadatos')
      .then((response) => response.json())
      .then((data) => {
        this.tiposCalificacion = data
      })
      .catch((error) => {
        console.error('Error al obtener tipos de calificación:', error)
      })
  },
}
</script>
