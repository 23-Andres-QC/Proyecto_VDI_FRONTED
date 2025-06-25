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
        class="tabla-excel custom-table"
        style="min-width: 1100px; margin-bottom: 40px"
        :rows-per-page="20"
      />
      <div v-else class="no-data">No hay revistas registradas.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { api } from 'src/boot/axios'

const props = defineProps({
  busqueda: { type: String, default: '' },
  sinFondo: { type: Boolean, default: false },
})

const revistas = ref([])
const busquedaLocal = ref(props.busqueda)

const columnasRevistas = [
  { name: 'issn', label: 'ISSN', field: 'issn', align: 'left' },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
  { name: 'country', label: 'País', field: 'country', align: 'left' },
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

onMounted(() => {
  fetchRevistas()
})
</script>

<style scoped>
.tabla-margen-centrada {
  max-width: 98vw;
  width: 98vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sin-fondo {
  background: transparent !important;
  box-shadow: none !important;
}
.tabla-borde-centrada {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px 48px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 92%;
}
.sin-fondo .tabla-borde-centrada {
  background: transparent !important;
  box-shadow: none !important;
}
.tabla-scroll-wrapper {
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
  margin-bottom: 1.5rem;
  background: transparent;
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
