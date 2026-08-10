<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputCopyable from '../../components/InputCopyable.vue';
import {
  toCapitalCase,
  toLowercase,
  toSentenceCase,
  toUppercase,
} from './text-uppercase-converter.service';

const { t } = useI18n();
const input = ref('Cộng hoà xã hội chủ nghĩa Việt Nam');

const formats = computed(() => [
  {
    label: t('tools.text-uppercase-converter.lowercase'),
    value: toLowercase(input.value),
  },
  {
    label: t('tools.text-uppercase-converter.sentenceCase'),
    value: toSentenceCase(input.value),
  },
  {
    label: t('tools.text-uppercase-converter.capitalCase'),
    value: toCapitalCase(input.value),
  },
  {
    label: t('tools.text-uppercase-converter.uppercase'),
    value: toUppercase(input.value),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '180px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <n-form-item :label="$t('tools.text-uppercase-converter.inputLabel')">
      <n-input
        v-model:value="input"
        type="textarea"
        :placeholder="$t('tools.text-uppercase-converter.placeholder')"
        :autosize="{ minRows: 3, maxRows: 8 }"
        clearable
      />
    </n-form-item>

    <div my-16px divider />

    <div class="flex flex-col gap-3">
      <InputCopyable
        v-for="format in formats"
        :key="format.label"
        :value="format.value"
        :label="format.label"
        v-bind="inputLabelAlignmentConfig"
      />
    </div>
  </c-card>
</template>
