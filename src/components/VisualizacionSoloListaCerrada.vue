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
        :wrap-cells="true"
        :virtual-scroll="false"
        :table-style="{
          minWidth: '1100px',
          maxHeight: '340px',
          overflow: 'auto',
          display: 'block',
        }"
        style="min-width: 1100px; margin-bottom: 7px; margin-left: auto; margin-right: auto"
      />
      <div v-else class="no-data">No hay registros en lista cerrada.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'

const props = defineProps({
  busqueda: {
    type: String,
    default: '',
  },
})

const listaCerrada = ref([])

const columnasListaCerrada = [
  { name: 'issn', label: 'ISSN', field: 'issn', align: 'left' },
  { name: 'issN2', label: 'ISSN 2', field: 'issN2', align: 'left' },
  { name: 'issN3', label: 'ISSN 3', field: 'issN3', align: 'left' },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'categoria2', label: 'Categoría', field: 'categoria2', align: 'left' },
  { name: 'puntaje', label: 'Puntaje', field: 'puntaje', align: 'left' },
  { name: 'incentivoUSD', label: 'Incentivo USD', field: 'incentivoUSD', align: 'left' },
  { name: 'scopus', label: 'Scopus', field: 'scopus', align: 'left' },
  { name: 'woS_Q', label: 'WoS (Q)', field: 'woS_Q', align: 'left' },
  { name: 'escI_Q', label: 'ESCI (Q)', field: 'escI_Q', align: 'left' },
  { name: 'ajg', label: 'AJG', field: 'ajg', align: 'left' },
  { name: 'cnrs', label: 'CNRS', field: 'cnrs', align: 'left' },
  { name: 'abdc', label: 'ABDC', field: 'abdc', align: 'left' },
  { name: 'woS_LATAM', label: 'WoS LATAM', field: 'woS_LATAM', align: 'left' },
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
  max-width: 100vw;
  width: 100vw;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.tabla-scroll-estatica {
  width: 100%;
  max-width: 99vw;
  min-width: 0;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.tabla-margen-separador {
  margin-left: 32px !important;
}
.tabla-scrollable {
  overflow-x: auto !important;
  overflow-y: auto !important;
  max-height: 340px !important;
  display: block !important;
}
.custom-table >>> thead tr th {
  background: #e53935 !important;
  color: #fff !important;
  font-weight: bold;
  border-bottom: 2px solid #f5f5f5 !important;
  border-right: 1px solid #f5f5f5 !important;
  text-align: center;
}
.custom-table >>> tbody tr {
  background: #fff;
}
.custom-table >>> tbody tr td {
  border-right: 1px solid #f5f5f5 !important;
  border-bottom: 1px solid #f5f5f5 !important;
  text-align: center;
}
.custom-table >>> tbody tr:nth-child(even) {
  background: #fafafa;
}
.no-data {
  color: #b71c1c;
  font-size: 1.2rem;
  margin: 2rem 0;
}
</style>
