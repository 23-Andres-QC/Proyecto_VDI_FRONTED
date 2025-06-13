<template>
  <div class="login-bg">
    <div class="login-layout">
      <div class="q-pa-md flex flex-center login-container">
        <q-card class="login-card">
          <q-card-section class="text-center">
            <h5 class="text-h5 q-mb-md">Inicio de sesión</h5>

            <q-input filled v-model="username" label="Usuario" class="q-mb-md" />
            <q-input
              filled
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              class="q-mb-md"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-btn
              label="Iniciar Sesión"
              color="red"
              class="full-width q-mb-sm"
              unelevated
              @click="handleLogin"
            />

            <div class="text-caption text-center">
              <q-btn
                flat
                label="¿Ha olvidado la contraseña?"
                @click="showChangePassword = true"
                size="sm"
                class="text-grey-7"
              />

              <!-- Modal para cambiar contraseña -->
              <q-dialog v-model="showChangePassword">
                <ChangePasswordForm @close="showChangePassword = false" />
              </q-dialog>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import { api } from 'boot/axios'
import ChangePasswordForm from './ChangePasswordForm.vue'

const username = ref('')
const password = ref('')
const isPwd = ref(true)
const showChangePassword = ref(false)
const router = useRouter()

async function handleLogin() {
  try {
    // 🧪 MODO PRUEBA ACTIVO: solo se usa el correo ingresado para definir el rol
    const correoPrueba = username.value


    // Guardar token y datos simulados en localStorage
    localStorage.setItem('user_token', 'token_prueba_simulado');
    localStorage.setItem('user_data', JSON.stringify({
      correo: correoPrueba,

    }));

    // Redirigir según rol simulado
    if (correoPrueba=== '1') {
      router.push('/perfil-a');
    } else if (correoPrueba === '2') {
      router.push('/perfil-p');
    } else {
      router.push('/home');
    }

  } catch  {
    alert('Error inesperado en la simulación');
  }

  // -----------------------------
  // 🔒 MODO REAL CON API (comentado para pruebas)
  /*
  try {
    const response = await api.post('/api/usuario/signin', {
      correo: username.value,
      contraseña: password.value,
    });

    localStorage.setItem('user_token', response.data.token);
    localStorage.setItem('user_data', JSON.stringify(response.data));

    if (response.data.idRol === 1) {
      router.push('/perfil-a');
    } else if (response.data.idRol === 2) {
      router.push('/perfil-p');
    } else {
      router.push('/home');
    }
  } catch (error) {
    alert('Usuario o contraseña incorrectos');
  }
  */
  // -----------------------------
}

</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background: url('../assets/fondo_login.jpg') center center no-repeat;
  background-size: cover;
  overflow: hidden;
}

.login-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  z-index: 1;
  background: transparent;
}

.login-container {
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  background: transparent;
  overflow: hidden;
}

.login-card {
  width: 400px;
  max-width: 90%;
  background-color: white;
  border-radius: 15px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

body,
html {
  overflow: hidden;
  height: 100vh;
}
</style>
