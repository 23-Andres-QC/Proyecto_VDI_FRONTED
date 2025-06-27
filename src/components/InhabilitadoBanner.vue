<template>
  <transition name="fade">
    <div v-if="show" class="inhabilitado-banner">Usted está inhabilitado</div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)

// Permite mostrar el banner desde cualquier parte de la app
window.showInhabilitadoBanner = () => {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 3000)
}
</script>

<style scoped>
.inhabilitado-banner {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #111;
  color: #fff;
  padding: 18px 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  z-index: 9999;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
  opacity: 0.97;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
