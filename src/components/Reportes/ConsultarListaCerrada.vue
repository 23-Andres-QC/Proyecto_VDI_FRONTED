<template>
  <div class="contenedor-principal">
    <div class="contenedor-exportar-centrado">
      <input type="text" placeholder="Correo" class="input-correo" />
      <button class="btn-enviar">Enviar</button>
    </div>
    <div class="contenedor-centralizado">
      <TablaListCerradaCon ref="tablaRef" @update:filtrados="actualizarTabla" />
    </div>
  </div>
</template>

<style scoped>
.contenedor-principal {
  height: 100%; /* Full page height */
  width: 100%; /* Full page width */
}
.contenedor-centralizado {
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contenedor-exportar-centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Add spacing between input and button */
}
.input-correo {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 500px;
}
.btn-enviar {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-enviar:hover {
  background-color: #45a049;
}
</style>

<script setup>
import { ref } from 'vue'
import TablaListCerradaCon from 'components/Reportes/Tablas/TablaListCerradaCon.vue'

const tablaActual = ref([])

function actualizarTabla(filtrados) {
  tablaActual.value = filtrados
}
</script>
