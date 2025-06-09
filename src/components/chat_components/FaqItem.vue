<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
      @click="toggleOpen"
      class="w-full px-6 py-4 text-left bg-blue-100 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 transition-colors flex justify-between items-center rounded-md"
      style="background-color: #bfdbfe !important;"
      >


      <span class="font-medium text-gray-900">{{ question }}</span>
      <svg
        class="w-5 h-5 text-gray-500 transform transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <Transition name="slide-down">
      <div v-if="isOpen" class="px-6 pb-4">
        <p class="text-gray-600 leading-relaxed">{{ answer }}</p>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FaqItem',
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggleOpen,
    }
  },
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
