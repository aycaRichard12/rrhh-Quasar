<template>
<transition name="fade">
  <!-- Visible en todos los tamaños de pantalla si hay pestañas activas -->
  <div v-show="tabsVisible" class="submenu-tabs-container q-my-sm">
    <q-tabs  
      align="left" 
      :model-value="currentTab"  
      @update:model-value="$emit('update:currentTab', $event)"
      indicator-color="transparent"
      class="q-px-md"
      dense
      no-caps
    >
      <q-tab
        v-for="tab in activeTabs"
        :key="tab.codigo"
        :name="tab.codigo"
        @click="$emit('navigate', tab)"
        :class="[
          'q-mx-xs u-pill-tab transition-all',
          currentTab === tab.codigo 
            ? ($q.dark.isActive ? 'bg-teal-10 -dark-2 text-weight-bolder' : 'bg-teal-1 text-teal-9 text-weight-bolder')
            : ($q.dark.isActive ? 'text-grey-5' : 'text-grey-7'),
          $q.screen.lt.sm ? 'q-px-sm' : ''
        ]"
      >
        <div class="row items-center no-wrap" :class="$q.screen.lt.sm ? '' : 'q-px-sm'">
          <q-icon :name="tab.icono" :size="$q.screen.lt.sm ? '22px' : '18px'" :class="$q.screen.lt.sm ? '' : 'q-mr-sm'" />
          <span v-if="!$q.screen.lt.sm" style="font-size: 13.5px">
            {{ $t(`navigation.${tab.codigo}`) !== `navigation.${tab.codigo}` ? $t(`navigation.${tab.codigo}`) : getTitle(tab.titulo) }}
          </span>
        </div>
        <q-tooltip v-if="$q.screen.lt.sm" anchor="top middle" self="bottom middle" :offset="[0, 8]">
          {{ $t(`navigation.${tab.codigo}`) !== `navigation.${tab.codigo}` ? $t(`navigation.${tab.codigo}`) : getTitle(tab.titulo) }}
        </q-tooltip>
      </q-tab>

      <q-space />

      <q-btn-dropdown
        v-if="activeTabsReportes.length > 0"
        flat
        no-caps
        :label="$q.screen.lt.sm ? '' : $t('common.labels.reports')"
        icon="assessment"
        class="q-ml-sm text-weight-medium"
        :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-8'"
      >
        <q-tooltip v-if="$q.screen.lt.sm" anchor="top middle" self="bottom middle" :offset="[0, 8]">
          {{ $t('common.labels.reports') }}
        </q-tooltip>
        <q-list class="q-pa-xs" style="min-width: 200px;">
          <q-item 
            v-for="report in activeTabsReportes" 
            :key="report.codigo" 
            clickable 
            v-close-popup 
            @click="$emit('navigate', report)"
            class="rounded-borders q-my-xs"
          >
            <q-item-section avatar class="q-pr-none">
              <q-icon 
                :name="report.icono" 
                color="teal"
                size="20px"
              />
            </q-item-section>
            <q-item-section class="text-subtitle2">
              {{ $t(`navigation.${report.codigo}`) !== `navigation.${report.codigo}` ? $t(`navigation.${report.codigo}`) : getTitle(report.titulo) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-tabs>
  </div>
</transition>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { TabItem } from 'src/layouts/types/navigation';

defineProps<{
  tabsVisible: boolean;
  currentTab: string;
  activeTabs: TabItem[];
  activeTabsReportes: TabItem[];
}>();

defineEmits(['update:currentTab', 'navigate']);

const $q = useQuasar();

const getTitle = (titulo: string): string => {
  const parts = titulo.split('-');
  return parts.length >= 3 ? (parts[2] ?? titulo) : titulo;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.u-pill-tab {
  min-height: 32px;
  padding: 0;
  border-radius: 8px;
}

.u-pill-tab:hover {
  background: rgba(0, 0, 0, 0.03);
}

body.body--dark .u-pill-tab:hover {
  background: rgba(255, 255, 255, 0.05);
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
