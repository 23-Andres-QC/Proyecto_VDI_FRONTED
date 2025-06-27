<template>
  <div :class="['tabla-margen-centrada', sinFondo ? 'sin-fondo' : '']">
    <div class="tabla-scroll-wrapper tabla-borde-centrada">
      <q-table
        v-if="revistasFiltradas.length > 0"
        :rows="revistasFiltradas"
        :columns="columnasRevistas"
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
      <div v-else class="no-data">No hay revistas registradas.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { api } from 'boot/axios'

const props = defineProps({
  busqueda: { type: String, default: '' },
  sinFondo: { type: Boolean, default: false },
})

const revistas = ref([])
const busquedaLocal = ref(props.busqueda)

const columnasRevistas = [
  { name: 'issn', label: 'ISSN', field: 'issn', align: 'left', style: 'width: 80px' },
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    align: 'left',
    style: 'width: 200px; min-width: 200px;',
  },
  { name: 'country', label: 'País', field: 'country', align: 'left', style: 'width: 80px' },
  { name: 'multiple', label: '¿Múltiple?', field: 'multiple', align: 'left' },
  { name: 'coautoriaEsan', label: 'Coautor ESAN', field: 'coautoriaEsan', align: 'left' },
  { name: 'posicionAutor', label: 'Posición autor', field: 'posicionAutor', align: 'left' },
  { name: 'jif', label: 'JIF', field: 'jif', align: 'left' },
  { name: 'scopus', label: 'Scopus', field: 'scopus', align: 'left' },
  { name: 'woSQ', label: 'WoS (Q)', field: 'woSQ', align: 'left' },
  { name: 'woSS', label: 'WoS (S)', field: 'woSS', align: 'left' },
  { name: 'woSEsci', label: 'WoS ESCI', field: 'woSEsci', align: 'left' },
  { name: 'esciQ', label: 'ESCI Q', field: 'esciQ', align: 'left' },
  { name: 'ajg4star', label: 'AJG 4*', field: 'ajg4star', align: 'left' },
  { name: 'ajg', label: 'AJG', field: 'ajg', align: 'left' },
  { name: 'ajgS', label: 'AJG (S)', field: 'ajgS', align: 'left' },
  { name: 'cnrs', label: 'CNRS', field: 'cnrs', align: 'left' },
  { name: 'cnrsS', label: 'CNRS (S)', field: 'cnrsS', align: 'left' },
  { name: 'abdc', label: 'ABDC', field: 'abdc', align: 'left' },
  { name: 'abdcS', label: 'ABDC (S)', field: 'abdcS', align: 'left' },
  { name: 'alMenosUnaLista', label: 'Al menos una lista', field: 'alMenosUnaLista', align: 'left' },
  { name: 'soloUnaLista', label: 'Solo una lista', field: 'soloUnaLista', align: 'left' },
  { name: 'scielo', label: 'Scielo', field: 'scielo', align: 'left' },
  { name: 'woSLatam', label: 'WoS Latam', field: 'woSLatam', align: 'left' },
  { name: 'top50', label: 'Top 50', field: 'top50', align: 'left' },
  { name: 'n', label: 'N', field: 'n', align: 'left' },
  { name: 'beallsList', label: 'Beall’s List', field: 'beallsList', align: 'left' },
  { name: 'mdpi', label: 'MDPI', field: 'mdpi', align: 'left' },
  { name: 'insights', label: 'Insights', field: 'insights', align: 'left' },
  { name: 'ajgExiste', label: 'AJG existe', field: 'ajgExiste', align: 'left' },
  { name: 'cnrsExiste', label: 'CNRS existe', field: 'cnrsExiste', align: 'left' },
  { name: 'abdcExiste', label: 'ABDC existe', field: 'abdcExiste', align: 'left' },
  { name: 'woSTopExiste', label: 'WoS Top existe', field: 'woSTopExiste', align: 'left' },
  { name: 'woSEsciExiste', label: 'WoS ESCI existe', field: 'woSEsciExiste', align: 'left' },
  { name: 'scopusExiste', label: 'Scopus existe', field: 'scopusExiste', align: 'left' },
  {
    name: 'soloScieloExiste',
    label: 'Solo Scielo existe',
    field: 'soloScieloExiste',
    align: 'left',
  },
  { name: 'especial216b', label: 'Especial 2.1.6b', field: 'especial216b', align: 'left' },
  {
    name: 'latamSinEsciExiste',
    label: 'Latam sin ESCI existe',
    field: 'latamSinEsciExiste',
    align: 'left',
  },
  {
    name: 'esciScieloSinScopus',
    label: 'ESCI/Scielo sin Scopus',
    field: 'esciScieloSinScopus',
    align: 'left',
  },
  { name: 'multiple', label: 'Multiple', field: 'multiple', align: 'left' },
  {
    name: 'multidisciplinaryWos',
    label: 'Multidisciplinar WoS',
    field: 'multidisciplinaryWos',
    align: 'left',
  },
  {
    name: 'multyAlMenosUnaLista',
    label: 'Multi y al menos una lista',
    field: 'multyAlMenosUnaLista',
    align: 'left',
  },
  {
    name: 'multidisciplinaryScopus',
    label: 'Multidisciplinar Scopus',
    field: 'multidisciplinaryScopus',
    align: 'left',
  },
  {
    name: 'multidisciplinaryWosOScopys',
    label: 'Multidisciplinar WoS/Scopus',
    field: 'multidisciplinaryWosOScopys',
    align: 'left',
  },
]

const revistasFiltradas = computed(() => {
  if (!busquedaLocal.value) return revistas.value
  const filtro = busquedaLocal.value.toLowerCase()
  return revistas.value.filter(
    (r) =>
      (r.nombre && r.nombre.toLowerCase().includes(filtro)) ||
      (r.issn && r.issn.toLowerCase().includes(filtro)),
  )
})

const fetchRevistas = async () => {
  try {
    const { data } = await api.get('/api/Revista')
    revistas.value = data
  } catch {
    revistas.value = []
  }
}

watch(
  () => props.busqueda,
  (nuevo) => {
    busquedaLocal.value = nuevo
  },
)

const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0,
})

onMounted(() => {
  fetchRevistas()
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
.sin-fondo {
  background: transparent !important;
  box-shadow: none !important;
}
.tabla-borde-centrada {
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
.sin-fondo .tabla-borde-centrada {
  background: transparent !important;
  box-shadow: none !important;
}
.tabla-scroll-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
  margin-bottom: 1.5rem;
  background: transparent;
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
.custom-table >>> thead tr th:nth-child(2) {
  text-align: left !important;
  width: 200px !important;
  min-width: 200px !important;
}
.custom-table >>> tbody tr {
  background: #fff;
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
.custom-table >>> tbody tr td:nth-child(2) {
  white-space: normal !important;
  word-wrap: break-word !important;
  max-width: 200px !important;
  text-align: left !important;
  padding: 8px 6px !important;
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
