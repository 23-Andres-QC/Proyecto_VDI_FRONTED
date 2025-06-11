<template>
  <div>
    <!-- Botón flotante del chat -->
    <div v-if="!isChatOpen && !isMinimized" class="fixed bottom-6 right-6 z-50">
      <button
        @click="openChat"
        class="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </div>
    <!-- Botón flotante minimizado -->
    <div v-if="isMinimized" class="fixed bottom-6 right-6 z-50">
      <button
        @click="restoreChat"
        class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        title="Restaurar chat"
      >
        <!-- Icono de chat con una flecha hacia arriba -->
        <svg class="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 0l-2-2m2 2l2-2"
          />
        </svg>
      </button>
    </div>
    <!-- Panel flotante del chat -->
    <div
      v-if="isChatOpen"
      class="fixed bottom-10 right-6 w-96 max-w-full h-[38rem] rounded-2xl shadow-2xl flex flex-col z-50"
      style="
        min-height: 38rem;
        height: 38rem;
        max-height: 38rem;
        background: url('/src/components/chat_components/image/fondo_chat.jpg') center center/cover
          no-repeat;
      "
    >
      <!-- Header -->
      <div class="flex justify-between items-center p-4 bg-black rounded-t-2xl text-white">
        <!-- Botón minimizar a la izquierda -->
        <button
          @click="minimizeChat"
          class="bg-gray-800 text-orange-400 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors mr-2"
          title="Minimizar"
        >
          <!-- Icono de minimizar (barra horizontal) -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 18" />
          </svg>
        </button>
        <div class="bg-orange-500 px-3 py-1 rounded-full text-sm font-medium">En línea</div>
        <div class="flex items-center space-x-2">
          <!-- Botón cerrar -->
          <button
            @click="closeChat"
            class="bg-gray-800 text-orange-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
            title="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Mensajería -->
      <div
        ref="chatMessages"
        class="flex-1 px-4 pb-4 overflow-y-auto"
        style="height: 100%; min-height: 0; max-height: 100%; overflow-x: hidden"
      >
        <div class="space-y-4 flex-1 flex flex-col justify-end">
          <div
            v-for="(message, idx) in messages"
            :key="idx"
            class="flex"
            :class="message.isUser ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-xs px-4 py-3 rounded-2xl text-white font-medium"
              :class="
                message.isUser
                  ? 'bg-red-700 rounded-br-md' // Pregunta del usuario (input o FAQ) fondo rojo
                  : 'bg-black rounded-bl-md' // Respuesta del bot fondo negro
              "
            >
              {{ message.text }}
            </div>
          </div>
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-black rounded-2xl rounded-bl-md px-4 py-3 text-white">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div
                  class="w-2 h-2 bg-white rounded-full animate-bounce"
                  style="animation-delay: 0.1s"
                ></div>
                <div
                  class="w-2 h-2 bg-white rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                ></div>
              </div>
            </div>
          </div>
          <!-- Preguntas frecuentes (solo si no se ha escrito nada) -->
          <div
            v-if="showFaqs"
            class="w-full mt-4"
            style="background: transparent; border-radius: 0.5rem; padding: 1rem 0.5rem"
          >
            <div
              class="mb-2 font-semibold"
              style="
                color: #fff;
                background: #a12a38;
                border-radius: 0.4rem;
                padding: 0.5rem 1rem;
                width: fit-content;
                margin-bottom: 1rem;
              "
            >
              Preguntas Frecuentes
            </div>
            <div class="space-y-2 flex flex-col items-start">
              <button
                v-for="faq in preguntas"
                :key="faq.id"
                @click="handleFaqClick(faq)"
                :class="[
                  'w-full text-left px-4 py-2 rounded-md transition-colors',
                  faq.clicked
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-300 text-gray-800',
                ]"
              >
                {{ faq.pregunta }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Input SIEMPRE en la base fuera de mensajería y preguntas frecuentes -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center space-x-3">
          <input
            v-model="newMessage"
            @input="onInput"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="Escribe tu pregunta..."
            class="flex-1 px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-x-hidden"
            style="min-width: 0"
          />
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            class="bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'ChatBot',
  data() {
    return {
      isChatOpen: false,
      isMinimized: false,
      newMessage: '',
      isTyping: false,
      messages: [],
      showFaqs: true,
      preguntas: [], // FAQs traídas del API
      loading: false,
      respuesta: '',
    }
  },
  mounted() {
    // Solo inicializa si $api y $q están disponibles
    if (this.$api && this.$q) {
      this.fetchPreguntasFrecuentes()
    }
  },
  //
  methods: {
    // Método para obtener las preguntas frecuentes del API
    // y almacenarlas en el array preguntas
    fetchPreguntasFrecuentes() {
      if (!this.$api || !this.$q) return // Previene error si no está en contexto Quasar
      this.loading = true
      this.$api
        .get('api/preguntasfrecuenteschatbot')
        .then((response) => {
          this.preguntas = response.data.map((p) => ({
            id: p.idPregunta,
            pregunta: p.pregunta,
          }))
        })
        .catch(() => {
          this.$q.notify({ type: 'negative', message: 'Error al cargar preguntas frecuentes.' })
        })
        .finally(() => {
          this.loading = false
        })
    },
    async handleFaqClick(faq) {
      if (!this.$api) return
      this.newMessage = ''
      // Elimina solo la pregunta seleccionada del array de FAQs
      const idx = this.preguntas.findIndex((f) => f.id === faq.id)
      if (idx !== -1) {
        this.preguntas[idx].clicked = true
        setTimeout(() => {
          this.preguntas.splice(idx, 1)
        }, 300)
      }
      this.messages.push({
        text: faq.pregunta,
        isUser: true,
      })
      await this.fetchRespuestaDePreguntaFrecuentes(faq.id)
    },

    // Método para obtener la respuesta de la pregunta frecuente seleccionada
    async fetchRespuestaDePreguntaFrecuentes(id) {
      if (!this.$api) return
      this.isTyping = true
      this.loading = true
      // Mostrar animación de "escribiendo" durante al menos 1 segundo, pero mantenerla si el API demora
      const minTyping = new Promise((resolve) => setTimeout(resolve, 1000))
      const apiPromise = this.$api.get('api/preguntasfrecuenteschatbot/byid/' + id)
      let response
      try {
        response = await Promise.race([
          (async () => {
            await minTyping
            return null
          })(),
          (async () => {
            response = await apiPromise
            return response
          })(),
        ])
        // Espera a que ambas promesas terminen si la API fue más rápida que 1s
        await minTyping
        if (!response) response = await apiPromise
        this.isTyping = false
        this.loading = false
        this.messages.push({
          text: response.data.respuesta,
          isUser: false,
        })
        this.scrollToBottom()
      } catch {
        this.isTyping = false
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Error al cargar respuesta de preguntas frecuentes',
        })
        this.scrollToBottom()
      }
    },

    // Metodo para obtener respuesta cuando se haga una pregunta por input en el chat
    async fetchRespuestaPorInput(pregunta) {
      if (!this.$api) return
      this.isTyping = true
      this.loading = true
      // Mostrar animación de "escribiendo" durante al menos 1 segundo, pero mantenerla si el API demora
      const minTyping = new Promise((resolve) => setTimeout(resolve, 1000))
      const apiPromise = this.$api.get('api/preguntasfrecuenteschatbot/byid/1', {
        params: { pregunta },
      })
      let response
      try {
        response = await Promise.race([
          (async () => {
            await minTyping
            return null
          })(),
          (async () => {
            response = await apiPromise
            return response
          })(),
        ])
        // Espera a que ambas promesas terminen si la API fue más rápida que 1s
        await minTyping
        if (!response) response = await apiPromise
        this.isTyping = false
        this.loading = false
        this.messages.push({
          text: response.data.respuesta || 'No encontré una respuesta exacta, ¿puedes reformular?',
          isUser: false,
        })
        this.scrollToBottom()
      } catch {
        this.isTyping = false
        this.loading = false
        this.messages.push({
          text: 'Ocurrió un error al buscar la respuesta.',
          isUser: false,
        })
        this.scrollToBottom()
      }
    },

    openChat() {
      this.isChatOpen = true
      this.isMinimized = false
      this.showFaqs = true
      this.messages = [
        {
          text: '¡Hola! ¿En qué puedo ayudarte hoy?',
          isUser: false,
        },
      ]
      if (this.$api) this.fetchPreguntasFrecuentes()
      this.newMessage = ''
    },
    closeChat() {
      this.isChatOpen = false
      this.isMinimized = false
      this.showFaqs = true
      this.newMessage = ''
      this.messages = []
      this.preguntas = [] // <-- limpiar preguntas al cerrar
    },
    minimizeChat() {
      this.isChatOpen = false
      this.isMinimized = true
    },
    restoreChat() {
      this.isChatOpen = true
      this.isMinimized = false
    },
    onInput() {
      if (this.newMessage.trim() !== '') {
        this.showFaqs = false
      }
    },
    scrollToBottom() {
      nextTick(() => {
        const el = this.$refs.chatMessages
        if (el) {
          el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth',
          })
        }
      })
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.$api) return
      this.showFaqs = false
      this.messages.push({
        text: this.newMessage,
        isUser: true,
      })
      const userMsg = this.newMessage
      this.newMessage = ''
      this.isTyping = true
      this.scrollToBottom()
      // Llama al método correcto para obtener la respuesta del input
      this.fetchRespuestaPorInput(userMsg)
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
