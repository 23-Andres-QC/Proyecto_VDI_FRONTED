<template>
  <div class="contenedor-tabla-issn" style="width: 1020px; margin: 0 auto; padding: 0">
    <!-- Filtros sin contenedor decorativo, directo en el flujo -->
    <div class="filtros-simples">
      <select v-model="tipoProfesor" class="filtro-issn-select">
        <option disabled value="">Tipo profesores</option>
        <option v-for="tipo in tiposProfesor" :key="tipo" :value="tipo">{{ tipo }}</option>
      </select>
      <input
        v-model="busqueda"
        type="text"
        class="filtro-issn-input"
        placeholder="Buscar en la tabla..."
      />
      <button class="filtro-issn-btn" @click="limpiarFiltros">Limpiar</button>
    </div>

    <q-table
      :rows="profesoresFiltrados"
      :columns="columnas"
      row-key="idProfesorAdmis"
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
          <q-td key="correo" :props="props">{{ props.row.correo }}</q-td>
          <q-td key="nombreyApellido" :props="props">{{ props.row.nombreyApellido }}</q-td>
          <q-td key="dni" :props="props">{{ props.row.dni }}</q-td>
          <q-td key="categoria" :props="props">{{ props.row.categoria }}</q-td>
        </q-tr>
      </template>
    </q-table>
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
        { name: 'correo', label: 'Correos', field: 'correo', align: 'left', sortable: true },
        {
          name: 'nombreyApellido',
          label: 'Trabajador',
          field: 'nombreyApellido',
          align: 'left',
          sortable: true,
        },
        { name: 'dni', label: 'N° Doc', field: 'dni', align: 'left', sortable: true },
        {
          name: 'categoria',
          label: 'Categoria',
          field: 'categoria',
          align: 'left',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    profesoresFiltrados() {
      if (!this.busqueda && !this.tipoProfesor) return this.profesores
      const texto = this.busqueda.toLowerCase()
      return this.profesores.filter((profesor) => {
        const coincideTipo = this.tipoProfesor ? profesor.categoria === this.tipoProfesor : true
        // Filtra por cualquier campo, incluyendo números
        const coincideBusqueda = this.busqueda
          ? Object.values(profesor).some(
              (val) =>
                val !== null && val !== undefined && String(val).toLowerCase().includes(texto),
            )
          : true
        return coincideTipo && coincideBusqueda
      })
    },
  },
  watch: {
    profesoresFiltrados: {
      handler() {
        // Emitir los datos filtrados como array de arrays en el orden de las columnas del Excel
        this.datosFiltrados = this.profesoresFiltrados.map((profesor, index) => [
          index + 1,
          profesor.correo,
          profesor.nombreyApellido,
          profesor.dni,
          profesor.categoria,
        ])
        this.emitirFiltrados()
        // Actualizar número total de filas para paginación
        this.pagination.rowsNumber = this.profesoresFiltrados.length
      },
      deep: true,
    },
  },
  methods: {
    emitirFiltrados() {
      const datosJSON = JSON.stringify(this.datosFiltrados)
      this.$emit('update:filtrados', datosJSON)
    },
    limpiarFiltros() {
      this.tipoProfesor = ''
      this.busqueda = ''
    },
  },
  mounted() {
    // Usar axios desde boot en lugar de fetch
    this.$api
      .get('/api/ProfesoresAdmis')
      .then((response) => {
        this.profesores = response.data
      })
      .catch((error) => {
        console.error('Error al obtener profesores:', error)
      })

    this.$api
      .get('/api/categorias/descripciones')
      .then((response) => {
        this.tiposProfesor = response.data
      })
      .catch((error) => {
        console.error('Error al obtener tipos de profesor:', error)
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

/* Columna fija Correo */
:deep(.q-table th:nth-child(2)),
:deep(.q-table td:nth-child(2)) {
  position: sticky;
  left: 50px;
  z-index: 1;
  min-width: 150px;
  background-color: #bde3f7;
  padding: 3px 6px;
}

:deep(.q-table th:nth-child(2)) {
  background-color: #e53935;
  color: white;
  height: 32px;
  line-height: 32px;
}

/* Columna Trabajador */
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
