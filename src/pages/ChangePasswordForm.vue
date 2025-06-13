<template>
  <q-card class="password-card">
    <q-card-section class="text-center">
      <h5 class="text-h5 q-mb-md">Cambiar contraseña</h5>
      <q-input v-model="currentPassword" filled label="Contraseña actual" class="q-mb-md" />
      <q-input v-model="newPassword" filled label="Nueva contraseña" class="q-mb-md" />
      <q-input
        v-model="confirmPassword"
        filled
        label="Confirmar nueva contraseña"
        class="q-mb-md"
      />
      <div class="row justify-end q-gutter-sm">
        <q-btn label="Cancelar" color="black" flat @click="$emit('close')" />
        <q-btn label="Guardar" color="red" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
</script>

<style scoped>
.password-card {
  width: 400px;
  background: white;
  border-radius: 10px;
  padding: 24px;
}
</style>
