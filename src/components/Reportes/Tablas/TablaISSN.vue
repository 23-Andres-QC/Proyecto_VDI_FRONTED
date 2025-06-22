<style src="./StylessTabla.css"></style>

<template>
  <div class="contenedor-reporte-issn">
    <div class="filtro-issn-contenedor filtro-reporte">
      <select v-model="tipoCalificacionIssn" class="filtro-issn-select">
        <option disabled value="">Tipo de calificación</option>
        <option v-for="tipo in tiposCalificacionIssn" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
      <select
        v-model="calificacionIssn"
        class="filtro-issn-select"
        :disabled="!tipoCalificacionIssn"
      >
        <option disabled value="">Calificación</option>
        <option v-for="item in calificacionesIssn" :key="item" :value="item">{{ item }}</option>
      </select>

      <input
        v-model="busquedaIssn"
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
      tipoCalificacionIssn: '',
      tiposCalificacionIssn: [],
      calificacionIssn: '',
      calificacionesIssn: [],
      busquedaIssn: '',
      datosFiltradosIssn: [],
    }
  },
  watch: {
    tipoCalificacionIssn(newVal) {
      this.calificacionIssn = ''
      if (newVal) {
        fetch(`http://localhost:5009/api/Revista/distinct-metadatos/${encodeURIComponent(newVal)}`)
          .then((response) => response.json())
          .then((data) => {
            this.calificacionesIssn = data
          })
          .catch((error) => {
            this.calificacionesIssn = []
            console.error('Error al obtener calificaciones:', error)
          })
      } else {
        this.calificacionesIssn = []
      }
    },
    revistasFiltradas: {
      handler() {
        // Emitir los datos filtrados como array de arrays en el orden de las columnas del Excel
        this.datosFiltradosIssn = this.revistasFiltradas.map((revista) => [
          revista.issn,
          revista.nombre,
          revista.scopus,
          revista.woSQ,
          revista.woSS,
          revista.woSEsci,
          revista.esciQ,
          revista.ajg4star,
          revista.ajg,
          revista.ajgS,
          revista.cnrs,
          revista.cnrsS,
          revista.abdc,
          revista.abdcS,
          revista.alMenosUnaLista,
          revista.soloUnaLista,
          revista.scielo,
          revista.woSLatam,
          revista.top50,
          revista.n,
          revista.beallsList,
          revista.mdpi,
          revista.insights,
          revista.ajgExiste,
          revista.cnrsExiste,
          revista.abdcExiste,
          revista.woSTopExiste,
          revista.woSEsciExiste,
          revista.scopusExiste,
          revista.soloScieloExiste,
          revista.especial216b,
          revista.latamSinEsciExiste,
          revista.esciScieloSinScopus,
          revista.multiple,
          revista.multidisciplinaryWos,
          revista.coautoriaEsan,
          revista.posicionAutor,
          revista.jif,
          revista.country,
          revista.multyAlMenosUnaLista,
          revista.multidisciplinaryScopus,
          revista.multidisciplinaryWosOScopys,
        ])
        this.emitirFiltrados()
      },
      deep: true,
    },
  },
  computed: {
    revistasFiltradas() {
      if (!this.tipoCalificacionIssn && !this.calificacionIssn && !this.busquedaIssn) {
        return this.revistas // Mostrar todos los datos si no hay filtros
      }

      return this.revistas.filter((revista) => {
        let coincideColumna = true
        if (this.tipoCalificacionIssn && this.calificacionIssn) {
          const columna = Object.keys(revista).find(
            (key) =>
              key.replace(/[_\s]/g, '').toLowerCase() ===
              this.tipoCalificacionIssn.replace(/[_\s]/g, '').toLowerCase(),
          )

          if (!columna) return false
          const valorColumna = revista[columna]
          coincideColumna =
            String(valorColumna).trim().toLowerCase() ===
            String(this.calificacionIssn).trim().toLowerCase()
        }

        const texto = this.busquedaIssn.toLowerCase()
        const coincideBusqueda = this.busquedaIssn
          ? String(revista.issn).toLowerCase().includes(texto) ||
            String(revista.nombre).toLowerCase().includes(texto)
          : true

        return coincideColumna && coincideBusqueda
      })
    },
  },
  methods: {
    emitirFiltrados() {
      const datosJSON = JSON.stringify(this.datosFiltradosIssn)
      this.$emit('update:filtrados', datosJSON)
    },
    limpiarFiltros() {
      this.tipoCalificacionIssn = ''
      this.calificacionIssn = ''
      this.busquedaIssn = ''
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
        this.tiposCalificacionIssn = data
      })
      .catch((error) => {
        console.error('Error al obtener tipos de calificación:', error)
      })
  },
}
</script>
