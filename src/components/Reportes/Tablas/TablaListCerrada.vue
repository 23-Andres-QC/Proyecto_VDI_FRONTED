<style src="./StylessTabla.css"></style>

<template>
  <div class="contenedor-reporte">
    <div class="filtros-container filtro-reporte">
      <select v-model="tipoCaracteristica" class="combo-box">
        <option disabled value="">Tipo de característica</option>
        <option v-for="tipo in tiposCaracteristica" :key="tipo" :value="tipo">
          {{ tipo }}
        </option>
      </select>
      <select v-model="calificacion" class="combo-box" :disabled="!tipoCaracteristica">
        <option disabled value="">Calificación</option>
        <option v-for="item in calificaciones" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-model="categoria" class="combo-box">
        <option disabled value="">Categoría</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <input v-model="busqueda" type="text" class="filtro-profesores-input" placeholder="Buscar por ISSN, categoría o nombre..." />
      <button class="filtro-issn-btn" @click="limpiarFiltros">Limpiar</button>
    </div>
    <div class="tabla-issn-contenedor">
      <div class="tabla-scroll">
        <table class="tabla-issn">
          <thead>
            <tr>
              <th>ISSN</th>
              <th>ISSN2</th>
              <th>ISSN3</th>
              <th>Nombre</th>
              <th>Categoría</th>
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
            <tr v-for="revista in revistasFiltradas" :key="revista.issn + revista.nombre">
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
      busqueda: ''
    }
  },
  watch: {
    tipoCaracteristica(newVal) {
      this.calificacion = '';
      if (newVal) {
        fetch(`http://localhost:5009/api/Revista/distinct-listacerrada/${encodeURIComponent(newVal)}`)
          .then(response => response.json())
          .then(data => {
            this.calificaciones = data;
          })
          .catch(error => {
            this.calificaciones = [];
            console.error('Error al obtener calificaciones:', error);
          });
      } else {
        this.calificaciones = [];
      }
    }
  },
  computed: {
    revistasFiltradas() {
      return this.revistas.filter(revista => {
        let coincideColumna = true;
        if (this.tipoCaracteristica && this.calificacion) {
          // Buscar la columna ignorando mayúsculas, minúsculas y guiones bajos
          const columna = Object.keys(revista).find(
            key => key.replace(/[_\s]/g, '').toLowerCase() === this.tipoCaracteristica.replace(/[_\s]/g, '').toLowerCase()
          );
          if (!columna) return false;
          const valorColumna = revista[columna];
          coincideColumna = String(valorColumna).trim().toLowerCase() === String(this.calificacion).trim().toLowerCase();
        }
        let coincideCategoria = true;
        if (this.categoria) {
          // Buscar la columna de categoría ignorando formato
          const catCol = Object.keys(revista).find(
            key => key.replace(/[_\s]/g, '').toLowerCase().includes('categoria')
          );
          if (!catCol) return false;
          coincideCategoria = String(revista[catCol]).trim().toLowerCase() === String(this.categoria).trim().toLowerCase();
        }
        // Buscar por ISSN, categoría o nombre
        const texto = this.busqueda.toLowerCase();
        const coincideBusqueda = this.busqueda
          ? (
            String(revista.issn).toLowerCase().includes(texto) ||
            String(revista.nombre).toLowerCase().includes(texto) ||
            String(revista.categoria2).toLowerCase().includes(texto)
          )
          : true;
        return coincideColumna && coincideCategoria && coincideBusqueda;
      });
    }
  },
  methods: {
    limpiarFiltros() {
      this.tipoCaracteristica = '';
      this.calificacion = '';
      this.categoria = '';
      this.busqueda = '';
    }
  },
  mounted() {
    fetch('http://localhost:5009/api/Revista/lcd')
      .then(response => response.json())
      .then(data => {
        this.revistas = data;
      })
      .catch(error => {
        console.error('Error al obtener lista cerrada:', error);
      });
    fetch('http://localhost:5009/api/Revista/columnas-listacerrada')
      .then(response => response.json())
      .then(data => {
        this.tiposCaracteristica = data;
      })
      .catch(error => {
        console.error('Error al obtener tipos de característica:', error);
      });
    fetch('http://localhost:5009/api/Revista/categorias-listacerrada')
      .then(response => response.json())
      .then(data => {
        this.categorias = data;
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }
}
</script>
