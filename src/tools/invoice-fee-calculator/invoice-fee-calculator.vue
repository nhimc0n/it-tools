<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Copy } from '@vicons/tabler';
import { calculateInvoiceFee } from './invoice-fee-calculator.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const sellingPriceInput = ref<number | null>(1000000);
const invoicePriceInput = ref<number | null>(1500000);
const feeRatePercent = ref<number>(20);
const vatRatePercent = ref<number>(10);

const presetVatRates = [0, 5, 8, 10];
const presetFeeRates = [10, 15, 20, 25, 30];

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
  return calculateInvoiceFee({
    sellingPrice: sellingPriceInput.value || 0,
    invoicePrice: invoicePriceInput.value || 0,
    feeRatePercent: feeRatePercent.value || 0,
    vatRatePercent: vatRatePercent.value || 0,
  });
});

function formatMoney(val?: number): string {
  if (val === undefined || val === null) return '0 VNĐ';
  return new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';
}

const copySlipText = computed(() => {
  if (!result.value) return '';
  return `[${t('tools.invoice-fee-calculator.slipHeader')}]
- ${t('tools.invoice-fee-calculator.itemSellingPrice')}: ${formatMoney(result.value.sellingPrice)}
- ${t('tools.invoice-fee-calculator.itemInvoicePrice')}: ${formatMoney(result.value.invoicePrice)}
- ${t('tools.invoice-fee-calculator.itemDifference')}: ${formatMoney(result.value.difference)}
- ${t('tools.invoice-fee-calculator.itemFeeAmount', { feeRate: feeRatePercent.value })}: ${formatMoney(result.value.feeAmount)}
- ${t('tools.invoice-fee-calculator.itemVatAmount', { vatRate: vatRatePercent.value })}: ${formatMoney(result.value.vatAmount)}
----------------------------------------------
* ${t('tools.invoice-fee-calculator.itemExtraFeeTotalTitle')}: ${formatMoney(result.value.extraFeeTotal)}
* ${t('tools.invoice-fee-calculator.itemTotalInvoiceAmountTitle')}: ${formatMoney(result.value.totalInvoiceAmount)}
* ${t('tools.invoice-fee-calculator.itemActualCustomerPaymentTitle')}: ${formatMoney(result.value.actualCustomerPayment)}
* ${t('tools.invoice-fee-calculator.itemRefundAmountTitle')}: ${formatMoney(result.value.refundAmount)}`;
});

const { copy: copySlip, isJustCopied: isSlipCopied } = useCopy({
  source: copySlipText,
  createToast: false,
});

function copyValue(val: number) {
  const { copy } = useCopy({
    source: ref(formatMoney(val)),
    createToast: false,
  });
  copy();
}
</script>

