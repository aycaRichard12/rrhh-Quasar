<template>
  <transition name="tabs-fade">
    <div v-show="tabsVisible" :class="['submenu-tabs-wrapper', $q.dark.isActive ? 'tabs-wrapper--dark' : 'tabs-wrapper--light']">
      <q-tabs
        align="left"
        :model-value="currentTab"
        @update:model-value="$emit('update:currentTab', $event)"
        indicator-color="transparent"
        class="tabs-row q-px-md"
        dense
        no-caps
      >
        <!-- Tab principal -->
        <q-tab
          v-for="tab in activeTabs"
          :key="tab.codigo"
          :name="tab.codigo"
          @click="$emit('navigate', tab)"
          :class="[
            'pill-tab q-mx-xs',
            currentTab === tab.codigo
              ? ($q.dark.isActive ? 'pill-tab--active-dark' : 'pill-tab--active-light')
              : ($q.dark.isActive ? 'pill-tab--idle-dark'   : 'pill-tab--idle-light')
          ]"
        >
          <div class="row items-center no-wrap pill-inner">
            <q-icon
              :name="tab.icono"
              :size="$q.screen.lt.sm ? '20px' : '17px'"
              :class="['tab-icon', currentTab === tab.codigo ? 'tab-icon--active' : '']"
            />
            <span v-if="!$q.screen.lt.sm" class="tab-label q-ml-sm">
              {{ resolveLabel(tab) }}
            </span>
          </div>
          <q-tooltip v-if="$q.screen.lt.sm" anchor="bottom middle" self="top middle" :offset="[0, 6]">
            {{ resolveLabel(tab) }}
          </q-tooltip>
        </q-tab>

        <q-space />


        <!-- //Antiguo Codigo    ya no es necesario -->
        <!-- Dropdown de reportes -->

        <!-- <q-btn-dropdown
          v-if="activeTabsReportes.length > 0"
          flat no-caps
          :label="$q.screen.lt.sm ? '' : $t('common.labels.reports')"
          icon="assessment"
          :class="['reports-btn', $q.dark.isActive ? 'text-grey-4' : 'text-grey-6']"
        >
          <q-tooltip v-if="$q.screen.lt.sm" anchor="bottom middle" self="top middle" :offset="[0, 6]">
            {{ $t('common.labels.reports') }}
          </q-tooltip>

          <q-list class="q-pa-xs reports-list" style="min-width: 210px">
            <q-item
              v-for="report in activeTabsReportes"
              :key="report.codigo"
              clickable v-close-popup
              @click="$emit('navigate', report)"
              class="report-item rounded-borders q-my-xs"
            >
              <q-item-section avatar class="q-pr-xs">
                <q-icon :name="report.icono" color="primary" size="19px" />
              </q-item-section>
              <q-item-section class="report-item-label">
                {{ resolveLabel(report) }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->

      </q-tabs>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import type { TabItem } from 'src/layouts/types/navigation';

defineProps<{
  tabsVisible: boolean;
  currentTab: string;
  activeTabs: TabItem[];

  //Antiguo Codigo

  // activeTabsReportes: TabItem[];
}>();
defineEmits<{
  (e: 'update:currentTab', value: string): void;
  (e: 'navigate', tab: TabItem): void;
}>();

//Antiguo Codigo

// defineEmits(['update:currentTab', 'navigate']);

const $q  = useQuasar();
const { t } = useI18n();

const resolveLabel = (tab: TabItem): string => {
  const key = `navigation.${tab.codigo}`;
  const translated = t(key);
  if (translated !== key) return translated;
  const parts = tab.titulo.split('-');
  return parts.length >= 3 ? (parts[2] ?? tab.titulo) : tab.titulo;
};
</script>

<style scoped>
/* ── CONTENEDOR ──────────────────────────────────────────────────────────── */
.submenu-tabs-wrapper {
  transition: background-color 0.25s ease;
}

.tabs-wrapper--light {
  background: #f8fafc;
  border-bottom: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.tabs-wrapper--dark {
  background: #111827;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.tabs-row {
  min-height: 46px;
}

/* ── PÍLDORA BASE ────────────────────────────────────────────────────────── */
.pill-tab {
  min-height: 32px !important;
  border-radius: 8px !important;
  padding: 0 !important;
  transition: background 0.18s ease, color 0.18s ease, transform 0.15s ease !important;
}

.pill-tab:hover {
  transform: translateY(-1px);
}

.pill-inner {
  padding: 0 10px;
}

.tab-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.tab-icon {
  opacity: 0.7;
  transition: opacity 0.15s;
}
.tab-icon--active {
  opacity: 1;
}

/* ── ACTIVO LIGHT ────────────────────────────────────────────────────────── */
.pill-tab--active-light {
  background: rgba(0, 77, 64, 0.1) !important;
  color: #004d40 !important;
  font-weight: 700 !important;
  box-shadow: inset 0 0 0 1px rgba(0, 77, 64, 0.2);
}

/* ── ACTIVO DARK ─────────────────────────────────────────────────────────── */
.pill-tab--active-dark {
  background: rgba(242, 192, 55, 0.14) !important;
  color: #f2c037 !important;
  font-weight: 700 !important;
  box-shadow: inset 0 0 0 1px rgba(242, 192, 55, 0.25);
}

/* ── IDLE LIGHT ──────────────────────────────────────────────────────────── */
.pill-tab--idle-light {
  color: #718096 !important;
}
.pill-tab--idle-light:hover {
  background: rgba(0,0,0,0.04) !important;
  color: #2d3748 !important;
}

/* ── IDLE DARK ───────────────────────────────────────────────────────────── */
.pill-tab--idle-dark {
  color: rgba(255,255,255,0.45) !important;
}
.pill-tab--idle-dark:hover {
  background: rgba(255,255,255,0.06) !important;
  color: rgba(255,255,255,0.8) !important;
}

/* ── BOTÓN REPORTES ──────────────────────────────────────────────────────── */
.reports-btn {
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px !important;
  transition: background 0.18s ease !important;
}

/* ── LISTA REPORTES ──────────────────────────────────────────────────────── */
.report-item {
  border-radius: 8px !important;
  transition: background 0.15s ease;
  min-height: 38px;
}

.report-item-label {
  font-size: 13px;
  font-weight: 500;
}

/* ── TRANSICIÓN ──────────────────────────────────────────────────────────── */
.tabs-fade-enter-active,
.tabs-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tabs-fade-enter-from,
.tabs-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
