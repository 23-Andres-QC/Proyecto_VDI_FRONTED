<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Layout vacío para páginas sin header/footer
</script>

<style lang="scss">
.q-page-container {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  min-height: 100vh;
}
</style>
