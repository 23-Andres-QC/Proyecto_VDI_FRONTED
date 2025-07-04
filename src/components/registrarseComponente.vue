<template>
  <div class="register-box">
    <form class="register-form" @submit.prevent="handleRegister">
      <h2 class="register-title">Crear Cuenta</h2>
      <div class="input-group">
        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" required placeholder="ejemplo@email.com" />
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" required placeholder="Contraseña" />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirmar Contraseña</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Repite la contraseña"
          :class="{ 'input-error': errorMsg }"
          @input="onConfirmInput"
          ref="confirmInput"
        />
      </div>
      <button class="register-btn" type="submit">Registrarse</button>
      <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
//import { nextTick } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const confirmInput = ref(null)

const emit = defineEmits(['close'])

function onConfirmInput() {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    confirmInput.value.setCustomValidity('Las contraseñas no coinciden.')
  } else {
    confirmInput.value.setCustomValidity('')
  }
}

function handleRegister() {
  errorMsg.value = ''
  successMsg.value = ''
  // Validación nativa
  if (password.value !== confirmPassword.value) {
    confirmInput.value.setCustomValidity('Las contraseñas no coinciden.')
    confirmInput.value.reportValidity()
    return
  }
  confirmInput.value.setCustomValidity('')
  api
    .post('/api/usuario', {
      correo: email.value,
      contraseña: password.value,
    })
    .then(() => {
      successMsg.value = 'Se registró correctamente.'
      setTimeout(() => {
        emit('close')
      }, 2000)
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg.value = error.response.data.message
      } else {
        errorMsg.value = 'Ocurrió un error al registrar. Intenta nuevamente.'
      }
    })
}
</script>

<style scoped>
.register-box {
  max-width: 555px;
  margin: 40px auto;
  padding: 32px 24px 28px 24px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(220, 38, 38, 0.13);
  color: #111;
}
.register-title {
  text-align: center;
  margin-bottom: 28px;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #111;
}
.input-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}
.input-group label {
  margin-bottom: 6px;
  font-weight: 700;
  color: #222;
}
.input-group input {
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  background: #f1f5f9;
  color: #111;
  font-weight: 600;
  transition: box-shadow 0.2s;
}
.input-group input::placeholder {
  color: #666;
  opacity: 1;
  font-weight: 500;
}
.register-btn {
  width: 100%;
  padding: 12px 0;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
  transition:
    background 0.2s,
    transform 0.2s;
}
.register-btn:hover {
  background: #000;
  transform: translateY(-2px) scale(1.03);
}
.error-msg {
  color: #dc2626;
  font-size: 0.98rem;
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 2px;
}
.success-msg {
  color: #16a34a;
  font-size: 1.05rem;
  font-weight: 700;
  margin-top: 16px;
  text-align: center;
}
</style>
