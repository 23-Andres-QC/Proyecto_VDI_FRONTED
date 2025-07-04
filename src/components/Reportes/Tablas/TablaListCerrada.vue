<template>
  <div class="contenedor-tabla-issn" style="width: 1020px; margin: 0 auto; padding: 0">
    <!-- Filtros sin contenedor decorativo, directo en el flujo -->
    <div class="filtros-simples">
      <select v-model="tipoCaracteristica" class="filtro-issn-select">
        <option disabled value="">Tipo de característica</option>
        <option v-for="tipo in tiposCaracteristica" :key="tipo" :value="tipo">
          {{ tipo }}
        </option>
      </select>
      <select v-model="calificacion" class="filtro-issn-select" :disabled="!tipoCaracteristica">
        <option disabled value="">Calificación</option>
        <option v-for="item in calificaciones" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-model="categoria" class="filtro-issn-select">
        <option disabled value="">Categoría</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <input
        v-model="busqueda"
        type="text"
        class="filtro-issn-input"
        placeholder="Buscar por ISSN, categoría o nombre..."
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
      style="height: 350px; width: 100%; max-width: 1020px; margin-top: 2px"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props" class="text-center">
            {{ props.pageIndex + 1 }}
          </q-td>
          <q-td key="issn" :props="props">{{ props.row.issn }}</q-td>
          <q-td key="issn2" :props="props">{{ props.row.issN2 }}</q-td>
          <q-td key="issn3" :props="props">{{ props.row.issN3 }}</q-td>
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td key="categoria2" :props="props">{{ props.row.categoria2 }}</q-td>
          <q-td key="puntaje" :props="props">{{ props.row.puntaje }}</q-td>
          <q-td key="incentivoUSD" :props="props">{{ props.row.incentivoUSD }}</q-td>
          <q-td key="scopus" :props="props">{{ props.row.scopus }}</q-td>
          <q-td key="woS_Q" :props="props">{{ props.row.woS_Q }}</q-td>
          <q-td key="escI_Q" :props="props">{{ props.row.escI_Q }}</q-td>
          <q-td key="ajg" :props="props">{{ props.row.ajg }}</q-td>
          <q-td key="cnrs" :props="props">{{ props.row.cnrs }}</q-td>
          <q-td key="abdc" :props="props">{{ props.row.abdc }}</q-td>
          <q-td key="woS_LATAM" :props="props">{{ props.row.woS_LATAM }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'TablaListCerrada',
  data() {
    return {
      revistas: [],
      tipoCaracteristica: '',
      tiposCaracteristica: [],
      calificacion: '',
      calificaciones: [],
      categoria: '',
      categorias: [],
      busqueda: '',
      datosFiltrados: [],
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
        { name: 'issn2', label: 'ISSN2', field: 'issN2', align: 'left', sortable: true },
        { name: 'issn3', label: 'ISSN3', field: 'issN3', align: 'left', sortable: true },
        { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
        {
          name: 'categoria2',
          label: 'Categoría',
          field: 'categoria2',
          align: 'left',
          sortable: true,
        },
        { name: 'puntaje', label: 'Puntaje', field: 'puntaje', align: 'left', sortable: true },
        {
          name: 'incentivoUSD',
          label: 'Incentivo (USD)',
          field: 'incentivoUSD',
          align: 'left',
          sortable: true,
        },
        { name: 'scopus', label: 'SCOPUS', field: 'scopus', align: 'left', sortable: true },
        { name: 'woS_Q', label: 'WoS (Q)', field: 'woS_Q', align: 'left', sortable: true },
        { name: 'escI_Q', label: 'ESCI Q', field: 'escI_Q', align: 'left', sortable: true },
        { name: 'ajg', label: 'AJG', field: 'ajg', align: 'left', sortable: true },
        { name: 'cnrs', label: 'CNRS', field: 'cnrs', align: 'left', sortable: true },
        { name: 'abdc', label: 'ABDC', field: 'abdc', align: 'left', sortable: true },
        {
          name: 'woS_LATAM',
          label: 'WoS LATAM',
          field: 'woS_LATAM',
          align: 'left',
          sortable: true,
        },
      ],
    }
  },
  watch: {
    tipoCaracteristica(newVal) {
      this.calificacion = ''
      if (newVal) {
        this.$api
          .get(`/api/Revista/distinct-listacerrada/${encodeURIComponent(newVal)}`)
          .then((response) => {
            this.calificaciones = response.data
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
        // Emitir los datos filtrados como array de arrays en el orden de las columnas del Excel
        this.datosFiltrados = this.revistasFiltradas.map((revista, index) => [
          index + 1,
          revista.issn,
          revista.issN2,
          revista.issN3,
          revista.nombre,
          revista.categoria2,
          revista.puntaje,
          revista.incentivoUSD,
          revista.scopus,
          revista.woS_Q,
          revista.escI_Q,
          revista.ajg,
          revista.cnrs,
          revista.abdc,
          revista.woS_LATAM,
        ])
        this.emitirFiltrados()
        // Actualizar número total de filas para paginación
        this.pagination.rowsNumber = this.revistasFiltradas.length
      },
      deep: true,
    },
  },
  computed: {
    revistasFiltradas() {
      if (!this.tipoCaracteristica && !this.calificacion && !this.categoria && !this.busqueda) {
        return this.revistas // Mostrar todos los datos si no hay filtros
      }

      return this.revistas.filter((revista) => {
        let coincideColumna = true
        if (this.tipoCaracteristica && this.calificacion) {
          // Buscar la columna ignorando mayúsculas, minúsculas y guiones bajos
          const columna = Object.keys(revista).find(
            (key) =>
              key.replace(/[_\s]/g, '').toLowerCase() ===
              this.tipoCaracteristica.replace(/[_\s]/g, '').toLowerCase(),
          )
          if (!columna) return false
          const valorColumna = revista[columna]
          coincideColumna =
            String(valorColumna).trim().toLowerCase() ===
            String(this.calificacion).trim().toLowerCase()
        }

        let coincideCategoria = true
        if (this.categoria) {
          // Buscar la columna de categoría ignorando formato
          const catCol = Object.keys(revista).find((key) =>
            key.replace(/[_\s]/g, '').toLowerCase().includes('categoria'),
          )
          if (!catCol) return false
          coincideCategoria =
            String(revista[catCol]).trim().toLowerCase() ===
            String(this.categoria).trim().toLowerCase()
        }

        // Buscar por todas las columnas visibles
        const texto = this.busqueda.toLowerCase()
        const coincideBusqueda = this.busqueda
          ? (revista.issn && String(revista.issn).toLowerCase().includes(texto)) ||
            (revista.issN2 && String(revista.issN2).toLowerCase().includes(texto)) ||
            (revista.issN3 && String(revista.issN3).toLowerCase().includes(texto)) ||
            (revista.nombre && String(revista.nombre).toLowerCase().includes(texto)) ||
            (revista.categoria2 && String(revista.categoria2).toLowerCase().includes(texto))
          : true

        return coincideColumna && coincideCategoria && coincideBusqueda
      })
    },
  },
  methods: {
    emitirFiltrados() {
      const datosJSON = JSON.stringify(this.datosFiltrados)
      this.$emit('update:filtrados', datosJSON)
    },
    limpiarFiltros() {
      this.tipoCaracteristica = ''
      this.calificacion = ''
      this.categoria = ''
      this.busqueda = ''
    },
  },
  mounted() {
    // Usar axios desde boot en lugar de fetch
    this.$api
      .get('/api/Revista/lcd')
      .then((response) => {
        this.revistas = response.data
      })
      .catch((error) => {
        console.error('Error al obtener lista cerrada:', error)
      })

    this.$api
      .get('/api/Revista/columnas-listacerrada')
      .then((response) => {
        this.tiposCaracteristica = response.data
      })
      .catch((error) => {
        console.error('Error al obtener tipos de característica:', error)
      })

    this.$api
      .get('/api/Revista/categorias-listacerrada')
      .then((response) => {
        this.categorias = response.data
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error)
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
:deep(.q-table th:nth-child(5)),
:deep(.q-table td:nth-child(5)) {
  min-width: 180px;
  max-width: 220px;
}

/* Estilo para paginación */
:deep(.q-table__bottom) {
  padding: 8px 16px;
  font-weight: bold;
}
</style>
