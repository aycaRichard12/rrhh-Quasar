<template>
  <q-layout view="Lhh Lpr lFf">

    <AppHeader @toggle-left-drawer="toggleLeftDrawer" />

    <AppDrawer
      v-model="leftDrawerOpen"
      :sub-menu-seleccionado="subMenuSeleccionado"
      @select-submenu="selectSubmenu"
    />

    <q-page-container>
      <AppSubmenuTabs
        :tabs-visible="tabsVisible"
        v-model:current-tab="currentTab"
        :active-tabs="activeTabs"
        :active-tabs-reportes="activeTabsReportes"
        @navigate="navigateToTab"
      />
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePaginas } from 'src/stores/permitidos';
import { useAppNavigation } from './composables/useAppNavigation';

import AppHeader       from './components/AppHeader.vue';
import AppDrawer       from './components/AppDrawer.vue';
import AppSubmenuTabs  from './components/AppSubmenuTabs.vue';

const paginasStore   = usePaginas();
const leftDrawerOpen = ref(false);

const {
  currentTab,
  subMenuSeleccionado,
  tabsVisible,
  activeTabs,
  activeTabsReportes,
  selectSubmenu,
  navigateToTab,
  restaurarSubmenu,
} = useAppNavigation();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(() => {
  paginasStore.initStore();
  restaurarSubmenu();
});
</script>
