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
      <PerfilProfesor
        style="width: 100%; height: 100%"
        @menu-button-clicked="handleMenuButtonClicked"
      />
    </div>

    <!-- Contenedor ancho: componente varios -->
    <div
      class="rounded-borders shadow-2"
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
      <VisualizacionSoloRevistas
        v-if="mostrarComponente === 'revista'"
        style="width: 100%; height: 100%"
      />
      <VisualizacionSoloListaCerrada
        v-if="mostrarComponente === 'listaCerrada'"
        style="width: 100%; height: 100%"
      />
      <!-- Otros componentes -->
      <ListaProfesores v-if="mostrarComponente === 'lista'" style="width: 100%; height: 100%" />
      <div
        v-if="mostrarComponente === 'preguntas'"
        style="width: 100%; display: flex; justify-content: center"
      >
        <varios style="width: 70%" />
      </div>
      <div v-if="mostrarComponente === 'consultarListaCerrada'" style="width: 100%; height: 100%">
        <ConsultarListaCerrada />
      </div>
      <div v-if="mostrarComponente === 'consultarRevistas'" style="width: 100%; height: 100%">
        <ConsultarRevistas />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import PerfilProfesor from 'components/Perfil_Profesor.vue'
import ConsultarListaCerrada from 'src/components/Reportes/ConsultarListaCerrada.vue'
import ConsultarRevistas from 'src/components/Reportes/ConsultarRevistas.vue'
//import VisualizacionSoloRevistas from 'components/VisualizacionSoloRevistas.vue'
//import VisualizacionSoloListaCerrada from 'components/VisualizacionSoloListaCerrada.vue'
//import ListaProfesores from 'components/Lista_profesores.vue'

const mostrarComponente = ref('revista')

function handleMenuButtonClicked(menuItem) {
  if (menuItem.id === 1) {
    mostrarComponente.value = 'consultarListaCerrada'
  } else if (menuItem.id === 2) {
    mostrarComponente.value = 'consultarRevistas'
  } else {
    mostrarComponente.value = 'consultarRevistas'
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}
</style>
