<template>
  <!-- Solo visible en mobile (lt.sm) -->
  <div v-if="$q.screen.lt.sm" class="mobile-tabbar">

    <!-- ═══════════════════════════════ TAB BAR ═══════════════════════════════ -->
    <nav class="tabbar-nav">

      <!-- 1. Dashboard -->
      <button
        v-if="hasDashboard"
        class="tab-btn"
        :class="{ 'tab-btn--active': isActive('dashboard') }"
        @click="navigateToDashboard"
        aria-label="Panel"
      >
        <span class="tab-pill">
          <q-icon name="grid_view" size="24px" class="tab-icon" />
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 8]" class="tab-tooltip">
          {{ $t('navigation.dashboard') }}
        </q-tooltip>
      </button>

      <!-- 2-3(4). Menú principal -->
      <button
        v-for="item in visibleMenuItems"
        :key="item.codigo"
        class="tab-btn"
        :class="{ 'tab-btn--active': isMenuActive(item) }"
        @click="openMenuSheet(item)"
        :aria-label="item.titulo"
      >
        <span class="tab-pill">
          <q-icon :name="getIconoMenu(item.codigo)" size="24px" class="tab-icon" />
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 8]" class="tab-tooltip">
          {{ translateTitle(item.codigo, item.titulo) }}
        </q-tooltip>
      </button>

      <!-- Más -->
      <button
        class="tab-btn"
        :class="{ 'tab-btn--active': isMoreActive }"
        @click="moreSheet = true"
        aria-label="Más"
      >
        <span class="tab-pill">
          <q-icon name="apps" size="24px" class="tab-icon" />
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 8]" class="tab-tooltip">
          {{ $t('common.messages.more') }}
        </q-tooltip>
      </button>

      <!-- Cuenta -->
      <button
        class="tab-btn"
        :class="{ 'tab-btn--active': profileSheet }"
        @click="profileSheet = true"
        aria-label="Cuenta"
      >
        <span class="tab-pill tab-pill--avatar">
          <span class="tab-avatar-text">{{ userInitial }}</span>
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 8]" class="tab-tooltip">
          {{ authStore.user?.nombre ?? $t('common.labels.account') }}
        </q-tooltip>
      </button>

    </nav>

    <!-- ═══════════════ SHEET: Submenús del menú seleccionado ════════════════ -->
    <q-dialog
      v-model="submenuSheet"
      position="bottom"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bottom-sheet">
        <div class="sheet-handle" />
        <div class="q-px-lg q-pt-sm q-pb-sm row items-center">
          <q-icon :name="getIconoMenu(activeMenu?.codigo ?? '')" size="22px" class="text-primary q-mr-sm" />
          <span class="text-subtitle1 text-weight-bold">{{ translateTitle(activeMenu?.codigo ?? '', activeMenu?.titulo ?? '') }}</span>
        </div>
        <q-separator class="opacity-20" />
        <q-scroll-area style="height: 300px;" class="q-px-sm q-py-sm">
          <q-list>
            <q-item
              v-for="submenu in activeMenu?.submenu ?? []"
              :key="submenu.codigo"
              clickable v-ripple
              class="sheet-item rounded-borders q-mb-xs"
              :class="{ 'sheet-item--active': subMenuSeleccionado === submenu.codigo.split('-')[0] || currentTab === submenu.codigo.split('-')[0] }"
              @click="selectAndClose(submenu)"
            >
              <q-item-section avatar>
                <q-icon :name="getIconoMenu(submenu.codigo)" size="20px" />
              </q-item-section>
              <q-item-section>{{ submenu.titulo }}</q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" size="18px" class="opacity-40" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card>
    </q-dialog>

    <!-- ═══════════════════ SHEET: Más opciones ══════════════════════════════ -->
    <q-dialog
      v-model="moreSheet"
      position="bottom"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bottom-sheet">
        <div class="sheet-handle" />
        <div class="q-px-lg q-pt-sm q-pb-sm">
          <span class="text-subtitle1 text-weight-bold">Más opciones</span>
        </div>
        <q-separator class="opacity-20" />
        <q-scroll-area style="height: 340px;" class="q-px-sm q-py-sm">
          <q-list>
            <template v-for="item in hiddenMenuItems" :key="item.codigo">
              <q-expansion-item
                :label="item.titulo"
                :icon="getIconoMenu(item.codigo)"
                class="more-expansion rounded-borders q-mb-xs"
                expand-icon="expand_more"
              >
                <q-list class="q-pl-md">
                  <q-item
                    v-for="submenu in item.submenu"
                    :key="submenu.codigo"
                    clickable v-ripple
                    class="sheet-item rounded-borders q-mb-xs"
                    :class="{ 'sheet-item--active': subMenuSeleccionado === submenu.codigo.split('-')[0] || currentTab === submenu.codigo.split('-')[0] }"
                    @click="selectAndCloseMore(submenu)"
                  >
                    <q-item-section avatar>
                      <q-icon :name="getIconoMenu(submenu.codigo)" size="18px" />
                    </q-item-section>
                    <q-item-section>{{ submenu.titulo }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-card>
    </q-dialog>

    <!-- ═══════════════════ SHEET: Perfil / Cuenta ════════════════════════════ -->
    <q-dialog
      v-model="profileSheet"
      position="bottom"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bottom-sheet profile-bottom-sheet">
        <div class="sheet-handle" />

        <!-- Header de perfil -->
        <div class="profile-header q-px-lg q-pt-md q-pb-lg">
          <div class="row items-center q-gutter-md">
            <q-avatar size="52px" class="profile-avatar shadow-3">
              <span class="text-h6 text-weight-bold">{{ userInitial }}</span>
            </q-avatar>
            <div class="col">
              <div class="text-weight-bold text-subtitle1">
                {{ authStore.user?.nombre ?? 'Usuario' }}
              </div>
              <div class="text-caption opacity-60">Cuenta activa</div>
            </div>
          </div>
        </div>

        <q-separator class="opacity-20" />

        <!-- Acciones principales -->
        <div class="q-px-md q-py-sm">

          <!-- PWA: Instalar -->
          <div v-if="showInstall" class="q-mb-xs">
            <q-btn
              unelevated rounded no-caps
              class="full-width profile-action-btn"
              color="primary"
              icon="download"
              label="Instalar Aplicación"
              @click="installApp(); profileSheet = false"
            />
          </div>

          <!-- PWA: Actualizar -->
          <div v-if="showUpdate" class="q-mb-xs">
            <q-btn
              unelevated rounded no-caps
              class="full-width profile-action-btn"
              color="warning"
              text-color="dark"
              icon="system_update"
              label="Actualizar App"
              @click="updateApp(); profileSheet = false"
            />
          </div>

          <!-- Separador visual -->
          <q-list class="q-mt-xs">

            <!-- Modo oscuro -->
            <q-item class="profile-list-item rounded-borders q-mb-xs">
              <q-item-section avatar>
                <q-icon
                  :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
                  size="22px"
                  class="profile-icon"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $q.dark.isActive ? 'Modo claro' : 'Modo oscuro' }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="$q.dark.isActive"
                  color="teal"
                  @update:model-value="toggleDarkMode"
                />
              </q-item-section>
            </q-item>

            <!-- Idioma -->
            <q-item class="profile-list-item rounded-borders q-mb-xs">
              <q-item-section avatar>
                <q-icon name="translate" size="22px" class="profile-icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Idioma</q-item-label>
              </q-item-section>
              <q-item-section side>
                <LanguageSelector type="menu" btn-class="profile-lang-btn" />
              </q-item-section>
            </q-item>

            <!-- Notificaciones -->
            <q-item class="profile-list-item rounded-borders q-mb-xs" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="notifications" size="22px" class="profile-icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Notificaciones</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="negative" rounded label="3" />
              </q-item-section>
            </q-item>

          </q-list>
        </div>

        <q-separator class="opacity-20" />

        <!-- Cerrar sesión -->
        <div class="q-px-md q-py-sm q-pb-md">
          <q-item
            clickable v-ripple
            class="logout-item rounded-borders"
            @click="handleLogout"
          >
            <q-item-section avatar>
              <q-icon name="logout" size="22px" color="negative" />
            </q-item-section>
            <q-item-section class="text-negative text-weight-medium">
              Cerrar Sesión
            </q-item-section>
          </q-item>
        </div>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { getIconoMenu } from 'src/stores/paginas';
