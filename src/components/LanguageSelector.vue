<template>
  <div v-if="type === 'menu'">
    <q-btn
      flat
      no-caps
      :class="btnClass"
      :label="currentLanguageLabel"
      icon="language"
    >
      <q-menu auto-close transition-show="jump-down" transition-hide="jump-up">
        <q-list style="min-width: 150px">
          <q-item
            v-for="lang in languages"
            :key="lang.value"
            clickable
            @click="setLanguage(lang.value)"
            :active="locale === lang.value"
          >
            <q-item-section avatar>
              <q-icon :name="lang.icon" size="xs" />
            </q-item-section>
            <q-item-section>{{ lang.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>

  <div v-else class="row q-gutter-sm">
    <q-btn
      v-for="lang in languages"
      :key="lang.value"
      flat
      round
      dense
      @click="setLanguage(lang.value)"
      :color="locale === lang.value ? 'primary' : 'grey-7'"
    >
      <q-icon :name="lang.icon" />
      <q-tooltip>{{ lang.label }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Props {
  type?: 'menu' | 'buttons';
  btnClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'menu',
  btnClass: ''
});

const { locale } = useI18n();

const languages = [
  { label: 'Español', value: 'es-ES', icon: 'img:https://cdn.quasar.dev/img/flags/spain.png' },
  { label: 'English', value: 'en-US', icon: 'img:https://cdn.quasar.dev/img/flags/usa.png' }
];

const currentLanguageLabel = computed(() => {
  const lang = languages.find(l => l.value === locale.value);
  return lang ? lang.label : 'Idioma';
});

const setLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('user-language', lang);
};
</script>
