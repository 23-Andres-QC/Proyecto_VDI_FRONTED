<template>
  <q-card class="password-card">
    <q-card-section class="text-center password-header">
      <div class="password-logo">
        <q-icon name="lock_reset" size="40px" color="white" />
      </div>
      <h5 class="text-h5 q-mb-md password-title">Recuperar contraseña</h5>

      <q-input
        v-model="correo"
        filled
        type="email"
        label="Correo registrado"
        class="q-mb-md password-input"
        outlined
        color="red"
      >
        <template v-slot:prepend>
          <q-icon name="email" color="red" />
        </template>
      </q-input>

      <div class="row justify-end q-gutter-sm">
        <q-btn
          label="Cancelar"
          color="grey-8"
          class="forgot-password-btn"
          flat
          size="md"
          @click="$emit('close')"
        />
        <q-btn
          label="Enviar"
          color="red"
          class="login-btn"
          unelevated
          size="md"
          @click="enviarCorreoRecuperacion"
        />
      </div>
    </q-card-section>

    <!-- Diálogo de confirmación -->
    <q-dialog v-model="dialogVisible">
      <q-card class="q-pa-md">
        <q-card-section class="text-h6">Resultado</q-card-section>
        <q-card-section>{{ mensaje }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const correo = ref('')
const mensaje = ref('')
const dialogVisible = ref(false)

const enviarCorreoRecuperacion = async () => {
  if (!correo.value) {
    mensaje.value = 'Debe ingresar su correo electrónico.'
    dialogVisible.value = true
    return
  }

  try {
    const response = await axios.post('http://localhost:5009/api/usuario/recuperar', {
      correo: correo.value,
    })

    mensaje.value = response.data || 'Correo enviado correctamente.'
  } catch (err) {
    console.error(err)
    mensaje.value =
      err.response?.data || 'No se pudo enviar el correo. Verifique el correo ingresado.'
  }

  dialogVisible.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

.password-card {
  width: 400px;
  max-width: 95%;
  background: white;
  border-radius: 20px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 3;
  overflow: hidden;
  position: relative;
  padding: 0;
  animation: cardEntrance 0.8s ease-out;
}

.password-header {
  padding: 2rem 2rem 1.5rem;
  position: relative;
  z-index: 2;
}

.password-logo {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 50%;
  margin: 0 auto 1.2rem;
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
}

.password-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.password-input {
  font-family: 'Inter', sans-serif;
}

.password-input .q-field__control {
  border-radius: 12px;
  background: rgba(248, 249, 250, 0.8);
  border: 2px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
}

.password-input.q-field--focused .q-field__control {
  border-color: #dc2626;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.password-input .q-field__label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #6b7280;
}

.login-btn {
  border-radius: 12px;
  height: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.3px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
}

.forgot-password-btn {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease;
  border-radius: 12px;
  height: 40px;
}

.forgot-password-btn:hover {
  transform: translateY(-1px);
  text-decoration: underline;
}

@keyframes cardEntrance {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
