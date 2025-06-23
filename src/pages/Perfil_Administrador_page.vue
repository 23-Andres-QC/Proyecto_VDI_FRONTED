<template>
  <q-page class="row justify-start items-start q-pa-md">
    <!-- Contenedor delgado: componente de perfil del Administrador -->
    <div
      class="rounded-borders shadow-2 q-mr-md"
      style="
        margin-top: 10px;
        width: 22%;
        height: 400px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
      "
    >
      <!-- Componente de perfil de Administrador -->
      <Perfil_Administrador
        style="width: 100%; height: 100%"
        @menu-button-clicked="handleMenuButtonClicked"
      />
    </div>

    <!-- Contenedor ancho: componente varios -->
    <div
      class="rounded-borders shadow-2 admin-main-container"
      style="
        margin-top: 10px;
        width: 75%;
        min-height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: transparent;
        overflow-y: auto;
      "
    >
      <!-- Administración de revistas -->
      <template v-if="mostrarComponente === 'adminRevistas'">
        <div class="admin-revistas-header admin-revistas-header-margen">
          <q-input
            v-model="busqueda"
            label="Buscar por nombre o ISSN"
            dense
            outlined
            class="busqueda-input"
            @keyup.enter="filtrarTabla"
          />
          <q-btn
            label="Buscar"
            color="primary"
            icon="search"
            class="buscar-btn"
            @click="filtrarTabla"
            style="margin-left: 8px; min-width: 110px"
          />
          <div class="botones-col">
            <q-btn
              v-if="!mostrarImportar"
              label="Importar Revistas"
              color="secondary"
              icon="cloud_upload"
              @click="mostrarImportar = true"
              class="importar-btn"
            />
            <q-btn
              label="Actualizar"
              color="primary"
              icon="refresh"
              @click="actualizarVisualizacion"
              class="actualizar-btn"
            />
          </div>
        </div>
        <ImportarRevistas
          v-if="mostrarImportar"
          @cancelar="cancelarImportacion"
          style="margin-bottom: 16px; width: 100%"
        />
        <div class="tabla-admin-wrapper">
          <VisualizacionSoloRevistas
            ref="visualizacionRef"
            :busqueda="busqueda"
            v-if="!mostrarImportar"
            :sinFondo="true"
          />
        </div>
      </template>
      <!-- Gestión de Listas Cerradas -->
      <template v-if="mostrarComponente === 'adminListaCerrada'">
        <div class="admin-revistas-header admin-revistas-header-margen">
          <q-input
            v-model="busquedaListaCerrada"
            label="Buscar por nombre o ISSN"
            dense
            outlined
            class="busqueda-input"
            @keyup.enter="filtrarTablaListaCerrada"
          />
          <q-btn
            label="Buscar"
            color="primary"
            icon="search"
            class="buscar-btn"
            @click="filtrarTablaListaCerrada"
            style="margin-left: 8px; min-width: 110px"
          />
          <div class="botones-col">
            <q-btn
              v-if="!mostrarImportarListaCerrada"
              label="Importar Lista Cerrada"
              color="secondary"
              icon="cloud_upload"
              @click="mostrarImportarListaCerrada = true"
              class="importar-btn"
            />
            <q-btn
              label="Actualizar"
              color="primary"
              icon="refresh"
              @click="actualizarVisualizacionListaCerrada"
              class="actualizar-btn"
            />
          </div>
        </div>
        <ImportarListaCerrada
          v-if="mostrarImportarListaCerrada"
          @cancelar="cancelarImportacionListaCerrada"
          style="margin-bottom: 16px; width: 100%"
        />
        <div class="tabla-admin-wrapper">
          <VisualizacionSoloListaCerrada
            ref="visualizacionListaCerradaRef"
            :busqueda="busquedaListaCerrada"
            v-if="!mostrarImportarListaCerrada"
            :sinFondo="true"
          />
        </div>
      </template>
      <!-- Gestión de Docentes -->
      <template v-if="mostrarComponente === 'adminDocentes'">
        <div class="admin-revistas-header admin-revistas-header-margen">
          <q-input
            v-model="busquedaDocentes"
            label="Buscar"
            dense
            outlined
            class="busqueda-input"
            @keyup.enter="filtrarTablaDocentes"
          />
          <div class="botones-col">
            <q-btn
              v-if="!mostrarImportarDocentes"
              label="Importar Docentes"
              color="secondary"
              icon="cloud_upload"
              @click="mostrarImportarDocentes = true"
              class="importar-btn"
            />
          </div>
        </div>
        <ImportarDocentes
          v-if="mostrarImportarDocentes"
          @cancelar="cancelarImportacionDocentes"
          style="margin-bottom: 16px; width: 100%"
        />
        <div class="tabla-admin-wrapper">
          <ListaProfesores v-if="!mostrarImportarDocentes" style="width: 100%; height: 100%" />
        </div>
      </template>
      <!-- Otros componentes -->
      <ListaProfesores v-if="mostrarComponente === 'lista'" style="width: 100%; height: 100%" />
      <div v-if="mostrarComponente === 'reportes'" style="width: 100%; height: 100%">
        <TablaDinamicaReportes style="width: 100%; height: 100%" />
      </div>
      <div
        v-if="mostrarComponente === 'preguntas'"
        style="width: 100%; display: flex; justify-content: center"
      >
        <PreguntasFrecuentes style="width: 70%" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import Perfil_Administrador from 'components/Perfil_Administrador.vue'