import { useAppNavigation } from '../composables/useAppNavigation';
import { usePwa } from 'src/composables/usePwa';
import LanguageSelector from 'src/components/LanguageSelector.vue';
import type { MenuItem, SubmenuItem } from 'src/layouts/types/navigation';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { currentTab, subMenuSeleccionado, selectSubmenu, hasValidTabsForSubmenu, translateTitle } = useAppNavigation();
const { showInstall, showUpdate, installApp, updateApp } = usePwa();

// ─── Estado de sheets ─────────────────────────────────────────────────────────
const submenuSheet = ref(false);
const moreSheet    = ref(false);
const profileSheet = ref(false);
const activeMenu   = ref<MenuItem | null>(null);

// ─── Menú filtrado ────────────────────────────────────────────────────────────
const hasDashboard = computed(() =>
  (authStore.user?.menu || []).some(m => m.codigo === 'dashboard')
);

const filteredMenu = computed((): MenuItem[] => {
  const rawMenu = (authStore.user?.menu || []) as MenuItem[];
  return rawMenu
    .filter(m => m.codigo !== 'opcionesocultas' && m.codigo !== 'dashboard')
    .map(menu => {
      const validSubmenus = (menu.submenu || []).filter(s => hasValidTabsForSubmenu(s));
      return { ...menu, submenu: validSubmenus };
    })
    .filter(menu => menu.submenu.length > 0);
});

