<template>
  <div class="confirm-modal-backdrop">
    <div class="confirm-modal">
      <div class="confirm-modal-title">{{ title }}</div>
      <div class="confirm-modal-message">{{ message }}</div>
      <div class="confirm-modal-actions">
        <button class="confirm-btn cancel" @click="$emit('cancel')">Cancelar</button>
        <button class="confirm-btn delete" @click="$emit('confirm')">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: { type: String, default: 'Confirmar' },
    message: { type: String, required: true },
  },
}
</script>

<style scoped>
.confirm-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-modal {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  padding: 24px 20px 16px 20px;
  min-width: 260px;
  max-width: 90vw;
  text-align: center;
}
.confirm-modal-title {
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 10px;
}
.confirm-modal-message {
  font-size: 15px;
  margin-bottom: 18px;
}
.confirm-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.confirm-btn {
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.confirm-btn.cancel {
  background: #eee;
  color: #333;
}
.confirm-btn.delete {
  background: #e53935;
  color: #fff;
}
.confirm-btn.delete:hover {
  background: #b71c1c;
}
</style>
