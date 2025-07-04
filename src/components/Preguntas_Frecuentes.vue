<template>
  <div class="notifications-container">
    <div class="header-section">
      <q-btn
        :label="creandoPregunta ? 'Guardar' : 'Crear pregunta frecuente'"
        color="primary"
        @click="creandoPregunta ? guardarPregunta() : (creandoPregunta = true)"
        class="q-mb-md"
      />
    </div>
    <div
      v-if="creandoPregunta"
      class="q-pa-md"
      style="
        background: #fff;
        border-radius: 8px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      "
    >
      <q-input v-model="nuevaPregunta" label="Pregunta" dense autofocus class="q-mb-sm" />
      <q-input
        v-model="nuevaRespuesta"
        label="Respuesta"
        type="textarea"
        autogrow
        dense
        class="q-mb-sm"
      />
    </div>
    <!-- Lista de preguntas -->
    <div class="notifications-list">
      <q-card v-for="pregunta in preguntas" :key="pregunta.id" class="notification-card">
        <q-card-section
          class="card-header"
          @click="handleExpandirPregunta(pregunta.id)"
          style="cursor: pointer"
        >
          <div class="user-info">
            <q-avatar size="sm" class="user-avatar">
              <q-icon name="help_outline" />
            </q-avatar>
            <span class="user-name">{{ pregunta.pregunta }}</span>
          </div>
          <div class="flex items-center gap-2" @click.stop>
            <q-btn
              flat
              dense
              round
              icon="edit"
              size="sm"
              @click="toggleEditar(pregunta.id)"
              class="close-btn"
              :label="editandoId === pregunta.id ? 'Guardar' : ''"
              :color="editandoId === pregunta.id ? 'primary' : ''"
            />
            <q-btn
              v-if="editandoId === pregunta.id"
              flat
              dense
              round
              icon="delete"
              size="sm"
              color="negative"
              @click="showDeleteModal(pregunta.id)"
              class="close-btn"
            />
          </div>
        </q-card-section>
        <q-card-section v-if="preguntaExpandidaId === pregunta.id" class="card-content">
          <p class="message-text">
            <span v-if="respuestaExpandidaLoading">Cargando respuesta...</span>
            <span v-else>{{ respuestaExpandida }}</span>
          </p>
        </q-card-section>
        <q-card-section class="card-content">
          <q-input
            v-if="editandoId === pregunta.id"
            v-model="preguntaEdit"
            type="textarea"
            autogrow
            label="Pregunta"
            dense
            autofocus
            @blur="onBlurPregunta"
            @focus="onFocusPregunta"
            class="pregunta-edit"
          />
          <!-- Solo mostrar la pregunta aquí si está en modo edición -->
        </q-card-section>

        <q-card-section v-if="editandoId === pregunta.id" class="card-content">
          <div v-if="respuestaLoading" class="q-mb-sm">Cargando respuesta...</div>
          <div v-else>
            <q-input
              v-model="respuestaEdit"
              type="textarea"
              autogrow
              label="Respuesta"
              @blur="onBlurRespuesta"
              @focus="onFocusRespuesta"
              class="respuesta-edit"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <ConfirmModal
      v-if="deleteModalOpen"
      :title="'Confirmar eliminación'"
      :message="'¿Estás seguro de que deseas eliminar esta pregunta?'"
      @confirm="confirmDelete"
      @cancel="deleteModalOpen = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { api } from 'src/boot/axios.js'
import ConfirmModal from './ConfirmModal.vue'

