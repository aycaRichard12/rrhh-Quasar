<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Layout limpio
</script>

<style>
/* Anula los estilos globales de app.scss que son para el layout principal con header */
.auth-layout .q-page-container {
  padding-top: 0 !important;
  background-color: transparent !important;
}

.auth-layout .q-page {
  padding: 0 !important;
  max-width: 100% !important;
  margin: 0 !important;
  width: 100% !important;
  min-height: 100vh !important;
}
</style>