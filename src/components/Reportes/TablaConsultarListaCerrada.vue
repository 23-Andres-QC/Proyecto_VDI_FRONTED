<template>
  <div class="contenedor-principal">
    <div class="contenedor-centralizado">
      <div class="contenedor-reportes-principal">
        <div class="contenedor-reportes-vertical">
          <div class="contenedor-header-reportes ancho-tabla">
            <div class="contenedor-exportar-centrado">
              <input type="text" placeholder="Correo" class="input-correo" />
              <button class="btn-enviar">Enviar</button>
            </div>
          </div>
          <div class="contenido-reporte ancho-tabla tabla-menos-abajo">
            <div>
              <TablaListCerradaCon ref="tablaRef" @update:filtrados="actualizarTabla" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenedor-principal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full page height */
  width: 100%; /* Full page width */
}
.contenedor-centralizado {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #87ceeb; /* Light blue border */
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
