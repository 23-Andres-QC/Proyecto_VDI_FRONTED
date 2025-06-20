<template>
  <div class="contenedor-principal">
    <div class="contenedor-exportar-centrado">
      <input type="text" placeholder="Correo" class="input-correo" />
      <button class="btn-enviar">Enviar</button>
    </div>
    <div class="contenedor-centralizado">
      <TablaISSN ref="tablaRef" @update:filtrados="actualizarTabla" />
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contenedor-exportar-centrado {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Add spacing between input and button */
}
.input-correo {
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
.btn-exportar {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-exportar:hover {
  background-color: #1976d2;
}
</style>

<script setup>
import { ref } from 'vue'
import TablaISSN from 'components/Reportes/Tablas/TablaISSN.vue'

const tablaActual = ref([])

function actualizarTabla(filtrados) {
  tablaActual.value = filtrados
}
</script>
