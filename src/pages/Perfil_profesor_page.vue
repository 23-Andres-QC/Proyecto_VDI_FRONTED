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
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: transparent;
        overflow-y: auto;
      "
    >
      <!-- Componente varios -->
      <revista v-if="mostrarComponente === 'revista'" style="width: 100%; height: 100%" />
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
import revista from 'components/Revista_prueba.vue'
import ConsultarListaCerrada from 'src/components/Reportes/ConsultarListaCerrada.vue'
import ConsultarRevistas from 'src/components/Reportes/ConsultarRevistas.vue'

const mostrarComponente = ref('revista')

function handleMenuButtonClicked(menuItem) {
  if (menuItem.id === 1) {
    mostrarComponente.value = 'revista'
  } else if (menuItem.id === 2) {
    mostrarComponente.value = 'preguntas'
  } else if (menuItem.id === 4) {
    mostrarComponente.value = 'consultarListaCerrada'
  } else if (menuItem.id === 5) {
    mostrarComponente.value = 'consultarRevistas'
  } else {
    mostrarComponente.value = 'lista'
  }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}
</style>
