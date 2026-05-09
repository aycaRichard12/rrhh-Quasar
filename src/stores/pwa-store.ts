import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePwaStore = defineStore('pwa', () => {
  const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
  const isStandalone = ref(
    window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone
  );
  const isInstallable = ref(false);

  const setDeferredPrompt = (prompt: BeforeInstallPromptEvent | null) => {
    deferredPrompt.value = prompt;
    isInstallable.value = !!prompt;
  };

  const install = async () => {
    if (!deferredPrompt.value) return false;

    await deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;

    if (outcome === 'accepted') {
      deferredPrompt.value = null;
      isInstallable.value = false;
      isStandalone.value = true;
      return true;
    }
    return false;
  };

  const openApp = () => {
    window.open(window.location.href, '_blank');
  };

  const updateApp = async () => {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.update();
      }
    }
    window.location.reload();
  };

  return {
    deferredPrompt,
    isInstallable,
    isStandalone,
    setDeferredPrompt,
    install,
    openApp,
    updateApp
  };
});
