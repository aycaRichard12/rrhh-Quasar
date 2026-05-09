<template>
  <!-- Header siempre visible -->
  <q-header class="header-modern">
    <q-toolbar class="q-px-sm q-px-md-md" style="min-height: 56px;">

      <!-- MENU (solo tablet+, en mobile se usa el tab bar) -->
      <q-btn
        flat dense round
        icon="menu"
        @click="$emit('toggle-left-drawer')"
        class="text-adaptive-secondary"
      />

      <!-- BREADCRUMBS (solo tablet+) -->
      <q-breadcrumbs
        class="q-ml-sm gt-sm text-caption"
        active-color="primary"
      >
        <template v-slot:separator>
          <q-icon size="1.2em" name="chevron_right" class="text-adaptive-muted" />
        </template>

        <q-breadcrumbs-el
          v-for="crumb in breadcrumbs"
          :key="crumb.label"
          :label="crumb.label"
          :class="crumb.active
            ? 'text-weight-bolder text-primary'
            : 'text-adaptive-muted'"
        />
      </q-breadcrumbs>

      <q-space />

      <!-- RIGHT ACTIONS -->
      <div class="row items-center no-wrap q-gutter-xs q-gutter-sm-md">

        <!-- PWA ACTIONS -->
        <q-btn
          v-if="showInstall"
          flat dense outline rounded
          color="primary"
          icon="download"
          label="Instalar App"
          class="q-mr-sm"
          @click="installApp"
        >
          <q-tooltip>Descargar la aplicación</q-tooltip>
        </q-btn>
        
        <q-btn
          v-if="showUpdate"
          unelevated dense rounded
          color="warning"
          text-color="dark"
          icon="system_update"
          label="Actualizar"
          class="q-mr-sm q-px-sm"
          @click="updateApp"
        >
          <q-tooltip>Nueva versión disponible</q-tooltip>
        </q-btn>

        <!-- LANGUAGE -->
        <LanguageSelector
          type="menu"
          :btn-class="$q.screen.lt.sm
            ? 'text-grey-6'
            : 'text-grey-8 text-weight-bold'"
        />

        <!-- DARK MODE -->
        <q-btn
          flat round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          class="hover-rotate text-adaptive-secondary"
        />

        <!-- NOTIFICATIONS (solo tablet+) -->
        <q-btn
          flat round icon="notifications"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          class="text-adaptive-secondary"
        >
          <q-badge floating color="negative" rounded padding="2px 4px">
            3
          </q-badge>
        </q-btn>

        <!-- SEPARATOR (solo desktop) -->
        <q-separator
          v-if="$q.screen.gt.sm"
          vertical inset
          class="q-mx-sm opacity-10"
        />

        <!-- PROFILE -->
        <q-btn flat no-caps class="rounded-borders q-pa-xs profile-btn">

          <div class="row items-center no-wrap">

            <!-- AVATAR -->
            <q-avatar :size="$q.screen.lt.sm ? '30px' : '34px'" class="shadow-2">
              <div class="avatar-placeholder text-weight-bold">
                {{ userInitial }}
              </div>
            </q-avatar>

            <!-- NAME (solo tablet+) -->
            <div
              v-if="$q.screen.gt.xs"
              class="column q-ml-sm items-start text-left"
            >
              <span class="text-weight-bold text-caption text-adaptive-main">
                {{ authStore.user?.nombre ?? 'Usuario' }}
              </span>
            </div>

            <!-- ICON -->
            <q-icon
              v-if="$q.screen.gt.xs"
              name="expand_more"
              size="18px"
              class="q-ml-xs text-adaptive-muted"
            />
          </div>

          <!-- MENU -->
          <q-menu
            anchor="bottom right"
            self="top right"
            transition-show="jump-down"
            transition-hide="jump-up"
            class="profile-dropdown"
          >
            <div class="q-pa-md" style="min-width: 200px;">

              <div class="row items-center q-mb-md">
                <q-avatar size="44px" color="primary" text-color="white">
                  {{ userInitial }}
                </q-avatar>

                <div class="q-ml-md">
                  <div class="text-weight-bold">
                    {{ authStore.user?.nombre }}
                  </div>
                </div>
              </div>

              <q-separator class="q-mb-sm opacity-10" />

              <q-list dense>
                <q-item clickable v-close-popup @click="handleLogout" class="text-negative">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>

            </div>
          </q-menu>
        </q-btn>

      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import {  computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { useBreadcrumbs } from '../composables/useBreadcrumbs';
import { usePwa } from 'src/composables/usePwa';
import LanguageSelector from 'src/components/LanguageSelector.vue';

defineEmits(['toggle-left-drawer']);

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const { breadcrumbs } = useBreadcrumbs();
const { showInstall, showUpdate, installApp, updateApp } = usePwa();

const userInitial = computed(() => authStore.user?.nombre?.charAt(0).toUpperCase() || 'U');

const toggleDarkMode = () => {
  $q.dark.toggle();
  localStorage.setItem('quasar.dark', String($q.dark.isActive));
};

const handleLogout = async () => {
  try {
    authStore.logout();
    await router.push('/');
  } catch (error) {
    console.error('Error al redirigir tras logout:', error);
    window.location.href = '/';
  }
};
</script>

<style>
.header-modern {
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: rgba(0, 0, 0, 0.03) !important;
}
body.body--dark .profile-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}

.line-height-1 {
  line-height: 1.2;
}

.profile-dropdown {
  border-radius: 12px !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--q-primary);
  color: white;
  font-size: 14px;
}

.hover-rotate:hover {
  transform: rotate(15deg);
}

.opacity-10 { opacity: 0.1; }
.transition-all { transition: all 0.3s ease; }
</style>
