<style src="./StylessTabla.css"></style>

<template>
  <div class="filtro-issn-contenedor tabla-issn-contenedor">
    <div class="tabla-scroll">
      <table class="tabla-issn">
        <thead>
          <tr>
            <th>idUsuario</th>
            <th>Nombre y Apellido</th>
            <th>Correo</th>
            <th>Id Rol</th>
            <th>Estado</th>
            <th>Fecha Creacion</th>
            <th>Fecha Modificacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
            <td>{{ usuario.idUsuario }}</td>
            <td>{{ usuario.nombreyApellido }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.idRol }}</td>
            <td>{{ usuario.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>{{ formatFecha(usuario.fechaCreacion) }}</td>
            <td>{{ usuario.fechaModificacion ? formatFecha(usuario.fechaModificacion) : 'Sin modificar' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablaUsuarios',
  data() {
    return {
      usuarios: []
    }
  },
  mounted() {
    // Ejemplo usando fetch (puedes cambiar por axios si quieres)
    fetch('http://localhost:5009/api/usuario') // <-- pon aquí tu endpoint real
      .then(response => response.json())
      .then(data => {
        this.usuarios = data;
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  },
  methods: {
    formatFecha(fecha) {
      // Formatea la fecha a formato legible: dd/mm/yyyy hh:mm
      if (!fecha) return '';
      const date = new Date(fecha);
      return date.toLocaleString();
    }
  }
}
</script>
