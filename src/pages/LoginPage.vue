<template>
  <div class="login-bg">
    <div class="login-overlay"></div>
    <div class="login-layout">
      <div class="q-pa-md flex flex-center login-container">
        <q-card class="login-card">
          <q-card-section class="text-center login-header">
            <div class="login-logo">
              <q-icon name="school" size="48px" color="white" />
            </div>
            <h4 class="login-title">ESAN - VDI</h4>
            <h6 class="login-subtitle">Vicerrectorado de Investigación</h6>
            <div class="login-divider"></div>
          </q-card-section>

          <q-card-section class="login-form">
            <q-input
              v-model="username"
              label="Correo Electrónico"
              class="q-mb-md login-input"
              type="email"
              outlined
              color="red"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="red" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              class="q-mb-lg login-input"
              outlined
              color="red"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="red" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                  class="cursor-pointer"
                  color="red"
                />
              </template>
            </q-input>

            <q-btn
              label="Iniciar Sesión"
              color="red"
              class="full-width q-mb-md login-btn"
              unelevated
              size="lg"
              @click="handleLogin"
            />

            <q-btn
              label="Recuperar Contraseña"
              color="grey-8"
              class="full-width q-mb-md forgot-password-btn"
              flat
              size="md"
              @click="showChangePassword = true"
            />

            <!-- Botón para registrarse -->
            <q-btn
              label="Registrarse"
              color="red"
              class="full-width q-mb-md register-btn"
              flat
              size="md"
              @click="showRegister = true"
            />

            <!-- Modal para cambiar contraseña -->
            <q-dialog v-model="showChangePassword">
              <ChangePasswordForm @close="showChangePassword = false" />
            </q-dialog>

            <!-- Modal para registrarse -->
            <q-dialog v-model="showRegister">
              <registrarseComponente @close="showRegister = false" />
            </q-dialog>
          </q-card-section>

          <q-card-section class="login-footer">
            <div class="footer-text">© 2025 Universidad ESAN - Todos los derechos reservados</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import ChangePasswordForm from './ChangePasswordForm.vue'
import registrarseComponente from '../components/registrarseComponente.vue'

const username = ref('')
const password = ref('')
const isPwd = ref(true)
const showChangePassword = ref(false)
const showRegister = ref(false)
const router = useRouter()

async function handleLogin() {
  try {
    const response = await api.post('/api/usuario/signin', {
      correo: username.value,
      contraseña: password.value,
    })

    localStorage.setItem('user_token', response.data.token)
    localStorage.setItem('user_data', JSON.stringify(response.data))
    // Aquí se guarda el idUsuario para usarlo en otras partes de la app
    localStorage.setItem('idUsuario', response.data.idUsuario)
    // Guardar el nombre y apellido del usuario
    localStorage.setItem('nombreyApellido', response.data.nombreyApellido)

    //aqui se guarda el estado del usuario
    localStorage.setItem('estado', response.data.estado)

    if (response.data.idRol === 1) {
      router.push('/perfil-a')
    } else if (response.data.idRol === 2) {
      router.push('/perfil-p')
    } else {
      router.push('/home')
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    if (error.response && error.response.status === 401) {
      alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.')
    } else {
      alert('Ocurrió un error al iniciar sesión. Por favor, inténtelo más tarde.')
    }
  }

  // -----------------------------
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

.login-bg {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  background-size: cover;
  overflow: hidden;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(26, 26, 26, 0.4) 100%
  );
  z-index: 1;
}

.login-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  z-index: 2;
  position: relative;
}

.login-container {
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100vh;
  padding: 2rem;
  background: transparent;
  overflow: hidden;
}

.login-card {
  width: 450px;
  max-width: 95%;
  background: white;
  border-radius: 20px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 3;
  overflow: hidden;
  position: relative;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #dc2626, #b91c1c, #991b1b);
  z-index: 1;
}

.login-header {
  padding: 2.5rem 2rem 1.5rem;
  position: relative;
  z-index: 2;
}

.login-logo {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
}

.login-logo .q-icon {
  color: white !important;
}

.login-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.3px;
}

.login-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #dc2626, #b91c1c);
  border-radius: 2px;
  margin: 0 auto;
}

.login-form {
  padding: 1.5rem 2rem 2rem;
}

.login-input {
  font-family: 'Inter', sans-serif;
}

.login-input .q-field__control {
  border-radius: 12px;
  background: rgba(248, 249, 250, 0.8);
  border: 2px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
}

.login-input.q-field--focused .q-field__control {
  border-color: #dc2626;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.login-input .q-field__label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #6b7280;
}

.login-btn {
  border-radius: 12px;
  height: 48px;
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
}

.forgot-password-btn:hover {
  transform: translateY(-1px);
  text-decoration: underline;
}

.login-footer {
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(229, 231, 235, 0.3);
}

.footer-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 400;
  letter-spacing: 0.2px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-card {
    width: 100%;
    max-width: 100%;
    margin: 1rem;
    border-radius: 16px;
  }

  .login-container {
    padding: 1rem;
  }

  .login-title {
    font-size: 1.6rem;
  }

  .login-subtitle {
    font-size: 0.85rem;
  }
}

/* Animation for card entrance */
.login-card {
  animation: cardEntrance 0.8s ease-out;
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

body,
html {
  overflow: hidden;
  height: 100vh;
}
</style>