// 5 tabs total: [Dashboard?] + [menús] + [Más] + [Cuenta]
// Con dashboard: 1 + 2 + 1 + 1 = 5
// Sin dashboard: 0 + 3 + 1 + 1 = 5
const MAX_VISIBLE = computed(() => hasDashboard.value ? 2 : 3);

interface MenuItemExtended extends MenuItem {
  firstSubmenuCode: string;
}

const visibleMenuItems = computed((): MenuItemExtended[] =>
  filteredMenu.value.slice(0, MAX_VISIBLE.value).map(m => ({
    ...m,
    firstSubmenuCode: ((m.submenu[0]?.codigo ?? '').split('-')[0]) ?? ''
  }))
);

const hiddenMenuItems = computed((): MenuItem[] =>
  filteredMenu.value.slice(MAX_VISIBLE.value)
);

// Verifica si ALGÚN submenú del menú está activo (no solo el primero)
const isMenuActive = (item: MenuItemExtended): boolean =>
  item.submenu.some(s => subMenuSeleccionado.value === s.codigo.split('-')[0]);

const isMoreActive = computed(() =>
  hiddenMenuItems.value.some(m =>
    m.submenu.some(s => subMenuSeleccionado.value === s.codigo.split('-')[0])
  )
);

// ─── Perfil ───────────────────────────────────────────────────────────────────
const userInitial = computed(() =>
  authStore.user?.nombre?.charAt(0).toUpperCase() || 'U'
);

const toggleDarkMode = () => {
  $q.dark.toggle();
  localStorage.setItem('quasar.dark', String($q.dark.isActive));
};

const handleLogout = async () => {
  profileSheet.value = false;
  try {
    authStore.logout();
    await router.push('/');
  } catch {
    window.location.href = '/';
  }
};

// ─── Navegación ───────────────────────────────────────────────────────────────
const isActive = (path: string) =>
  route.path === `/${path}` || route.path === '/dashboard';

const navigateToDashboard = () => { void router.push('/dashboard'); };

const openMenuSheet = (item: MenuItemExtended) => {
  activeMenu.value = item;
  submenuSheet.value = true;
};

const selectAndClose = (submenu: SubmenuItem) => {
  selectSubmenu(submenu);
  submenuSheet.value = false;
};

const selectAndCloseMore = (submenu: SubmenuItem) => {
  selectSubmenu(submenu);
  moreSheet.value = false;
};
</script>

<style scoped>
/* ─── Contenedor ─────────────────────────────────────────────────────────── */
.mobile-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  padding-bottom: env(safe-area-inset-bottom);
}

/* ─── Nav bar ────────────────────────────────────────────────────────────── */
.tabbar-nav {
  display: flex;
  align-items: stretch;
  height: 58px;
  background: rgba(15, 23, 42, 0.98);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

body.body--light .tabbar-nav {
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 -1px 0 rgba(0,0,0,0.06), 0 -8px 24px rgba(0,0,0,0.05);
}

/* ─── Tab button ─────────────────────────────────────────────────────────── */
.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  color: rgba(255, 255, 255, 0.42);
  transition: color 0.2s ease;
  position: relative;
}

body.body--light .tab-btn {
  color: rgba(15, 23, 42, 0.42);
}

