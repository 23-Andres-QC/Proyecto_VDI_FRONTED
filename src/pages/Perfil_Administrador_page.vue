<template>
  <q-page class="row justify-start items-start q-pa-md">
    <!-- Contenedor lateral: menú perfil -->
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
      <Perfil_Administrador
        style="width: 100%; height: 100%"
        @menu-button-clicked="handleMenuButtonClicked"
      />
    </div>

    <!-- Contenedor principal -->
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
        background: white;
        overflow-y: auto;
        padding: 20px;
      "
    >
      <!-- Contenido de Administración de Usuarios -->
      <div v-if="mostrarComponente === 'usuario'" style="width: 100%">
        <RegisterUserForm class="q-mb-md" />
        <UserList />
      </div>

      <!-- Otros componentes -->
      <ListaProfesores v-if="mostrarComponente === 'lista'" style="width: 100%; height: 100%" />
      <div v-if="mostrarComponente === 'reportes'" style="width: 100%; height: 100%">
        <ReportesPage style="width: 100%; height: 100%" />
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
import ReportesPage from './ReportesPage.vue'
import RegisterUserForm from 'components/RegisterUserForm.vue'
import UserList from 'components/UserList.vue'

const mostrarComponente = ref('lista')

function handleMenuButtonClicked(menuItem) {
  if (menuItem.id === 1) {
    mostrarComponente.value = 'usuario'
  } else if (menuItem.id === 4) {
    mostrarComponente.value = 'lista'
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
</style>
