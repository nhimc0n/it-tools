<script setup lang="ts">
import { computed, ref } from 'vue';
import { Copy } from '@vicons/tabler';
import { calculateInvoiceFee } from './invoice-fee-calculator.service';
import { useCopy } from '@/composable/copy';

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
  return `[BẢNG TÍNH PHÍ XUẤT HÓA ĐƠN & CHIẾT KHẤU]
- Giá bán thực tế (Chưa VAT): ${formatMoney(result.value.sellingPrice)}
- Giá xuất hóa đơn (Chưa VAT): ${formatMoney(result.value.invoicePrice)}
- Tiền chênh lệch (Chưa VAT): ${formatMoney(result.value.difference)}
- Phí xuất hóa đơn (${feeRatePercent.value}%): ${formatMoney(result.value.feeAmount)}
- Tiền thuế VAT (${vatRatePercent.value}%): ${formatMoney(result.value.vatAmount)}
----------------------------------------------
* Tổng chi phí khách chịu thêm (Phí + VAT): ${formatMoney(result.value.extraFeeTotal)}
* Tổng giá trị hóa đơn (Có VAT): ${formatMoney(result.value.totalInvoiceAmount)}
* Tổng tiền thực tế khách phải trả: ${formatMoney(result.value.actualCustomerPayment)}
* Tiền thừa bên bán chuyển lại cho khách: ${formatMoney(result.value.refundAmount)}`;
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
    <c-card title="Cấu hình & Dữ liệu đầu vào">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Giá bán thực tế -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">GIÁ BÁN THỰC TẾ (CHƯA VAT)</label>
            <n-input-number
              v-model:value="sellingPriceInput"
              :min="0"
              :step="100000"
              :format="formatNumber"
              :parse="parseNumber"
              placeholder="Nhập giá bán thực tế..."
              size="large"
            >
              <template #suffix>VNĐ</template>
            </n-input-number>
          </div>

          <!-- Giá xuất hóa đơn -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">GIÁ XUẤT HÓA ĐƠN (CHƯA VAT)</label>
            <n-input-number
              v-model:value="invoicePriceInput"
              :min="0"
              :step="100000"
              :format="formatNumber"
              :parse="parseNumber"
              placeholder="Nhập giá muốn xuất hóa đơn..."
              size="large"
            >
              <template #suffix>VNĐ</template>
            </n-input-number>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Tỷ lệ phí xuất hóa đơn -->
          <div>
            <label class="block text-xs font-bold opacity-70 mb-1">TỶ LỆ PHÍ XUẤT HÓA ĐƠN (%)</label>
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
            <label class="block text-xs font-bold opacity-70 mb-1">THUẾ SUẤT VAT (%)</label>
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
    <c-card title="Bảng tổng hợp chi tiết & Thanh toán">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Item 1: Giá bán -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">Giá bán thực tế (Chưa VAT)</div>
            <div class="text-base font-semibold mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.sellingPrice) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.sellingPrice)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Item 2: Giá xuất -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">Giá xuất hóa đơn (Chưa VAT)</div>
            <div class="text-base font-semibold mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.invoicePrice) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.invoicePrice)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Item 3: Chênh lệch -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">Chênh lệch (Chưa VAT)</div>
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
            <div class="text-xs text-gray-500 font-medium">Phí xuất hóa đơn ({{ feeRatePercent }}% phần chênh lệch)</div>
            <div class="text-lg font-bold mt-1 text-orange-600 dark:text-orange-400 flex justify-between items-center">
              <span>{{ formatMoney(result.feeAmount) }}</span>
              <n-button circle size="tiny" type="primary" secondary @click="copyValue(result.feeAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
          </div>

          <!-- Tiền thuế VAT -->
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 font-medium">Tiền thuế VAT ({{ vatRatePercent }}% tổng hóa đơn)</div>
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
            <div class="text-xs font-bold text-orange-800 dark:text-orange-300 uppercase">TỔNG CHI PHÍ KHÁCH CHỊU THÊM (PHÍ + VAT)</div>
            <div class="text-xl font-extrabold text-orange-600 dark:text-orange-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.extraFeeTotal) }}</span>
              <n-button circle size="small" type="warning" secondary @click="copyValue(result.extraFeeTotal)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">= Phí xuất ({{ formatMoney(result.feeAmount) }}) + VAT ({{ formatMoney(result.vatAmount) }})</div>
          </div>

          <!-- Actual customer payment -->
          <div class="p-4 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800">
            <div class="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase">TỔNG THỰC TẾ KHÁCH CẦN TRẢ CHO ĐƠN HÀNG</div>
            <div class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.actualCustomerPayment) }}</span>
              <n-button circle size="small" type="info" secondary @click="copyValue(result.actualCustomerPayment)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">= Giá bán ({{ formatMoney(result.sellingPrice) }}) + Chi phí thêm ({{ formatMoney(result.extraFeeTotal) }})</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Total invoice amount -->
          <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800">
            <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">TỔNG HÓA ĐƠN KHÁCH NHẬN (CÓ VAT - KHÁCH CHUYỂN KHOẢN)</div>
            <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.totalInvoiceAmount) }}</span>
              <n-button circle size="small" type="success" secondary @click="copyValue(result.totalInvoiceAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">Khách sẽ chuyển khoản đúng số tiền này theo hóa đơn</div>
          </div>

          <!-- Refund Amount -->
          <div class="p-4 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
            <div class="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase">TIỀN THỪA BÊN BÁN CẦN HOÀN TRẢ LẠI KHÁCH</div>
            <div class="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 flex justify-between items-center">
              <span>{{ formatMoney(result.refundAmount) }}</span>
              <n-button circle size="small" type="primary" secondary @click="copyValue(result.refundAmount)">
                <template #icon><n-icon :component="Copy" /></template>
              </n-button>
            </div>
            <div class="text-xs text-gray-500 mt-1">= Chuyển khoản ({{ formatMoney(result.totalInvoiceAmount) }}) - Thực trả ({{ formatMoney(result.actualCustomerPayment) }})</div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <n-button type="primary" size="large" @click="copySlip">
            <template #icon><n-icon :component="Copy" /></template>
            {{ isSlipCopied ? 'Đã sao chép bảng tính!' : 'Sao chép bảng tính gửi khách' }}
          </n-button>
        </div>
      </div>
    </c-card>
  </div>
</template>