export default defineComponent({
  name: 'PreguntasFrecuentesComponent',
  components: { ConfirmModal },
  setup() {
    const preguntas = ref([])
    const loading = ref(false)
    const editandoId = ref(null)
    const respuestaEdit = ref('')
    const respuestaLoading = ref(false)
    const preguntaEdit = ref('')
    const deleteModalOpen = ref(false)
    const deleteId = ref(null)
    const creandoPregunta = ref(false)
    const nuevaPregunta = ref('')
    const nuevaRespuesta = ref('')
    const preguntaExpandidaId = ref(null)
    const respuestaExpandida = ref('')
    const respuestaExpandidaLoading = ref(false)
    // Obtener el IdUsuario del usuario logueado
    const IdUsuario =
      localStorage.getItem('idUsuario') || window?.$q?.sessionStorage?.getItem('IdUsuario') // fallback demo
    let blurTimeout = null
    let preguntaFocus = false
    let respuestaFocus = false

    // Traer preguntas desde la API al montar
    onMounted(async () => {
      loading.value = true
      try {
        const response = await api.get('api/preguntasfrecuenteschatbot')
        preguntas.value = response.data.reverse().map((p) => ({
          id: p.idPregunta,
          pregunta: p.pregunta,
        }))
      } catch {
        if (window.$q)
          window.$q.notify({ type: 'negative', message: 'Error al cargar preguntas frecuentes.' })
      } finally {
        loading.value = false
      }
    })

    const toggleEditar = async (id) => {
      if (editandoId.value === id) {
        // Guardar respuesta y pregunta REAL en backend
        respuestaLoading.value = true
        const idx = preguntas.value.findIndex((p) => p.id === id)
        try {
          await api.put('api/preguntasfrecuenteschatbot', {
            IdPregunta: id,
            Pregunta: preguntaEdit.value,
            Respuesta: respuestaEdit.value,
          })
          if (idx !== -1) {
            preguntas.value[idx].pregunta = preguntaEdit.value
          }
          editandoId.value = null
          respuestaEdit.value = ''
          preguntaEdit.value = ''
          if (window.$q)
            window.$q.notify({ type: 'positive', message: 'Pregunta y respuesta actualizadas.' })
        } catch {
          if (window.$q) window.$q.notify({ type: 'negative', message: 'Error al actualizar.' })
        } finally {
          respuestaLoading.value = false
        }
      } else {
        // Traer respuesta de la API y setear pregunta editable
        respuestaLoading.value = true
        editandoId.value = id
        const preguntaObj = preguntas.value.find((p) => p.id === id)
        preguntaEdit.value = preguntaObj ? preguntaObj.pregunta : ''
        respuestaEdit.value = ''
        try {
          const resp = await api.get(`api/preguntasfrecuenteschatbot/byid/${id}`)
          respuestaEdit.value = resp.data.respuesta || ''
        } catch {
          respuestaEdit.value = ''
          if (window.$q)
            window.$q.notify({ type: 'negative', message: 'Error al cargar la respuesta.' })
        } finally {
          respuestaLoading.value = false
        }
      }
    }

    const showDeleteModal = (id) => {
      deleteId.value = id
      deleteModalOpen.value = true
    }
    const confirmDelete = async () => {
      const id = deleteId.value
      deleteModalOpen.value = false
      if (!id) return
      try {
        await api.delete(`api/preguntasfrecuenteschatbot/${id}`)
        preguntas.value = preguntas.value.filter((p) => p.id !== id)
        if (window.$q)
          window.$q.notify({ type: 'positive', message: 'Pregunta eliminada correctamente.' })
      } catch {
        if (window.$q)
          window.$q.notify({ type: 'negative', message: 'Error al eliminar la pregunta.' })
      } finally {
        deleteId.value = null
      }
    }

    const guardarPregunta = async () => {
      if (!nuevaPregunta.value.trim() || !nuevaRespuesta.value.trim()) {
        if (window.$q) window.$q.notify({ type: 'warning', message: 'Completa ambos campos.' })
        return
      }
      try {
        const response = await api.post('api/preguntasfrecuenteschatbot', {
          Pregunta: nuevaPregunta.value,
          Respuesta: nuevaRespuesta.value,
          IdUsuario: Number(IdUsuario),
        })
        if (window.$q) window.$q.notify({ type: 'positive', message: 'Pregunta creada.' })
        creandoPregunta.value = false
        // Agregar la nueva pregunta al inicio de la lista
        preguntas.value.unshift({
          id: response.data.idPregunta || response.data.id || Date.now(),
          pregunta: nuevaPregunta.value,
        })
        nuevaPregunta.value = ''
        nuevaRespuesta.value = ''
      } catch {
        if (window.$q) window.$q.notify({ type: 'negative', message: 'Error al crear.' })
      } finally {
        loading.value = false
      }
    }

    const onFocusPregunta = () => {
      preguntaFocus = true
    }
    const onFocusRespuesta = () => {
      respuestaFocus = true
    }
    const onBlurPregunta = () => {
      preguntaFocus = false
      blurTimeout = setTimeout(() => {
        if (!preguntaFocus && !respuestaFocus) {
          editandoId.value = null
          respuestaEdit.value = ''
          preguntaEdit.value = ''
        }
      }, 150)
    }
    const onBlurRespuesta = () => {
      respuestaFocus = false
      blurTimeout = setTimeout(() => {
        if (!preguntaFocus && !respuestaFocus) {
          editandoId.value = null
          respuestaEdit.value = ''
          preguntaEdit.value = ''
        }
      }, 150)
    }
    // Si se vuelve a enfocar, cancelar el timeout
    nextTick(() => {
      document.addEventListener('focusin', () => {
        if (blurTimeout) clearTimeout(blurTimeout)
      })
    })
    // Enter en pregunta también guarda
    const onEnterPregunta = () => {
      if (editandoId.value) toggleEditar(editandoId.value)
    }

    const handleExpandirPregunta = async (id) => {
      if (preguntaExpandidaId.value === id) {
        preguntaExpandidaId.value = null
        respuestaExpandida.value = ''
        return
      }
      preguntaExpandidaId.value = id
      respuestaExpandida.value = ''
      respuestaExpandidaLoading.value = true
      try {
        const resp = await api.get(`api/preguntasfrecuenteschatbot/byid/${id}`)
        respuestaExpandida.value = resp.data.respuesta || 'Respuesta no disponible.'
      } catch {
        respuestaExpandida.value = 'Error al cargar la respuesta.'
      } finally {
        respuestaExpandidaLoading.value = false
      }
    }

    return {
      preguntas,
      loading,
      toggleEditar,
      respuestaEdit,
      respuestaLoading,
      editandoId,
      preguntaEdit,
      onBlurPregunta,
      onBlurRespuesta,
      onFocusPregunta,
      onFocusRespuesta,
      onEnterPregunta,
      showDeleteModal,
      deleteModalOpen,
      confirmDelete,
      creandoPregunta,
      nuevaPregunta,
      nuevaRespuesta,
      guardarPregunta,
      preguntaExpandidaId,
      respuestaExpandida,
      respuestaExpandidaLoading,
      handleExpandirPregunta,
    }
  },
})
</script>

<style scoped>
.notifications-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  /* Limita la altura máxima al 80% del viewport para evitar desbordes */
  max-height: 80vh;
  height: auto;
}

.header-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.delete-all-btn {
  border-radius: 4px;
  font-weight: 500;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 0%;
  overflow-y: auto;
  min-height: 0;
  /* Limita la altura máxima de la lista para que solo ella haga scroll */
  max-height: 60vh;
}

.notification-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  background: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 8px 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  background-color: #e0e0e0;
  color: #666;
}

.user-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  word-break: break-word;
  white-space: pre-line;
}

.close-btn {
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.card-content {
  padding: 0 16px 12px 16px;
}

.message-text {
  margin: 0;
  line-height: 1.4;
  color: #555;
  font-size: 14px;
}

.card-actions {
  padding: 8px 16px 12px 16px;
  justify-content: flex-start;
}

.respond-btn {
  background-color: #666;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 12px;
}

.respond-btn:hover {
  background-color: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .notifications-container {
    padding: 12px;
  }

  .notification-card {
    margin: 0 -4px;
  }
}
</style>
