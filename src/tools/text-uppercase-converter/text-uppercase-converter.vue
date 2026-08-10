<script setup lang="ts">
import { computed, ref } from 'vue';
import InputCopyable from '../../components/InputCopyable.vue';
import {
  toCapitalCase,
  toLowercase,
  toSentenceCase,
  toToggleCase,
  toUppercase,
} from './text-uppercase-converter.service';

const input = ref('Cộng hoà xã hội chủ nghĩa Việt Nam');

const formats = computed(() => [
  {
    label: 'Chữ IN HOA (UPPERCASE):',
    value: toUppercase(input.value),
  },
  {
    label: 'chữ in thường (lowercase):',
    value: toLowercase(input.value),
  },
  {
    label: 'Viết Hoa Đầu Mỗi Từ (Title Case):',
    value: toCapitalCase(input.value),
  },
  {
    label: 'Viết hoa chữ đầu câu (Sentence case):',
    value: toSentenceCase(input.value),
  },
  {
    label: 'Đảo ngược Hoa / Thường (Toggle Case):',
    value: toToggleCase(input.value),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '220px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <n-form-item label="Văn bản cần chuyển đổi:">
      <n-input
        v-model:value="input"
        type="textarea"
        placeholder="Nhập văn bản cần đổi chữ in hoa / in thường..."
        :autosize="{ minRows: 3, maxRows: 8 }"
        clearable
      />
    </n-form-item>

    <div class="flex flex-wrap gap-2 mb-4">
      <n-button size="small" type="primary" secondary @click="input = toUppercase(input)">
        Chuyển thành IN HOA
      </n-button>
      <n-button size="small" type="primary" secondary @click="input = toLowercase(input)">
        Chuyển thành in thường
      </n-button>
      <n-button size="small" type="primary" secondary @click="input = toCapitalCase(input)">
        Viết Hoa Đầu Từ
      </n-button>
      <n-button size="small" type="primary" secondary @click="input = toSentenceCase(input)">
        Viết Hoa Đầu Câu
      </n-button>
    </div>

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
