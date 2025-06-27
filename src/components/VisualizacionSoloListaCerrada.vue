<template>
  <div class="tabla-margen-centrada">
    <div class="tabla-scroll-estatica tabla-margen-separador">
      <q-table
        v-if="listaCerradaFiltrada.length > 0"
        :rows="listaCerradaFiltrada"
        :columns="columnasListaCerrada"
        row-key="issn"
        dense
        flat
        class="tabla-excel custom-table tabla-scrollable"
        :pagination="pagination"
        v-model:pagination="pagination"
        :rows-per-page-options="[5, 10, 20, 50, 100, 200, 500, 1000]"
        :wrap-cells="false"
        :virtual-scroll="false"
        :table-style="{
          maxWidth: '100%',
          maxHeight: '340px',
          overflow: 'auto',
          display: 'block',
        }"
        style="
          width: 100%;
          max-width: 100%;
          margin-bottom: 10px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 8px;
          overflow: hidden;
        "
      />
      <div v-else class="no-data">No hay registros en lista cerrada.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'boot/axios'

const props = defineProps({
  busqueda: {
    type: String,
    default: '',
  },
})

const listaCerrada = ref([])

const columnasListaCerrada = [
  { name: 'issn', label: 'ISSN', field: 'issn', align: 'left', style: 'width: 80px' },
  { name: 'issN2', label: 'ISSN 2', field: 'issN2', align: 'left', style: 'width: 80px' },
  { name: 'issN3', label: 'ISSN 3', field: 'issN3', align: 'left', style: 'width: 80px' },
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    align: 'left',
    style: 'width: 200px; min-width: 200px;',
  },
  {
    name: 'categoria2',
    label: 'Categoría',
    field: 'categoria2',
    align: 'left',
    style: 'width: 120px',
  },
  { name: 'puntaje', label: 'Puntaje', field: 'puntaje', align: 'left', style: 'width: 70px' },
  {
    name: 'incentivoUSD',
    label: 'Incentivo USD',
    field: 'incentivoUSD',
    align: 'left',
    style: 'width: 90px',
  },
  { name: 'scopus', label: 'Scopus', field: 'scopus', align: 'left', style: 'width: 70px' },
  { name: 'woS_Q', label: 'WoS (Q)', field: 'woS_Q', align: 'left', style: 'width: 70px' },
  { name: 'escI_Q', label: 'ESCI (Q)', field: 'escI_Q', align: 'left', style: 'width: 70px' },
  { name: 'ajg', label: 'AJG', field: 'ajg', align: 'left', style: 'width: 60px' },
  { name: 'cnrs', label: 'CNRS', field: 'cnrs', align: 'left', style: 'width: 60px' },
  { name: 'abdc', label: 'ABDC', field: 'abdc', align: 'left', style: 'width: 60px' },
  {
    name: 'woS_LATAM',
    label: 'WoS LATAM',
    field: 'woS_LATAM',
    align: 'left',
    style: 'width: 80px',
  },
]

const listaCerradaFiltrada = computed(() => {
  if (!props.busqueda) return listaCerrada.value

  const busquedaLower = props.busqueda.toLowerCase()
  return listaCerrada.value.filter(
    (item) =>
      (item.nombre && item.nombre.toLowerCase().includes(busquedaLower)) ||
      (item.issn && item.issn.toLowerCase().includes(busquedaLower)),
  )
})

const fetchListaCerrada = async () => {
  try {
    const { data } = await api.get('/api/Revista/lcd')
    listaCerrada.value = data
  } catch {
    listaCerrada.value = []
  }
}

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})

onMounted(() => {
  fetchListaCerrada()
})
</script>

<style scoped>
.tabla-margen-centrada {
  max-width: 90%;
  width: 90%;
  margin: 20px auto;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.tabla-scroll-estatica {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  overflow: hidden;
}
.tabla-margen-separador {
  margin-left: 0 !important;
}
.tabla-scrollable {
  overflow-x: auto !important;
  overflow-y: auto !important;
  max-height: 340px !important;
  width: 100% !important;
  max-width: 100% !important;
}
.custom-table {
  width: 100% !important;
  max-width: 100% !important;
}
.custom-table >>> .q-table__container {
  width: 100% !important;
  max-width: 100% !important;
}
.custom-table >>> .q-table__middle {
  overflow-x: auto !important;
  width: 100% !important;
  max-width: 100% !important;
}
.custom-table >>> thead tr th {
  background: #e53935 !important;
  color: #fff !important;
  font-weight: bold;
  border-bottom: 2px solid #f5f5f5 !important;
  border-right: 1px solid #f5f5f5 !important;
  text-align: center;
  padding: 8px 4px !important;
  font-size: 0.8rem !important;
  white-space: nowrap;
  vertical-align: middle;
}
/* Encabezado de la columna nombre */
.custom-table >>> thead tr th:nth-child(4) {
  text-align: left !important;
  width: 200px !important;
  min-width: 200px !important;
}
.custom-table >>> tbody tr td {
  border-right: 1px solid #f5f5f5 !important;
  border-bottom: 1px solid #f5f5f5 !important;
  text-align: center;
  padding: 6px 4px !important;
  font-size: 0.75rem !important;
  white-space: normal;
  overflow: visible;
  word-wrap: break-word;
  line-height: 1.2;
  max-width: 150px;
  vertical-align: top;
}
/* Columna de nombre específica para permitir más espacio */
.custom-table >>> tbody tr td:nth-child(4) {
  white-space: normal !important;
  word-wrap: break-word !important;
  max-width: 200px !important;
  text-align: left !important;
  padding: 8px 6px !important;
}
.custom-table >>> tbody tr {
  background: #fff;
}
.custom-table >>> tbody tr:nth-child(even) {
  background: #fafafa;
}
.no-data {
  color: #b71c1c;
  font-size: 1.2rem;
  margin: 2rem 0;
  text-align: center;
  padding: 20px;
}
</style>
