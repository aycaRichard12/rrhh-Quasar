<template>
  <q-header :class="['app-header', $q.dark.isActive ? 'app-header--dark' : 'app-header--light']">
    <q-toolbar class="q-px-sm q-px-md-md header-toolbar">

      <!-- ── HAMBURGER ──────────────────────────────────────────────────── -->
      <q-btn
        flat dense round
        icon="menu"
        @click="$emit('toggle-left-drawer')"
        :class="['menu-btn', $q.dark.isActive ? 'text-grey-4' : 'text-grey-7']"
      />

      <!-- ── BREADCRUMBS ─────────────────────────────────────────────────── -->
      <q-breadcrumbs class="q-ml-xs gt-sm text-caption breadcrumbs-nav">
        <template v-slot:separator>
          <q-icon size="1.1em" name="chevron_right" :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-4'" />
        </template>
        <q-breadcrumbs-el
          v-for="crumb in breadcrumbs"
          :key="crumb.label"
          :label="crumb.label"
          :class="crumb.active
            ? 'text-weight-bolder crumb-active'
            : ($q.dark.isActive ? 'text-grey-5' : 'text-grey-5')"
        />
      </q-breadcrumbs>

      <q-space />

      <!-- ── RIGHT ACTIONS ──────────────────────────────────────────────── -->
      <div class="row items-center no-wrap q-gutter-xs">

        <!-- PWA: Instalar -->
        <q-btn
          v-if="showInstall"
          flat dense rounded no-caps
          icon="download"
          label="Instalar App"
          :class="['pwa-btn q-px-sm', $q.dark.isActive ? 'text-amber-4' : 'text-primary']"
          @click="installApp"
        >
          <q-tooltip>Descargar la aplicación</q-tooltip>
        </q-btn>

        <!-- PWA: Actualizar -->
        <q-btn
          v-if="showUpdate"
          unelevated dense rounded no-caps
          color="warning"
          text-color="dark"
          icon="system_update"
          label="Actualizar"
          class="q-px-sm q-mr-xs"
          @click="updateApp"
        >
          <q-tooltip>Nueva versión disponible</q-tooltip>
        </q-btn>

        <!-- Idioma -->
        <LanguageSelector
          type="menu"
          :btn-class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-6'"
        />

        <!-- Dark/Light mode -->
        <q-btn
          flat round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :class="['mode-btn', $q.dark.isActive ? 'text-amber-4' : 'text-grey-6']"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          @click="toggleDarkMode"
        >
          <q-tooltip>{{ $q.dark.isActive ? 'Modo claro' : 'Modo oscuro' }}</q-tooltip>
        </q-btn>

        <!-- Notificaciones -->
        <q-btn
          flat round icon="notifications"
          :class="[$q.dark.isActive ? 'text-grey-4' : 'text-grey-6']"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
        >
          <q-badge floating color="negative" rounded padding="2px 5px" style="font-size: 9px">
            3
          </q-badge>
          <q-tooltip>Notificaciones</q-tooltip>
        </q-btn>

        <!-- Separador vertical -->
        <div v-if="$q.screen.gt.sm" class="header-vsep" />

        <!-- ── PERFIL ──────────────────────────────────────────────────── -->
        <q-btn flat no-caps class="profile-btn q-px-xs q-py-xs">
          <div class="row items-center no-wrap q-gutter-xs">

            <q-avatar
              :size="$q.screen.lt.sm ? '30px' : '34px'"
              class="user-avatar"
            >
              <span class="avatar-initial">{{ userInitial }}</span>
            </q-avatar>

            <div v-if="$q.screen.gt.xs" class="column items-start text-left q-ml-xs">
              <span
                :class="['text-caption text-weight-bold', $q.dark.isActive ? 'text-grey-2' : 'text-grey-8']"
                style="line-height: 1.2"
              >
                {{ authStore.user?.nombre ?? 'Usuario' }}
              </span>
            </div>

            <q-icon
              v-if="$q.screen.gt.xs"
              name="expand_more"
              size="16px"
              :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-5'"
            />
          </div>

          <!-- Dropdown de perfil -->
          <q-menu
            anchor="bottom right"
            self="top right"
            transition-show="jump-down"
            transition-hide="jump-up"
            :class="['profile-menu', $q.dark.isActive ? 'profile-menu--dark' : '']"
          >
            <div class="q-pa-md" style="min-width: 220px">

              <!-- Cabecera del menú -->
              <div class="row items-center q-mb-md q-pb-sm profile-menu-header">
                <q-avatar size="46px" class="menu-avatar">
                  <span class="avatar-initial">{{ userInitial }}</span>
                </q-avatar>
                <div class="q-ml-sm">
                  <div
                    :class="['text-weight-bold text-subtitle2', $q.dark.isActive ? 'text-grey-2' : 'text-grey-9']"
                  >
                    {{ authStore.user?.nombre }}
                  </div>
                  <div class="text-caption text-primary" style="font-size: 11px">
                    Administrador
                  </div>
                </div>
              </div>

              <q-separator :dark="$q.dark.isActive" class="q-mb-sm opacity-10" />

              <q-list dense>
                <q-item
                  clickable v-close-popup
                  @click="handleLogout"
                  class="rounded-borders logout-item"
                >
                  <q-item-section avatar>
                    <q-icon name="logout" size="18px" color="negative" />
                  </q-item-section>
                  <q-item-section class="text-negative text-weight-medium">
                    Cerrar Sesión
                  </q-item-section>
                </q-item>
              </q-list>

            </div>
          </q-menu>
        </q-btn>

      </div>
    </q-toolbar>

    <!-- Línea dorada de acento al fondo del header -->
    <div class="header-accent-line" />
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { useBreadcrumbs } from '../composables/useBreadcrumbs';
import { usePwa } from 'src/composables/usePwa';
import LanguageSelector from 'src/components/LanguageSelector.vue';

