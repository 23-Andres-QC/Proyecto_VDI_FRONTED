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
            v-for="(message, index) in messages"
            :key="index"
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
                v-for="(faq, index) in faqs"
                :key="index"
                @click="handleFaqClick(faq)"
                :class="[
                  'w-full text-left px-4 py-2 rounded-md transition-colors',
                  faq.clicked
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-300 text-gray-800',
                ]"
              >
                {{ faq.question }}
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
import { ref, nextTick } from 'vue'

export default {
  name: 'ChatBot',
  setup() {
    const isChatOpen = ref(false)
    const isMinimized = ref(false)
    const newMessage = ref('')
    const isTyping = ref(false)
    const messages = ref([])
    const showFaqs = ref(true)
    const defaultFaqs = [
      {
        question: '¿Cómo crear una cuenta?',
        answer: "Haz clic en 'Registrarse', completa el formulario y verifica tu email.",
      },
      {
        question: '¿Métodos de pago disponibles?',
        answer: 'Aceptamos tarjetas de crédito, PayPal y transferencias bancarias.',
      },
      {
        question: '¿Cómo rastrear mi pedido?',
        answer: "Usa el número de seguimiento enviado a tu email en la sección 'Mis pedidos'.",
      },
      {
        question: '¿Política de devoluciones?',
        answer: 'Devoluciones gratuitas dentro de 30 días con productos en estado original.',
      },
    ]
    const faqs = ref([...defaultFaqs])
    const chatMessages = ref(null)

    const openChat = () => {
      isChatOpen.value = true
      isMinimized.value = false
      if (messages.value.length === 0) {
        showFaqs.value = true
        faqs.value = [...defaultFaqs] // <-- restaurar todas las preguntas frecuentes
        messages.value = [
          {
            text: '¡Hola! ¿En qué puedo ayudarte hoy?',
            isUser: false,
          },
        ]
      }
      newMessage.value = ''
    }

    const closeChat = () => {
      isChatOpen.value = false
      isMinimized.value = false
      showFaqs.value = true
      newMessage.value = ''
      messages.value = []
      faqs.value = [...defaultFaqs] // <-- restaurar todas las preguntas frecuentes
    }

    const minimizeChat = () => {
      isChatOpen.value = false
      isMinimized.value = true
    }

    const restoreChat = () => {
      isChatOpen.value = true
      isMinimized.value = false
    }

    const onInput = () => {
      if (newMessage.value.trim() !== '') {
        showFaqs.value = false
      }
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatMessages.value) {
          chatMessages.value.scrollTop = chatMessages.value.scrollHeight
        }
      })
    }

    const handleFaqClick = (faq) => {
      newMessage.value = ''
      // Elimina solo la pregunta seleccionada del array de FAQs
      const idx = faqs.value.findIndex((f) => f.question === faq.question)
      if (idx !== -1) {
        // Marcar la FAQ como clickeada para el color
        faqs.value[idx].clicked = true
        setTimeout(() => {
          faqs.value.splice(idx, 1)
        }, 300) // Pequeño delay para mostrar el color
      }
      messages.value.push({
        text: faq.question,
        isUser: true,
      })
      sendBotResponse(faq.answer, true)
      scrollToBottom()
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return
      showFaqs.value = false
      messages.value.push({
        text: newMessage.value,
        isUser: true,
      })
      const userMsg = newMessage.value
      newMessage.value = ''
      isTyping.value = true
      scrollToBottom()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      isTyping.value = false
      messages.value.push({
        text: getBotResponse(userMsg),
        isUser: false,
      })
      await nextTick()
      scrollToBottom()
    }

    const sendBotResponse = async (answer, isFaqAnswer = false) => {
      isTyping.value = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      isTyping.value = false
      messages.value.push({
        text: answer,
        isUser: false,
        isFaqAnswer, // <-- para fondo negro
      })
      await nextTick()
      scrollToBottom()
    }

    const getBotResponse = (message) => {
      const msg = message.toLowerCase()
      if (msg.includes('hola') || msg.includes('hi')) {
        return '¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte?'
      } else if (msg.includes('producto') || msg.includes('comprar')) {
        return 'Te puedo ayudar con información sobre nuestros productos. ¿Qué te interesa saber?'
      } else if (msg.includes('precio') || msg.includes('costo')) {
        return 'Los precios varían según el producto. ¿Podrías ser más específico sobre qué producto te interesa?'
      } else if (msg.includes('soporte') || msg.includes('ayuda')) {
        return 'Estoy aquí para ayudarte. También puedes contactar a nuestro equipo de soporte técnico.'
      } else if (msg.includes('gracias')) {
        return '¡De nada! ¿Hay algo más en lo que pueda ayudarte?'
      } else {
        return 'Interesante pregunta. Déjame pensar... ¿Podrías darme más detalles para ayudarte mejor?'
      }
    }

    return {
      isChatOpen,
      isMinimized,
      newMessage,
      isTyping,
      messages,
      openChat,
      closeChat,
      minimizeChat,
      restoreChat,
      sendMessage,
      showFaqs,
      faqs,
      handleFaqClick,
      onInput,
      chatMessages,
    }
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
