<template>
  <div
    class="min-h-screen bg-gray-100 font-['Roboto',sans-serif] flex items-center justify-center p-4"
  >
    <!-- Chat Container -->
    <div class="w-full max-w-md">
      <!-- Chat Widget Button (cuando está cerrado) -->
      <div v-if="!isChatOpen" class="fixed bottom-6 right-6">
        <button
          @click="openChat"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Chat Interface -->
      <div v-if="isChatOpen" class="bg-blue-600 rounded-3xl h-[600px] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 text-white">
          <div class="bg-orange-500 px-3 py-1 rounded-full text-sm font-medium">En línea</div>
          <button
            @click="closeChat"
            class="bg-gray-800 text-orange-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 px-4 pb-4 overflow-y-auto">
          <div class="space-y-4">
            <!-- Message Bubbles -->
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="flex"
              :class="message.isUser ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-xs px-4 py-3 rounded-2xl text-white font-medium"
                :class="message.isUser ? 'bg-gray-800 rounded-br-md' : 'bg-black rounded-bl-md'"
              >
                {{ message.text }}
              </div>
            </div>

            <!-- Typing indicator -->
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
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4">
          <div class="flex items-center space-x-3">
            <input
              v-model="newMessage"
              @keypress.enter="sendMessage"
              type="text"
              placeholder="Escribe tu pregunta..."
              class="flex-1 px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim()"
              class="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section (cuando el chat está cerrado) -->
      <FaqSection v-if="!isChatOpen" @open-chat="openChat" />
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import FaqSection from './FaqSection.vue'

export default {
  name: 'ChatBot',
  components: {
    FaqSection,
  },
  setup() {
    const isChatOpen = ref(false)
    const newMessage = ref('')
    const isTyping = ref(false)
    const messages = ref([
      {
        text: '¡Hola! ¿En qué puedo ayudarte hoy?',
        isUser: false,
      },
    ])

    const openChat = () => {
      isChatOpen.value = true
    }

    const closeChat = () => {
      isChatOpen.value = false
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return

      // Add user message
      messages.value.push({
        text: newMessage.value,
        isUser: true,
      })

      const userMsg = newMessage.value
      newMessage.value = ''

      // Show typing indicator
      isTyping.value = true

      // Simulate bot response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      isTyping.value = false

      // Add bot response
      messages.value.push({
        text: getBotResponse(userMsg),
        isUser: false,
      })

      // Scroll to bottom
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

    const scrollToBottom = () => {
      // This would scroll the messages container to bottom
      // In a real implementation, you'd need a ref to the messages container
    }

    return {
      isChatOpen,
      newMessage,
      isTyping,
      messages,
      openChat,
      closeChat,
      sendMessage,
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
