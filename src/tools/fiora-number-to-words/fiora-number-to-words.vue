<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy } from '@vicons/tabler';
import { convertVi, convertEn, convertZh, convertZhPinyin, MAX_AMOUNT } from './fiora-number-to-words.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const amount = ref<number | null>(1500000);

const formatNumber = (value: number | null) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('en-US').format(value);
};

const parseNumber = (input: string) => {
  const clean = input.replace(/,/g, '').trim();
  if (clean === '') return null;
  const num = Number(clean);
  return isNaN(num) ? null : num;
};

const resultVi = computed(() => {
  if (amount.value === null || amount.value === undefined || amount.value < 0) return '';
  try {
    return convertVi(amount.value);
  } catch (e: any) {
    return e.message || t('tools.fiora-number-to-words.error');
  }
});

const resultEn = computed(() => {
  if (amount.value === null || amount.value === undefined || amount.value < 0) return '';
  try {
    return convertEn(amount.value);
  } catch (e: any) {
    return e.message || t('tools.fiora-number-to-words.error');
  }
});

const resultZh = computed(() => {
  if (amount.value === null || amount.value === undefined || amount.value < 0) return '';
  try {
    return convertZh(amount.value);
  } catch (e: any) {
    return e.message || t('tools.fiora-number-to-words.error');
  }
});

const resultZhPinyin = computed(() => {
  if (amount.value === null || amount.value === undefined || amount.value < 0) return '';
  try {
    return convertZhPinyin(amount.value);
  } catch {
    return '';
  }
});

const isValid = computed(() => {
  return amount.value !== null && amount.value >= 0 && amount.value <= MAX_AMOUNT;
});

const rawAmountString = computed(() => (amount.value !== null && amount.value !== undefined ? String(amount.value) : ''));

const { copy: copyRawAmount } = useCopy({
  source: rawAmountString,
  text: t('tools.fiora-number-to-words.copyRawSuccess'),
});

const { copy: copyVi } = useCopy({
  source: resultVi,
  text: t('tools.fiora-number-to-words.copyViSuccess'),
});

const { copy: copyEn } = useCopy({
  source: resultEn,
  text: t('tools.fiora-number-to-words.copyEnSuccess'),
});

const { copy: copyZh } = useCopy({
  source: resultZh,
  text: t('tools.fiora-number-to-words.copyZhSuccess'),
});

function setPreset(val: number) {
  amount.value = val;
}
</script>

<template>
  <div class="space-y-5">
    <!-- Main Input Card -->
    <c-card :title="$t('tools.fiora-number-to-words.inputTitle')">
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <n-input-number
            v-model:value="amount"
            :min="0"
            :max="MAX_AMOUNT"
            :format="formatNumber"
            :parse="parseNumber"
            :placeholder="$t('tools.fiora-number-to-words.placeholder')"
            size="large"
            class="flex-1"
            :show-button="false"
          >
            <template #suffix>
              VNĐ
            </template>
          </n-input-number>

          <c-tooltip :tooltip="$t('tools.fiora-number-to-words.copyRawToolTip')" position="top">
            <c-button
              size="large"
              secondary
              :disabled="!isValid || amount === null"
              @click="copyRawAmount()"
            >
              <n-icon size="18" :component="Copy" />
            </c-button>
          </c-tooltip>
        </div>

        <!-- Presets -->
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-xs opacity-60 font-mono">{{ $t('tools.fiora-number-to-words.fast') }}</span>
          <n-button size="small" secondary @click="setPreset(1000000)">1M</n-button>
          <n-button size="small" secondary @click="setPreset(10000000)">10M</n-button>
          <n-button size="small" secondary @click="setPreset(50000000)">50M</n-button>
          <n-button size="small" secondary @click="setPreset(100000000)">100M</n-button>
          <n-button size="small" secondary @click="setPreset(1000000000)">1B</n-button>
        </div>
      </div>
    </c-card>

    <!-- Results Stacked in 1 Vertical Column (Tiếng Việt -> Tiếng Trung -> Tiếng Anh) -->
    <div class="space-y-4">
      <!-- 1. Tiếng Việt Card (Chuẩn kế toán) -->
      <c-card :title="$t('tools.fiora-number-to-words.viCardTitle')">
        <div class="flex items-center justify-between gap-3">
          <div class="px-3 py-2 rounded bg-slate-100 dark:bg-slate-800 flex-1 h-10 flex items-center text-sm font-medium overflow-hidden">
            <span class="truncate">{{ resultVi || $t('tools.fiora-number-to-words.emptyResult') }}</span>
          </div>
          <c-tooltip :tooltip="$t('tools.fiora-number-to-words.copyViToolTip')" position="top">
            <c-button :disabled="!isValid || !resultVi" size="large" secondary @click="copyVi()">
              <n-icon size="18" :component="Copy" />
            </c-button>
          </c-tooltip>
        </div>
      </c-card>

      <!-- 2. Tiếng Trung Card (Chuẩn kế toán 大写 + Pinyin) -->
      <c-card :title="$t('tools.fiora-number-to-words.zhCardTitle')">
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-3">
            <div class="px-3 py-2 rounded bg-slate-100 dark:bg-slate-800 flex-1 h-10 flex items-center text-sm font-medium overflow-hidden">
              <span class="truncate">{{ resultZh || $t('tools.fiora-number-to-words.emptyResult') }}</span>
            </div>
            <c-tooltip :tooltip="$t('tools.fiora-number-to-words.copyZhToolTip')" position="top">
              <c-button :disabled="!isValid || !resultZh" size="large" secondary @click="copyZh()">
                <n-icon size="18" :component="Copy" />
              </c-button>
            </c-tooltip>
          </div>
          <!-- Pinyin reading helper (non-selectable / uncopyable) -->
          <div v-if="resultZhPinyin" class="px-1 text-xs opacity-60 font-mono select-none">
            Pinyin: {{ resultZhPinyin }}
          </div>
        </div>
      </c-card>

      <!-- 3. Tiếng Anh Card (Chuẩn kế toán) -->
      <c-card :title="$t('tools.fiora-number-to-words.enCardTitle')">
        <div class="flex items-center justify-between gap-3">
          <div class="px-3 py-2 rounded bg-slate-100 dark:bg-slate-800 flex-1 h-10 flex items-center text-sm font-medium overflow-hidden">
            <span class="truncate">{{ resultEn || $t('tools.fiora-number-to-words.emptyResult') }}</span>
          </div>
          <c-tooltip :tooltip="$t('tools.fiora-number-to-words.copyEnToolTip')" position="top">
            <c-button :disabled="!isValid || !resultEn" size="large" secondary @click="copyEn()">
              <n-icon size="18" :component="Copy" />
            </c-button>
          </c-tooltip>
        </div>
      </c-card>
    </div>
  </div>
</template>
