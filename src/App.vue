<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePwaStore, type BeforeInstallPromptEvent } from 'src/stores/pwa-store';

const pwaStore = usePwaStore();

interface CustomWindow extends Window {
  deferredPromptEvent?: BeforeInstallPromptEvent | null;
}

onMounted(() => {
  const customWindow = window as unknown as CustomWindow;

  if (customWindow.deferredPromptEvent) {
    pwaStore.setDeferredPrompt(customWindow.deferredPromptEvent);
  }

  window.addEventListener('pwa-install-available', () => {
    if (customWindow.deferredPromptEvent) {
      pwaStore.setDeferredPrompt(customWindow.deferredPromptEvent);
    }
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    pwaStore.setDeferredPrompt(e as BeforeInstallPromptEvent);
  });

  window.addEventListener('appinstalled', () => {
    pwaStore.setDeferredPrompt(null);
  });
});
</script>
