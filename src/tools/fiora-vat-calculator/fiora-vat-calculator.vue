<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy } from '@vicons/tabler';
import { calculateVat, MAX_AMOUNT, type VatMode } from './fiora-vat-calculator.service';
import { useCopy } from '@/composable/copy';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();

const mode = ref<VatMode>('forward');
const inputAmount = ref<number | null>(10000000);
const ratePercent = ref<number>(10);

const presetRates = [0, 5, 8, 10];

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

const result = computed(() => {
  if (inputAmount.value === null || inputAmount.value < 0 || ratePercent.value < 0) return null;
  try {
    return calculateVat(mode.value, inputAmount.value, ratePercent.value);
  } catch (e) {
    return null;
  }
});

function formatMoney(val?: number): string {
  if (val === undefined || val === null) return '0 VNĐ';
  return new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';
}

const beforeTaxText = computed(() => (result.value ? formatMoney(result.value.amountBeforeTax) : ''));
const vatAmountText = computed(() => (result.value ? formatMoney(result.value.vatAmount) : ''));
const totalAmountText = computed(() => (result.value ? formatMoney(result.value.amountAfterTax) : ''));

const { copy: copyBeforeTax } = useCopy({
  source: beforeTaxText,
  text: t('tools.fiora-vat-calculator.copyBeforeTaxSuccess'),
});

const { copy: copyVatAmount } = useCopy({
  source: vatAmountText,
  text: t('tools.fiora-vat-calculator.copyVatAmountSuccess'),
});

const { copy: copyTotalAmount } = useCopy({
  source: totalAmountText,
  text: t('tools.fiora-vat-calculator.copyTotalAmountSuccess'),
});

const copySlipText = computed(() => {
  if (!result.value) return '';
  const modeText = mode.value === 'forward' ? t('tools.fiora-vat-calculator.modeForwardShort') : t('tools.fiora-vat-calculator.modeReverseShort');
  return `[${t('tools.fiora-vat-calculator.slipHeader')} - ${modeText.toUpperCase()}]
- ${t('tools.fiora-vat-calculator.rateLabel')}: ${result.value.ratePercent}%
- ${t('tools.fiora-vat-calculator.beforeTaxLabel')}: ${formatMoney(result.value.amountBeforeTax)}
- ${t('tools.fiora-vat-calculator.vatAmountLabel')}: ${formatMoney(result.value.vatAmount)}
- ${t('tools.fiora-vat-calculator.totalAmountLabel')}: ${formatMoney(result.value.amountAfterTax)}`;
});

const rawAmountString = computed(() => (inputAmount.value !== null && inputAmount.value !== undefined ? String(inputAmount.value) : ''));

const { copy: copyRawAmount } = useCopy({
  source: rawAmountString,
  text: t('tools.fiora-vat-calculator.copyRawSuccess'),
});

const { copy: copySlip } = useCopy({
  source: copySlipText,
  text: t('tools.fiora-vat-calculator.copySlipSuccess'),
});

function jumpToWords() {
  if (!result.value) return;
  router.push(`/fiora-number-to-words?amount=${result.value.amountAfterTax}`);
}
</script>