import ListaProfesores from 'components/Lista_profesores.vue'
import PreguntasFrecuentes from 'components/Preguntas_Frecuentes.vue'
import TablaDinamicaReportes from 'components/Reportes/TablaDinamicaReportes.vue'

import ImportarRevistas from 'components/Importaciones_excel/ImportarRevistas.vue'
import VisualizacionSoloRevistas from 'components/VisualizacionSoloRevistas.vue'
import ImportarListaCerrada from 'components/Importaciones_excel/ImportarListaCerrada.vue'
import VisualizacionSoloListaCerrada from 'components/VisualizacionSoloListaCerrada.vue'
import ImportarDocentes from 'components/Importaciones_excel/ImportarDocentes.vue'

const mostrarComponente = ref('adminRevistas')
const mostrarImportar = ref(false)
const visualizacionRef = ref(null)
const busqueda = ref('')

const mostrarImportarListaCerrada = ref(false)
const visualizacionListaCerradaRef = ref(null)
const busquedaListaCerrada = ref('')

const mostrarImportarDocentes = ref(false)
const busquedaDocentes = ref('')

function cancelarImportacion() {
  mostrarImportar.value = false
}

function actualizarVisualizacion() {
  if (visualizacionRef.value && visualizacionRef.value.actualizarRevistas) {
    visualizacionRef.value.actualizarRevistas()
  }
}

function cancelarImportacionListaCerrada() {
  mostrarImportarListaCerrada.value = false
}

function actualizarVisualizacionListaCerrada() {
  if (
    visualizacionListaCerradaRef.value &&
    visualizacionListaCerradaRef.value.actualizarListaCerrada
  ) {
    visualizacionListaCerradaRef.value.actualizarListaCerrada()
  }
}

function cancelarImportacionDocentes() {
  mostrarImportarDocentes.value = false
}

function filtrarTabla() {
  // El filtrado es reactivo, pero puedes forzar aquí si quieres lógica extra
}

function filtrarTablaListaCerrada() {
  // El filtrado es reactivo, pero puedes forzar aquí si quieres lógica extra
}

function filtrarTablaDocentes() {
  // El filtrado es reactivo, pero puedes forzar aquí si quieres lógica extra
}

// Modificar handleMenuButtonClicked para mostrar la sección correcta
function handleMenuButtonClicked(menuItem) {
  if (menuItem.id === 2) {
    mostrarComponente.value = 'adminRevistas'
  } else if (menuItem.id === 3) {
    mostrarComponente.value = 'adminListaCerrada'
  } else if (menuItem.id === 4) {
    mostrarComponente.value = 'adminDocentes'
  } else if (menuItem.id === 5) {
    mostrarComponente.value = 'reportes'
  } else if (menuItem.id === 6) {
    mostrarComponente.value = 'preguntas'
  } else {
    mostrarComponente.value = ''
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}
.admin-revistas-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.admin-revistas-header-margen {
  margin-top: 2.5rem;
}
.busqueda-input {
  flex: none;
  max-width: 450px;
  width: 350px;
  margin-right: 0.5rem;
}
.buscar-btn {
  min-width: 110px;
  margin-left: 0;
}
.botones-col {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 2rem;
}
.importar-btn {
  min-width: 160px;
}
.actualizar-btn {
  min-width: 120px;
}

/* Ajuste para centrar la tabla y reducir el margen para que sea más escroleable */
.tabla-admin-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 950px;
}

/* Ajuste para centrar la tabla y evitar que esté de borde a borde */
:deep(.tabla-margen-centrada) {
  max-width: 100vw;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
:deep(.tabla-borde-centrada) {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 8px 4px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 100%;
}
:deep(.sin-fondo .tabla-borde-centrada) {
  background: transparent !important;
  box-shadow: none !important;
}
:deep(.tabla-scroll-wrapper) {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
  margin-bottom: 1.5rem;
  background: transparent;
}
</style>
