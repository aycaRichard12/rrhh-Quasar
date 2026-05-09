import { ref, onMounted, onUnmounted } from 'vue';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePwa() {
  const showInstall = ref(false);
  const showUpdate = ref(false);
  let deferredPrompt: BeforeInstallPromptEvent | null = null;
  let registrationHook: ServiceWorkerRegistration | null = null;

  const onBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    showInstall.value = true;
  };

  const onPwaUpdated = (e: Event) => {
    const customEvent = e as CustomEvent<ServiceWorkerRegistration>;
    registrationHook = customEvent.detail;
    showUpdate.value = true;
  };

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showInstall.value = false;
    }
    deferredPrompt = null;
  };

  const updateApp = () => {
    if (registrationHook?.waiting) {
      // Prompt the waiting service worker to take control immediately
      registrationHook.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    // Reload the page to load the new content and complete the update
    window.location.reload();
  };

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    document.addEventListener('pwa-updated', onPwaUpdated);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    document.removeEventListener('pwa-updated', onPwaUpdated);
  });

  return {
    showInstall,
    showUpdate,
    installApp,
    updateApp
  };
}
