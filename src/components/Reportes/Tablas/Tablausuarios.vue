<style src="./StylessTabla.css"></style>

<template>
  <div class="contenedor-reporte-usuarios">
    <div class="filtros-contenedor filtro-reporte filtro-reporte-una-fila">
      <select v-model="estado" class="filtro-select">
        <option disabled value="">Estado</option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>
      <input v-model="fechaInicio" type="date" class="filtro-input" placeholder="Fecha inicio" />
      <input v-model="fechaFin" type="date" class="filtro-input" placeholder="Fecha fin" />
      <input
        v-model="busqueda"
        type="text"
        class="filtro-usuarios-input"
        placeholder="Buscar en la tabla..."
      />
      <button class="filtro-issn-btn" @click="limpiarFiltros">Limpiar</button>
    </div>
    <div class="tabla-usuarios-contenedor">
      <div class="tabla-scroll">
        <table class="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre y Apellido</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Fecha Creacion</th>
              <th>Fecha Modificacion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.idUsuario">
              <td>{{ usuario.nombreyApellido }}</td>
              <td>{{ usuario.correo }}</td>
              <td>{{ usuario.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
              <td>{{ formatFecha(usuario.fechaCreacion) }}</td>
              <td>
                {{
                  usuario.fechaModificacion
                    ? formatFecha(usuario.fechaModificacion)
                    : 'Sin modificar'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaUsuarios',
  data() {
    return {
      usuarios: [],
      estado: '',
      fechaInicio: '',
      fechaFin: '',
      busqueda: '',
      datosFiltrados: [],
    }
  },
  computed: {
    usuariosFiltrados() {
      return this.usuarios.filter((usuario) => {
        // Filtro por estado
        const coincideEstado = this.estado
          ? this.estado === 'Activo'
            ? usuario.estado === 1
            : usuario.estado !== 1
          : true
        // Filtro por fechas (solo si hay valor en el campo y el dato existe)
        const fechaCreacion = usuario.fechaCreacion ? this.parseFecha(usuario.fechaCreacion) : null
        let coincideFechaInicio = true
        let coincideFechaFin = true
        if (this.fechaInicio && fechaCreacion) {
          const inicio = new Date(this.fechaInicio + 'T00:00:00')
          coincideFechaInicio = fechaCreacion >= inicio
        }
        if (this.fechaFin && fechaCreacion) {
          const fin = new Date(this.fechaFin + 'T23:59:59')
          coincideFechaFin = fechaCreacion <= fin
        }
        // Filtro por texto en cualquier campo
        const texto = this.busqueda.toLowerCase()
        const coincideBusqueda = this.busqueda
          ? Object.values(usuario).some(
              (val) =>
                val !== null && val !== undefined && String(val).toLowerCase().includes(texto),
            )
          : true
        return coincideEstado && coincideFechaInicio && coincideFechaFin && coincideBusqueda
      })
    },
  },
  watch: {
    usuariosFiltrados: {
      handler() {
        // Siempre emitir los datos filtrados como array de valores (en el orden de las columnas del Excel)
        this.datosFiltrados = this.usuariosFiltrados.map((usuario) => [
          usuario.nombreyApellido,
          usuario.correo,
          usuario.estado === 1 ? 'Activo' : 'Inactivo',
          this.formatFecha(usuario.fechaCreacion),
          usuario.fechaModificacion ? this.formatFecha(usuario.fechaModificacion) : 'Sin modificar',
        ])
        this.emitirFiltrados()
      },
      deep: true,
    },
    estado: 'emitirFiltrados',
    fechaInicio: 'emitirFiltrados',
    fechaFin: 'emitirFiltrados',
    busqueda: 'emitirFiltrados',
  },
  mounted() {
    // Ejemplo usando fetch (puedes cambiar por axios si quieres)
    fetch('http://localhost:5009/api/usuario') // <-- pon aquí tu endpoint real
      .then((response) => response.json())
      .then((data) => {
        this.usuarios = data
        this.emitirFiltrados()
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error)
      })
  },
  methods: {
    emitirFiltrados() {
      const datosJSON = JSON.stringify(this.datosFiltrados)
      this.$emit('update:filtrados', datosJSON)
    },
    limpiarFiltros() {
      this.estado = ''
      this.fechaInicio = ''
      this.fechaFin = ''
      this.busqueda = ''
    },
    formatFecha(fecha) {
      if (!fecha) return ''
      const date = new Date(fecha)
      return date.toLocaleString()
    },
    parseFecha(fecha) {
      if (!fecha) return null
      if (fecha instanceof Date) return fecha
      // Si es string tipo dd/mm/yyyy, conviértelo
      if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(fecha)) {
        const [d, m, y] = fecha.split(/[/\s,:-]+/)
        // Si hay hora, min, seg, agrégalo
        if (fecha.includes(':')) {
          const partes = fecha.split(/[/\s,:-]+/)
          // partes: [d, m, y, h, min, s, ...]
          const h = partes[3] || '00'
          const min = partes[4] || '00'
          const s = partes[5] || '00'
          return new Date(
            `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${h.padStart(2, '0')}:${min.padStart(2, '0')}:${s.padStart(2, '0')}`,
          )
        }
        return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`)
      }
      // Si es ISO o similar
      return new Date(fecha)
    },
  },
}
</script>
