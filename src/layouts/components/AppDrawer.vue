<template>
  <q-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    show-if-above
    :width="260"
    :bordered="false"
    class="main-drawer"
  >
    <div class="full-height column text-white">

      <!-- LOGO AREA -->
      <div class="q-pa-lg row items-center q-gutter-md logo-container">
        <q-avatar size="44px" class="bg-white shadow-3 logo-avatar">
          <q-img src="favicon.ico" />
        </q-avatar>
        <div class="column">
          <div class="text-weight-bolder text-h6 line-height-1 letter-spacing-tight text-white">
            MisterSofts
          </div>
          <div class="text-caption text-uppercase text-weight-bold opacity-60" style="font-size: 9px; letter-spacing: 0.1em;">
          </div>
        </div>
      </div>

      <q-separator dark class="q-mx-lg q-mb-sm opacity-10" />

      <!-- NAVEGACIÓN -->
      <q-scroll-area class="col q-px-sm no-scrollbar drawer-scroll">
        <q-list class="q-pt-sm q-pb-md">

          <q-item v-if="hasDashboard" clickable v-ripple to="/dashboard" class="q-mb-xs drawer-item">
            <q-item-section avatar>
              <q-icon name="grid_view" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-medium">{{ $t('navigation.dashboard') }}</q-item-section>
          </q-item>

          <div class="text-overline q-px-md q-mt-md q-mb-xs section-header opacity-50">
            {{ $t('common.labels.mainMenu') }}
          </div>

          <q-expansion-item
            v-for="menu in filteredMenu"
            :key="menu.codigo"
            :label="translateTitle(menu.codigo, menu.titulo)"
            :icon="getIconoMenu(menu.codigo)"
            group="menu-group"
            class="drawer-expansion-group"
            header-class="drawer-item"
          >
            <q-list class="q-pb-xs submenu-list">
              <q-item
                v-for="submenu in menu.submenu"
                :key="submenu.codigo"
                clickable
                v-ripple
                @click="$emit('select-submenu', submenu)"
                :active="subMenuSeleccionado === submenu.codigo.split('-')[0]"
                active-class="active-submenu"
                class="drawer-item submenu-item"
              >
                <div v-if="subMenuSeleccionado === submenu.codigo.split('-')[0]" class="active-indicator" />
                <q-item-section avatar style="min-width: 32px">
                  <q-icon :name="getIconoMenu(submenu.codigo)" size="18px" />
                </q-item-section>
                <q-item-section class="text-body2">{{ translateTitle(submenu.codigo, submenu.titulo) }}</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

        </q-list>
      </q-scroll-area>

    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { getIconoMenu } from 'src/stores/paginas';
import type { MenuItem } from 'src/layouts/types/navigation';
import { useAppNavigation } from '../composables/useAppNavigation';

defineProps<{
  modelValue: boolean;
  subMenuSeleccionado: string;
}>();

defineEmits(['update:modelValue', 'select-submenu']);

// const $q = useQuasar();
const authStore = useAuthStore();
const { hasValidTabsForSubmenu, translateTitle } = useAppNavigation();

const hasDashboard = computed(() => {
  return (authStore.user?.menu || []).some(m =>
    m.codigo === 'dashboard' ||
    (m.submenu && m.submenu.some(s => s.codigo && s.codigo.includes('dashboard')))
  );
});

const filteredMenu = computed((): MenuItem[] => {
  const rawMenu = (authStore.user?.menu || []) as MenuItem[];
  return rawMenu
    .filter(m => m.codigo !== 'opcionesocultas')
    .map(menu => {
      // Filtrar submenús: nos quedamos solo con los que tienen al menos un tab permitido
      const validSubmenus = (menu.submenu || []).filter(submenu => hasValidTabsForSubmenu(submenu));
      return { ...menu, submenu: validSubmenus };
    })
    .filter(menu => menu.submenu.length > 0); // Omitir el menú principal si no le quedó ningún submenú válido
});
</script>

<style scoped>
/* Selector ultra-específico para ganar a las clases por defecto de Quasar */
:deep(.q-drawer),
.main-drawer {
  background-color: #0f172a !important; /* Slate-900 */
  color: white !important;
}

:deep(.q-drawer--left) {
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.logo-container {
  background: linear-gradient(to bottom, rgba(13, 148, 136, 0.15), transparent);
}

.logo-avatar {
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.drawer-item {
  margin: 2px 12px !important;
  border-radius: 8px !important;
  color: rgba(255, 255, 255, 0.7);
  min-height: 44px;
  transition: all 0.2s ease;
}

.drawer-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.active-submenu {
  background: rgba(13, 148, 136, 0.2) !important;
  color: #2dd4bf !important;
  font-weight: 600;
}

.section-header {
  color: white;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 4px;
  background: #2dd4bf;
  border-radius: 0 4px 4px 0;
}

.drawer-expansion-group :deep(.q-expansion-item__content) {
  background: rgba(0, 0, 0, 0.2);
  margin: 4px 0;
  border-radius: 8px;
}

.submenu-item {
  margin-left: 16px !important;
  margin-right: 8px !important;
}

.line-height-1 { line-height: 1.2; }
.letter-spacing-tight { letter-spacing: -0.025em; }

.no-scrollbar :deep(.q-scrollarea__container) {
  scrollbar-width: none;
}
</style>
