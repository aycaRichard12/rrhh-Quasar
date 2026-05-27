<template>
  <q-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    show-if-above
    :width="264"
    :bordered="false"
    class="main-drawer"
  >
    <div class="full-height column drawer-inner">

      <!-- ── LOGO AREA ──────────────────────────────────────────────────── -->
      <div class="logo-area q-px-lg q-pt-lg q-pb-md">
        <div class="row items-center q-gutter-sm">
          <div class="logo-badge">
            <q-img src="favicon.ico" width="26px" height="26px" />
          </div>
          <div class="column">
            <div class="logo-name">MisterSofts</div>
            <div class="logo-sub">GESTIÓN RRHH</div>
          </div>
        </div>
      </div>

      <div class="drawer-separator" />

      <!-- ── NAVEGACIÓN ──────────────────────────────────────────────────── -->
      <q-scroll-area class="col no-scrollbar">
        <q-list class="q-pt-md q-pb-lg q-px-sm">

          <!-- Dashboard -->
          <q-item
            v-if="hasDashboard"
            clickable v-ripple
            to="/dashboard"
            class="drawer-item q-mb-xs"
            active-class="drawer-item--active"
          >
            <q-item-section avatar class="drawer-icon-section">
              <q-icon name="grid_view" size="19px" />
            </q-item-section>
            <q-item-section class="drawer-item-label">
              {{ $t('navigation.dashboard') }}
            </q-item-section>
          </q-item>

          <!-- Section label -->
          <div class="section-label q-px-sm q-mt-lg q-mb-xs">
            {{ $t('common.labels.mainMenu') }}
          </div>
          <!-- Menús expandibles -->
           <!-- Color de Menus en header-class -->
          <q-expansion-item
            v-for="menu in filteredMenu"
            :key="menu.codigo"
            :label="translateTitle(menu.codigo, menu.titulo)+ 'hola mundo'"
            :icon="getIconoMenu(menu.codigo)"
            group="menu-group"
            class="drawer-expansion"
            header-class="drawer-item drawer-expansion-header text-white"
            expand-icon-class="text-white opacity-40"
          >
            <q-list class="submenu-list q-py-xs">
              <q-item
                v-for="submenu in menu.submenu"
                :key="submenu.codigo"
                clickable v-ripple
                @click="$emit('select-submenu', submenu)"
                :active="subMenuSeleccionado === submenu.codigo.split('-')[0]"
                active-class="drawer-subitem--active"
                class="drawer-subitem"
              >
                <!-- Indicador lateral dorado -->
                <div
                  v-if="subMenuSeleccionado === submenu.codigo.split('-')[0]"
                  class="active-bar"
                />
                <q-item-section avatar class="drawer-subicon-section">
                  <q-icon :name="getIconoMenu(submenu.codigo)" size="17px" />
                </q-item-section>

                <q-item-section class="drawer-item-label text-white">
                  {{ translateTitle(submenu.codigo, submenu.titulo) }}
                </q-item-section>

              </q-item>
            </q-list>
          </q-expansion-item>

        </q-list>
      </q-scroll-area>

      <!-- ── FOOTER ──────────────────────────────────────────────────────── -->
      <div class="drawer-footer q-px-lg q-py-md">
        <div class="drawer-separator q-mb-md" />
        <div class="footer-badge">
          <q-icon name="verified_user" size="13px" class="q-mr-xs" />
          <span>Sistema Seguro</span>
        </div>
      </div>

    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { getIconoMenu } from 'src/stores/paginas';
import type { MenuItem } from 'src/layouts/types/navigation';
import { useAppNavigation } from '../composables/useAppNavigation';

defineProps<{
  modelValue: boolean;
  subMenuSeleccionado: string;
}>();

defineEmits(['update:modelValue', 'select-submenu']);

const authStore = useAuthStore();
const { hasValidTabsForSubmenu, translateTitle } = useAppNavigation();

const hasDashboard = computed(() =>
  (authStore.user?.menu || []).some(m =>
    m.codigo === 'dashboard' ||
    (m.submenu && m.submenu.some(s => s.codigo?.includes('dashboard')))
  )
);

