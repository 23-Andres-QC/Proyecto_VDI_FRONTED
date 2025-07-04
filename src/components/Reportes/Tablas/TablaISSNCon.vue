<template>
  <div class="contenedor-tabla-issn" style="width: 1020px; margin: 0 auto; padding: 0">
    <!-- Filtros sin contenedor decorativo, directo en el flujo -->
    <div class="filtros-simples">
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

    <q-table
      :rows="revistasFiltradas"
      :columns="columnas"
      row-key="issn"
      dense
      :pagination="pagination"
      :rows-per-page-options="[10, 20, 50, 100, 0]"
      v-model:pagination="pagination"
      :separator="'cell'"
      :wrap-cells="true"
      style="height: 460px; width: 100%; max-width: 1020px; margin-top: 2px"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props" class="text-center">
            {{ props.pageIndex + 1 }}
          </q-td>
          <q-td key="issn" :props="props">{{ props.row.issn }}</q-td>
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="scopus" :props="props">{{ props.row.scopus }}</q-td>
          <q-td key="woSQ" :props="props">{{ props.row.woSQ }}</q-td>
          <q-td key="woSS" :props="props">{{ props.row.woSS }}</q-td>
          <q-td key="woSEsci" :props="props">{{ props.row.woSEsci }}</q-td>
          <q-td key="esciQ" :props="props">{{ props.row.esciQ }}</q-td>
          <q-td key="ajg4star" :props="props">{{ props.row.ajg4star }}</q-td>
          <q-td key="ajg" :props="props">{{ props.row.ajg }}</q-td>
          <q-td key="ajgS" :props="props">{{ props.row.ajgS }}</q-td>
          <q-td key="cnrs" :props="props">{{ props.row.cnrs }}</q-td>
          <q-td key="cnrsS" :props="props">{{ props.row.cnrsS }}</q-td>
          <q-td key="abdc" :props="props">{{ props.row.abdc }}</q-td>
          <q-td key="abdcS" :props="props">{{ props.row.abdcS }}</q-td>
          <q-td key="alMenosUnaLista" :props="props">{{ props.row.alMenosUnaLista }}</q-td>
          <q-td key="soloUnaLista" :props="props">{{ props.row.soloUnaLista }}</q-td>
          <q-td key="scielo" :props="props">{{ props.row.scielo }}</q-td>
          <q-td key="woSLatam" :props="props">{{ props.row.woSLatam }}</q-td>
          <q-td key="top50" :props="props">{{ props.row.top50 }}</q-td>
          <q-td key="n" :props="props">{{ props.row.n }}</q-td>
          <q-td key="beallsList" :props="props">{{ props.row.beallsList }}</q-td>
          <q-td key="mdpi" :props="props">{{ props.row.mdpi }}</q-td>
          <q-td key="insights" :props="props">{{ props.row.insights }}</q-td>
          <q-td key="ajgExiste" :props="props">{{ props.row.ajgExiste }}</q-td>
          <q-td key="cnrsExiste" :props="props">{{ props.row.cnrsExiste }}</q-td>
          <q-td key="abdcExiste" :props="props">{{ props.row.abdcExiste }}</q-td>
          <q-td key="woSTopExiste" :props="props">{{ props.row.woSTopExiste }}</q-td>
          <q-td key="woSEsciExiste" :props="props">{{ props.row.woSEsciExiste }}</q-td>
          <q-td key="scopusExiste" :props="props">{{ props.row.scopusExiste }}</q-td>
          <q-td key="soloScieloExiste" :props="props">{{ props.row.soloScieloExiste }}</q-td>
          <q-td key="especial216b" :props="props">{{ props.row.especial216b }}</q-td>
          <q-td key="latamSinEsciExiste" :props="props">{{ props.row.latamSinEsciExiste }}</q-td>
          <q-td key="esciScieloSinScopus" :props="props">{{ props.row.esciScieloSinScopus }}</q-td>
          <q-td key="multiple" :props="props">{{ props.row.multiple }}</q-td>
          <q-td key="multidisciplinaryWos" :props="props">{{
            props.row.multidisciplinaryWos
          }}</q-td>
          <q-td key="coautoriaEsan" :props="props">{{ props.row.coautoriaEsan }}</q-td>
          <q-td key="posicionAutor" :props="props">{{ props.row.posicionAutor }}</q-td>
          <q-td key="jif" :props="props">{{ props.row.jif }}</q-td>
          <q-td key="country" :props="props">{{ props.row.country }}</q-td>
          <q-td key="multyAlMenosUnaLista" :props="props">{{
            props.row.multyAlMenosUnaLista
          }}</q-td>
          <q-td key="multidisciplinaryScopus" :props="props">{{
            props.row.multidisciplinaryScopus
          }}</q-td>
          <q-td key="multidisciplinaryWosOScopys" :props="props">{{
            props.row.multidisciplinaryWosOScopys
          }}</q-td>
        </q-tr>
      </template>
    </q-table>
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
      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0,
        sortBy: null,
        descending: false,
      },
      columnas: [
        { name: 'index', label: 'Nr', field: 'index', align: 'center', sortable: false },
        { name: 'issn', label: 'ISSN', field: 'issn', align: 'left', sortable: true },
        { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
        { name: 'scopus', label: 'SCOPUS', field: 'scopus', align: 'left', sortable: true },
        { name: 'woSQ', label: 'WoS (Q)', field: 'woSQ', align: 'left', sortable: true },
        { name: 'woSS', label: 'WoS (S)', field: 'woSS', align: 'left', sortable: true },
        { name: 'woSEsci', label: 'WoS ESCi', field: 'woSEsci', align: 'left', sortable: true },
        { name: 'esciQ', label: 'ESCI Q', field: 'esciQ', align: 'left', sortable: true },
        { name: 'ajg4star', label: 'AJG=4*', field: 'ajg4star', align: 'left', sortable: true },
        { name: 'ajg', label: 'AJG', field: 'ajg', align: 'left', sortable: true },
        { name: 'ajgS', label: 'AJG (S)', field: 'ajgS', align: 'left', sortable: true },
        { name: 'cnrs', label: 'CNRS', field: 'cnrs', align: 'left', sortable: true },
        { name: 'cnrsS', label: 'CNRS (S)', field: 'cnrsS', align: 'left', sortable: true },
        { name: 'abdc', label: 'ABDC', field: 'abdc', align: 'left', sortable: true },
        { name: 'abdcS', label: 'ABDC (S)', field: 'abdcS', align: 'left', sortable: true },
        {
          name: 'alMenosUnaLista',
          label: 'Al menos en una lista',
          field: 'alMenosUnaLista',
          align: 'left',
          sortable: true,
        },
        {
          name: 'soloUnaLista',
          label: 'Solo en una lista',
          field: 'soloUnaLista',
          align: 'left',
          sortable: true,
        },
        { name: 'scielo', label: 'Scielo', field: 'scielo', align: 'left', sortable: true },
        { name: 'woSLatam', label: 'WoS LATAM', field: 'woSLatam', align: 'left', sortable: true },
        { name: 'top50', label: 'TOP50', field: 'top50', align: 'left', sortable: true },
        { name: 'n', label: 'N', field: 'n', align: 'left', sortable: true },
        {
          name: 'beallsList',
          label: "BEALL'S LIST",
          field: 'beallsList',
          align: 'left',
          sortable: true,
        },
        { name: 'mdpi', label: 'MDPI', field: 'mdpi', align: 'left', sortable: true },
        { name: 'insights', label: 'INSIGHTS', field: 'insights', align: 'left', sortable: true },
        {
          name: 'ajgExiste',
          label: 'AJG Existe',
          field: 'ajgExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'cnrsExiste',
          label: 'CNRS Existe',
          field: 'cnrsExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'abdcExiste',
          label: 'ABDC Existe',
          field: 'abdcExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'woSTopExiste',
          label: 'WoS top Existe',
          field: 'woSTopExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'woSEsciExiste',
          label: 'WoS ESCI Existe',
          field: 'woSEsciExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'scopusExiste',
          label: 'Scopus Existe',
          field: 'scopusExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'soloScieloExiste',
          label: 'Solo Scielo Existe',
          field: 'soloScieloExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'especial216b',
          label: '2.1.6B especial',
          field: 'especial216b',
          align: 'left',
          sortable: true,
        },
        {
          name: 'latamSinEsciExiste',
          label: 'Latam sin ESCI Existe',
          field: 'latamSinEsciExiste',
          align: 'left',
          sortable: true,
        },
        {
          name: 'esciScieloSinScopus',
          label: 'ESCI/scielo sin Scupus',
          field: 'esciScieloSinScopus',
          align: 'left',
          sortable: true,
        },
        { name: 'multiple', label: 'Múltiple', field: 'multiple', align: 'left', sortable: true },
        {
          name: 'multidisciplinaryWos',
          label: 'Multidisciplinary WOS',
          field: 'multidisciplinaryWos',
          align: 'left',
          sortable: true,
        },
        {
          name: 'coautoriaEsan',
          label: 'Coautoria ESAN',
          field: 'coautoriaEsan',
          align: 'left',
          sortable: true,
        },
        {
          name: 'posicionAutor',
          label: 'Posición del autor',
          field: 'posicionAutor',
          align: 'left',
          sortable: true,
        },
        { name: 'jif', label: 'JIF', field: 'jif', align: 'left', sortable: true },
        { name: 'country', label: 'Country', field: 'country', align: 'left', sortable: true },
        {
          name: 'multyAlMenosUnaLista',
          label: 'Multy y al menos una lista',
          field: 'multyAlMenosUnaLista',
          align: 'left',
          sortable: true,
        },
        {
          name: 'multidisciplinaryScopus',
          label: 'Multidisciplinary SCOPUS',
          field: 'multidisciplinaryScopus',
          align: 'left',
          sortable: true,
        },
        {
          name: 'multidisciplinaryWosOScopys',
          label: 'Multidisciplinary WOS O SCOPUS',
          field: 'multidisciplinaryWosOScopys',
          align: 'left',
          sortable: true,
        },
      ],
    }
  },
  watch: {
    tipoCalificacionIssn(newVal) {
      this.calificacionIssn = ''
      if (newVal) {
        this.$api
          .get(`/api/Revista/distinct-metadatos/${encodeURIComponent(newVal)}`)
          .then((response) => {
            this.calificacionesIssn = response.data
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
    this.$api
      .get('/api/Revista')
      .then((response) => {
        this.revistas = response.data
      })
      .catch((error) => {
        console.error('Error al obtener revistas:', error)
      })

    this.$api
      .get('/api/Revista/columnas-metadatos')
      .then((response) => {
        this.tiposCalificacionIssn = response.data
      })
      .catch((error) => {
        console.error('Error al obtener tipos de calificación:', error)
      })
  },
}
</script>

<style scoped>
/* Estilos para la tabla QTable */
.q-table {
  width: 500px;
  max-width: 1020px;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 8px;
  font-family: 'Roboto', Arial, sans-serif;
  box-shadow:
    0 4px 24px 0 rgba(33, 150, 243, 0.1),
    0 1.5px 6px 0 rgba(0, 0, 0, 0.07);
}

/* Estilos simplificados para los filtros - sin fondo decorativo */
.filtros-simples {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 8px 0;
  width: 100%;
  max-width: 1020px;
}

.filtro-issn-select,
.filtro-issn-input {
  height: 30px;
  padding: 2px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
  min-width: 180px;
  max-width: calc(33% - 12px);
  background-color: white;
}

.filtro-issn-btn {
  height: 30px;
  padding: 2px 12px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  flex: 0 0 auto;
  min-width: 100px;
}

.filtro-issn-btn:hover {
  background-color: #c62828;
}

/* Contenedor principal - ajustado con spacing adecuado */
.contenedor-tabla-issn {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1020px;
}

/* Reducir espacio entre filas */
:deep(.q-table tr) {
  height: auto !important;
  min-height: 26px !important;
}

/* Ajustar tamaño del texto y espaciado de la paginación */
:deep(.q-table__bottom) {
  padding: 4px 8px;
  font-size: 0.9rem;
  min-height: 36px;
}

.q-table__container {
  min-width: 100%;
}

/* Estilos para cabeceras de tabla */
:deep(.q-table thead tr) {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #e53935;
  color: white;
  height: 32px;
}

:deep(.q-table th) {
  padding: 3px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 120px;
  font-weight: bold;
  background-color: #e53935;
  color: white;
  height: 32px;
  line-height: 32px;
  font-size: 0.95rem;
  vertical-align: middle;
}

:deep(.q-table td) {
  padding: 3px 6px;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  min-width: 120px;
  height: 26px;
  font-size: 0.9rem;
}

/* Columna fija de numeración */
:deep(.q-table th:first-child),
:deep(.q-table td:first-child) {
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: 50px;
  max-width: 50px;
  text-align: center;
  font-weight: bold;
  background-color: #bde3f7;
  padding: 3px 4px;
}

:deep(.q-table th:first-child) {
  background-color: #e53935;
  color: white;
  height: 32px;
  line-height: 32px;
}

/* Columna fija ISSN */
:deep(.q-table th:nth-child(2)),
:deep(.q-table td:nth-child(2)) {
  position: sticky;
  left: 50px;
  z-index: 1;
  min-width: 100px;
  background-color: #bde3f7;
  padding: 3px 6px;
}

:deep(.q-table th:nth-child(2)) {
  background-color: #e53935;
  color: white;
  height: 32px;
  line-height: 32px;
}

/* Columna Nombre */
:deep(.q-table th:nth-child(3)),
:deep(.q-table td:nth-child(3)) {
  min-width: 180px;
  max-width: 220px;
}

/* Estilo para paginación */
:deep(.q-table__bottom) {
  padding: 8px 16px;
  font-weight: bold;
}
</style>
