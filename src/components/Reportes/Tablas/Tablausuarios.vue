<template>
  <div class="contenedor-tabla-issn" style="width: 1020px; margin: 0 auto; padding: 0">
    <!-- Filtros sin contenedor decorativo, directo en el flujo -->
    <div class="filtros-simples">
      <select v-model="estado" class="filtro-issn-select">
        <option disabled value="">Estado</option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>
      <input
        v-model="fechaInicio"
        type="date"
        class="filtro-issn-input"
        placeholder="Fecha inicio"
      />
      <input v-model="fechaFin" type="date" class="filtro-issn-input" placeholder="Fecha fin" />
      <input
        v-model="busqueda"
        type="text"
        class="filtro-issn-input"
        placeholder="Buscar en la tabla..."
      />
      <button class="filtro-issn-btn" @click="limpiarFiltros">Limpiar</button>
    </div>

    <q-table
      :rows="usuariosFiltrados"
      :columns="columnas"
      row-key="idUsuario"
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
          <q-td key="nombreyApellido" :props="props">{{ props.row.nombreyApellido }}</q-td>
          <q-td key="correo" :props="props">{{ props.row.correo }}</q-td>
          <q-td key="estado" :props="props">{{
            props.row.estado === 1 ? 'Activo' : 'Inactivo'
          }}</q-td>
          <q-td key="fechaCreacion" :props="props">{{ formatFecha(props.row.fechaCreacion) }}</q-td>
          <q-td key="fechaModificacion" :props="props">
            {{
              props.row.fechaModificacion
                ? formatFecha(props.row.fechaModificacion)
                : 'Sin modificar'
            }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
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
      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0,
        sortBy: null,
        descending: false,
      },
      columnas: [
        { name: 'index', label: 'Nr', field: 'index', align: 'center', sortable: false },
        {
          name: 'nombreyApellido',
          label: 'Nombre y Apellido',
          field: 'nombreyApellido',
          align: 'left',
          sortable: true,
        },
        { name: 'correo', label: 'Correo', field: 'correo', align: 'left', sortable: true },
        { name: 'estado', label: 'Estado', field: 'estado', align: 'left', sortable: true },
        {
          name: 'fechaCreacion',
          label: 'Fecha Creacion',
          field: 'fechaCreacion',
          align: 'left',
          sortable: true,
        },
        {
          name: 'fechaModificacion',
          label: 'Fecha Modificacion',
          field: 'fechaModificacion',
          align: 'left',
          sortable: true,
        },
      ],
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
        let fechaCreacion = null
        try {
          fechaCreacion = usuario.fechaCreacion ? this.parseFecha(usuario.fechaCreacion) : null
          // Verificar que la fecha es válida
          if (fechaCreacion && isNaN(fechaCreacion.getTime())) {
            console.warn('Fecha de creación inválida:', usuario.fechaCreacion)
            fechaCreacion = null
          }
        } catch (error) {
          console.error('Error al parsear fecha de creación:', error, usuario.fechaCreacion)
        }

        let coincideFechaInicio = true
        let coincideFechaFin = true

        if (this.fechaInicio && fechaCreacion) {
          try {
            const inicio = new Date(this.fechaInicio + 'T00:00:00')
            coincideFechaInicio = fechaCreacion >= inicio
          } catch (error) {
            console.error('Error al comparar fecha inicio:', error)
          }
        }

        if (this.fechaFin && fechaCreacion) {
          try {
            const fin = new Date(this.fechaFin + 'T23:59:59')
            coincideFechaFin = fechaCreacion <= fin
          } catch (error) {
            console.error('Error al comparar fecha fin:', error)
          }
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
        this.datosFiltrados = this.usuariosFiltrados.map((usuario, index) => {
          // Para depurar el problema de fechas
          console.log('Fecha creación original:', usuario.fechaCreacion);
          
          // Intentar formatear fechas consistentemente
          let fechaCreacionFormateada = '';
          let fechaModificacionFormateada = 'Sin modificar';
          
          if (usuario.fechaCreacion) {
            try {
              // Usar el formato de fecha original directamente si tiene el formato correcto
              if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(usuario.fechaCreacion)) {
                fechaCreacionFormateada = usuario.fechaCreacion;
              } else {
                // Intentar parsear la fecha
                const fechaObj = this.parseFecha(usuario.fechaCreacion);
                fechaCreacionFormateada = fechaObj && !isNaN(fechaObj.getTime()) 
                  ? fechaObj.toISOString().replace('T', ' ').split('.')[0]
                  : usuario.fechaCreacion;
              }
            } catch (error) {
              console.error('Error formateando fechaCreacion:', error);
              fechaCreacionFormateada = usuario.fechaCreacion;
            }
          }
          
          if (usuario.fechaModificacion) {
            try {
              // Usar el formato de fecha original directamente si tiene el formato correcto
              if (/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(usuario.fechaModificacion)) {
                fechaModificacionFormateada = usuario.fechaModificacion;
              } else {
                // Intentar parsear la fecha
                const fechaObj = this.parseFecha(usuario.fechaModificacion);
                fechaModificacionFormateada = fechaObj && !isNaN(fechaObj.getTime())
                  ? fechaObj.toISOString().replace('T', ' ').split('.')[0]
                  : usuario.fechaModificacion;
              }
            } catch (error) {
              console.error('Error formateando fechaModificacion:', error);
              fechaModificacionFormateada = usuario.fechaModificacion || 'Sin modificar';
            }
          }
          
          return [
            index + 1,
            usuario.nombreyApellido,
            usuario.correo,
            usuario.estado === 1 ? 'Activo' : 'Inactivo',
            fechaCreacionFormateada,
            fechaModificacionFormateada
          ];
        });
        
        // Registrar los datos filtrados para depuración
        console.log('Datos filtrados para exportación:', this.datosFiltrados);
        
        this.emitirFiltrados()
        // Actualizar número total de filas para paginación
        this.pagination.rowsNumber = this.usuariosFiltrados.length
      },
      deep: true,
    },
    estado: 'emitirFiltrados',
    fechaInicio: 'emitirFiltrados',
    fechaFin: 'emitirFiltrados',
    busqueda: 'emitirFiltrados',
  },
  mounted() {
    // Usar axios desde boot en lugar de fetch
    this.$api
      .get('/api/usuario')
      .then((response) => {
        // Pre-procesar los datos para asegurar que las fechas estén en formato correcto
        const datosFormateados = this.preprocesarDatosApi(response.data);
        this.usuarios = datosFormateados;

        // Verificar formato de fechas para depuración
        if (this.usuarios.length > 0) {
          const primerUsuario = this.usuarios[0];
          console.log('Usuario de muestra:', {
            id: primerUsuario.idUsuario,
            nombre: primerUsuario.nombreyApellido,
            fechaCreacion: primerUsuario.fechaCreacion,
            fechaCreacionOriginal: response.data[0].fechaCreacion,
            fechaFormateada: this.formatFecha(primerUsuario.fechaCreacion)
          });
        }

        this.emitirFiltrados();
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  },
  methods: {
    emitirFiltrados() {
      try {
        // Verificar los datos antes de enviar
        if (!Array.isArray(this.datosFiltrados) || this.datosFiltrados.length === 0) {
          console.warn('Advertencia: No hay datos filtrados para enviar');
        } else {
          // Verificar que las fechas estén correctamente formateadas
          const muestraFechas = this.datosFiltrados.slice(0, 3).map(row => ({ 
            index: row[0], 
            nombre: row[1], 
            fechaCreacion: row[4], 
            fechaModificacion: row[5] 
          }));
          console.log('Muestra de fechas a enviar:', muestraFechas);
        }
        
        const datosJSON = JSON.stringify(this.datosFiltrados)
        this.$emit('update:filtrados', this.datosFiltrados) // Enviar directamente los datos como array
        this.$emit('update:filtrados', datosJSON) // También enviar como JSON por compatibilidad
        
        console.log('Datos enviados para exportación correctamente');
      } catch (error) {
        console.error('Error al emitir datos filtrados:', error);
        this.$emit('update:filtrados', []);
      }
    },
    limpiarFiltros() {
      this.estado = ''
      this.fechaInicio = ''
      this.fechaFin = ''
      this.busqueda = ''
    },
    formatFecha(fecha) {
      if (!fecha) return ''
      
      try {
        // Si la fecha ya tiene el formato correcto de "YYYY-MM-DD HH:MM:SS", usarla directamente
        if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(fecha)) {
          // Para visualización, podemos mejorar el formato
          const partes = fecha.split(' ');
          const fechaParte = partes[0].split('-').reverse().join('/'); // Convertir YYYY-MM-DD a DD/MM/YYYY
          return `${fechaParte} ${partes[1] || ''}`.trim();
        }
        
        // Para otros casos, intentar convertir a Date
        const date = fecha instanceof Date ? fecha : new Date(fecha);
        
        // Verificar que la fecha es válida
        if (isNaN(date.getTime())) {
          console.warn('Fecha inválida para formatear:', fecha);
          return typeof fecha === 'string' ? fecha : '';
        }
        
        // Formatear la fecha para visualización
        const opciones = { 
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        
        return date.toLocaleString('es-ES', opciones);
      } catch (error) {
        console.error('Error al formatear fecha:', error, fecha);
        return typeof fecha === 'string' ? fecha : '';
      }
    },
    parseFecha(fecha) {
      if (!fecha) return null
      if (fecha instanceof Date) return fecha
      
      try {
        // Manejar formato "2025-05-30 21:32:30.487"
        if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(fecha)) {
          // Primero intentamos conservar el formato original para exportación
          const fechaOriginal = fecha;
          
          // Convertir el espacio en T para que sea compatible con ISO para JavaScript
          const isoFecha = fecha.replace(' ', 'T');
          const fechaObj = new Date(isoFecha);
          
          // Verificar si la fecha es válida
          if (!isNaN(fechaObj.getTime())) {
            // Guardamos el formato original para usarlo en exportación
            fechaObj.formatoOriginal = fechaOriginal;
            return fechaObj;
          }
        }
  
        // Si es string tipo dd/mm/yyyy, conviértelo
        if (typeof fecha === 'string' && /\d{1,2}\/\d{1,2}\/\d{4}/.test(fecha)) {
          const [d, m, y] = fecha.split(/[/\s,:-]+/);
          // Si hay hora, min, seg, agrégalo
          if (fecha.includes(':')) {
            const partes = fecha.split(/[/\s,:-]+/);
            // partes: [d, m, y, h, min, s, ...]
            const h = partes[3] || '00';
            const min = partes[4] || '00';
            const s = partes[5] || '00';
            const fechaStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${h.padStart(2, '0')}:${min.padStart(2, '0')}:${s.padStart(2, '0')}`;
            return new Date(fechaStr);
          }
          const fechaStr = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
          return new Date(fechaStr);
        }
  
        // Intentar con Date directamente para formatos estándar
        const fechaObj = new Date(fecha);
        if (!isNaN(fechaObj.getTime())) {
          return fechaObj;
        }
        
        // Si llegamos aquí, no pudimos convertir la fecha
        console.warn('No se pudo parsear la fecha:', fecha);
        return null;
      } catch (error) {
        console.error('Error al parsear fecha:', error, fecha);
        return null;
      }
    },
    preprocesarDatosApi(datos) {
      if (!Array.isArray(datos) || datos.length === 0) return datos;
      
      return datos.map(usuario => {
        // Crear una copia para no modificar el original
        const usuarioFormateado = { ...usuario };
        
        // Asegurarse de que las fechas estén en el formato correcto para exportación
        if (usuarioFormateado.fechaCreacion) {
          // Si ya tiene el formato correcto, mantenerlo
          if (!/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(usuarioFormateado.fechaCreacion)) {
            try {
              // Intentar convertir a Date y luego al formato deseado
              const fecha = new Date(usuarioFormateado.fechaCreacion);
              if (!isNaN(fecha.getTime())) {
                usuarioFormateado.fechaCreacion = fecha.toISOString()
                  .replace('T', ' ')  // Reemplazar T por espacio
                  .split('.')[0];     // Eliminar milisegundos
              }
            } catch (e) {
              console.error('Error al formatear fecha de creación:', e);
            }
          }
        }
        
        // Hacer lo mismo para fechaModificacion
        if (usuarioFormateado.fechaModificacion) {
          if (!/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(usuarioFormateado.fechaModificacion)) {
            try {
              const fecha = new Date(usuarioFormateado.fechaModificacion);
              if (!isNaN(fecha.getTime())) {
                usuarioFormateado.fechaModificacion = fecha.toISOString()
                  .replace('T', ' ')
                  .split('.')[0];
              }
            } catch (e) {
              console.error('Error al formatear fecha de modificación:', e);
            }
          }
        }
        
        return usuarioFormateado;
      });
    },
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
  min-width: 150px;
  max-width: calc(25% - 12px);
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

/* Columna fija Nombre y Apellido */
:deep(.q-table th:nth-child(2)),
:deep(.q-table td:nth-child(2)) {
  position: sticky;
  left: 50px;
  z-index: 1;
  min-width: 180px;
  background-color: #bde3f7;
  padding: 3px 6px;
}

:deep(.q-table th:nth-child(2)) {
  background-color: #e53935;
  color: white;
  height: 32px;
  line-height: 32px;
}

/* Columna Correo */
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
