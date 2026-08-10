<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { availableLocales, locale } = useI18n();

const localesLong: Record<string, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
};

const allowedLocales = ['vi', 'en', 'zh'];

const localeOptions = computed(() =>
  allowedLocales
    .filter(loc => availableLocales.includes(loc))
    .map(loc => ({
      label: localesLong[loc] ?? loc,
      value: loc,
    })),
);
</script>

<template>
  <c-select
    v-model:value="locale"
    :options="localeOptions"
    placeholder="Select a language"
    w-120px
  />
</template>