.tab-btn:active {
  transform: scale(0.94);
  transition: transform 0.1s ease;
}

/* Active color */
.tab-btn--active {
  color: #2dd4bf !important;
}

/* ─── Pill (fondo del ícono activo, estilo YouTube/Material 3) ───────────── */
.tab-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  border-radius: 18px;
  background: transparent;
  transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Ripple overlay on active */
.tab-btn--active .tab-pill {
  background: rgba(45, 212, 191, 0.16);
}

body.body--light .tab-btn--active .tab-pill {
  background: rgba(0, 131, 116, 0.12);
}

/* Ícono */
.tab-icon {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-btn--active .tab-icon {
  transform: scale(1.12);
}

/* ─── Pill avatar (Cuenta) ───────────────────────────────────────────────── */
.tab-pill--avatar {
  background: rgba(45, 212, 191, 0.10) !important;
}

.tab-btn--active .tab-pill--avatar {
  background: rgba(45, 212, 191, 0.22) !important;
  box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.35);
}

.tab-avatar-text {
  font-size: 13px;
  font-weight: 700;
  color: #2dd4bf;
  line-height: 1;
  letter-spacing: -0.01em;
}

/* ─── Tooltip del tab ────────────────────────────────────────────────────── */
.tab-tooltip {
  font-size: 12px !important;
  font-weight: 600 !important;
  padding: 5px 10px !important;
  border-radius: 8px !important;
  background: rgba(15, 23, 42, 0.92) !important;
  color: #f1f5f9 !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.25) !important;
  letter-spacing: 0.01em;
}

body.body--light .tab-tooltip {
  background: rgba(30, 41, 59, 0.92) !important;
}

/* ─── Bottom sheets ──────────────────────────────────────────────────────── */
.bottom-sheet {
  border-radius: 20px 20px 0 0 !important;
  max-height: 82vh;
  overflow: hidden;
  box-shadow: 0 -8px 40px rgba(0,0,0,0.2) !important;
}

body.body--dark .bottom-sheet {
  background: #1e293b !important;
  color: #f1f5f9 !important;
}

body.body--light .bottom-sheet {
  background: #ffffff !important;
}

/* ─── Handle ─────────────────────────────────────────────────────────────── */
.sheet-handle {
  width: 36px;
  height: 4px;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
  margin: 10px auto 4px;
}

/* ─── Sheet items ────────────────────────────────────────────────────────── */
.sheet-item {
  min-height: 48px;
  border-radius: 10px !important;
  transition: background 0.15s ease;
}

body.body--dark .sheet-item:hover { background: rgba(255,255,255,0.05) !important; }
body.body--light .sheet-item:hover { background: rgba(0,0,0,0.04) !important; }

.sheet-item--active {
  background: rgba(13, 148, 136, 0.13) !important;
  color: #2dd4bf !important;
  font-weight: 600;
}

/* ─── More expansion ─────────────────────────────────────────────────────── */
.more-expansion { border-radius: 10px !important; }

body.body--dark .more-expansion :deep(.q-expansion-item__header) {
  color: rgba(255,255,255,0.85);
  border-radius: 10px;
}

body.body--light .more-expansion :deep(.q-expansion-item__header) {
  border-radius: 10px;
}

/* ─── Profile sheet ──────────────────────────────────────────────────────── */
.profile-header {
  background: linear-gradient(135deg, rgba(0,131,116,0.1), rgba(45,212,191,0.05));
}

.profile-avatar {
  background: linear-gradient(135deg, #008374, #2dd4bf) !important;
  color: white !important;
}

.profile-list-item {
  min-height: 52px;
  border-radius: 12px !important;
  transition: background 0.15s ease;
}

body.body--dark .profile-list-item:hover { background: rgba(255,255,255,0.05) !important; }
body.body--light .profile-list-item:hover { background: rgba(0,0,0,0.03) !important; }

.profile-icon { color: #008374 !important; }
body.body--dark .profile-icon { color: #2dd4bf !important; }

.profile-action-btn {
  height: 44px;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.profile-lang-btn {
  font-size: 13px;
  font-weight: 600;
}

.logout-item {
  min-height: 52px;
  border-radius: 12px !important;
}

body.body--dark .logout-item:hover { background: rgba(220,38,38,0.08) !important; }
body.body--light .logout-item:hover { background: rgba(220,38,38,0.06) !important; }
</style>
