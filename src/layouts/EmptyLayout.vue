<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Layout vacío para páginas sin header/footer
</script>

<style scoped>
.q-layout {
  min-height: 100vh;
}
</style>