<template>
  <div class="space-y-5">
    <c-card :title="$t('tools.invoice-fee-calculator.inputCardTitle')">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Giá bán thực tế -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">{{ $t('tools.invoice-fee-calculator.sellingPriceLabel') }}</label>
            <n-input-number
              v-model:value="sellingPriceInput"
              :min="0"
              :step="100000"
              :format="formatNumber"
              :parse="parseNumber"
              :placeholder="$t('tools.invoice-fee-calculator.sellingPricePlaceholder')"
              size="large"
            >
              <template #suffix>VNĐ</template>
            </n-input-number>
          </div>

          <!-- Giá xuất hóa đơn -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">{{ $t('tools.invoice-fee-calculator.invoicePriceLabel') }}</label>
            <n-input-number
              v-model:value="invoicePriceInput"
              :min="0"
              :step="100000"
              :format="formatNumber"
              :parse="parseNumber"
              :placeholder="$t('tools.invoice-fee-calculator.invoicePricePlaceholder')"
              size="large"
            >
              <template #suffix>VNĐ</template>
            </n-input-number>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Tỷ lệ phí xuất hóa đơn -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">{{ $t('tools.invoice-fee-calculator.feeRateLabel') }}</label>
            <n-input-number
              v-model:value="feeRatePercent"
              :min="0"
              :max="100"
              :step="1"
              size="large"
            >
              <template #suffix>%</template>
            </n-input-number>
            <div class="flex flex-wrap gap-1 mt-2">
              <n-tag
                v-for="r in presetFeeRates"
                :key="r"
                size="small"
                round
                class="cursor-pointer"
                :type="feeRatePercent === r ? 'primary' : 'default'"
                @click="feeRatePercent = r"
              >
                {{ r }}%
              </n-tag>
            </div>
          </div>

          <!-- Thuế suất VAT -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">{{ $t('tools.invoice-fee-calculator.vatRateLabel') }}</label>
            <n-input-number
              v-model:value="vatRatePercent"
              :min="0"
              :max="100"
              :step="1"
              size="large"
            >
              <template #suffix>%</template>
            </n-input-number>
            <div class="flex flex-wrap gap-1 mt-2">
              <n-tag
                v-for="r in presetVatRates"
                :key="r"
                size="small"
                round
                class="cursor-pointer"
                :type="vatRatePercent === r ? 'primary' : 'default'"
                @click="vatRatePercent = r"
              >
                {{ r }}%
              </n-tag>
            </div>
          </div>
        </div>
      </div>
    </c-card>

    <!-- Results Breakdown -->
    <c-card :title="$t('tools.invoice-fee-calculator.summaryCardTitle')">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Item 1: Giá bán -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">{{ $t('tools.invoice-fee-calculator.itemSellingPrice') }}</div>
            <div class="text-base font-semibold mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.sellingPrice) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.sellingPrice)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Item 2: Giá xuất -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">{{ $t('tools.invoice-fee-calculator.itemInvoicePrice') }}</div>
            <div class="text-base font-semibold mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.invoicePrice) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.invoicePrice)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Item 3: Chênh lệch -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">{{ $t('tools.invoice-fee-calculator.itemDifference') }}</div>
            <div class="text-base font-semibold mt-1 text-amber-600 dark:text-amber-400 flex justify-between items-center">
              <span>{{ formatMoney(result.difference) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.difference)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Phí xuất hóa đơn -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">{{ $t('tools.invoice-fee-calculator.itemFeeAmount', { feeRate: feeRatePercent }) }}</div>
            <div class="text-lg font-bold mt-1 text-orange-600 dark:text-orange-400 flex justify-between items-center">
              <span>{{ formatMoney(result.feeAmount) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.feeAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Tiền thuế VAT -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">{{ $t('tools.invoice-fee-calculator.itemVatAmount', { vatRate: vatRatePercent }) }}</div>
            <div class="text-lg font-bold mt-1 text-blue-600 dark:text-blue-400 flex justify-between items-center">
              <span>{{ formatMoney(result.vatAmount) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.vatAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>
        </div>

        <div class="divider my-2" />

        <!-- Key Financial Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Total extra cost -->
          <div class="p-4 bg-orange-50 dark:bg-orange-950/40 rounded border border-orange-200 dark:border-orange-800">
            <div class="text-xs font-bold text-orange-800 dark:text-orange-300 uppercase">{{ $t('tools.invoice-fee-calculator.itemExtraFeeTotalTitle') }}</div>
            <div class="text-xl font-extrabold text-orange-600 dark:text-orange-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.extraFeeTotal) }}</span>
              <n-button circle size="small" type="warning" secondary @click="copyValue(result.extraFeeTotal)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">{{ $t('tools.invoice-fee-calculator.itemExtraFeeTotalSub', { feeAmount: formatMoney(result.feeAmount), vatAmount: formatMoney(result.vatAmount) }) }}</div>
          </div>

          <!-- Actual customer payment -->
          <div class="p-4 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800">
            <div class="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase">{{ $t('tools.invoice-fee-calculator.itemActualCustomerPaymentTitle') }}</div>
            <div class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.actualCustomerPayment) }}</span>
              <n-button circle size="small" type="info" secondary @click="copyValue(result.actualCustomerPayment)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">{{ $t('tools.invoice-fee-calculator.itemActualCustomerPaymentSub', { sellingPrice: formatMoney(result.sellingPrice), extraFeeTotal: formatMoney(result.extraFeeTotal) }) }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Total invoice amount -->
          <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800">
            <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">{{ $t('tools.invoice-fee-calculator.itemTotalInvoiceAmountTitle') }}</div>
            <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.totalInvoiceAmount) }}</span>
              <n-button circle size="small" type="success" secondary @click="copyValue(result.totalInvoiceAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">{{ $t('tools.invoice-fee-calculator.itemTotalInvoiceAmountSub') }}</div>
          </div>

          <!-- Refund Amount -->
          <div class="p-4 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
            <div class="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase">{{ $t('tools.invoice-fee-calculator.itemRefundAmountTitle') }}</div>
            <div class="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.refundAmount) }}</span>
              <n-button circle size="small" type="primary" secondary @click="copyValue(result.refundAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">{{ $t('tools.invoice-fee-calculator.itemRefundAmountSub', { totalInvoiceAmount: formatMoney(result.totalInvoiceAmount), actualCustomerPayment: formatMoney(result.actualCustomerPayment) }) }}</div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <n-button type="primary" size="large" @click="copySlip">
            <template #icon><n-icon :component="Copy" /></template>
            {{ isSlipCopied ? $t('tools.invoice-fee-calculator.copySlipCopiedBtn') : $t('tools.invoice-fee-calculator.copySlipBtn') }}
          </n-button>
        </div>
      </div>
    </c-card>
  </div>
</template>