const filteredMenu = computed((): MenuItem[] => {
  const rawMenu = (authStore.user?.menu || []) as MenuItem[];
  return rawMenu
    .filter(m => m.codigo !== 'opcionesocultas')
    .map(menu => ({
      ...menu,
      submenu: (menu.submenu || []).filter(s => hasValidTabsForSubmenu(s)),
    }))
    .filter(menu => menu.submenu.length > 0);
});
</script>

<style scoped>
/* ── BASE DEL DRAWER ─────────────────────────────────────────────────────── */
:deep(.q-drawer),
.main-drawer {
  background: transparent !important;
}

:deep(.q-drawer--left) {
  border-right: none !important;
}

.drawer-inner {
  background: linear-gradient(180deg, #004d40 0%, #002e25 55%, #001a12 100%);
  height: 100%;
  position: relative;
}

/* Partícula de luz dorada en esquina superior */
.drawer-inner::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(242, 192, 55, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

/* ── LOGO ────────────────────────────────────────────────────────────────── */
.logo-area {
  flex-shrink: 0;
}

.logo-badge {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(242, 192, 55, 0.3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(242, 192, 55, 0.1);
}

.logo-name {
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.logo-sub {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #f2c037;
  opacity: 0.9;
  line-height: 1.4;
}

/* ── SEPARADOR ───────────────────────────────────────────────────────────── */
.drawer-separator {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  margin: 0 24px;
}

/* ── SECTION LABEL ───────────────────────────────────────────────────────── */
.section-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #f2c037;
  opacity: 0.55;
}

/* ── ÍTEMS GENERALES ─────────────────────────────────────────────────────── */
.drawer-item {
  border-radius: 10px !important;
  color: rgba(255,255,255,0.65) !important;
  min-height: 42px !important;
  margin: 1px 4px !important;
  transition: background 0.18s ease, color 0.18s ease !important;
}

.drawer-item:hover {
  background: rgba(255,255,255,0.06) !important;
  color: rgba(255,255,255,0.9) !important;
}

/* Ítem activo (dashboard con router-link) */
.drawer-item--active,
:deep(.q-item.q-router-link--active) {
  background: rgba(242, 192, 55, 0.14) !important;
  color: #f2c037 !important;
  font-weight: 600 !important;
}

.drawer-icon-section {
  min-width: 36px !important;
}

.drawer-item-label {
  font-size: 13.5px;
}

/* ── EXPANSION ───────────────────────────────────────────────────────────── */
.drawer-expansion :deep(.q-expansion-item__content) {
  background: rgba(0,0,0,0.18);
  border-radius: 10px;
  margin: 2px 4px;
}

.drawer-expansion-header {
  font-size: 13.5px;
}

/* ── SUB-ÍTEMS ───────────────────────────────────────────────────────────── */
.submenu-list {
  padding-left: 8px;
}

.drawer-subitem {
  border-radius: 8px !important;
  color: rgba(255,255,255,0.55) !important;
  min-height: 38px !important;
  margin: 1px 4px !important;
  position: relative;
  transition: background 0.18s ease, color 0.18s ease !important;
}

.drawer-subitem:hover {
  background: rgba(255,255,255,0.05) !important;
  color: rgba(255,255,255,0.85) !important;
}

/* Sub-ítem activo */
.drawer-subitem--active {
  background: rgba(242, 192, 55, 0.12) !important;
  color: #f2c037 !important;
  font-weight: 600 !important;
}

.drawer-subicon-section {
  min-width: 30px !important;
}

/* Barra lateral dorada */
.active-bar {
  position: absolute;
  left: 0; top: 18%; bottom: 18%;
  width: 3px;
  background: #f2c037;
  border-radius: 0 3px 3px 0;
}

/* ── FOOTER ──────────────────────────────────────────────────────────────── */
.drawer-footer {
  flex-shrink: 0;
}

.footer-badge {
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase;
}

/* Scroll sin scrollbar */
.no-scrollbar :deep(.q-scrollarea__container) {
  scrollbar-width: none;
}
.no-scrollbar :deep(.q-scrollarea__container::-webkit-scrollbar) {
  display: none;
}
</style>