<template>
  <div class="space-y-5">
    <!-- Config Card -->
    <c-card :title="$t('tools.fiora-vat-calculator.configTitle')">
      <div class="space-y-4">
        <!-- Mode Switcher -->
        <div>
          <label class="block text-xs font-bold opacity-70 mb-2">{{ $t('tools.fiora-vat-calculator.modeLabel') }}</label>
          <n-radio-group v-model:value="mode" name="vat-mode-group" size="large">
            <n-radio-button value="forward">
              {{ $t('tools.fiora-vat-calculator.modeForward') }}
            </n-radio-button>
            <n-radio-button value="reverse">
              {{ $t('tools.fiora-vat-calculator.modeReverse') }}
            </n-radio-button>
          </n-radio-group>
        </div>

        <!-- Amount Input -->
        <div>
          <label class="block text-xs font-bold opacity-70 mb-2">
            {{ mode === 'forward' ? $t('tools.fiora-vat-calculator.inputForward') : $t('tools.fiora-vat-calculator.inputReverse') }}
          </label>
          <div class="flex items-center gap-2">
            <n-input-number
              v-model:value="inputAmount"
              :min="0"
              :max="MAX_AMOUNT"
              :format="formatNumber"
              :parse="parseNumber"
              :placeholder="$t('tools.fiora-vat-calculator.placeholder')"
              size="large"
              class="flex-1"
              :show-button="false"
            >
              <template #suffix>
                VNĐ
              </template>
            </n-input-number>

            <c-tooltip :tooltip="$t('tools.fiora-vat-calculator.copyRawToolTip')" position="top">
              <c-button
                size="large"
                secondary
                :disabled="inputAmount === null"
                @click="copyRawAmount()"
              >
                <n-icon size="18" :component="Copy" />
              </c-button>
            </c-tooltip>
          </div>
        </div>

        <!-- Rate selector -->
        <div>
          <label class="block text-xs font-bold opacity-70 mb-2">{{ $t('tools.fiora-vat-calculator.rateLabel') }}</label>
          <div class="flex flex-wrap gap-2 items-center">
            <n-button
              v-for="r in presetRates"
              :key="r"
              :type="ratePercent === r ? 'primary' : 'default'"
              secondary
              @click="ratePercent = r"
            >
              {{ r }}%
            </n-button>
            <div class="flex items-center gap-1 ml-2">
              <span class="text-xs opacity-60">{{ $t('tools.fiora-vat-calculator.other') }}</span>
              <n-input-number
                v-model:value="ratePercent"
                :min="0"
                :max="100"
                style="width: 100px"
                size="small"
                :show-button="false"
              />
              <span class="font-bold">%</span>
            </div>
          </div>
        </div>
      </div>
    </c-card>

    <!-- Breakdown Result Card -->
    <c-card v-if="result" :title="$t('tools.fiora-vat-calculator.resultTitle')">
      <div class="space-y-4">
        <div class="space-y-2">
          <!-- 1. Giá trước thuế -->
          <div class="flex justify-between items-center px-3 py-2 rounded bg-slate-100 dark:bg-slate-800 h-10">
            <span class="text-sm font-medium">{{ $t('tools.fiora-vat-calculator.beforeTax') }}</span>
            <div class="flex items-center gap-2">
              <strong class="text-sm">{{ formatMoney(result.amountBeforeTax) }}</strong>
              <c-tooltip :tooltip="$t('tools.fiora-vat-calculator.copyBeforeTaxToolTip')" position="top">
                <c-button size="small" secondary @click="copyBeforeTax()">
                  <n-icon size="14" :component="Copy" />
                </c-button>
              </c-tooltip>
            </div>
          </div>

          <!-- 2. Tiền thuế VAT (Bỏ dấu +) -->
          <div class="flex justify-between items-center px-3 py-2 rounded bg-slate-100 dark:bg-slate-800 h-10">
            <span class="text-sm font-medium">{{ $t('tools.fiora-vat-calculator.vatAmount', { rate: result.ratePercent }) }}</span>
            <div class="flex items-center gap-2">
              <strong class="text-sm">{{ formatMoney(result.vatAmount) }}</strong>
              <c-tooltip :tooltip="$t('tools.fiora-vat-calculator.copyVatAmountToolTip')" position="top">
                <c-button size="small" secondary @click="copyVatAmount()">
                  <n-icon size="14" :component="Copy" />
                </c-button>
              </c-tooltip>
            </div>
          </div>

          <!-- 3. Tổng thanh toán -->
          <div class="flex justify-between items-center px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 h-10 font-bold">
            <span class="text-sm">{{ $t('tools.fiora-vat-calculator.totalAmount') }}</span>
            <div class="flex items-center gap-2">
              <strong class="text-base">{{ formatMoney(result.amountAfterTax) }}</strong>
              <c-tooltip :tooltip="$t('tools.fiora-vat-calculator.copyTotalAmountToolTip')" position="top">
                <c-button size="small" secondary @click="copyTotalAmount()">
                  <n-icon size="14" :component="Copy" />
                </c-button>
              </c-tooltip>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-2">
          <c-button secondary @click="jumpToWords()">
            {{ $t('tools.fiora-vat-calculator.jumpToWords') }}
          </c-button>

          <c-button autofocus @click="copySlip()">
            {{ $t('tools.fiora-vat-calculator.copySlip') }}
          </c-button>
        </div>
      </div>
    </c-card>
  </div>
</template>
