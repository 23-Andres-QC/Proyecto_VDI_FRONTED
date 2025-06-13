<template>
  <div class="login-layout">
    <!-- Encabezado superior con logo -->
    <div class="top-bar row justify-between items-center q-px-md q-py-sm">
      <img src="/img/logo-esan-blanco.png" alt="Logo ESAN" class="logo" />
    </div>

    <!-- Contenedor principal -->
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

          <q-btn label="Iniciar Sesión" color="red" class="full-width q-mb-sm" unelevated />

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

    <!-- Pie de página -->
    <footer class="footer">© Universidad ESAN | Alonso de Molina 1652, Surco, Lima, Perú</footer>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const isPwd = ref(true)
</script>
<style scoped>
.login-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-bar {
  background-color: #d00000;
  height: 60px;
}

.logo {
  height: 40px;
}

.login-container {
  flex: 1;
  background: url('/img/background-login.jpg') no-repeat center center fixed;
  background-size: cover;
}

.login-card {
  width: 400px;
  max-width: 90%;
  background-color: white;
  border-radius: 15px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.footer {
  background-color: black;
  color: white;
  text-align: center;
  font-size: 0.8rem;
  padding: 10px;
}
</style>