defineEmits(['toggle-left-drawer']);

const $q          = useQuasar();
const router      = useRouter();
const authStore   = useAuthStore();
const { breadcrumbs } = useBreadcrumbs();
const { showInstall, showUpdate, installApp, updateApp } = usePwa();

const userInitial = computed(() =>
  authStore.user?.nombre?.charAt(0).toUpperCase() || 'U'
);

const toggleDarkMode = () => {
  $q.dark.toggle();
  localStorage.setItem('quasar.dark', String($q.dark.isActive));
};

const handleLogout = async () => {
  try {
    authStore.logout();
    await router.push('/');
  } catch {
    window.location.href = '/';
  }
};
</script>

<style>
/* ── HEADER BASE ─────────────────────────────────────────────────────────── */
.app-header {
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.app-header--light {
  background-color: #ffffff !important;
  color: #374151 !important;
  box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04) !important;
}

.app-header--dark {
  background-color: #1a202c !important;
  color: #f3f4f6 !important;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) !important;
}

.header-toolbar {
  min-height: 58px;
}

/* ── BREADCRUMBS ─────────────────────────────────────────────────────────── */
.crumb-active {
  color: #004d40 !important;
}
.body--dark .crumb-active {
  color: #f2c037 !important;
}

/* ── SEPARADOR VERTICAL ──────────────────────────────────────────────────── */
.header-vsep {
  width: 1px;
  height: 22px;
  background: currentColor;
  opacity: 0.1;
  margin: 0 4px;
}

/* ── AVATAR DEL USUARIO ──────────────────────────────────────────────────── */
.user-avatar {
  background: linear-gradient(135deg, #004d40 0%, #00796b 100%) !important;
  box-shadow: 0 2px 8px rgba(0, 77, 64, 0.35);
}

.menu-avatar {
  background: linear-gradient(135deg, #004d40 0%, #00796b 100%) !important;
  box-shadow: 0 2px 8px rgba(0, 77, 64, 0.3);
}

.avatar-initial {
  color: white;
  font-weight: 700;
  font-size: 15px;
}

/* ── BOTÓN PERFIL ────────────────────────────────────────────────────────── */
.profile-btn {
  border-radius: 10px !important;
  transition: background 0.15s ease !important;
}

.profile-btn:hover {
  background: rgba(0, 77, 64, 0.06) !important;
}
.body--dark .profile-btn:hover {
  background: rgba(255,255,255,0.06) !important;
}

/* ── MODE BTN ────────────────────────────────────────────────────────────── */
.mode-btn {
  transition: transform 0.25s ease !important;
}
.mode-btn:hover {
  transform: rotate(18deg);
}

/* ── PWA BTN ─────────────────────────────────────────────────────────────── */
.pwa-btn {
  font-size: 12px;
  font-weight: 600;
}

/* ── DROPDOWN MENU ───────────────────────────────────────────────────────── */
.profile-menu {
  border-radius: 14px !important;
  box-shadow: 0 8px 24px -4px rgba(0,0,0,0.12),
              0 2px 8px rgba(0,0,0,0.06) !important;
  overflow: hidden;
}

.profile-menu--dark {
  background-color: #1f2937 !important;
  box-shadow: 0 8px 24px -4px rgba(0,0,0,0.4),
              0 2px 8px rgba(0,0,0,0.3) !important;
}

.logout-item {
  border-radius: 8px !important;
  transition: background 0.15s ease;
}
.logout-item:hover {
  background: rgba(239, 68, 68, 0.07) !important;
}

/* ── LÍNEA DE ACENTO ─────────────────────────────────────────────────────── */
.header-accent-line {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #f2c037 30%,
    #f2c037 70%,
    transparent 100%
  );
  opacity: 0.6;
}

/* Legacy helpers */
.opacity-10 { opacity: 0.1; }
</style>
